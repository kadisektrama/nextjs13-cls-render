import * as React from 'react';
import { useEffect, useState } from "react";
import _ from "lodash";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { Stack } from "@mui/material";

import { fetchBookingsSecure } from '@/redux/thunk/booking';
import { BusinessCard } from "./Cards/card";
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

export const Reservations: React.FC = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)

    useEffect(() => {
        dispatch(fetchBookingsSecure())
            .then(
                () => {
                    setIsLoaded(true);
                },
                () => {
                    setError(error);
                    setIsLoaded(true);
                }
            );
    }, [])
   
    let recurringBookingDates = isLoaded && state.booking.bookings
        .filter((item: any) => item.status === BookingStatuses.created || item.status === BookingStatuses.confirmed)
        .map((bookingDate: any) => ({'startDate' : bookingDate.start_date, 'endDate' : bookingDate.end_date}))
        .reduce((acc: any, el: any)  => {
            acc[el.startDate + ' - ' + el.endDate] = (acc[el.startDate + ' - ' + el.endDate] || 0) + 1;
            return acc;
        }, {})

    let recurringBookingDatesSum =  _.sum(_.without(_.values(recurringBookingDates), 1));

    return (
        <Container>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: "calc(2/3*100%)",
                    minWidth: "768px",
                }}
            >
                <Typography variant="h5" component="h1" className="MuiTypography-captain">Поездки</Typography>
                {isLoaded ?
                    (
                        <>
                            {!error
                                ? (state.booking.bookings.length
                                    ? (<Stack spacing={3}>
                                        {recurringBookingDatesSum > 1 ? (
                                            <Alert severity="warning">Сейчас у вас {recurringBookingDatesSum} {recurringBookingDatesSum > 4 ? 'бронирований' : 'бронирования'} жилья на одну и ту же дату.</Alert>
                                        ) : '' }
                                        <Typography variant="h6" component="h2" gutterBottom>Предстоящие</Typography>
                                        {state.booking.bookings && state.booking.bookings.filter((item: any) => item.status === BookingStatuses.created || item.status === BookingStatuses.confirmed).map((business: any) => (
                                            <BusinessCard key={business.id} { ...business } />
                                        ))}
                                        <Typography variant="h6" component="h2" gutterBottom>Отмененные</Typography>
                                        {state.booking.bookings && state.booking.bookings.filter((item: any) => item.status === BookingStatuses.canceled || item.status === BookingStatuses.rejected || item.status === BookingStatuses.failed).map((business: any) => (
                                            <BusinessCard key={business.id} { ...business } />
                                        ))}
                                        <Typography variant="h6" component="h2" gutterBottom>Состоявшиеся</Typography>
                                        {state.booking.bookings && state.booking.bookings.filter((item: any) => item.status === BookingStatuses.finished).map((business: any) => (
                                            <BusinessCard key={business.id} { ...business } />
                                        ))}
                                    </Stack>)
                                    : (<InfoWindowEmpty firstRow={'Нет бронирований'} />))
                                : <div>Невозможно загрузить</div>
                            }
                        </>
                    ) : (
                        <SimpleLoader />
                    )
                }
            </Box>
        </Container>
    );
}
