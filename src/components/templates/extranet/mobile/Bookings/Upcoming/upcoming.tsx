import React, { useEffect, useState } from 'react';

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { fetchBookingsExtranet } from '@/redux/thunk/booking';
import { List } from "../List/list";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';

export const Upcoming: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=gte:${dateForRequestFormat(new Date())}`}))
            .then(
                () => {
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
                        <List uploadRequest={() => dispatch(fetchBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=gte:${dateForRequestFormat(new Date())}`}))} />
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