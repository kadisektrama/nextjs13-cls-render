import { useEffect, useState } from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

import {
    ComponentCardsAccountSettings
} from "@/components/Cards/CardsAccountSettings/cardsAccountSettings";
import { fetchUser } from "@/redux/thunk/user";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const AccountSettings: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchUser())
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <Container>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    marginBottom: 16,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div style={{ marginBottom: '24px', marginTop: '16px' }}>
                    <Typography variant="h5" component="h1">Аккаунт</Typography>
                    {isLoaded && (
                        <span>
                            <Typography variant="h6" component="span" gutterBottom>{`${state.user.user.user_profile.first_name} ${state.user.user.user_profile.last_name}`}</Typography>
                            <span>{`, ${state.user.user.email}`}</span>
                        </span>
                    )}
                </div>

                <ComponentCardsAccountSettings />
            </Box>
        </Container>
    );
}
