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
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { signUp } from "@/api/commonApi";
import { errorAuthTranslator } from "@/utils/Constants/Error/errorValidator";

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

export const ModalWindowRegistration: React.FC<any> = (props) => {
    const [error, setError] = useState(false)

    const handleCloseWarning = () => {
        setError(false);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        let body = {
            first_name: (document.getElementById('user[first_name]') as HTMLInputElement).value,
            last_name: (document.getElementById('user[last_name]') as HTMLInputElement).value,
            country_calling_code: props.countryCallingCode,
            phone: props.phone.substring(props.countryCallingCode.length).replace(/[.*?^${}()|[-]|[\]\\]/g, ''),
            verify_code: props.verifyCode,
            email: (document.getElementById('user[email]') as HTMLInputElement).value,
            password: (document.getElementById('user[password]') as HTMLInputElement).value,
            password_confirmation: (document.getElementById('user[password_confirmation]') as HTMLInputElement).value,
        };

        signUp(body)
            .then(
                (result) => {
                    if (result.message) {
                        setError(result.message);
                    } else {
                        document.cookie = `token=${result['access_token']};expires=${addMonths(new Date(), 12)};domain=${window.location.protocol === 'https:' ? process.env.NEXT_PUBLIC_DOMAIN : process.env.NEXT_PUBLIC_LOCAL_DOMAIN};path=/`;
                        window.location.reload()
                    }
                }
            )
            .catch((error) => {
                setError(errorAuthTranslator(error));
            })
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    id="user[first_name]"
                                    name="user[first_name]"
                                    defaultValue={''}
                                    label="Имя"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="user[last_name]"
                                    name="user[last_name]"
                                    defaultValue={''}
                                    label="Фамилия"
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="user[email]"
                                    name="user[email]"
                                    required
                                    defaultValue={''}
                                    fullWidth
                                    label="E-mail"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="user[phone]"
                                    name="user[phone]"
                                    required
                                    value={props.phone}
                                    fullWidth
                                    disabled
                                    label="Номер телефона"
                                    type="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    defaultValue={''}
                                    fullWidth
                                    name="user[password]"
                                    label="Пароль"
                                    type="password"
                                    id="user[password]"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="user[password_confirmation]"
                                    name="user[password_confirmation]"
                                    required
                                    defaultValue={''}
                                    fullWidth
                                    label="Повторите пароль"
                                    type="password"
                                />
                            </Grid>
                            {/*<Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Я хочу получать маркетинговые акции и обновления по электронной почте."
                                />
                            </Grid>*/}
                        </Grid>
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

            <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseWarning}>
                <Alert onClose={handleCloseWarning} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}