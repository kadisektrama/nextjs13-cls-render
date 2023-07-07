import * as React from 'react';
import { BottomSheet } from "react-spring-bottom-sheet";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/lab";
import Typography from "@mui/material/Typography";

import { signUp } from "@/api/commonApi";

export const ModalWindowMailRegistration: React.FC<any> = (props) => {
    const [openWarning, setOpenWarning] = React.useState(false);
    const [error, setError] = React.useState(false)

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
                (result: any) => {
                    if (result.message) {
                        setError(result.message);
                        setOpenWarning(true);
                    } else {
                        document.cookie = `token=${result['access_token']};domain=.${window.location.protocol === 'https:' ? process.env.NEXT_PUBLIC_DOMAIN : process.env.NEXT_PUBLIC_LOCAL_DOMAIN};path=/`;
                        window.location.reload()
                    }
                },
                (error: any) => {
                    console.log(error)
                    setOpenWarning(true);
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
                            Регистрация
                        </Typography>
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
                        <TextField
                            id="user[password]"
                            name="user[password]"
                            margin="normal"
                            required
                            defaultValue={''}
                            fullWidth
                            label="Пароль"
                            type="password"
                        />
                        <TextField
                            id="user[password_confirmation]"
                            name="user[password_confirmation]"
                            margin="normal"
                            required
                            defaultValue={''}
                            fullWidth
                            label="Повторите пароль"
                            type="password"
                        />
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
            </BottomSheet>

            <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleCloseWarning}>
                <Alert onClose={handleCloseWarning} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}