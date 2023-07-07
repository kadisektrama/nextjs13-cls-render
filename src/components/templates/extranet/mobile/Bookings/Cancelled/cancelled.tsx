import React, { useEffect } from 'react';

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { List } from "../List/list";
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { fetchBookingsExtranet, fetchAddedBookingsExtranet } from '@/redux/thunk/booking';

export const Cancelled: React.FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:canceled', query: ''}))
                                        .then(() => dispatch(fetchAddedBookingsExtranet({status: 'eq:rejected', query: ''})))
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
                        <List                                
                            uploadRequest={() =>
                                dispatch(fetchBookingsExtranet({status: 'eq:canceled', query: ''}))
                                    .then(() => dispatch(fetchAddedBookingsExtranet({status: 'eq:rejected', query: ''})))
                            }
                        />
                    ) : (
                        <InfoWindowEmpty firstRow={'Нет отмененных бронирований'} />
                    )}
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    );
}