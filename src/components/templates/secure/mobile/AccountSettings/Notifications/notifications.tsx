import React, { useEffect, useState } from 'react';
import Link from "next/link";

import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from '@mui/material/Box';

import { fetchMailInfo, fetchTelegramInfo, fetchTelegramSubscribeLink } from '@/redux/thunk/user';
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import {
    ComponentNotifications
} from "@/components/Cards/CardsAccountSettings/Notifications/componentNotifications";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppDispatch } from "@/redux/hooks/hooks";

export const Notifications: React.FC = () => {
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            dispatch(fetchTelegramSubscribeLink()),
            dispatch(fetchMailInfo()),
            dispatch(fetchTelegramInfo()),
        ])
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <AccountHeader name={'Уведомления'}>
            {isLoaded ? (
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Link href={'/guest/account-settings'}>
                            <Button variant="text" sx={{ textDecoration: 'underline', color: 'black' }}><KeyboardArrowLeftIcon />Аккаунт</Button>
                        </Link>

                        <ComponentNotifications />
                    </Box>
                </Container>
            ) : <SimpleLoader />}
        </AccountHeader>
    );
}
