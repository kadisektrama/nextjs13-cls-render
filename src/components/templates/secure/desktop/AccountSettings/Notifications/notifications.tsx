import React, { useEffect } from 'react';
import Link from "next/link";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Typography from '@mui/material/Typography';

import { fetchMailInfo, fetchTelegramInfo, fetchTelegramSubscribeLink } from '@/redux/thunk/user';
import {
    ComponentNotifications
} from "@/components/Cards/CardsAccountSettings/Notifications/componentNotifications";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Notifications: React.FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [isLoaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        Promise.all([
            dispatch(fetchTelegramSubscribeLink()),
            dispatch(fetchMailInfo()),
            dispatch(fetchTelegramInfo()),
        ])
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
                            <Link href={"/guest/account-settings"}>
                                <Button variant="text" sx={{ textDecoration: 'underline', color: 'black' }}><KeyboardArrowLeftIcon />Аккаунт</Button>
                            </Link>
                            <Typography variant="h5" component="h1">Уведомления</Typography>
                        </div>

                        <ComponentNotifications />
                    </Box>
                </Container>
            ) : <SimpleLoader />
            }
        </>
    );
}
