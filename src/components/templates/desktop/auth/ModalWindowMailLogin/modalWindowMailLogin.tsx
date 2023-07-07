'use client'

import React from 'react';
import { addMonths } from "date-fns";
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/lab";
import { Snackbar } from "@material-ui/core";
import { Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { signIn } from "@/api/commonApi";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export const WindowMailLogin: React.FC<any> = (props) => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false
    })


    const handleClose = (event: any) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        setOpen(false);
    };

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let body = {
            login: (document.getElementById('user[email]') as HTMLInputElement).value,
            password: (document.getElementById('user[password]') as HTMLInputElement).value,
        };

        signIn(body)
            .then(
                (result) => {
                    if (result['access_token']) {
                        document.cookie = `token=${result['access_token']};expires=${addMonths(new Date(), 12).toUTCString()};max-age=31536000;domain=${window.location.hostname};path=/;`;
                        window.location = `${window.location.protocol}//${window.location.host}` as unknown as Location
                    } else {
                        setOpen(true);
                    }
                },
                (error) => {
                    console.log(error);
                    setOpen(true);
                }
            )
    };

    return (
        <>
            {props.open ? (
                <>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Вход
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                id="user[email]"
                                name="user[email]"
                                margin="normal"
                                value={props.mail}
                                required
                                fullWidth
                                disabled
                                label="Электронная почта"
                                autoComplete="user[email]"
                            />
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel htmlFor="password">Пароль</InputLabel>
                                <OutlinedInput
                                    id="user[password]"
                                    name="user[password]"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    autoFocus
                                    required
                                    fullWidth
                                    //margin="normal"
                                    label="Пароль"
                                    autoComplete="off"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
                                <div style={{ color: '#007bff', fontSize: '15px', cursor: 'pointer' }} onClick={() => props.setWindow('passwordRecovery')}>Забыли пароль?</div>
                            </div>

                            <Button
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Войти
                            </Button>
                        </Box>
                    </Box>
                </>
            ) : ''}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Неправильный логин или пароль
                </Alert>
            </Snackbar>
        </>
    );
}