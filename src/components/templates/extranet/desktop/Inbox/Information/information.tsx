import React from "react";
import { useParams } from "next/navigation";
import { Button, Divider, Typography } from "@mui/material";

import { rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import { useEffect } from "react";
import { getBookingRequests, updateBooking } from "@/api/extranet";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchBookingsExtranet } from "@/redux/thunk/booking";

export const Information: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState<any>(false);
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:created', query: `&start_date[]=eq:${state.user.chat?.details.booking.start_date}&end_date[]=eq:${state.user.chat?.details.booking.end_date}&property_id=eq:${state.user.chat?.property.id}&user_id=eq:${state.user.chat?.guest_user.id}`}))
            .then(() => setIsLoaded(true))
            .catch((err: Error) => {
                if (err.message === 'Поле property id должно быть целым числом. (and 4 more errors)') {
                    setError('403 forbidden ')
                } else {
                    setError('404 page not founded')
                }
            })
    },[id])

    const handleAccept = (id: any) => {
        updateBooking(id, 'confirmed')
            .then(() => dispatch(fetchBookingsExtranet({status: 'eq:created', query: `&start_date[]=eq:${state.user.chat?.details.booking.start_date}&end_date[]=eq:${state.user.chat?.details.booking.end_date}&property_id=eq:${state.user.chat?.property.id}&user_id=eq:${state.user.chat?.guest_user.id}`})))
    }

    async function handleReject(id: any) {
        updateBooking(id, 'rejected')
            .then(() => dispatch(fetchBookingsExtranet({status: 'eq:created', query: `&start_date[]=eq:${state.user.chat?.details.booking.start_date}&end_date[]=eq:${state.user.chat?.details.booking.end_date}&property_id=eq:${state.user.chat?.property.id}&user_id=eq:${state.user.chat?.guest_user.id}`})))
    }

    if (error) {
        throw new Error(error);
    }

    return(
        <>
            {isLoaded ? (
                <>
                    <div>Информация о бронировании</div>
                    <div>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {(state.booking.bookings?.at(0)?.status === BookingStatuses.created) ? (
                                <>
                                    <div>У вас новый запрос на бронирование от {state.booking.bookings[0]?.user.user_profile.first_name}.</div>
                                    <div>Жилье по адресу: {`${state.booking.bookings[0]?.property.address} ,${state.booking.bookings[0]?.property?.address_supplement}`} на период {rangeStartDateEndDate(state.booking.bookings[0]?.start_date, state.booking.bookings[0]?.end_date)}</div>
                                    <div>Гости: {state.booking.bookings[0]?.guests}</div>
                                    <div>Общая сумма: {state.booking.bookings[0]?.cost} {state.booking.bookings[0]?.property.currency}</div>
                                </>
                            ) : (
                                <>
                                    <div>Даты: {rangeStartDateEndDate(state.user.chat.details.booking.start_date, state.user.chat.details.booking.end_date)}</div>
                                    <div>Гости: {+state.user.chat.details.booking.guests.adults + (state.user.chat.details.booking.guests.children ? +state.user.chat.details.booking.guests.children : 0)}</div>
                                </>
                            )}
                        </Typography>

                        {(state.booking.bookings?.at(0)?.status === BookingStatuses.created) && (
                            <>
                                <Divider />
                                <Button sx={{ fontSize: "10px", marginTop: "8px" }} variant="outlined" color="success" onClick={() => {handleAccept({id: state.booking.bookings[0].id})}} >Подтвердить</Button>
                                <Button sx={{ fontSize: "10px", marginTop: "8px" }} variant="outlined" color="error" onClick={() => {handleReject({id: state.booking.bookings[0].id})}} >Отклонить</Button>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    )
}