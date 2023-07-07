import * as React from 'react';
import { BottomSheet } from "react-spring-bottom-sheet";

import Box from "@mui/material/Box";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/lab";
import { Snackbar } from "@material-ui/core";
import Typography from "@mui/material/Typography";

import { signIn } from "@/api/commonApi";

export const ModalWindowLogin: React.FC<any> = (props) => {
    const [open, setOpen] = useState(false);

    const handleClose = (event: any) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        setOpen(false);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let body = {
            login: (document.getElementById('user[phone]') as HTMLInputElement).value?.replace(/[.*?^${}()|[-]|[\]\\]/g, ''),
            password: (document.getElementById('user[password]') as HTMLInputElement).value,
        };

        signIn(body)
            .then(
                (result) => {
                    if (result['access_token']) {
                        document.cookie = `token=${result['access_token']};domain=.${window.location.protocol === 'https:' ? process.env.NEXT_PUBLIC_DOMAIN : process.env.NEXT_PUBLIC_LOCAL_DOMAIN};path=/`;
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
            <BottomSheet
                open={props.open}
                onDismiss={() => props.setOpenModalWindow('')}
                blocking={false}
                snapPoints={({maxHeight }) => [
                    maxHeight - 120,
                ]}
            >
                <Box sx={{ m: 3 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography component="div" variant="h5" sx={{ ml: '8px' }}>
                            Вход
                        </Typography>
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
                        <TextField
                            id="user[password]"
                            name="user[password]"
                            margin="normal"
                            defaultValue={''}
                            required
                            fullWidth
                            label="Пароль"
                            type="password"
                        />
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
            </BottomSheet>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Неправильный логин или пароль
                </Alert>
            </Snackbar>
        </>
    );
}