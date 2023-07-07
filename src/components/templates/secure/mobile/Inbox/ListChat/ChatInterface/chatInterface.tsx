// Core
import Link from "next/link";
import React from "react";
import { formatDistanceStrict } from "date-fns";

// UI
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import { Avatar, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";

// Tools
import { dateForViewFormat } from "@/utils/Helpers/Date/date";
import { BookingStatusesViewAdmin, BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses";

export const ChatInterface: React.FC<any> = (props) => {
    return (
        <>
            <Divider component="li" />
            <ListItem sx={{ pt: 2, pb: 2 }}>
                <Link style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} className={'Link'} href={`/guest/inbox/${props.item.id}`} />
                <ListItemAvatar sx={{ minWidth: 72 }}>
                    <Avatar alt={'Аватар'} src={props.item.host_user.user_profile.photo?.path ? `${props.item.host_user.user_profile.photo?.url}?width=480` : undefined}>{props.item.host_user.user_profile.first_name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <>
                            <Typography
                                component="div"
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: 'flex', justifyContent: 'space-between', textAlign: "right", lineHeight: "1.125rem" }}
                            >
                                <div>{props.item.booking ? BookingStatusesViewAdmin[props.item.booking.status as unknown as keyof typeof BookingStatusesViewAdmin] : ' — '}</div>
                                <div>{props.item.lastChatMessage ? dateForViewFormat(props.item.lastChatMessage.created_at) : props.item.booking ? dateForViewFormat(props.item.booking.created_at) : ' — '}</div>
                            </Typography>
                            <Typography
                                component="div"
                                variant="body2"
                            >
                                <span>{props.item.host_user.user_profile.first_name}</span><br/>
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.item.lastChatMessage ? props.item.lastChatMessage.message : ' — '}</div>
                                {props.item.booking ? ((+formatDistanceStrict(new Date(), new Date(props.item.booking.end_date), { unit: 'day' }).split(' ')[0] < 90 && props.item.booking.status === BookingStatuses.finished) ? <Link href={`/guest/reservations/${props.item.booking.id}/review`}><Button sx={{ mt: 0.5, mb: 0.5, color: 'black', borderColor: 'black' }} size="small" variant="outlined">Оставить отзыв</Button></Link> : '') : ''}
                            </Typography>
                        </>
                    }
                    secondary={
                        <Typography
                            component="p"
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                lineHeight: "1rem"
                            }}
                        >
                            {((new Date(props.item.details.booking.start_date)).toLocaleDateString("ru", { month: 'short' }) === (new Date(props.item.details.booking.end_date)).toLocaleDateString("ru", { month: 'short' }) ?
                                    (new Date(props.item.details.booking.start_date)).toLocaleDateString("ru", { day: 'numeric' }) :
                                    (new Date(props.item.details.booking.start_date)).toLocaleDateString("ru", { month: 'short', day: 'numeric' }))
                                + '—'
                                + (new Date(props.item.details.booking.end_date)).toLocaleDateString("ru", { month: 'short', day: 'numeric' })}
                            &#183; {props.item.property.name}
                        </Typography>
                    }
                />
            </ListItem>
        </>
    )
}