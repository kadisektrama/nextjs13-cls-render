import React, { useState } from 'react';

import { Button, Divider } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { ModalWindow } from "./ModalWindow/modalWindow";
import { List as ListMUI } from "@mui/material" ;
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemButton } from "@mui/material";

import { diffDates, rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import { updateBooking } from "@/api/extranet";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { BookingStatuses, BookingStatusesViewExtranet } from "@/utils/Constants/Enums/BookingStatuses";
import { useAppSelector } from '@/redux/hooks/hooks';

export const List: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(false);

    const handleClose = () => setOpen(false);

    const handleOpen = (item: any) => {
        setItem(item);
        setOpen(true);
    }

    const handleAccept = (id: any) => {
        updateBooking(id, 'confirmed');
        props.uploadRequest();
    }

    async function handleReject(id: any) {
        updateBooking(id, 'rejected')
        props.uploadRequest();
    }

    return (
        <>
            <ListMUI>
                {state.booking.bookings.map((item: any) => {
                    return (
                        <>
                            <div>
                                <ListItem disablePadding onClick={() => {handleOpen(item)}}>
                                    <ListItemButton sx={{ px: 0 }}>
                                        <ListItemText
                                            primary={
                                                <div>
                                                    <span style={{ color: item.status === BookingStatuses.finished ? 'green' : 'unset' }}>{BookingStatusesViewExtranet[item.status as unknown as keyof typeof BookingStatusesViewExtranet]}</span><span>{' · ' + (item.user.user_profile ? item.user.user_profile?.first_name : 'Нет имени')}</span>
                                                </div>
                                            }
                                            secondary={
                                                <div>
                                                    <div>{item.property.name}</div>
                                                    <div>{rangeStartDateEndDate(item.start_date, item.end_date)}</div>
                                                    <div>
                                                        {+item.details?.guests?.adults + +item.details?.guests?.children + ' ' + getNoun(+item.details?.guests?.adults + +item.details?.guests?.children, 'взрослый', 'взрослых', 'взрослых')}
                                                        <>&#183;</>
                                                        { ` ${diffDates(item.start_date, item.end_date)} ${getNoun(+diffDates(item.start_date, item.end_date), 'ночь', 'ночи', 'ночей')} `}
                                                        <>&#183;</>
                                                        {' ' + item.total_cost + ' ' + item.property.currency}
                                                    </div>
                                                </div>
                                            }
                                        />
                                        <KeyboardArrowRightOutlinedIcon />
                                    </ListItemButton>
                                </ListItem>
                                <div>
                                    {item.status === BookingStatuses.created && (
                                        <Button sx={{ fontSize: "10px", marginTop: "8px" }} variant="text" color="success" onClick={() => {handleAccept({id: item.id})}} >Подтвердить</Button>
                                    )}
                                    {(item.status === BookingStatuses.created) && (
                                        <Button sx={{ fontSize: "10px", marginTop: "8px" }} variant="text" color="error" onClick={() => {handleReject({id: item.id})}} >Отклонить</Button>
                                    )}
                                </div>
                                <Divider component="li" />
                            </div>
                        </>
                    )
                })}
            </ListMUI>

            <ModalWindow open={open} item={item}  handleClose={handleClose} />
        </>
    );
}