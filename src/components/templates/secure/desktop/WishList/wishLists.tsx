// Core
import React, { useEffect, useState } from 'react';

// UI
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Tools
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { Cards } from "./Cards/Cards";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"
import { fetchPropertyFavourites } from "@/redux/thunk/propertyFavourite"

const theme = createTheme();

export const WishLists: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)

    useEffect(() => {
        dispatch(fetchPropertyFavourites())
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <ThemeProvider theme={theme}>
            {isLoaded ? (
                <Container>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="h5" component="h1" className="MuiTypography-captain">Избранные</Typography>
                        {state.propertyFavourite.propertyFavourites.length ? (
                            <Cards />
                        ) : (
                            <InfoWindowEmpty firstRow={'Нет избранных объявлений'}/>
                        )}
                    </Box>
                </Container>
            ) : <SimpleLoader />
            }
        </ThemeProvider>
    );
}
