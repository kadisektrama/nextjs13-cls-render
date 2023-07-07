import { addDays } from "date-fns";
import React, { useEffect } from "react";

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { fetchBookingsExtranet } from '@/redux/thunk/booking';
import Table from "../Table/table";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";

export const Arriving: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=gte:${dateForRequestFormat(new Date())}&start_date[]=lte:${dateForRequestFormat(addDays((new Date()), 1))}`}))
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
                        <Table  uploadRequest={() => dispatch(fetchBookingsExtranet({status: 'eq:confirmed', query: `&start_date[]=gte:${dateForRequestFormat(new Date())}&start_date[]=lte:${dateForRequestFormat(addDays((new Date()), 1))}`}))} />
                    ) : (
                        <InfoWindowEmpty firstRow={'Нет гостей, прибывающих'} secondRow={'сегодня или завтра.'}/>
                    )}
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    );
}