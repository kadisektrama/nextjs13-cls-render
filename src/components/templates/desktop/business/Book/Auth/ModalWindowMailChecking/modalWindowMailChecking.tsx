import React, { useState } from 'react';

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/lab";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";

import { getUserExists } from "@/api/commonApi";

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

export const ModalWindowMailChecking: React.FC<any> = (props) => {
    const [openWarning, setOpenWarning] = useState(false);
    const [error] = useState(false)


    const handleCloseWarning = () => {
        setOpenWarning(false);
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
            <Modal
                open={props.open}
                onClose={() => props.setOpenModalWindow('')}
            >
                <Box sx={style}>
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
                            onBlur={(event) => {
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
            </Modal>

            <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleCloseWarning}>
                <Alert onClose={handleCloseWarning} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}