"use client"

import React, { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation";

import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";

import { diffDates, rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchProperty } from "@/redux/thunk/property";
import { fetchCalculatePrice } from "@/redux/thunk/property";
import { fetchBooking } from "@/redux/thunk/booking"

export const Confirmation: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const searchParams = useSearchParams();
    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();

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
                    <Container>
                        <Box sx={{ display: "flex", justifyContent: "space-between", p: "4rem 0" }}>
                            {state.property.property.instant_booking_available ? (
                                <Box sx={{ width: "50%" }}>
                                    <Box sx={{ pb: "3rem" }}>
                                        <Typography component="h1" variant="h4" gutterBottom>
                                            Жильё забронировано! Начинайте готовиться к поездке.
                                        </Typography>
                                        <Typography component="div" variant="body2" color="text.secondary">
                                            Ваше бронирование подтверждено. Мы отправили вам письмо с деталями бронирования на адрес {state.user.user.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ width: "50%" }}>
                                    <Box sx={{ pb: "3rem" }}>
                                        <Typography component="h1" variant="h4" gutterBottom>
                                            Запрос отправлен
                                        </Typography>
                                        <Typography component="div" variant="body2" color="text.secondary">
                                            Ваше бронирование ещё не подтверждено. Вы получите ответ от хозяина в течении 24 часов.
                                        </Typography>
                                        <Typography component="div" variant="body2" color="text.secondary">
                                            Мы отправили вам письмо с деталями бронирования на адрес {state.user.user.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}

                            <Box sx={{ width: "41.6667%" }}>
                                <Card variant="outlined" sx={{ borderRadius: ".75rem" }}>
                                    <CardContent sx={{ padding: "1.5rem" }}>
                                        <Box sx={{ display: "flex", paddingBottom: "1.5rem" }}>
                                            <Box
                                                component="img"
                                                src={state.property.property.photos[0].url}
                                                // src="https://via.placeholder.com/124x106"
                                                alt=""
                                                sx={{
                                                    height: 106,
                                                    width: 124,
                                                    borderRadius: 2
                                                }}
                                            />
                                                <Box sx={{ paddingLeft: ".75rem" }}>
                                                    <Typography component="div" variant="body2" gutterBottom>{state.property.property.name}</Typography>
                                                    <Typography component="div" variant="caption" gutterBottom>{rangeStartDateEndDate(searchParams.get('start_date'), searchParams.get('end_date'))} · {parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0')} {getNoun(parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0'), 'гость', 'гостя', 'гостей')}</Typography>
                                                    <Typography component="div" variant="caption" gutterBottom>
                                                        {(state.property.property.address ? state.property.property.address : '') + ((state.property.property.instant_booking_available && state.property.property.address_supplement) ? (', ' + state.property.property.address_supplement) : '')}
                                                    </Typography>
                                                    {state.property.property.instant_booking_available
                                                        ? <Typography component="div" variant="caption">Код бронирования: {state.booking.booking?.reservation_code}</Typography>
                                                        : ''
                                                    }
                                                </Box>
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
                                            <div>{state.property.property.price.cost + ' руб.'}</div>
                                        </Box>
                                        <Divider sx={{ margin: "1.5rem 0" }} />
                                        <Typography variant="body1">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    fontWeight: "600"
                                                }}
                                            >
                                                <div>Итого ({state.property.property.currency})</div>
                                                <div>{state.property.property.price.cost} руб.</div>
                                            </Box>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Container>
                </>
            ) : <SimpleLoader />}
        </>
    )
}