import React, { useEffect, useState } from 'react';

import Grid from "@mui/material/Grid";

import { Cards } from './Cards/cards';
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { PropertyStatuses } from "@/utils/Constants/Enums/PropertyStatuses"
import { fetchPropertiesExtranet } from '@/redux/thunk/property';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';

export const Calendar: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchPropertiesExtranet())
            .then(
                () => {
                    setIsLoaded(true);
                },
                () => {
                    setIsLoaded(true);
                }
            )
    }, [])

    return(
        <AccountHeader name={'Календарь'}>
            {isLoaded && state.property.properties ? (
                <div>
                    {state.property.properties.filter((business: any, index: any) => business.status === PropertyStatuses.active || business.status === PropertyStatuses.inactive).length !== 0 ? (
                        <Cards />
                    ) : (
                        <InfoWindowEmpty firstRow={'Нет объявлений'} />
                    )}
                </div>
            ) : (
                <Grid item xs={9}>
                    <SimpleLoader />
                </Grid>
            )}
        </AccountHeader>
    )
}
