import React, { useState } from 'react';
import { BottomSheet } from "react-spring-bottom-sheet";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/lab";
import { Snackbar } from "@material-ui/core";
import { Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';

import { getUserExists } from "@/api/commonApi";

export const ModalWindowMailChecking: React.FC<any> = (props) => {
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

        if (user.user_exists) {
            props.setOpenModalWindow('mailLogin')
        } else {
            props.setOpenModalWindow('mailRegistration')
        }
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
                    <Typography component="div" variant="h5">
                        Войдите или зарегистрируйтесь
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            id="user[email]"
                            name="user[email]"
                            margin="normal"
                            type="mail"
                            required
                            fullWidth
                            label="E-mail"
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
                        <Button onClick={() => props.setOpenModalWindow('')} size="large" variant="outlined" sx={{ color: 'black', borderColor: 'black', width: '100%' }} startIcon={<PhoneAndroidOutlinedIcon />}>
                            По номеру телефона
                        </Button>
                    </Stack>
                </Box>
            </BottomSheet>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Неправильный mail
                </Alert>
            </Snackbar>
        </>
    );
}