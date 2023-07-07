import React, { useEffect } from 'react';

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { EnhancedTable } from "../Table/table";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { fetchBookingsExtranet } from "@/redux/thunk/booking";
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';

export const Completed: React.FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:finished', query: `&end_date[]=lte:${dateForRequestFormat(new Date())}`}))
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
                        <EnhancedTable uploadRequest={() => dispatch(fetchBookingsExtranet({status: 'eq:finished', query: `&end_date[]=lte:${dateForRequestFormat(new Date())}`}))}/>
                    ) : (
                        <InfoWindowEmpty firstRow={'Нет завершенных бронирований'} />
                    )}
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    );
}