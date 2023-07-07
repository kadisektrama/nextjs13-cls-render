'use client'

import * as React from 'react';
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/lab";
import { Snackbar } from "@material-ui/core";
import { Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';

import { getUserExists } from "@/api/commonApi";

export const WindowMailChecking: React.FC<any> = (props) => {
    const [open, setOpen] = useState(false);

    const handleClose = (event: any) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        setOpen(false);
    };

    async function handleSubmit(event: any) {
        event.preventDefault();

        let user = await getUserExists(props.mail);

        if (user.available_to_login) {
            props.setOpenWindowMailChecking(false)
            props.setOpenWindowMailLogin(true)
        } else {
            props.setOpenWindowMailChecking(false)
            props.setOpenWindowMailRegistration(true)
        }
    };

    return (
        <>
            {props.open ? (
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography component="div" variant="h5">
                        Войдите или зарегистрируйтесь
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            id="user[email]"
                            name="user[email]"
                            margin="normal"
                            type="email"
                            required
                            fullWidth
                            label="Электронная почта"
                            autoComplete="user[email]"
                            onChange={(event) => {
                                props.setMail(event.target.value)
                            }}
                        />
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Продолжить
                        </Button>
                    </Box>
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <Divider sx={{ width: '100%' }}><Typography variant="body2" color="text.secondary">или</Typography></Divider>
                        <Button onClick={() => props.setOpenWindowMailChecking(false)} size="large" variant="outlined" sx={{ color: 'black', borderColor: 'black', width: '100%' }} startIcon={<PhoneAndroidOutlinedIcon />}>
                            По номеру телефона
                        </Button>
                    </Stack>
                </Box>
            ) : ''}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Неправильный mail
                </Alert>
            </Snackbar>
        </>
    );
}