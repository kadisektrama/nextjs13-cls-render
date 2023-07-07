import React, { useEffect, useState } from 'react';
import { addDays } from "date-fns";

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { List } from "../List/list";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { fetchBookingsExtranet, fetchAddedBookingsExtranet } from "@/redux/thunk/booking";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Leaving: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:finished', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}&end_date[]=lte:${dateForRequestFormat(addDays((new Date()), 1))}`}))
            .then(() => dispatch(fetchAddedBookingsExtranet({status: 'eq:confirmed', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}&end_date[]=lte:${dateForRequestFormat(addDays((new Date()), 1))}`})))
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
                            uploadRequest={() =>
                                dispatch(fetchBookingsExtranet({status: 'eq:finished', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}&end_date[]=lte:${dateForRequestFormat(addDays((new Date()), 1))}`}))
                                    .then(() => dispatch(fetchAddedBookingsExtranet({status: 'eq:confirmed', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}&end_date[]=lte:${dateForRequestFormat(addDays((new Date()), 1))}`})))
                            }
                        />
                    ) : (
                        <InfoWindowEmpty
                            firstRow={'Нет гостей, выезжающих'}
                            secondRow={'сегодня или завтра.'}
                        />
                    )}
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    );
}