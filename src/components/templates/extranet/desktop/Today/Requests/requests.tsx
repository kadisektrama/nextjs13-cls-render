import React from 'react';

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { CardRequest } from "@/components/Cards/CardRequestOnTodayPage/cardRequest";
import { BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses";

export const Requests: React.FC<any> = (props) => {
    return (
        <>
            <Box sx={{ m: 2, mb: 0 }}>
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    {props.requests.filter((item: any) => item.status === BookingStatuses.created).map((item: any) => (
                        <React.Fragment key={item.id}>
                            <CardRequest item={item} />
                        </React.Fragment>
                    ))}
                </Grid>
            </Box>
        </>
    )
}