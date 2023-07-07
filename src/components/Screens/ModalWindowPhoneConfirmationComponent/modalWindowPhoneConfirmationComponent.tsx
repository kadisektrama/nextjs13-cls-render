import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import {
    addUserPhone,
    getGeoInfo,
    getUserExists,
    sendVerifyCode,
} from "@/api/commonApi";
import { SimpleLoader } from "../../Loader/simpleLoader";
import { Snackbar } from "@material-ui/core";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { setIsEmptyPhone } from "@/redux/slices/internalSystem";
import { fetchCountryRegisters } from "@/redux/thunk/countryRegister";

type TMapStateToProps = {
    style?: any,
    header?: any,
}

export function ModalWindowPhoneConfirmationComponent({style, header}: TMapStateToProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [geoData, setGeoData] = useState<any>(false);
    const [countryCallingCode, setCountryCallingCode] = useState<any>(false);
    const [phone, setPhone] = useState<any>(false);
    const [showInputForm, setShowInputForm] = useState(true);
    const [openAlertReject, setOpenAlertReject] = useState(false);

    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([dispatch(fetchCountryRegisters())])
            .then(() => getGeoInfo())
            .then((res) => {setGeoData(res); setCountryCallingCode(res.country_calling_code); setPhone(res.country_calling_code)})
            .then(() => setIsLoaded(true))
    }, [])

    async function handleSubmit() {
        let body = {
            country_calling_code: countryCallingCode,
            phone: phone.substring(countryCallingCode.length),
        };
        let user = await getUserExists(phone);

        if (user.available_to_login) {
            setOpenAlertReject(true);
        } else {
            sendVerifyCode(body)
                .then(() => setShowInputForm(false))
        }
    };

    const handleAddPhone = async () => {
        let body = {
            country_calling_code: countryCallingCode,
            phone: phone.substring(countryCallingCode.length),
            verify_code: (document.getElementById('code') as HTMLInputElement).value,
        };

        await addUserPhone(body)
        await dispatch(setIsEmptyPhone(false))
    }

    return (
        <>
            <Box sx={style}>
                {isLoaded ? (
                    <>
                        <Stack
                            spacing={2}
                        >
                            {header ? header : ''}
                            <Box
                                sx={{
                                    p: 3,
                                    m: 0,
                                    //mt: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {showInputForm ? (
                                    <>
                                        <Box sx={{ mt: 1, mb: 3, textAlign: 'center !important' }}>
                                            <Typography variant="caption" display="block" sx={{ fontWeight: 800 }} gutterBottom>
                                                ШАГ 1 ИЗ 2
                                            </Typography>
                                            <Typography component="div" variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
                                                Подтвердите номер телефона
                                            </Typography>
                                            <Typography variant="body1">
                                                Это нужно для того, чтобы хозяева, гости и представители могли с вами связаться
                                            </Typography>
                                        </Box>
                                        <div style={{ width: '100%' }}>
                                            <div>
                                                <TextField
                                                    margin="normal"
                                                    select
                                                    required
                                                    fullWidth
                                                    defaultValue={state.countryRegister.countryRegisters.findIndex((register: any) => register.country_calling_code === geoData.country_calling_code)}
                                                    label="Страна/регион"
                                                    id="country_register"
                                                    name="country_register"
                                                    autoComplete="off"
                                                    onChange={(event) => {
                                                        setCountryCallingCode(state.countryRegister.countryRegisters[event.target.value].country_calling_code);
                                                        setPhone(state.countryRegister.countryRegisters[event.target.value].country_calling_code)
                                                    }}
                                                >
                                                    {state.countryRegister.countryRegisters.map((option: any, index: any) => (
                                                        <MenuItem key={index} value={index}>
                                                            {option.country_name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </div>
                                            <div>
                                                <TextField
                                                    margin="normal"
                                                    type="tel"
                                                    required
                                                    fullWidth
                                                    value={phone}
                                                    name="phone"
                                                    label="Номер телефона"
                                                    id="phone"
                                                    autoComplete="off"
                                                    onChange={(event) => {
                                                        if (event.target.value.toString().startsWith(countryCallingCode.toString())) {setPhone(event.target.value)}
                                                    }}
                                                />
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <Typography variant="caption" display="block" gutterBottom>
                                                    Мы отправим вам SMS, чтобы подтвердить номер телефона.
                                                </Typography>
                                                <Typography variant="caption" sx={{ textAlign: 'end' }} display="block">
                                                    Kvartiranasutki.com
                                                </Typography>
                                            </div>

                                            <Button
                                                size="large"
                                                variant="contained"
                                                fullWidth
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => handleSubmit()}
                                            >
                                                Продолжить
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Box sx={{ mt: 1, mb: 3, textAlign: 'center !important' }}>
                                            <Typography variant="caption" display="block" sx={{ fontWeight: 800 }} gutterBottom>
                                                ШАГ 2 ИЗ 2
                                            </Typography>
                                            <Typography component="div" variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
                                                Подтвердите номер телефона
                                            </Typography>
                                            <Typography variant="body1">
                                                Введите 3-значный код Kvartiranasutki, высланный на {phone}
                                            </Typography>
                                        </Box>
                                        <div>
                                            <div>
                                                <TextField
                                                    margin="normal"
                                                    type="text"
                                                    required
                                                    fullWidth
                                                    defaultValue={''}
                                                    name="code"
                                                    label="Код подтверждения"
                                                    id="code"
                                                    autoComplete="off"
                                                />
                                            </div>

                                            <Button
                                                size="large"
                                                variant="contained"
                                                fullWidth
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => handleAddPhone()}
                                            >
                                                Продолжить
                                            </Button>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                            <span>SMS не было?</span>
                                            <Button
                                                variant="text"
                                                sx={{ mt: 2, color: 'black', fontSize: '0.75rem' }}
                                                onClick={() => handleSubmit()}
                                            >
                                                Отправьте еще раз
                                            </Button>
                                        </div>
                                    </>
                                )}
                                <Button
                                    variant="text"
                                    sx={{ mt: 2, color: 'black' }}
                                    onClick={() => dispatch(setIsEmptyPhone(false))}
                                >
                                    Сделаю позже
                                </Button>
                            </Box>
                        </Stack>
                    </>
                ) : (
                    <SimpleLoader />
                )}
            </Box>

            <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={() => setOpenAlertReject(false)}>
                <Alert onClose={() => setOpenAlertReject(false)} severity="error" sx={{ width: '100%' }}>
                    {'Этот номер мобильного телефона уже занят!'}
                </Alert>
            </Snackbar>
        </>
    );
}