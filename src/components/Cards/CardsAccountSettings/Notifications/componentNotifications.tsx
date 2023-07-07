import * as React from 'react';
import { useState } from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { FormControlLabel, Snackbar, TextField } from "@material-ui/core";
import Checkbox from "antd/es/checkbox/Checkbox";
import { Alert } from "@mui/material";

import {
    updateStatusTelegram,
    getUserEmailResend
} from "@/api/commonApi";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { setStatusEmail, setStatusTelegram } from '@/redux/slices/user';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: "black",
    display: "flex",
    justifyContent: 'space-between',
}));

export const ComponentNotifications: React.FC = () => {
    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const [openAlertNotification, setOpenAlertNotification] = useState(false);

    const handleUserEmailResend = () => {
        getUserEmailResend();
        setOpenAlertNotification(true);
    }

    const handleClose = (event: any) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        setOpenAlertNotification(false);
    };

    return (
        <>
            <Stack spacing={2}>
                <Item sx={{ padding: "15px" }}>
                    {state.user.user.telegram ? ('Telegram') : (
                        <div>
                            <div>Telegram</div>
                            <a href={state.user.user.telegramSubscribeLink}>
                                <Button variant={'contained'} size="small">Подключить</Button>
                            </a>
                        </div>
                    )}

                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.user.user.statusTelegram}
                                    //disabled={!props.user.telegram}
                                    onChange={() => {
                                        dispatch(setStatusTelegram(!state.user.user.statusTelegram));
                                        updateStatusTelegram(!state.user.user.statusTelegram);
                                    }}
                                    name={'active'}
                                />
                            }
                            label={'Активно'}
                        />
                    </div>
                </Item>
                <Item sx={{ padding: "15px" }}>
                    <div>                
                        <div>Email</div>
                        {!state.user.user.email_verified && <div style={{ marginTop: '4px' }}><Button variant={'contained'} onClick={() => handleUserEmailResend()} size="small">Подтвердить</Button></div>}
                       
                        <TextField
                            margin="normal"
                            required
                            defaultValue={state.user.user.email}
                            disabled={true}
                            label="Название"
                            name="email"
                            id="email"
                        />
                    </div>

                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.user.user.email_verified}
                                    disabled={true}
                                    onChange={() => {
                                        dispatch(setStatusEmail(!state.user.user.statusEmail));
                                        //updateStatusEmail(!state.user.user.statusEmail);
                                    }}
                                    name={'active'}
                                />
                            }
                            label={'Активно'}
                        />
                    </div>
                </Item>
            </Stack>

            <Snackbar open={openAlertNotification} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {'Мы отправили письмо с подтверждением вам на email'}
                </Alert>
            </Snackbar>
        </>
    );
}