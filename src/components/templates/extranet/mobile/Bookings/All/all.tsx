import React from 'react';
import { useEffect } from "react";

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { List } from "../List/list";
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { fetchBookingsExtranet } from '@/redux/thunk/booking';

export const All: React.FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: '', query: ''}))
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
                            uploadRequest={() => dispatch(fetchBookingsExtranet({status: '', query: ''}))}
                        />
                    ) : (
                        <InfoWindowEmpty firstRow={'Нет бронирований'} />
                    )}
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    );
}