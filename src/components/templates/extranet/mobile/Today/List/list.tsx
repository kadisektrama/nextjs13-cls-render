import React, { useState } from 'react';

import { Divider } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import { diffDates } from "@/utils/Helpers/Date/date";
import { ModalWindow } from "./ModalWindow/modalWindow";
import { getNoun } from "@/utils/Helpers/Translator/translator"
import { BookingStatusesViewExtranet } from "@/utils/Constants/Enums/BookingStatuses";
import { useAppSelector } from "@/redux/hooks/hooks";

export const List: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(false);

    const handleClose = () => setOpen(false);

    const handleOpen = (item: any) => {
        setItem(item);
        setOpen(true);
    }

    return (
        <>
            {state.booking.bookings.map((item: any) => {
                return (
                    <React.Fragment key={item.id}>
                        <div onClick={() => {handleOpen(item)}}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ fontSize: '18px', color: 'black' }}>{BookingStatusesViewExtranet[item.status as unknown as keyof typeof BookingStatusesViewExtranet]} &#183; {item.property.user.user_profile.first_name}</div>
                                <KeyboardArrowRightOutlinedIcon />
                            </div>

                            <div style={{ fontSize: '14px', color: "#6b6b6b" }}>
                                <div>{item.property.name}</div>
                                <div>{`${item.start_date} - ${item.end_date} (${diffDates(item.start_date, item.end_date)} ${getNoun(+diffDates(item.start_date, item.end_date), 'ночь', 'ночи', 'ночей')})`}</div>
                                <div>{`${+item.details?.guests.adults + +item.details?.guests.children} ${getNoun(+item.details?.guests?.adults + +item.details?.guests?.children, 'взрослый', 'взрослых', 'взрослых')} `}<>&#183;</>{' ' + item.total_cost + ' ' + item.property.currency}</div>
                            </div>
                        </div>
                        <Divider sx={{ marginBottom: 2, marginTop: 2 }}/>
                    </React.Fragment>
                )
            })}

           <ModalWindow open={open} item={item} handleClose={handleClose} />
        </>
    );
}