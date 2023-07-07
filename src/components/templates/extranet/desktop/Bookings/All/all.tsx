import React, { useEffect } from 'react';

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { EnhancedTable } from "../Table/table";
import { fetchBookingsExtranet } from "@/redux/thunk/booking";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

export const All: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [_, forceUpdate] = React.useReducer((x) => x + 1, 0)

    useEffect(() => {
        Promise.all([
            dispatch(fetchBookingsExtranet({status: '', query: ''}))
        ])
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
                        <EnhancedTable                                
                            uploadRequest={() =>dispatch(fetchBookingsExtranet({status: '', query: ''}))}
                            forceUpdate={() => forceUpdate}
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