import React from 'react';
import { useEffect } from "react";
import { addDays } from "date-fns";

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import Table from "../Table/table";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { fetchBookingsExtranet } from '@/redux/thunk/booking';

export const Upcoming: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=gte:${dateForRequestFormat(addDays((new Date()), 1))}`}))
            .then(
                (result: any) => {
                    setIsLoaded(true);
                },
                (error: any) => {
                    setError(error);
                    setIsLoaded(true);
                }
            )
    }, [])

    return (
        <>
            {isLoaded ? (
                <>
                    {state.booking.bookings.length !== 0 ? (
                        <Table uploadRequest={() => dispatch(fetchBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=gte:${dateForRequestFormat(addDays((new Date()), 1))}`}))} />
                    ) : (
                        <InfoWindowEmpty firstRow={'У вас нет предстоящих'} secondRow={'бронирований.'}/>
                    )}
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    );
}