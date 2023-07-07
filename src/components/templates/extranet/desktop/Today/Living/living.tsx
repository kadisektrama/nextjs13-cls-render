import * as React from 'react';
import { useEffect } from "react";

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import Table from "../Table/table";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { fetchBookingsExtranet, fetchAddedBookingsExtranet } from '@/redux/thunk/booking';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';

export const Living: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:finished', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}`}))
            .then(() => dispatch(fetchAddedBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=lte:${dateForRequestFormat(new Date())}&end_date[]=gte:${dateForRequestFormat(new Date())}`})))
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
                        <Table                                
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