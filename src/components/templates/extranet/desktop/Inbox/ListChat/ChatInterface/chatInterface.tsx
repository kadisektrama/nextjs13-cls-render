import Link from "next/link";
import React from "react";

import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Avatar, Divider, Typography } from "@mui/material";

import { dateForViewFormat } from "@/utils/Helpers/Date/date";
import { BookingStatusesViewExtranet } from "@/utils/Constants/Enums/BookingStatuses";

export const ChatInterface: React.FC<any> = (props) => {
    return (
        <>
            <ListItem alignItems="flex-start" disablePadding>
                <ListItemButton sx={{ borderRadius: 3, width: '100%' }}>
                    <Link style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} className={'Link'} href={`/host/inbox/${props.item.id}`}></Link>
                    <ListItemAvatar>
                        <Avatar alt={'Аватар'} src={props.item.guest_user.user_profile.photo?.path ? `${props.item.guest_user.user_profile.photo?.url}?width=480` : undefined}>{props.item.guest_user.user_profile.first_name[0]}</Avatar>
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
                                    <div>{props.item.booking ? BookingStatusesViewExtranet[props.item.booking.status as unknown as keyof typeof BookingStatusesViewExtranet] : ' — '}</div>
                                    <div>{props.item.lastChatMessage ? dateForViewFormat(props.item.lastChatMessage.created_at) : props.item.booking ? dateForViewFormat(props.item.booking.created_at) : ' — '}</div>
                                </Typography>
                                <Typography
                                    component="div"
                                    variant="body2"
                                >
                                    <span>{props.item.guest_user.user_profile.first_name}</span><br/>
                                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.item.lastChatMessage ? props.item.lastChatMessage.message : ' — '}</div>
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
                                {((new Date(props.item.details?.booking?.start_date)).toLocaleDateString("ru", { month: 'short' }) === (new Date(props.item.details?.booking?.end_date)).toLocaleDateString("ru", { month: 'short' }) ?
                                    (new Date(props.item.details?.booking?.start_date)).toLocaleDateString("ru", { day: 'numeric' }) :
                                    (new Date(props.item.details?.booking?.start_date)).toLocaleDateString("ru", { month: 'short', day: 'numeric' }))
                                + '—'
                                + (new Date(props.item.details?.booking?.end_date)).toLocaleDateString("ru", { month: 'short', day: 'numeric' })}
                                &#183; {props.item.property.name}
                            </Typography>
                        }
                    />
                </ListItemButton>
            </ListItem>
            <Divider variant="middle" />
        </>
    )
}