'use client'

// Core
import React, { useState, useRef } from 'react';
import { useSearchParams } from "next/navigation";

// UI
import Stack from "@mui/material/Stack";
import { Alert, Button, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { ListItemAvatar } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Snackbar } from "@material-ui/core";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

// Tools
import DescriptionBlockWithPrice from "./DescriptionBlockWithPrice/descriptionBlockWithPrice";
import s from "./description.module.css"
import { DescriptionAboutFlat } from "./DescriptionAboutFlat/DescriptionAboutFlat";
import { Calendar } from "@/components/Property/Calendar/calendar";
import { Map } from "./Map/map";
import { createChatChannel } from "@/api/commonApi";
import { errorTranslator } from "@/utils/Constants/Error/errorValidator";
import { Amenities } from "./Amenities/amenities";
import { Reviews } from "./Reviews/reviews";
import { roundedTime } from "@/utils/Helpers/Date/date";
import Cookies from "js-cookie";
import { Rules } from "./Rules/rules";
import { useAppSelector } from '@/redux/hooks/hooks';
import { StaticDatePicker } from '@mui/x-date-pickers';

const Descripttion: React.FC<any> = () => {
    const state = useAppSelector(state => state)

    return (
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }} gutterBottom>
            {state.property.property.description}
        </Typography>
    )
}

const Information: React.FC<any> = (props) => {
    const searchParams = useSearchParams();
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [openAlertReject, setOpenAlertReject] = useState(false);
    const textArea = useRef<HTMLInputElement | null>(null);
    const state = useAppSelector(state => state)

    const handleSubmit = () => {
        createChatChannel(state.property.property, textArea.current?.value, searchParams.get('start_date'), searchParams.get('end_date'))
            .then(() => {
                setOpenAlertSuccess(errorTranslator('Сообщение отправлено'))
            })
            .catch((error) => {
                setOpenAlertReject(errorTranslator(error.message))
            })
        
        if (textArea.current !== null) {
            textArea.current.value = '';
        }

        //textArea?.current.value = '';
    };

    const handleOpenWindowChecking = () => {
        if (!Cookies.get("token")) {
            props.setOpenWindowChecking(true)
            textArea.current?.blur()
        }
    };

    const handleClose = (event: any) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        setOpenAlertReject(false);
        setOpenAlertSuccess(false);
    };

    return(
        <div>
            <List>
                <ListItem>
                    <ListItemAvatar sx={{ minWidth: 72 }}>
                        <Avatar sx={{ width: 56, height: 56 }} src={state.property.property.user?.user_profile.photo?.url}>{state.property.property.user?.user_profile.first_name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography component="span" variant="h6">
                                Хозяин: {state.property.property.user?.user_profile.first_name}
                            </Typography>
                        }
                        secondary="На KVARTIRANASUTKI.COM с 2022 г."
                    />
                </ListItem>
                {!(state.property.property.user?.answerRate === null || state.property.property.user?.avgAnswerTime === null) && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center' }}><SmsOutlinedIcon sx={{ marginRight: '5px', height: '20px' }} />{`Частота откликов: ${state.property.property.user?.answerRate}%`}</div>
                        <div style={{ display: 'flex', alignItems: 'center' }}><AccessTimeIcon sx={{ marginRight: '5px', height: '20px' }} />{`Время отклика: ${roundedTime(state.property.property.user?.avgAnswerTime)}`}</div>
                    </>
                )}
            </List>
            <Box component="form" sx={{ mt: 2, mb: 8 }}>
                <Typography variant="h6" component="div">
                    Есть вопросы? Напишите хозяину
                </Typography>
                <TextField
                    name="message"
                    label="Введите сообщение"
                    id="message"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ my: 3 }}
                    inputRef={textArea}
                    onClick={handleOpenWindowChecking}
                />
                <Button onClick={handleSubmit} variant="outlined" size="large">
                    Отправить сообщение
                </Button>
            </Box>

            <Snackbar open={openAlertSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {openAlertSuccess}
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {openAlertReject}
                </Alert>
            </Snackbar>
        </div>
    )
}

const Description: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)

    return (
        <div className={s.content}>
            <div>
                <Stack
                    divider={<Divider orientation="horizontal" flexItem />}
                    spacing={4}
                >
                    <DescriptionAboutFlat />
                    <Descripttion />
                    {state.property.property.amenities.length > 0 && <Amenities />}
                    {state.property.property.rules && <Rules />}
                    <Calendar months={2} />
                    {state.property.property.moderatedReviews?.data.scoreCount ? (<Reviews />) : ''}
                    <Map />
                    <Information {...props} />
                </Stack>
            </div>
            <div>
                <DescriptionBlockWithPrice />
            </div>
        </div>
    );
}

export default Description