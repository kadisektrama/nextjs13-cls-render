import React, { useEffect } from 'react';

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { fetchBookingsExtranet } from "@/redux/thunk/booking";
import { EnhancedTable } from "../Table/table";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

export const Upcoming: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=gte:${dateForRequestFormat(new Date())}`}))
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
                        <EnhancedTable uploadRequest={() => dispatch(fetchBookingsExtranet({status: 'eq:created', query: ''}))}/>
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