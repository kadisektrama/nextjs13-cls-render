import React from 'react';
import Link from 'next/link';

import s from "./card.module.scss"

import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Avatar, Divider } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";

export const BusinessCard: React.FC<any> = (props) => {
    return (
        <>
            <ListItem>
                <Link
                    className={s.Link}
                    href={`/host/calendar/${props.property.id}`}
                    style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                />
                <ListItemAvatar
                    sx={{
                        minWidth: 56+16
                    }}
                >
                    <Avatar
                        sx={{
                            width: 56,
                            height: 40
                        }}
                        src={`${props.property.photos[0]?.url}?width=480`}
                        variant="rounded"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant="subtitle2">
                            {props.property.name}
                        </Typography>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography variant="caption">
                                Изменено: {(new Date(props.property.updated_at)).toLocaleDateString("ru", { month: 'short', day: 'numeric' })}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider component="li" />
        </>
    )
}
