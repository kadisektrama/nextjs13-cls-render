import React, { useState } from 'react';
import { addMonths } from "date-fns";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/lab";
import { Snackbar } from "@material-ui/core";
import Typography from "@mui/material/Typography";

import { signIn } from "@/api/commonApi";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

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

export const ModalWindowMailLogin: React.FC<any> = (props) => {
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
                        document.cookie = `token=${result['access_token']};expires=${addMonths(new Date(), 12)};domain=${window.location.protocol === 'https:' ? process.env.NEXT_PUBLIC_DOMAIN : process.env.NEXT_PUBLIC_LOCAL_DOMAIN};path=/`;
                        window.location.reload()
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
            <Modal
                open={props.open}
                onClose={() => props.setOpenModalWindow('')}
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
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
                                label="E-mail"
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
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
                                <div style={{ color: '#007bff', fontSize: '15px', cursor: 'pointer' }} onClick={() => props.setOpenModalWindow('passwordRecovery')}>Забыли пароль?</div>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Войти
                            </Button>
                        </Box>
                    </div>
                </Box>
            </Modal>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Неправильный логин или пароль
                </Alert>
            </Snackbar>
        </>
    );
}