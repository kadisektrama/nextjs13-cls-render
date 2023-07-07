import React, { useState } from 'react';
import { addMonths } from "date-fns";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/lab";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import { signUp } from "@/api/commonApi";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 430,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
    p: 3,
};

export const ModalWindowMailRegistration: React.FC<any> = (props) => {
    const [openWarning, setOpenWarning] = useState(false);
    const [error, setError] = useState(false);
    const [values, setValues] = React.useState({
        password: '',
        passwordConfirmation: '',
        showPassword: false,
        showPasswordConfirmation: false
    });

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowPasswordConfirmation = () => {
        setValues({
            ...values,
            showPasswordConfirmation: !values.showPasswordConfirmation,
        });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleMouseDownPasswordConfirmation = (event: any) => {
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
                (result) => {
                    if (result.message) {
                        setError(result.message);
                        setOpenWarning(true);
                    } else {
                        document.cookie = `token=${result['access_token']};expires=${addMonths(new Date(), 12)};domain=${window.location.protocol === 'https:' ? process.env.NEXT_PUBLIC_DOMAIN : process.env.NEXT_PUBLIC_LOCAL_DOMAIN};path=/`;
                        window.location.reload()
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
            <Modal
                open={props.open}
                onClose={() => props.setOpenModalWindow('')}
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography component="div" variant="h5" sx={{ ml: '8px' }}>
                            Регистрация
                        </Typography>
                        <IconButton
                            sx={{ m: 1 }}
                            color="inherit"
                            onClick={() => props.setOpenModalWindow('')}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            id="user[first_name]"
                            name="user[first_name]"
                            margin="normal"
                            defaultValue={''}
                            label="Имя"
                            required
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            id="user[last_name]"
                            name="user[last_name]"
                            margin="normal"
                            defaultValue={''}
                            label="Фамилия"
                            required
                            fullWidth
                        />
                        <TextField
                            id="user[email]"
                            name="user[email]"
                            margin="normal"
                            required
                            value={props.mail}
                            fullWidth
                            disabled
                            label="E-mail"
                            type="mail"
                        />
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel htmlFor="password">Пароль</InputLabel>
                            <OutlinedInput
                                id="user[password]"
                                name="user[password]"
                                type={values.showPassword ? 'text' : 'password'}
                                defaultValue={values.password}
                                onBlur={handleChange('password')}
                                autoFocus
                                required
                                fullWidth
                                label="Пароль"
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
                        <FormControl sx={{ marginTop: '7px',width: '100%' }}>
                            <InputLabel htmlFor="password_confirmation">Повторите пароль</InputLabel>
                            <OutlinedInput
                                id="user[password_confirmation]"
                                name="user[password_confirmation]"
                                type={values.showPasswordConfirmation ? 'text' : 'password'}
                                defaultValue={values.passwordConfirmation}
                                onBlur={handleChange('passwordConfirmation')}
                                autoFocus
                                required
                                fullWidth
                                label="Повторите пароль"
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
            </Modal>

            <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleCloseWarning}>
                <Alert onClose={handleCloseWarning} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}