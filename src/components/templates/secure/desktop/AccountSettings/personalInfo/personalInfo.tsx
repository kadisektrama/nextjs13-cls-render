import React, { useEffect, useState } from 'react';
import Link from "next/link";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Typography from '@mui/material/Typography';

import { getGeoInfo } from "@/api/commonApi";
import { ComponentPersonalInfo } from "@/components/Cards/CardsAccountSettings/PersonalInfo/componentPersonalInfo";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { fetchCountryRegisters } from '@/redux/thunk/countryRegister';
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { fetchUserPhones, fetchUserProfile } from '@/redux/thunk/user';

export const PersonalInfo: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [geoData, setGeoData] = useState(null);
    const [countryCallingCode, setCountryCallingCode] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        Promise.all([dispatch(fetchUserPhones()), dispatch(fetchUserProfile()), dispatch(fetchCountryRegisters())])
            .then(() => getGeoInfo())
            .then((res) => {setGeoData(res); setCountryCallingCode(res.country_calling_code); setPhone(res.country_calling_code)})
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <>
            {isLoaded ? (
                <Container maxWidth={'md'}>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ marginBottom: '40px', marginTop: '20px' }}>
                            <Link href={'/guest/account-settings'}>
                                <Button variant="text" sx={{ textDecoration: 'underline', color: 'black' }}><KeyboardArrowLeftIcon />Аккаунт</Button>
                            </Link>
                            <Typography component="h1" sx={{ paddingLeft: '10px', fontWeight: 500, fontSize: '32px' }}>Персональные данные</Typography>
                        </div>

                        <ComponentPersonalInfo                            
                            phone={phone}
                            countryCallingCode={countryCallingCode}
                            geoData={geoData}
                            setPhone={(value: any) => setPhone(value)}
                            setCountryCallingCode={(value: any) => setCountryCallingCode(value)}
                        />
                    </Box>
                </Container>
            ) : <SimpleLoader />
            }
        </>
    );
}
