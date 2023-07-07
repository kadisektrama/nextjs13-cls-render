import React, { useState } from 'react';
import { addMonths } from "date-fns";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/lab";
import { Snackbar } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import { signIn } from "@/api/commonApi";

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

export const ModalWindowLogin: React.FC<any> = (props) => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false
    })


    const handleClose = (event: any) => {
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
            login: (document.getElementById('user[phone]') as HTMLInputElement).value.replace(/[.*?^${}()|[-]|[\]\\]/g, ''),
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography component="div" variant="h5" sx={{ ml: '8px' }}>
                            Вход
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
                            id="user[phone]"
                            name="user[phone]"
                            margin="normal"
                            value={props.phone}
                            required
                            disabled
                            fullWidth
                            label="Номер телефона"
                        />
                        <FormControl sx={{width: '100%'}}>
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