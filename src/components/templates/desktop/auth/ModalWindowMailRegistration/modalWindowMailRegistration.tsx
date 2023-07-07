'use client'

import * as React from 'react';
import { addMonths } from "date-fns";
import { useRouter } from "next/navigation";

import TextField from "@mui/material/TextField";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Alert } from "@mui/lab";
import { Snackbar } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import { signUp } from "@/api/commonApi";
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setIsEmptyPhone, setIsAccessToRedirect, setIsMailMessageWasSent } from '@/redux/slices/internalSystem';

export const WindowMailRegistration: React.FC<any> = (props) => {
    const router = useRouter()
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [openWarning, setOpenWarning] = React.useState(false);
    const [error, setError] = React.useState(false)
    const [values, setValues] = React.useState({
        password: '',
        passwordConfirmation: '',
        showPassword: false,
        showPasswordConfirmation: false
    });

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPasswordConfirmation = () => {
        setValues({
            ...values,
            showPasswordConfirmation: !values.showPasswordConfirmation,
        });
    };

    const handleClickShowPassword= () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPasswordConfirmation = (event: any) => {
        event.preventDefault();
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleCloseWarning = () => {
        setOpenWarning(false);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        let body = {
            first_name: (document.getElementById('user[first_name]') as HTMLInputElement).value,
            last_name: (document.getElementById('user[last_name]') as HTMLInputElement).value,
            email: props.mail,
            password: (document.getElementById('user[password]') as HTMLInputElement).value,
            password_confirmation: (document.getElementById('user[password_confirmation]') as HTMLInputElement).value,
        };

        signUp(body)
            .then(
                async (result) => {
                    if (result.message) {
                        setError(result.message);
                        setOpenWarning(true);
                    } else {
                        await Promise.all([
                            document.cookie = `token=${result['access_token']};expires=${addMonths(new Date(), 12)};domain=${window.location.protocol === 'https:' ? process.env.REACT_APP_DOMAIN : process.env.REACT_APP_LOCAL_DOMAIN};path=/`
                        ])
                            .then(() => {
                                dispatch(setIsEmptyPhone(true))
                                dispatch(setIsMailMessageWasSent(true))
                                dispatch(setIsAccessToRedirect(true))
                            })
                    }
                },
                (error) => {
                    console.log(error)
                    setOpenWarning(true);
                }
            )
    };

    return (
        <>
            {props.open ? (
                <>
                    {state.internalSystem.isAccessToRedirect && router.push('/')}
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
                            Регистрация
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                id="user[first_name]"
                                name="user[first_name]"
                                type="text"
                                margin="normal"
                                defaultValue={''}
                                label="Имя"
                                required
                                fullWidth
                                autoComplete="user[first_name]"
                                autoFocus
                            />
                            <TextField
                                id="user[last_name]"
                                name="user[last_name]"
                                type="text"
                                margin="normal"
                                defaultValue={''}
                                label="Фамилия"
                                required
                                fullWidth
                                autoComplete="user[last_name]"
                            />
                            <TextField
                                id="user[email]"
                                name="user[email]"
                                type="email"
                                margin="normal"
                                required
                                value={props.mail}
                                fullWidth
                                disabled
                                label="E-mail"
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
                                    required
                                    fullWidth
                                    //margin="normal"
                                    label="Пароль"
                                    autoComplete="new-password"
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
                            <FormControl sx={{ marginTop: '7px', width: '100%' }}>
                                <InputLabel htmlFor="password_confirmation">Повторите пароль</InputLabel>
                                <OutlinedInput
                                    id="user[password_confirmation]"
                                    name="user[password_confirmation]"
                                    type={values.showPasswordConfirmation ? 'text' : 'password'}
                                    value={values.passwordConfirmation}
                                    onChange={handleChange('passwordConfirmation')}
                                    required
                                    fullWidth
                                    //margin="normal"
                                    label="Повторите пароль"
                                    autoComplete="new-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password_confirmation visibility"
                                                onClick={handleClickShowPasswordConfirmation}
                                                onMouseDown={handleMouseDownPasswordConfirmation}
                                                edge="end"
                                            >
                                                {values.showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Зарегистрироваться
                            </Button>
                        </Box>
                    </Box>
                </>
            ) : ''}

            <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleCloseWarning}>
                <Alert onClose={handleCloseWarning} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}