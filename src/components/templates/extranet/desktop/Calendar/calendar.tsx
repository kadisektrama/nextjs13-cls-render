import React, { useEffect, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import { fetchPropertiesExtranet } from '@/redux/thunk/property';
import { Cards } from './Cards/cards';
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { PropertyStatuses } from "@/utils/Constants/Enums/PropertyStatuses"
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Calendar: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchPropertiesExtranet())
            .then(
                () => {
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            )
    }, [])

    return(
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" component="h1" className="MuiTypography-captain">Календарь</Typography>

                {isLoaded ? (
                    !error ? (
                        state.property.properties.filter((business: any) => business.status === PropertyStatuses.active || business.status === PropertyStatuses.inactive).length !== 0 ? (
                            <>
                                <Cards/>
                            </>
                        ) : (
                            <>
                                <InfoWindowEmpty firstRow={'Нет объявлений'}/>
                            </>
                        )
                    ) : (
                            <div>{error}</div>
                        )
                ) : (
                    <SimpleLoader />
                )}
            </Box>
        </>
    )
}
