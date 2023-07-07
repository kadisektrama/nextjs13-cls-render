'use client'

// Core
import React from 'react';
import Link from "next/link";

// UI
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import { Alert } from "@mui/lab";
import { Snackbar } from "@material-ui/core";

// Tools
import { getGeoInfo } from "@/api/commonApi";
import { WindowRegistration } from '@/components/templates/desktop/auth/ModalWindowRegistration/modalWindowRegistration'
import { WindowLogin } from "@/components/templates/desktop/auth/ModalWindowLogin/modalWindowLogin";
import { WindowChecking } from "@/components/templates/desktop/auth/ModalWindowChecking/modalWindowChecking";
import { WindowMailChecking } from "@/components/templates/desktop/auth/ModalWindowMailChecking/modalWindowMailChecking";
import { WindowMailLogin } from "@/components/templates/desktop/auth/ModalWindowMailLogin/modalWindowMailLogin";
import { WindowMailRegistration } from "@/components/templates/desktop/auth/ModalWindowMailRegistration/modalWindowMailRegistration";
import { ModalWindowPasswordRecovery } from "@/components/templates/desktop/auth/ModalWindowPasswordRecovery/modalWindowPasswordRecovery";
import { fetchCountryRegisters } from "@/redux/thunk/countryRegister";
import { useAppDispatch } from '@/redux/hooks/hooks';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6, mb: 4 }}>
            {'Все права защищены.'}
            <br />
            {'Copyright © '}
            <Link color="inherit" href={'/'}>Kvartiranasutki.com</Link>{' '}
            {new Date().getFullYear()}{'.'}
        </Typography>
    );
}

const SignUp: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [countryCallingCode, setCountryCallingCode] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [verifyCode, setVerifyCode] = useState(false);
    const [geoData, setGeoData] = useState(null);
    const dispatch = useAppDispatch()

    const [window, setWindow] = useState('');
    const [openWindowLogin, setOpenWindowLogin] = React.useState(false);
    const [openWindowRegistration, setOpenWindowRegistration] = React.useState(false);
    const [openWindowMailChecking, setOpenWindowMailChecking] = React.useState(false);
    const [openWindowMailLogin, setOpenWindowMailLogin] = React.useState(false);
    const [openWindowMailRegistration, setOpenWindowMailRegistration] = React.useState(false);

    useEffect(() => {
        Promise.all([dispatch(fetchCountryRegisters())])
            .then(() => getGeoInfo())
            .then((res) => {setGeoData(res); setCountryCallingCode(res.country_calling_code); setPhone(res.country_calling_code)})
            .then(() => setIsLoaded(true))
    }, [])

    const handleClose = (event: any) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        setOpen(false);
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {isLoaded ? (
                    <>
                        {window === '' ?
                            (
                                <>
                                    <WindowChecking
                                        open={!(openWindowRegistration || openWindowLogin || openWindowMailChecking || openWindowMailLogin || openWindowMailRegistration)}
                                        phone={phone}
                                        countryCallingCode={countryCallingCode}
                                        geoData={geoData}
                                        setOpenWindowLogin={() => setOpenWindowLogin(true)}
                                        setOpenWindowRegistration={() => setOpenWindowRegistration(true)}
                                        setOpenWindowMailChecking={() => setOpenWindowMailChecking(true)}
                                        setPhone={(value: any) => setPhone(value)}
                                        setCountryCallingCode={(value: any) => setCountryCallingCode(value)}
                                        setVerifyCode={(value: any) => setVerifyCode(value)}
                                    />
                                    <WindowLogin
                                        phone={phone}
                                        open={openWindowLogin}
                                        setOpenWindowLogin={() => setOpenWindowLogin(false)}
                                        setWindow={(value: any) => setWindow(value)}
                                    />
                                    <WindowRegistration
                                        open={openWindowRegistration}
                                        setOpenWindowRegistration={() => setOpenWindowRegistration(false)}
                                        phone={phone}
                                        countryCallingCode={countryCallingCode}
                                        verifyCode={verifyCode}
                                    />
                                    <WindowMailChecking
                                        open={openWindowMailChecking}
                                        mail={mail}
                                        setMail={(value: any) => setMail(value)}
                                        setOpenWindowMailChecking={(value: any) => setOpenWindowMailChecking(value)}
                                        setOpenWindowMailLogin={(value: any) => setOpenWindowMailLogin(value)}
                                        setOpenWindowMailRegistration={(value: any) => setOpenWindowMailRegistration(value)}
                                    />
                                    <WindowMailLogin open={openWindowMailLogin} mail={mail} setWindow={(value: any) => setWindow(value)} />
                                    <WindowMailRegistration open={openWindowMailRegistration} mail={mail} />
                                </>
                            ) : ''
                        }

                        {window === 'passwordRecovery' ? (
                            <>
                                <ModalWindowPasswordRecovery
                                    setWindow={(value: any) => setWindow(value)}
                                    setMail={(value: any) => setMail(value)}
                                    mail={mail}
                                />
                            </>
                        ) : ''}
                        <Copyright />
                    </>
                ) : ''}
            </Container>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Неправильный логин или пароль
                </Alert>
            </Snackbar>
        </>
    );
}

export default SignUp