import React from 'react';
import Link from 'next/link';

import s from "./card.module.scss"

import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const BusinessCard: React.FC<any> = (props) => {
    return(
        <Card sx={{ display: 'flex', boxShadow: 0 }}>
            <CardMedia
                component="img"
                sx={{ width: 170, height: 170, borderRadius: "18px" }}
                image={props.photos.length === 0 ? "data:image/png;base64,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" : `${props.photos[0].url}?width=480`}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        <Link className={s.Link} href={`/host/calendar/${props.id}`}>{props.name}</Link>
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    {props.price + ' ' + props.currency}/ночь
                </Box>
            </Box>
        </Card>
    )
}