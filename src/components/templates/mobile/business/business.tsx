'use client'

// Core
import React, { useEffect, useState, useRef } from "react"
import { useParams, useSearchParams } from "next/navigation";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from "next/link";
import Cookies from "js-cookie";

// UI
import Button from '@mui/material/Button';
import { Snackbar } from "@material-ui/core";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Paper from "@mui/material/Paper";
import { Alert, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import 'react-spring-bottom-sheet/dist/style.css';

// Tools
import {
    diffDates,
    rangeStartDateEndDate,
    roundedTime
} from "@/utils/Helpers/Date/date";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import {
    createChatChannel,
    createPropertyFavourite,
    deletePropertyFavourite,
    getGeoInfo,
} from "@/api/commonApi";
import { errorTranslator } from "@/utils/Constants/Error/errorValidator";
import { Map } from "./Map/map";
import { Calendar } from "@/components/Property/Calendar/calendar";
import { Photos } from "./Photos/photos";
import "./business.scss";
import { Amenities } from "./Amenities/amenities";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { ModalWindowChecking } from "./ModalWindowChecking/modalWindowChecking";
import { DialogWindowCodeAuthenticationContainer } from "@/components/Modals/DialogWindowCode/dialogWindowCodeAuthenticationContainer";
import { ModalWindowLogin } from "./Book/Auth/ModalWindowLogin/modalWindowLogin";
import { ModalWindowRegistration } from "./Book/Auth/ModalWindowRegistration/modalWindowRegistration";
import { ModalWindowMailChecking } from "./Book/Auth/ModalWindowMailChecking/modalWindowMailChecking";
import { ModalWindowMailLogin } from "./Book/Auth/ModalWindowMailLogin/modalWindowMailLogin";
import { ModalWindowMailRegistration } from "./Book/Auth/ModalWindowMailRegistration/modalWindowMailRegistration";
import { Reviews } from "./Reviews/reviews";
import { Reviews as PageReviews } from "./Pages/Reviews/reviews";
import { Rules } from "./Rules/rules";
import { ModalWindowPropertyInactiveNotification } from "./modalWindowPropertyInactiveNotification"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchAmenities } from "@/redux/thunk/amenity";
import { fetchCountryRegisters } from "@/redux/thunk/countryRegister";
import { fetchAmenityCategories } from "@/redux/thunk/amenityCategory";
import { fetchProperty } from "@/redux/thunk/property"
import { fetchPropertyTypes } from "@/redux/thunk/propertyType";
import { fetchPropertyFavourites } from '@/redux/thunk/propertyFavourite';

export const Business: React.FC = () => {
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const searchParams = useSearchParams();
    const [countryCallingCode, setCountryCallingCode] = useState('')
    const [phone, setPhone] = useState('')
    const [mail, setMail] = useState('');
    const [verifyCode, setVerifyCode] = useState(false);
    const [geoData, setGeoData] = useState(null);
    const [isDisableButton, setIsDisableButton] = useState(false);
    const [screen, setScreen] = useState('');
    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const token = useState(Cookies.get("token"))

    //TODO
    const [openWindowChecking, setOpenWindowChecking] = useState(false);
    const [openModalWindowLogin, setOpenModalWindowLogin] = useState(false);
    const [openModalWindowRegistration, setOpenModalWindowRegistration] = useState(false);
    const [openDialogWindowCode, setOpenDialogWindowCode] = useState(false);
    const [openWindowMailChecking, setOpenWindowMailChecking] = useState(false);
    const [openWindowMailLogin, setOpenWindowMailLogin] = useState(false);
    const [openWindowMailRegistration, setOpenWindowMailRegistration] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [openAlertReject, setOpenAlertReject] = useState(false);
    let { id } = useParams();
    const textArea = useRef<HTMLInputElement | null>();
    const difDates = (searchParams.get('start_date') && searchParams.get('end_date') !== searchParams.get('start_date')) && diffDates(searchParams.get('start_date'), searchParams.get('end_date'))

    const [statusInactiveNotification, setStatusInactiveNotification] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)

        Promise.all([
            dispatch(fetchProperty(id)),
            getGeoInfo(),
            dispatch(fetchPropertyTypes()),
            Cookies.get('token') && dispatch(fetchPropertyFavourites()),
            dispatch(fetchAmenities('')),
            dispatch(fetchAmenityCategories()),
            dispatch(fetchCountryRegisters()),
        ])
            .then((res) => {
                setStatusInactiveNotification(res[0]?.payload.status !== 'active')
                setGeoData(res[1]);
                setCountryCallingCode(res[1]?.country_calling_code);
                setPhone(res[1]?.country_calling_code)
            })
            .then(
                (result) => {
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    throw new Error('404 Page Not Found');
                }
            )

        if (document.getElementsByClassName('b24-widget-button-wrapper b24-widget-button-position-bottom-right b24-widget-button-visible')[0]) {
            (document.getElementsByClassName('b24-widget-button-wrapper')[0] as HTMLDivElement)?.style.setProperty('bottom', '127px', 'important');
        }

        return function cleanup() {
            if (document.getElementsByClassName('b24-widget-button-wrapper b24-widget-button-position-bottom-right b24-widget-button-visible')[0]) {
                (document.getElementsByClassName('b24-widget-button-wrapper')[0] as HTMLDivElement)?.style.setProperty('bottom', '96px');
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = () => {
        createChatChannel(state.property.property, textArea.current?.value, searchParams.get('start_date'), searchParams.get('end_date'))
            .then(() => {
                setOpenAlertSuccess(errorTranslator('Сообщение отправлено'))
            })
            .catch((error: any) => {
                setOpenAlertReject(errorTranslator(error.message))
            })
        if (textArea.current !== null && textArea.current !== undefined) {
            textArea.current.value = '';
        }
    };

    const handleChangeFavourite = () => {
        if (token) {
            !state.propertyFavourite.propertyFavourites?.message && state.propertyFavourite.propertyFavourites.find((item: any) => item.id === +id) ? deletePropertyFavourite(id) : createPropertyFavourite(id);
            dispatch(fetchPropertyFavourites())
        } else {
            setOpenWindowChecking(true)
        }
    }

    const handleClose = (event: any) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        setOpenAlertReject(false);
        setOpenAlertSuccess(false);
    };

    const handleOpenWindowChecking = () => {
        if (!Cookies.get("token")) {
            setOpenWindowChecking(true);
            textArea.current?.blur()
        }
    };

    if (error) {
        throw new Error('404 Page Not Found');
    }

    return (
        <div style={{ position: 'relative' }}>
            {screen === '' && (
                <>
                    <div style={{ justifyContent: 'space-between', position: 'absolute', top: 0, height: '60px', width: '100%', zIndex: 100, borderRadius: 0, display: 'flex', alignItems: 'center', background: 'transparent', paddingRight: '2%', paddingLeft: '2%' }}>
                        {isLoaded && (
                            <div>
                                <IconButton sx={{ height: '28px', width: '28px', background: 'white !important' }}>
                                    <Link href={`${window.location.pathname.split('/').slice(0, -1).join('/')}/search`} style={{ display: 'flex', alignItems: 'center' }}>
                                        <ArrowBackIosNewIcon sx={{ color: '#000000', height: '18px', width: '18px' }} />
                                    </Link>
                                </IconButton>
                            </div>
                        )}

                        {isLoaded ? (
                            <div>
                                <IconButton aria-label="fingerprint" sx={{ color: 'black',background: 'white !important', height: '28px', width: '28px' }} onClick={() => handleChangeFavourite()}>
                                    {state.propertyFavourite.propertyFavourites && !state.propertyFavourite.propertyFavourites.message && state.propertyFavourite.propertyFavourites.find((item: any) => item.id === +id) ? <FavoriteIcon sx={{ height: '20px', width: '20px' }} /> : <FavoriteBorderIcon sx={{ height: '20px', width: '20px' }} />}
                                </IconButton>
                            </div>
                        ) : ''}
                    </div>

                    <div style={{ paddingBottom: "80px", zIndex: 2 }}>
                        {
                            isLoaded ? (
                                <>
                                    <Photos />
                                    <Box sx={{ p: 3, pt: 2.5 }}>
                                        <Typography
                                            variant="h5"
                                            component="h1"
                                            sx={{ lineHeight: "30px" }}
                                            gutterBottom
                                        >
                                            {state.property.property.name}
                                        </Typography>
                                        <Typography variant="body2" component="div" color="text.secondary">
                                            {`${state.property.property.region.name}, ${state.property.property.address}`}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Typography component="span" variant="h6">
                                                Хозяин: {state.property.property.user?.user_profile.first_name}
                                            </Typography>
                                            <Avatar src={state.property.property.user?.user_profile.photo?.url} sx={{ width: 40, height: 40 }}>{state.property.property.user?.user_profile.first_name[0]}</Avatar>
                                        </Box>

                                        {(state.property.property.guests + state.property.property.additional_guests) + getNoun(state.property.property.guests + state.property.property.additional_guests, ' гость', ' гостя', ' гостей') + ' \u{00B7} '
                                            + state.property.property.rooms_and_spaces.summary.number_of_bedrooms + getNoun(state.property.property.rooms_and_spaces.summary.number_of_bedrooms, ' спальня', ' спальни', ' спален') + ' \u{00B7} '
                                            + state.property.property.rooms_and_spaces.summary.number_of_beds + getNoun(state.property.property.rooms_and_spaces.summary.number_of_beds, ' кровать', ' кровати', ' кроватей') + ' \u{00B7} '
                                            + state.property.property.rooms_and_spaces.summary.number_of_bathrooms + getNoun(state.property.property.rooms_and_spaces.summary.number_of_bathrooms, ' ванная', ' ванные', ' ванных')}
                                    </Box>
                                    <Divider />
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.primary"
                                        sx={{ py: 4, px: 3, whiteSpace: 'pre-line' }}
                                    >
                                        {state.property.property.description}
                                    </Typography>
                                    <Divider />
                                    {state.property.property.amenities.length > 0 && <><Amenities /><Divider /></>}
                                    {state.property.property.instant_booking_available === 1 && (
                                        <>
                                            <div style={{ padding: '24px' }}>
                                                <Typography style={{ display: 'flex' }} gutterBottom><FlashOnRoundedIcon color="disabled" /><span>Мгновенное бронирование</span></Typography>
                                                <Typography variant="body2" component="div">Ваше бронирование будет мгновенно подтверждено. Вам не придётся ожидать подтверждения бронирования от хозяина</Typography>
                                            </div>
                                            <Divider />
                                        </>
                                    )}
                                    <Map />
                                    {state.property.property.rules && <><Divider /><Rules /></>}
                                    <Divider />
                                    <Box sx={{ p: 3 }}><div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}><Calendar month={1} /></div></Box>
                                    <Divider />
                                    {state.property.property.moderatedReviews?.data.scoreCount ? (<><Reviews setScreen={(value: any) => setScreen(value)} /><Divider /></>) : ''}
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar sx={{ minWidth: 64 }}>
                                                <Avatar src={state.property.property.user?.user_profile.photo?.url} sx={{ width: 48, height: 48 }}>{state.property.property.user?.user_profile.first_name[0]}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography component="span" variant="h6">
                                                        Хозяин: {state.property.property.user?.user_profile.first_name}
                                                    </Typography>
                                                }
                                                secondary="На KVARTIRANASUTKI.COM с 2022 г."
                                            />
                                        </ListItem>
                                        {!(state.property.property.user?.answerRate === null || state.property.property.user?.avgAnswerTime === null) && (
                                            <Box sx={{ ml: 2, mb: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}><SmsOutlinedIcon sx={{ marginRight: '5px', height: '20px' }} />{`Частота откликов: ${state.property.property.user?.answerRate}%`}</div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}><AccessTimeIcon sx={{ marginRight: '5px', height: '20px' }} />{`Время отклика: ${roundedTime(state.property.property.user?.avgAnswerTime)}`}</div>
                                            </Box>
                                        )}
                                    </List>
                                    <Box component="form" sx={{ pr: 3, pl: 3, mb: 8 }}>
                                        <Typography variant="h6" component="div">
                                            Есть вопросы? Напишите хозяину
                                        </Typography>
                                        <TextField
                                            name="message"
                                            label="Введите сообщение"
                                            id="message"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            sx={{ my: 3 }}
                                            inputRef={textArea}
                                            onClick={handleOpenWindowChecking}
                                        />
                                        <Button onClick={handleSubmit} variant="outlined" size="large">
                                            Отправить сообщение
                                        </Button>
                                    </Box>
                                    {/*<Divider />
                            <Box sx={{ p: 3 }}>
                                <Typography variant="h6" component="div" color="text.primary">
                                    Правила
                                </Typography>
                            </Box>
                            <Divider />
                            Footer /*/}
                                </>
                            ) : <SimpleLoader />
                        }
                    </div>

                    <Paper
                        style={{
                            position:'fixed',
                            bottom: 0,
                            width: '100%',
                            backgroundColor: 'white',
                            zIndex: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px 24px',
                            borderRadius: 0
                        }}
                        elevation={3}
                    >
                        {isLoaded && state.property.property &&
                            <>
                                <Box>
                                    {(searchParams.get('start_date') && searchParams.get('end_date') !== searchParams.get('start_date')) ? (
                                        <>
                                            <Typography variant="h6" component="span">
                                                {Math.floor((state.property.property.price?.total_cost / diffDates(searchParams.get('start_date'), searchParams.get('end_date'))) * 100) / 100 + ' ' + state.property.property.currency}
                                            </Typography>
                                            / ночь
                                            <Typography variant="body2" component="div">
                                                {rangeStartDateEndDate(searchParams.get('start_date'), searchParams.get('end_date'))}
                                            </Typography>
                                        </>
                                    ) : (
                                        <Typography component="span" variant="h6" color="text.secondary">
                                            Выберите даты
                                        </Typography>
                                    )}
                                </Box>
                                <div>
                                    <Box>
                                        <Button
                                            variant="contained"
                                            sx={{ display: 'relative' }}
                                            //disabled={!(searchParams.get('start_date') && searchParams.get('end_date') !== searchParams.get('start_date'))}
                                            disabled={!(difDates && (state.property.property.rules?.min_stay_days || 0) <= difDates) || state.property.property.status !== 'active'}
                                        >
                                            {state.property.property.instant_booking_available === 1 && <FlashOnRoundedIcon />}
                                            <div>Забронировать</div>
                                            <Link style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} className={'Link'} href={`./book/create?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), adults: parseInt(searchParams.get('adults') || '1') + '', children: parseInt(searchParams.get('children') || '0') + '', infants: parseInt(searchParams.get('infants') || '0') + '', pets: parseInt(searchParams.get('pets') || '0') + ''}).toString()}`}></Link>
                                        </Button>
                                    </Box>
                                </div>
                            </>
                        }
                    </Paper>

                    <Snackbar open={openAlertSuccess} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {openAlertSuccess}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {openAlertReject}
                        </Alert>
                    </Snackbar>
                </>
            )}

            {screen === 'reviews' && (
                <PageReviews setScreen={(value: any) => setScreen(value)} />
            )}

            {isLoaded ? (
                <>
                    <ModalWindowChecking
                        open={openWindowChecking}
                        handleClose={() => setOpenWindowChecking(false)}
                        phone={phone}
                        countryCallingCode={countryCallingCode}
                        geoData={geoData}
                        setOpenWindowLogin={() => setOpenModalWindowLogin(true)}
                        setOpenWindowRegistration={() => setOpenModalWindowRegistration(true)}
                        setOpenWindowMailChecking={() => setOpenWindowMailChecking(true)}
                        setPhone={(value: any) => setPhone(value)}
                        setCountryCallingCode={(value: any) => setCountryCallingCode(value)}
                        setVerifyCode={(value: any) => setVerifyCode(value)}
                    />
                    <DialogWindowCodeAuthenticationContainer setVerifyCode={(value: any) => setVerifyCode(value)} open={openDialogWindowCode} handleClose={() => {setIsDisableButton(false); setOpenDialogWindowCode(false)}} handleOpenRegistrationWindow={() => setOpenModalWindowRegistration(true)} phone={phone} countryCallingCode={countryCallingCode} />
                    <ModalWindowLogin open={openModalWindowLogin} handleClose={() => setOpenModalWindowLogin(false)} phone={phone} />
                    <ModalWindowRegistration verifyCode={verifyCode} open={openModalWindowRegistration} handleClose={() => {setIsDisableButton(false); setOpenModalWindowRegistration(false)}} phone={phone} countryCallingCode={countryCallingCode} />
                    <ModalWindowMailChecking open={openWindowMailChecking} mail={mail} setMail={(value: any) => setMail(value)} handleClose={() => setOpenWindowMailChecking(false)} setOpenWindowMailLogin={(value: any) => setOpenWindowMailLogin(value)} setOpenWindowMailRegistration={(value: any) => setOpenWindowMailRegistration(value)} />
                    <ModalWindowMailLogin open={openWindowMailLogin} handleClose={() => setOpenWindowMailLogin(false)} mail={mail} />
                    {state.property.property.moderatedReviews?.data.scoreCount ? (<ModalWindowMailRegistration open={openWindowMailRegistration} handleClose={() => setOpenWindowMailRegistration(false)} mail={mail} />) : ''}
                </>
            ) : ''}

            <ModalWindowPropertyInactiveNotification isOpen={statusInactiveNotification} setIsOpen={(value: any) => setStatusInactiveNotification(value)} />
        </div>
    )
}


