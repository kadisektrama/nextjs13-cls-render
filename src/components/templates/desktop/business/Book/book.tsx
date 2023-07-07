"use client"

import React, { useEffect, useState } from "react"
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from 'next/link'
import { addDays } from "date-fns";
import Cookies from "js-cookie";

import Typography from "@mui/material/Typography";
import { Alert, Button } from "@mui/material";
import { Divider } from "@mui/material";
import { NavigateBefore } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import { Snackbar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { CircularProgress } from "@material-ui/core";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { getCalculatePrice, getProperty, setBooking } from "@/api/basicApi";
import { getGeoInfo, getUserExists, sendVerifyCode } from "@/api/commonApi";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { dateForRequestFormat, diffDates, rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import { ModalWindowLogin } from "@/components/templates/desktop/business/Book/Auth/ModalWindowLogin/modalWindowLogin";
import { ModalWindowRegistration } from "@/components/templates/desktop/business/Book/Auth/ModalWindowRegistration/modalWindowRegistration";
import { ModalWindowMailChecking } from "@/components/templates/desktop/business/Book/Auth/ModalWindowMailChecking/modalWindowMailChecking";
import { ModalWindowMailLogin } from "@/components/templates/desktop/business/Book/Auth/ModalWindowMailLogin/modalWindowMailLogin";
import { ModalWindowMailRegistration } from "@/components/templates/desktop/business/Book/Auth/ModalWindowMailRegistration/modalWindowMailRegistration";
import { ModalWindowDate } from "@/components/templates/desktop/business/Book/ModalWindowDate/modalWindowDate";
import { ModalWindowGuest } from "@/components/templates/desktop/business/Book/ModalWindowGuest/modalWindowGuest";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { DialogWindowCodeAuthenticationContainer } from "@/components/Modals/DialogWindowCode/dialogWindowCodeAuthenticationContainer"
import { DialogWindowCodePhoneNumberConfirmContainer } from "@/components/Modals/DialogWindowCode/dialogWindowCodePhoneNumberСonfirmContainer";
import { ModalWindowPasswordRecovery } from "@/components/templates/desktop/business/Book/Auth/ModalWindowPasswordRecovery/modalWindowPasswordRecovery";
import { errorBookingTranslator, errorAuthCheckingTranslator } from "@/utils/Constants/Error/errorValidator";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchProperty } from "@/redux/thunk/property";
import { fetchPropertyTypes } from "@/redux/thunk/propertyType";
import { fetchCountryRegisters } from "@/redux/thunk/countryRegister";
import { fetchCalculatePrice } from "@/redux/thunk/property";

export const Book: React.FC = () => {
    const [countryCallingCode, setCountryCallingCode] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [mail, setMail] = useState('');
    const [verifyCode, setVerifyCode] = useState(false);
    const searchParams = useSearchParams();
    const [geoData, setGeoData] = useState<{country_calling_code: any}>({country_calling_code: null});
    const [isDisableButton, setIsDisableButton] = useState(false);

    const [openDialogWindowCodeAuthentication, setOpenDialogWindowCodeAuthentication] = useState(false);
    const [openDialogWindowCodePhoneNumberConfirm, setOpenDialogWindowCodePhoneNumberConfirm] = useState(false);
    const [openAlert, setOpenAlert] = useState('');
    const [openModalWindow, setOpenModalWindow] = useState('')

    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();
    let { id } = useParams();

    useEffect(() => {
        Promise.all([
            dispatch(fetchProperty(id)),
            dispatch(fetchPropertyTypes()),
            dispatch(fetchCountryRegisters()),
            getGeoInfo(),
        ])
            .then((res) => {setGeoData(res[3]); setCountryCallingCode(res[3].country_calling_code); setPhone(res[3].country_calling_code)})
            .then(() => dispatch(fetchCalculatePrice({id: id, start_date: searchParams.get('start_date'), end_date: searchParams.get('end_date'), guests: {adults: searchParams.get('adults'), children: searchParams.get('children')}})))
            .then(
                () => {
                    setIsLoaded(true);
                },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                }
            )
    }, [])

    const book = () => {
        setBooking(
            id,
            searchParams.get('start_date') || dateForRequestFormat(new Date()),
            searchParams.get('end_date') || dateForRequestFormat(addDays(new Date(), 1)),
            searchParams.get('adults') || 1,
            searchParams.get('children') || 0,
            searchParams.get('infants') || 0,
            searchParams.get('pets') || 0,
            )
            .then(() => {
                setOpenAlert('success')
                return router.push(`${pathname}/confirmation?${new URLSearchParams(Object.fromEntries(searchParams.entries() || [])).toString()}`);
            })
            .catch((error: any) => {
                setOpenAlert('reject')
                setError(errorBookingTranslator(error));
            })
    }

    async function handleSubmitAuthentication(event: any) {
        event.preventDefault();
        setIsDisableButton(true);
        let user = await getUserExists(phone.replace(/[.*?^${}()|[-]|[\]\\]/g, ''));

        if (user.available_to_login) {
            setOpenModalWindow('login')
            setIsDisableButton(false)
        } else {
            let body = {
                country_calling_code: countryCallingCode,
                phone: phone.substring(countryCallingCode.length).replace(/[.*?^${}()|[-]|[\]\\]/g, ''),
            };
            let res = await sendVerifyCode(body)
                .catch(e => {
                    if (e.message === 'Подтверждение не доступно.') {
                        setOpenModalWindow('registration');
                        setIsDisableButton(false);
                    }
                    if (errorAuthCheckingTranslator(e)) {
                        setError(errorAuthCheckingTranslator(e))
                        setIsDisableButton(false);
                        setOpenAlert('reject')
                    } 
                })

            if (res.message === 'Отправлен код на подтверждение номера') {
                setOpenDialogWindowCodeAuthentication(true);
                setIsDisableButton(true);
            } else {
                setError({message: 'Неверный формат номера'});
                setIsDisableButton(false);
                setOpenAlert('reject')
            }
        }
    };

    async function handleSubmitPhoneNumberConfirm(event: any) {
        event.preventDefault();
        setIsDisableButton(true);

        let body = {
            country_calling_code: countryCallingCode,
            phone: phone.substring(countryCallingCode.length).replace(/[.*?^${}()|[-]|[\]\\]/g, ''),
        };

        sendVerifyCode(body)
            .then(() => {
                setOpenDialogWindowCodePhoneNumberConfirm(true)
            })
    };

    return(
        <>
            {isLoaded ? (
                <>
                    <Container>
                        {/*<div>Здесь должна быть шапка без каких-либо элементов, кроме логотипа</div>*/}
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "normal", padding: "4rem 0 3rem" }}>
                            <IconButton sx={{ marginRight: "1rem" }} aria-label="navigate before">
                                <Link href={pathname} style={{ position: "absolute", inset: 0 }} />
                                <NavigateBefore />
                            </IconButton>
                            <Typography component="h1" variant="h4">
                                {state.property.property.instant_booking_available ? 'Забронировать' : 'Запрос на бронирование'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box sx={{ width: "50%", marginBottom: 8 }}>
                                <Typography component="h2" variant="h6" sx={{ paddingBottom: "1rem" }}>Ваша поездка</Typography>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    paddingBottom: "1.5rem"
                                }}>
                                    <div>
                                        <Typography component="h3" variant="subtitle1">Даты</Typography>
                                        <div>
                                            {rangeStartDateEndDate(searchParams.get('start_date'), searchParams.get('end_date'))}
                                        </div>
                                    </div>
                                    <Button variant="text" onClick={() => setOpenModalWindow('date')}>Изменить</Button>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    paddingBottom: "1.5rem"
                                }}>
                                    <div>
                                        <Typography component="h3" variant="subtitle1">Гости</Typography>
                                        <div>{parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0')} {getNoun(parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0'), 'гость', 'гостя', 'гостей')}</div>
                                    </div>
                                    <Button variant="text" onClick={() => setOpenModalWindow('guest')}>Изменить</Button>
                                </Box>
                                {/*<Divider />
                                <Typography component="h2" variant="h6" sx={{ padding: "2rem 0 1.5rem" }}>Варианты оплаты</Typography>
                                <Divider />
                                <Box sx={{ padding: "2rem 0 1.5rem" }}>
                                    <Typography component="h2" variant="h6" sx={{ paddingBottom: "1rem" }}>Правила отмены</Typography>
                                    <div>Бесплатная отмена до 29 мар.</div>
                                </Box>*/}
                                <Divider />
                                {!Cookies.get('token') ? (
                                    <>
                                        <Divider />
                                        <Typography component="h2" variant="h6" sx={{ paddingTop: 4 }}>
                                            Чтобы оформить бронирование, войдите или зарегистрируйтесь
                                        </Typography>
                                        <Box component="form" onSubmit={(e) => handleSubmitAuthentication(e)} sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
                                            <TextField
                                                margin="normal"
                                                select
                                                required
                                                fullWidth
                                                defaultValue={state.countryRegister.countryRegisters?.findIndex((register: any) => register.country_calling_code === geoData?.country_calling_code)}
                                                label="Страна/регион"
                                                id="country_register"
                                                name="country_register"
                                                onChange={(event) => {
                                                    setCountryCallingCode(state.countryRegister.countryRegisters[event.target.value].country_calling_code);
                                                    setPhone(state.countryRegister.countryRegisters[event.target.value].country_calling_code)
                                                }}
                                            >
                                                {state.countryRegister.countryRegisters.map((option: any, index: any) => (
                                                    <MenuItem key={index} value={index}>
                                                        {option.country_name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <TextField
                                                margin="normal"
                                                type="tel"
                                                required
                                                value={phone}
                                                name="phone"
                                                label="Номер телефона"
                                                id="phone"
                                                onChange={(event) => {
                                                    if (event.target.value.toString().startsWith(countryCallingCode.toString())) {setPhone(event.target.value)}
                                                }}
                                            />
                                            <Typography component="div" variant="caption" color="text.secondary">
                                                Мы отправим вам SMS, чтобы подтвердить номер телефона. Применяются стандартные условия вашего тарифа на прием сообщений и передачу данных.
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                type="submit"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                {isDisableButton ? <CircularProgress size={30} color="inherit" /> : 'Продолжить'}
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        {state.user.user.phones.length === 0 ? (
                                            <>
                                                <Divider />
                                                <Typography component="h2" variant="h6" sx={{ paddingTop: 4 }}>
                                                    Чтобы оформить бронирование, введите ваш номер телефона
                                                </Typography>

                                                <Box component="form" onSubmit={(e) => handleSubmitPhoneNumberConfirm(e)} sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <TextField
                                                        margin="normal"
                                                        select
                                                        required
                                                        fullWidth
                                                        defaultValue={state.countryRegister.countryRegisters?.findIndex((register: any) => register.country_calling_code === geoData?.country_calling_code)}
                                                        label="Страна/регион"
                                                        id="country_register"
                                                        name="country_register"
                                                        onChange={(event) => {
                                                            setCountryCallingCode(state.countryRegister.countryRegisters[event.target.value].country_calling_code);
                                                            setPhone(state.countryRegister.countryRegisters[event.target.value].country_calling_code)
                                                        }}
                                                    >
                                                        {state.countryRegister.countryRegisters.map((option: any, index: any) => (
                                                            <MenuItem key={index} value={index}>
                                                                {option.country_name}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                    <TextField
                                                        margin="normal"
                                                        type="tel"
                                                        required
                                                        value={phone}
                                                        name="phone"
                                                        label="Номер телефона"
                                                        id="phone"
                                                        onKeyPress={(event) => !/[0-9()-]/.test(event.key) && event.preventDefault()}
                                                        onChange={(event) => event.target.value.toString().startsWith(countryCallingCode.toString()) && setPhone(event.target.value)}
                                                    />
                                                    <Typography component="p" variant="caption" color="text.secondary">
                                                        Мы отправим вам SMS, чтобы подтвердить номер телефона. Применяются стандартные условия вашего тарифа на прием сообщений и передачу данных.
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        size="large"
                                                        type="submit"
                                                        sx={{ mt: 3, mb: 2 }}
                                                    >
                                                        {isDisableButton ? <CircularProgress size={30} color="inherit" /> : 'Продолжить'}
                                                    </Button>
                                                </Box>
                                            </>
                                        ) : (
                                            <>
                                                {!state.property.property.instant_booking_available ? (
                                                    <Box sx={{ padding: "2rem 0 1.5rem" }}>Бронирование будет подтверждено, когда хозяин примет запрос (в течение 24 часов).</Box>
                                                ) : ("")}
                                                <Divider />
                                                <Typography component="div" variant="caption" sx={{ paddingTop: "1.5rem" }}>
                                                    Нажимая кнопку ниже, я соглашаюсь с Правилами бронирования, установленными kvartiranasutki.com в отношении данного бронирования.
                                                </Typography>
                                                {state.property.property.instant_booking_available
                                                    ? (<Button variant="contained" size="large" sx={{ margin: "1.5rem 0", display: 'relative' }} onClick={() => book()}>
                                                            Забронировать
                                                            {/*<Link style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}} className={s.Link} to={`./confirmation?startDate=${Object.fromEntries([...searchParams])['startDate']}&endDate=${Object.fromEntries([...searchParams])['endDate']}&guests=${Object.fromEntries([...searchParams])['guests']}`}></Link>*/}
                                                        </Button>
                                                    ) : (<Button variant="contained" size="large" sx={{ margin: "1.5rem 0", display: 'relative' }} onClick={() => book()}>
                                                        Запрос на бронирование
                                                        {/*<Link style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}} className={s.Link} to={`./confirmation?startDate=${Object.fromEntries([...searchParams])['startDate']}&endDate=${Object.fromEntries([...searchParams])['endDate']}&guests=${Object.fromEntries([...searchParams])['guests']}`}></Link>*/}
                                                    </Button>)
                                                }
                                            </>
                                        )}
                                    </>
                                )}
                            </Box>
                            <Box sx={{ width: "41.6667%" }}>
                                <Card variant="outlined" sx={{ borderRadius: ".75rem" }}>
                                    <CardContent sx={{ padding: "1.5rem" }}>
                                        <Box sx={{ display: "flex", paddingBottom: "1.5rem" }}>
                                            <Box
                                                component="img"
                                                src={state.property.property.photos[0].url}
                                                // src="https://via.placeholder.com/124x106"
                                                alt="card_content"
                                                sx={{
                                                    height: 106,
                                                    width: 124,
                                                    borderRadius: 2
                                                }}
                                            />
                                            <Typography component="div" variant="body2" sx={{ paddingLeft: ".75rem" }}>{state.property.property.name}</Typography>
                                        </Box>
                                        <Divider />
                                        <Typography component="h2" variant="h6" sx={{ padding: "1.5rem 0 1rem" }}>Детализация цены</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div>
                                                {
                                                    (function(){
                                                        let difDates = diffDates(searchParams.get('start_date'), searchParams.get('end_date'))
                                                        let value =
                                                            +Math.floor((
                                                                state.property.property.price?.total_cost / difDates
                                                            ) * 100) / 100

                                                        return `${value} ${state.property.property.currency} x ${difDates} ${getNoun(difDates, 'ночь', 'ночи', 'ночей')}`
                                                    }())
                                                }
                                            </div>
                                            <div>{state.property.property.price?.total_cost + ' руб.'}</div>
                                        </Box>
                                        <Divider sx={{ margin: "1.5rem 0" }} />
                                        <Typography component="div" variant="body1">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    fontWeight: "600"
                                                }}
                                            >
                                                <div>Итого ({state.property.property.currency})</div>
                                                <div>{state.property.property.price?.total_cost} руб.</div>
                                            </Box>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Container>

                    <Snackbar open={openAlert === 'success'} autoHideDuration={6000} onClose={() => setOpenAlert('')}>
                        <Alert onClose={() => setOpenAlert('')} severity="success" sx={{ width: '100%' }}>
                            {state.property.property.instant_booking_available ? 'Забронировано!' : 'Ожидайте пока владелец примет заявку'}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openAlert === 'reject'} autoHideDuration={6000} onClose={() => setOpenAlert('')}>
                        <Alert onClose={() => setOpenAlert('')} severity="error" sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>

                    <DialogWindowCodeAuthenticationContainer setVerifyCode={(value: any) => setVerifyCode(value)} open={openDialogWindowCodeAuthentication} handleClose={() => {setIsDisableButton(false); setOpenDialogWindowCodeAuthentication(false)}} setOpenModalWindow={(value: any) => setOpenModalWindow(value)} phone={phone} countryCallingCode={countryCallingCode} />
                    <DialogWindowCodePhoneNumberConfirmContainer setVerifyCode={(value: any) => setVerifyCode(value)} open={openDialogWindowCodePhoneNumberConfirm} handleClose={() => {setIsDisableButton(false); setOpenDialogWindowCodePhoneNumberConfirm(false)}} phone={phone} countryCallingCode={countryCallingCode} />
                    <ModalWindowLogin open={openModalWindow === 'login'} setOpenModalWindow={(value: any) => setOpenModalWindow(value)} phone={phone} />
                    <ModalWindowRegistration verifyCode={verifyCode} open={openModalWindow === 'registration'} setOpenModalWindow={() => {setIsDisableButton(false); setOpenModalWindow('')}} phone={phone} countryCallingCode={countryCallingCode} />
                    <ModalWindowDate open={openModalWindow === 'date'} setOpenModalWindow={(value: any) => setOpenModalWindow(value)} />
                    <ModalWindowGuest open={openModalWindow === 'guest'} setOpenModalWindow={(value: any) => setOpenModalWindow(value)} />
                    <ModalWindowMailChecking open={openModalWindow === 'mailChecking'} mail={mail} setMail={(value: any) => setMail(value)} setOpenModalWindow={(value: any) => setOpenModalWindow(value)} />
                    <ModalWindowMailLogin open={openModalWindow === 'mailLogin'} setOpenModalWindow={(value: any) => setOpenModalWindow(value)} mail={mail} />
                    <ModalWindowMailRegistration open={openModalWindow === 'mailRegistration'} setOpenModalWindow={(value: any) => setOpenModalWindow(value)} mail={mail} />
                    <ModalWindowPasswordRecovery open={openModalWindow === 'passwordRecovery'} mail={mail} setMail={(value: any) => setMail(value)} setOpenModalWindow={(value: any) => setOpenModalWindow(value)} />
                </>
            ) : <SimpleLoader />}
        </>
    )
}