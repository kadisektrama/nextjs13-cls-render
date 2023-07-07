import React, { useEffect, useState } from 'react';

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { List } from "../List/list";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { fetchBookingsExtranet, fetchAddedBookingsExtranet } from "@/redux/thunk/booking";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

export const Living: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:finished', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}`}))
            .then(() => dispatch(fetchAddedBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=lte:${dateForRequestFormat(new Date())}&end_date[]=gte:${dateForRequestFormat(new Date())}`})))
            .then(
                (result) => {
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
                            uploadRequest={() =>
                                dispatch(fetchBookingsExtranet({status: 'eq:finished', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}`}))
                                    .then(() => dispatch(fetchAddedBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=lte:${dateForRequestFormat(new Date())}&end_date[]=gte:${dateForRequestFormat(new Date())}`})))
                            }
                        />
                    ) : (
                        <InfoWindowEmpty firstRow={'Сейчас у вас нет гостей.'} />
                    )}
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    );
}