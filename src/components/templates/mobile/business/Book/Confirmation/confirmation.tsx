import React, { useEffect, useState } from "react"
import { useSearchParams, useParams } from "next/navigation";

import Typography from "@mui/material/Typography";
import { Button} from "@mui/material";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import 'react-spring-bottom-sheet/dist/style.css';

import { ModalMessageDialog } from "./MessageDialog/messageDialog";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchProperty } from "@/redux/thunk/property";
import { fetchCalculatePrice } from "@/redux/thunk/property";
import { fetchBooking } from "@/redux/thunk/booking"

export const Confirmation: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const searchParams = useSearchParams();
    const [openModalMessageDialog, setOpenModalMessageDialog] = useState(false);
    const property = useAppSelector(state => state.property.property)
    const booking = useAppSelector(state => state.booking.booking)
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    let { id } = useParams();

    useEffect(() => {
        //window.ym(90010721, 'reachGoal', 'BOOKED_OR_REQUESTED_TO_BOOK')

        Promise.all([
            dispatch(fetchProperty(id)),
            dispatch(fetchBooking({status: 'eq:confirmed', customParams: `&limit=1&sort=-created_at&property_id=eq:${id}&start_date[]=eq:${searchParams.get('start_date')}&end_date[]=eq:${searchParams.get('end_date')}`}))
        ])
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {isLoaded ? (
                    <>
                        {property.instant_booking_available ? (
                            <Box sx={{ padding: "2rem 1.5rem 1.5rem" }}>
                                <Typography component="h1" variant="h5" gutterBottom>
                                    Жильё забронировано! Начинайте готовиться к поездке.
                                </Typography>
                                <Typography component="div" variant="body2" color="text.secondary">
                                    Ваше бронирование подтверждено. Мы отправили вам письмо с деталями бронирования на адрес {user.email}
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ padding: "2rem 1.5rem 1.5rem" }}>
                                <Typography component="h1" variant="h5" gutterBottom>
                                    Запрос отправлен
                                </Typography>
                                <Typography component="div" variant="body2" color="text.secondary">
                                    Ваше бронирование ещё не подтверждено. Вы получите ответ от хозяина в течении 24 часов.
                                </Typography>
                            </Box>
                        )}

                        <Box sx={{ pt: "56.25%", mx: "1.5rem", position: "relative" }}>
                            <Box
                                component="div"
                                sx={{
                                    borderRadius: 2,
                                    backgroundImage: 'url(' + property.photos[0].url + ')',
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    position: "absolute"
                                }}
                            />
                        </Box>
                        <Box sx={{ p: "1rem 1.5rem", display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <Typography component="div" variant="body2">{property.name}</Typography>
                                <Typography component="div" variant="caption">
                                    Хозяин: {property.user?.user_profile?.first_name}
                                </Typography>
                            </div>
                            <Avatar src={property.user?.user_profile.photo?.url} sx={{ width: 48, height: 48 }}>{property.user?.user_profile?.first_name[0]}</Avatar>
                        </Box>
                        <Divider variant="middle" />
                        <Box sx={{ p: "1rem 1.5rem"}}>
                            <Typography component="div" variant="body2" sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>{new Date(searchParams.get('start_date') || new Date()).toLocaleDateString("ru", { weekday: 'long' })},</div>
                                    <div>{new Date(searchParams.get('end_date') || new Date()).toLocaleDateString("ru", { weekday: 'long' })},</div>
                            </Typography>
                            <Typography component="div" variant="body1" sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    {
                                        new Date(searchParams.get('start_date') || new Date()).toLocaleDateString("ru", { month: 'short' }) + ' ' +
                                        new Date(searchParams.get('start_date') || new Date()).toLocaleDateString("ru", { day: '2-digit' }) + ', ' +
                                        new Date(searchParams.get('start_date') || new Date()).toLocaleDateString("ru", { year: 'numeric' })
                                    }
                                </div>
                                <div>
                                    {
                                        new Date(searchParams.get('end_date') || new Date()).toLocaleDateString("ru", { month: 'short' }) + ' ' +
                                        new Date(searchParams.get('end_date') || new Date()).toLocaleDateString("ru", { day: '2-digit' }) + ', ' +
                                        new Date(searchParams.get('end_date') || new Date()).toLocaleDateString("ru", { year: 'numeric' })
                                    }
                                </div>
                            </Typography>
                            <Typography component="div" variant="caption" sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Заезд в любое время после 14:00</div>
                                    <div>Выезд до 12:00</div>
                            </Typography>
                            <Box></Box>
                        </Box>
                        <Divider variant="middle" />
                        <Box sx={{ p: "1rem 1.5rem"}}>
                            <Typography component="div" variant="body2">Адрес</Typography>
                            <Typography component="div" variant="caption">
                                {(property.address ? property.address : '') + ((property.instant_booking_available && property.address_supplement) ? (', ' + property.address_supplement) : '')} {/*{props.property.region.parent.parent.name}*/}
                            </Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box sx={{ p: "1rem 1.5rem"}}>
                            <Typography component="div" variant="body2">Гости</Typography>
                            <Typography component="div" variant="caption">
                                {parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0')}
                            </Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box sx={{ p: "1rem 1.5rem"}}>
                            <Typography component="div" variant="body2">Стоимость</Typography>
                            <Typography component="div" variant="caption">
                                {property.price?.total_cost + ' ' + property.currency}
                            </Typography>
                        </Box>
                        {property.instant_booking_available ? (
                                <>
                                    <Divider variant="middle" />
                                    <Typography
                                        component="div"
                                        variant="body2"
                                        sx={{ p: "1rem 1.5rem", display: "flex", justifyContent: "space-between" }}
                                    >
                                        <div>Код бронирования</div>
                                        <div>{booking?.reservation_code}</div>
                                    </Typography>
                                </>
                            ) : ''
                        }
                        <Divider variant="middle" />
                        <Box sx={{ p: "1rem 1.5rem"}}>
                            <Typography component="div" variant="body2">
                                Хозяин: {property.user?.user_profile?.first_name}
                            </Typography>
                            <Typography component="div" variant="caption">
                                Свяжитесь с хозяином, чтобы согласовать время прибытия и обмена ключами.
                            </Typography>
                            <Button variant="text" size="small" onClick={() => setOpenModalMessageDialog(true)}>Написать хозяину</Button>
                            {(property.instant_booking_available && booking?.property.phone) ? (
                                <Button variant="text" size="small" sx={{ position: 'relative' }}>
                                    {booking?.property.phone}
                                    <a href={`tel:${booking?.property.phone}`} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}></a>
                                </Button>
                                ) : ''
                            }
                        </Box>
                        {/*<Divider variant="middle" />
                        <Box sx={{ p: "1rem 1.5rem"}}>
                            <Typography component="div" variant="body2">
                                Поддержка клиентов
                            </Typography>
                            <Typography component="div" variant="caption">
                                Обратитесь в нашу службу поддержки.
                            </Typography>
                            <Button variant="text" size="small">Посетить справочный центр</Button>
                            <Button variant="text" size="small">Связаться с KVARTIRANASUTKI.COM</Button>
                        </Box>*/}
                        <Divider variant="middle" />
                        <Box sx={{ p: "1.5rem 1.5rem" }}>
                            <Button variant="contained" sx={{ width: "100%" }} onClick={() => window.location = `${window.location.protocol}//secure.${window.location.host}/reservations` as unknown as Location}>
                                <span>Посмотреть Мои бронирования</span>
                            </Button>
                        </Box>

                        <ModalMessageDialog open={openModalMessageDialog} handleClose={() => setOpenModalMessageDialog(false)} />
                    </>
                ) : <SimpleLoader />
            }
        </>
    )
}
