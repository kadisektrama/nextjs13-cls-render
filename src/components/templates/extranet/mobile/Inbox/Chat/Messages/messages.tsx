import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import lodash from 'lodash'

import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";

import "./messages.scss";
import { dateForViewDayMonth, rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import { updateBooking } from "@/api/extranet";
import { fetchBookingsExtranet } from '@/redux/thunk/booking';
import { BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';

export const Messages: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const { id } = useParams();
    const [chat] = useState(state.user.chats.find((item: any) => item.id === +id));

    useEffect(() => {
        (document.getElementById("messages") as HTMLDivElement).scrollTo(0, (document.getElementById("messages") as HTMLDivElement).scrollHeight)
    }, [])

    const handleAccept = (id: any) => {
        updateBooking(id, BookingStatuses.confirmed)
            .then(() => dispatch(fetchBookingsExtranet({status: `eq:${BookingStatuses.created}`, query: `&start_date[]=eq:${chat.details.booking.start_date}&end_date[]=eq:${chat.details.booking.end_date}&property_id=eq:${chat.property.id}&user_id=eq:${chat.guest_user.id}`})))
    }

    async function handleReject(id: any) {
        updateBooking(id, BookingStatuses.rejected)
            .then(() => dispatch(fetchBookingsExtranet({status: `eq:${BookingStatuses.created}`, query: `&start_date[]=eq:${chat.details.booking.start_date}&end_date[]=eq:${chat.details.booking.end_date}&property_id=eq:${chat.property.id}&user_id=eq:${chat.guest_user.id}`})))
    }

    return (
        <div id="messages" style={{ height: (window.screen.height - 200 + 'px'), overflow: 'scroll' }}>
            {(state.booking.bookings?.at(0)?.status === BookingStatuses.created) && (
                <>
                    <div>
                        <div>У вас новый запрос на бронирование от {state.booking.bookings[0]?.user.user_profile.first_name}.</div>
                        <div>Жилье по адресу: {`${state.booking.bookings[0]?.property.address} ,${state.booking.bookings[0]?.property?.address_supplement}`} на период {rangeStartDateEndDate(state.booking.bookings[0]?.start_date, state.booking.bookings[0]?.end_date)}</div>
                        <div>Гости: {+state.booking.bookings[0]?.guests}</div>
                        <div>Общая сумма: {state.booking.bookings[0]?.cost} {state.booking.bookings[0]?.property.currency}</div>
                    </div>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', marginRight: '5%', marginLeft: '5%' }}>
                        <Button sx={{ width: '45%', fontSize: "10px", marginTop: "8px" }} variant="outlined" color="success" onClick={() => {handleAccept({id: state.booking.bookings[0].id})}} >Подтвердить</Button>
                        <Button sx={{ width: '45%', fontSize: "10px", marginTop: "8px" }} variant="outlined" color="error" onClick={() => {handleReject({id: state.booking.bookings[0].id})}} >Отклонить</Button>
                    </div>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                </>
            )}
            <div>
                {state.user.chat.map((message: any, index: any) => (
                    <div key={index}>
                        {dateForViewDayMonth(message.created_at) !== dateForViewDayMonth(state.user.chat[index - 1]?.created_at) && (
                            <Divider sx={{ color: '#8b8383', margin: '8px', fontSize: '14px' }}>{dateForViewDayMonth(message.created_at)}</Divider>
                        )}

                        {message.from_user ? (
                            <ChatMsg
                                key={message.id}
                                avatar={message.from_user.user_profile?.photo?.url}
                                side={message.from_user.id === state.user.user.id ? 'right' : 'left'}
                                messages={[
                                    message.message
                                ]}
                            />
                        ) : (
                            <Card variant="outlined" sx={{ borderRadius: 3, margin: '8px 5% 8px 5%' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>{lodash.dropRight(message.message.split(' ')).join(' ')}<span style={{ color: 'white', backgroundColor: '#14a800', fontWeight: 600, width: '28px', height: '28px', borderRadius: '5.5px', padding: '3px', marginLeft: '6px' }}>{message.message.split(' ').at(-1)}</span></div>
                                        <InfoCircleOutlined style={{ margin: '4px 4px 0 0', color: 'rgba(0, 0, 0, 0.12)', fontSize: '24px' }} />
                                    </CardContent>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
