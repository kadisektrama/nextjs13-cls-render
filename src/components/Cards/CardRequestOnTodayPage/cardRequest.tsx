import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { differenceDateFromNowHour, rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import Grid from "@mui/material/Grid";
import { createChatChannel } from "@/api/extranet";
import { useRouter } from "next/navigation";

export const CardRequest: React.FC<any> = (props) => {
    let router = useRouter();

    const handleChatCreate = () => {
        createChatChannel({user: {id: props.item.user.id}, property: {id: props.item.property.id}}, props.item.start_date, props.item.end_date)
            .then((res) => router.push(`/host/inbox/${res.id}`))
    }

    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3} onClick={handleChatCreate} sx={{ cursor: 'pointer' }}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="subtitle2">
                            {props.item.user.user_profile.first_name} хочет забронировать жильё
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {rangeStartDateEndDate(props.item.start_date, props.item.end_date)} · {24 - differenceDateFromNowHour(props.item.created_at)} ч., чтобы ответить<br/>
                            {props.item.property.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}