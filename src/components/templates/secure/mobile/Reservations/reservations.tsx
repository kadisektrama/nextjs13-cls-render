import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";

import { BusinessCard } from "./Cards/card";
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses";
import Alert from "@mui/material/Alert";
import { fetchBookingsSecure } from '@/redux/thunk/booking';
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

export const Reservations: React.FC = () => {
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
                    //setError(error);
                    setIsLoaded(false);
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
        <AccountHeader name={'Поездки'}>
            <Container>
                {isLoaded ? (
                    <div>
                        {state.booking.bookings.length ? (
                            <Stack spacing={3} sx={{ paddingBottom: '70px' }}>
                                {recurringBookingDatesSum > 1 ? (
                                    <Alert severity="warning">Сейчас у вас {recurringBookingDatesSum} {recurringBookingDatesSum > 4 ? 'бронирований' : 'бронирования'} жилья на одну и ту же дату.</Alert>
                                ) : '' }
                                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 3 }}>Предстоящие</Typography>
                                {state.booking.bookings && state.booking.bookings.filter((item: any) => item.status === BookingStatuses.created || item.status === BookingStatuses.confirmed).map((business: any, index: any) => (
                                    <div key={index}>
                                        <BusinessCard key={business.id} { ...business } />
                                    </div>
                                ))}
                                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 3 }}>Отмененные</Typography>
                                {state.booking.bookings && state.booking.bookings.filter((item: any) => item.status === BookingStatuses.canceled || item.status === BookingStatuses.rejected || item.status === BookingStatuses.failed).map((business: any, index: any) => (
                                    <div key={index}>
                                        <BusinessCard key={business.id} { ...business } />
                                    </div>
                                ))}
                                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 3 }}>Состоявшиеся</Typography>
                                {state.booking.bookings && state.booking.bookings.filter((item: any) => item.status === BookingStatuses.finished).map((business: any, index: any) => (
                                    <div key={index}>
                                        <BusinessCard key={business.id} { ...business } />
                                    </div>
                                ))}
                            </Stack>
                        ) : (
                            <Box sx={{ p: 3 }}>
                                <InfoWindowEmpty firstRow={'Нет бронирований'} />
                            </Box>
                        )
                        }
                    </div>
                ) : (
                    <SimpleLoader />
                )}
            </Container>
        </AccountHeader>
    );
}
