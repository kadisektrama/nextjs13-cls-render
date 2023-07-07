import React, { useEffect, useState } from "react"
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from 'next/link';
import Cookies from "js-cookie";
import { addDays } from "date-fns";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { NavigateBefore } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { Alert, Button, Divider } from "@mui/material";
import { Snackbar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { CircularProgress } from "@material-ui/core";
import 'react-spring-bottom-sheet/dist/style.css';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { ModalWindowRegistration } from "./Auth/ModalWindowRegistration/modalWindowRegistration";
import { ModalWindowLogin } from "./Auth/ModalWindowLogin/modalWindowLogin";
import { ModalWindowMailChecking } from "./Auth/ModalWindowMailChecking/modalWindowMailChecking";
import { ModalWindowMailLogin } from "./Auth/ModalWindowMailLogin/modalWindowMailLogin";
import { ModalWindowMailRegistration } from "./Auth/ModalWindowMailRegistration/modalWindowMailRegistration";
import { ModalWindowGuest } from "./ModalWindowGuest/modalWindowGuest";
import { ModalWindowDate } from "./ModalWindowDate/modalWindowDate";
import { setBooking } from "@/api/basicApi";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import {
    getCountryRegisters,
    getGeoInfo,
    getPropertyTypes,
    getUser,
    getUserExists,
    sendVerifyCode
} from "@/api/commonApi";
import { dateForRequestFormat, diffDates, rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { DialogWindowCodePhoneNumberConfirmContainer } from "@/components/Modals/DialogWindowCode/dialogWindowCodePhoneNumberСonfirmContainer";
import { DialogWindowCodeAuthenticationContainer } from "@/components/Modals/DialogWindowCode/dialogWindowCodeAuthenticationContainer";
import { ModalWindowPasswordRecovery } from "./Auth/ModalWindowPasswordRecovery/modalWindowPasswordRecovery";
import { errorBookingTranslator, errorAuthCheckingTranslator } from "@/utils/Constants/Error/errorValidator";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchProperty } from "@/redux/thunk/property";
import { fetchPropertyTypes } from "@/redux/thunk/propertyType";
import { fetchCountryRegisters } from "@/redux/thunk/countryRegister";
import { fetchCalculatePrice } from "@/redux/thunk/property";
import { fetchUser } from "@/redux/thunk/user";

export const Book: React.FC = () => {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const searchParams = useSearchParams();
    const [countryCallingCode, setCountryCallingCode] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [verifyCode, setVerifyCode] = useState(false);
    const [geoData, setGeoData] = useState<any>(null);
    const [isDisableButton, setIsDisableButton] = useState(false);

    const [openAlert, setOpenAlert] = useState('');
    const [openModalWindow, setOpenModalWindow] = useState('')
    const [openDialogWindowCodeAuthentication, setOpenDialogWindowCodeAuthentication] = useState(false);
    const [openDialogWindowCodePhoneNumberConfirm, setOpenDialogWindowCodePhoneNumberConfirm] = useState(false);

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
            Cookies.get('token') && dispatch(fetchUser()),
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
            searchParams.get('pets') || 0)
            .then(() => {
                setOpenAlert('success')
                return router.push(`${pathname}/confirmation?${new URLSearchParams(Object.fromEntries(searchParams || [])).toString()}`);
            })
            .catch((error) => {
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

    return (
        <div>
            {isLoaded ? (
                <>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "normal",
                        //padding: "4rem 0 3rem",
                        alignItems: "center",
                        pt: '2rem',
                        pb: '2rem',
                    }}>
                        <Link href={pathname}>
                            <IconButton sx={{ marginRight: "1rem" }} aria-label="navigate before">
                                <NavigateBefore />
                            </IconButton>
                        </Link>
                        <Typography component="h1" variant="h5">
                            {state.property.property.instant_booking_available ? 'Забронировать' : 'Запрос на бронирование'}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", padding: "0 1.5rem 1.5rem" }}>
                        <Box
                            component="img"
                            src={state.property.property.photos[0].url}
                            alt=""
                            sx={{
                                height: 96,
                                width: 126,
                                borderRadius: 2
                            }}
                        />
                        <Typography component="div" variant="body2" sx={{ pl: ".75rem" }}>{state.property.property.name}</Typography>
                    </Box>
                    <Divider />
                    <Typography component="h2" variant="h6" sx={{ p: "1.5rem 1.5rem 1rem" }}>Ваша поездка</Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        p: "0 1.5rem 1.5rem"
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
                        p: "0 1.5rem 1.5rem"
                    }}>
                        <div>
                            <Typography component="h3" variant="subtitle1">Гости</Typography>
                            <div>{parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0')} {getNoun(parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0'), 'гость', 'гостя', 'гостей')}</div>
                        </div>
                        <Button variant="text" onClick={() => setOpenModalWindow('guest')}>Изменить</Button>
                    </Box>
                    <Divider />
                    {/*<Typography component="h2" variant="h6" sx={{ p: "1.5rem" }}>Варианты оплаты</Typography>*/}
                    {/*<Divider />*/}
                    <Typography component="h2" variant="h6" sx={{ p: "1.5rem 1.5rem 1rem" }}>Детализация цены</Typography>
                    <Box sx={{ p: "0 1.5rem 1.5rem" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                        <Typography
                            component="div"
                            variant="body1"
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "600",
                                mt: "1rem"
                            }}
                        >
                            <div>Итого (BYN)</div>
                            <div>{state.property.property.price?.total_cost} руб.</div>
                        </Typography>
                    </Box>
                    {/*<Divider />
                    <Box sx={{ p: "1.5rem" }}>
                        <Typography component="h2" variant="h6" sx={{ pb: "1rem" }}>Правила отмены</Typography>
                        <div>Бесплатная отмена до 29 мар.</div>
                    </Box>*/}

                    {
                        !Cookies.get('token') ? (
                            <>
                                <Divider />
                                <Typography component="h2" variant="h6" sx={{ p: "2rem 1.5rem 1rem" }}>
                                    Чтобы оформить бронирование, войдите или зарегистрируйтесь
                                </Typography>
                                <Box
                                    component="form"
                                    onSubmit={(e) => handleSubmitAuthentication(e)}
                                    sx={{ display: 'flex', flexDirection: 'column', p: "0 1.5rem 1.5rem" }}
                                >
                                    <TextField
                                        margin="normal"
                                        select
                                        required
                                        fullWidth
                                        defaultValue={state.countryRegister.countryRegisters.findIndex((register: any) => register.country_calling_code === geoData.country_calling_code)}
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

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
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
                                        <Typography component="h2" variant="h6" sx={{ p: "2rem 1.5rem 1rem" }}>
                                            Чтобы оформить бронирование, введите ваш номер телефона
                                        </Typography>

                                        <Box
                                            component="form"
                                            onSubmit={(e) => handleSubmitPhoneNumberConfirm(e)}
                                            sx={{ display: 'flex', flexDirection: 'column', p: "0 1.5rem 1.5rem" }}
                                        >
                                            <TextField
                                                margin="normal"
                                                select
                                                required
                                                fullWidth
                                                defaultValue={state.countryRegister.countryRegisters.findIndex((register: any) => register.country_calling_code === geoData.country_calling_code)}
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

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                {isDisableButton ? <CircularProgress size={30} color={"green" as "inherit"} /> : 'Продолжить'}
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        {!state.property.property.instant_booking_available ? (
                                            <>
                                                <Divider />
                                                <Typography component="div" variant="caption" sx={{ p: "1.5rem" }}>
                                                    Бронирование будет подтверждено, когда хозяин примет запрос (в течение 24 часов). На ваш e-mail придет письмо с подтверждением, а также вам будет доступен номер телефона хозяина в личном кабинете.
                                                </Typography>
                                            </>
                                        ) : ("")}

                                        <Divider />
                                        <Typography component="div" variant="caption" sx={{ p: "1.5rem 1.5rem 0" }}>
                                            Нажимая кнопку ниже, я соглашаюсь с Правилами бронирования, установленными kvartiranasutki.com в отношении данного бронирования.
                                        </Typography>

                                        {
                                            state.property.property.instant_booking_available ? (
                                                <Box sx={{ p: "1.5rem" }}>
                                                    <Button
                                                        variant="contained"
                                                        size="large"
                                                        sx={{ width: "100%" }}
                                                        onClick={() => book()}
                                                    >
                                                        Забронировать
                                                    </Button>
                                                </Box>
                                            ) : (
                                                <Box sx={{ p: "1.5rem" }}>
                                                    <Button
                                                        variant="contained"
                                                        size="large"
                                                        sx={{ width: "100%" }}
                                                        onClick={() => book()}
                                                    >
                                                        <div>Запрос на бронирование</div>
                                                    </Button>
                                                </Box>
                                            )
                                        }
                                    </>
                                )}
                            </>
                        )
                    }

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
            ) : (
                <SimpleLoader />
            )}
        </div>
    )
}

export default Book