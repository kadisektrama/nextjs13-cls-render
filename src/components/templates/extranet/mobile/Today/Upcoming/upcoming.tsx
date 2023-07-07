import React, { useEffect, useState } from 'react';
import { addDays } from "date-fns";

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { List } from "../List/list";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { fetchBookingsExtranet } from '@/redux/thunk/booking';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';

export const Upcoming: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=gte:${dateForRequestFormat(addDays((new Date()), 1))}`}))
            .then(
                () => {
                    setIsLoaded(true);
                },
                (error) => {
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
                        <List 
                            uploadRequset={() => dispatch(fetchBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=gte:${dateForRequestFormat(addDays((new Date()), 1))}`}))}
                        />
                    ) : (
                        <InfoWindowEmpty
                            firstRow={'У вас нет предстоящих'}
                            secondRow={'бронирований.'}
                        />
                    )}
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    );
}