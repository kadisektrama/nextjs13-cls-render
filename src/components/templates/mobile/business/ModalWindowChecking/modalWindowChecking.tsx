// Core
import React, { useState } from 'react';
import { BottomSheet } from "react-spring-bottom-sheet";

// UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/lab";
import { CircularProgress, Snackbar } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

// Instruments
import { getUserExists, sendVerifyCode } from "@/api/commonApi";
import { DialogWindowCode } from "@/components/templates/desktop/auth/ModalWindowCode/modalWindowCode";
import { useAppSelector } from "@/redux/hooks/hooks";

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

export const ModalWindowChecking: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const [open, setOpen] = useState(false);
    const [openDialogWindowCode, setOpenDialogWindowCode] = useState(false);
    const [isDisableButton, setIsDisableButton] = useState(false);

    const handleClose = (event: any) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        setOpen(false);
    };

    async function handleSubmit(event: any) {
        event.preventDefault();
        setIsDisableButton(true);
        let user = await getUserExists(props.phone.replace(/[.*?^${}()|[-]|[\]\\]/g, ''));

        if (user.available_to_login) {
            props.handleClose();
            props.setOpenWindowLogin(true)
        } else {
            let body = {
                country_calling_code: props.countryCallingCode,
                phone: props.phone.substring(props.countryCallingCode.length).replace(/[.*?^${}()|[-]|[\]\\]/g, ''),
            };
            let res = await sendVerifyCode(body)
                .catch(e => {
                    if (e.message === 'Подтверждение не доступно.') {
                        props.handleClose();
                        props.setOpenWindowRegistration(true);
                    }
                })
            

            if (res.message === 'Отправлен код на подтверждение номера') {
                setOpenDialogWindowCode(true);
                setIsDisableButton(true);
            } else {
                setIsDisableButton(false);
            }
        }
    };

    return (
        <>
            <BottomSheet
                open={props.open}
                onDismiss={() => props.handleClose()}
                blocking={false}
                snapPoints={({maxHeight }) => [
                    maxHeight - 120,
                ]}
            >
                <Box sx={{ m: 3 }}>
                    <Typography component="div" variant="h5">
                        Войдите или зарегистрируйтесь
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            id="user[country_register]"
                            name="user[country_register]"
                            margin="normal"
                            select
                            required
                            fullWidth
                            defaultValue={state.countryRegister.countryRegisters.findIndex((register: any) => register.country_calling_code === props.geoData?.country_calling_code)}
                            label="Страна/регион"
                            autoComplete="off"
                            onChange={(event) => {
                                props.setCountryCallingCode(state.countryRegister.countryRegisters[event.target.value].country_calling_code);
                                props.setPhone(state.countryRegister.countryRegisters[event.target.value].country_calling_code)
                            }}
                        >
                            {state.countryRegister.countryRegisters.map((option: any, index: any) => (
                                <MenuItem key={index} value={index}>
                                    {option.country_name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="user[phone]"
                            name="user[phone]"
                            margin="normal"
                            type="tel"
                            required
                            fullWidth
                            defaultValue={props.phone}
                            label="Номер телефона"
                            autoComplete="user[phone]"
                            onBlur={(event) => {
                                if (event.target.value.toString().startsWith(props.countryCallingCode.toString())) {props.setPhone(event.target.value)}
                            }}
                        />

                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isDisableButton ? <CircularProgress size={30} color={"green" as "inherit"} /> : 'Продолжить'}
                        </Button>
                    </Box>
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <Divider sx={{ width: '100%' }}><Typography variant="body2" color="text.secondary">или</Typography></Divider>
                        <Button onClick={() => {props.handleClose(); props.setOpenWindowMailChecking()}} size="large" variant="outlined" sx={{ color: 'black', borderColor: 'black', width: '100%' }} startIcon={<MailOutlinedIcon />}>
                            С помощью эл. почты
                        </Button>
                    </Stack>
                </Box>
            </BottomSheet>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Неправильный логин или пароль
                </Alert>
            </Snackbar>

            <DialogWindowCode open={openDialogWindowCode} handleClose={() => {setIsDisableButton(false); setOpenDialogWindowCode(false)}} setOpenWindowRegistration={() => props.setOpenWindowRegistration()} props={props} phone={props.phone} countryCallingCode={props.countryCallingCode} />
        </>
    );
}