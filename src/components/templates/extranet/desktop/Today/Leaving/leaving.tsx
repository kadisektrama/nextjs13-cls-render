import { addDays } from "date-fns";
import React, { useEffect } from "react";

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { fetchBookingsExtranet, fetchAddedBookingsExtranet } from "@/redux/thunk/booking";
import Table from "../Table/table";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Leaving = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:finished', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}&end_date[]=lte:${dateForRequestFormat(addDays((new Date()), 1))}`}))
            .then(() => dispatch(fetchAddedBookingsExtranet({status: 'eq:confirmed', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}&end_date[]=lte:${dateForRequestFormat(addDays((new Date()), 1))}`})))
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
                        <>
                            <Table                              
                                uploadRequest={() =>
                                    dispatch(fetchBookingsExtranet({status: 'eq:finished', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}&end_date[]=lte:${dateForRequestFormat(addDays((new Date()), 1))}`}))
                                        .then(() => dispatch(fetchAddedBookingsExtranet({status: 'eq:confirmed', query: `&end_date[]=gte:${dateForRequestFormat(new Date())}&end_date[]=lte:${dateForRequestFormat(addDays((new Date()), 1))}`})))
                                }
                            />
                        </>
                    ) : (
                        <>
                            <InfoWindowEmpty firstRow={'Нет гостей, выезжающих'} secondRow={'сегодня или завтра.'}/>
                        </>
                    )}
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    );
}