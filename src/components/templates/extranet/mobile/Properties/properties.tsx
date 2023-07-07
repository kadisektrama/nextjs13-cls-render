import React, { useEffect, useState } from "react"
import Link from "next/link";

import Grid from "@mui/material/Grid";
import { AddCircleOutline } from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";

import { fetchPropertiesExtranet } from '@/redux/thunk/property';
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { Cards } from "./Cards/cards";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import {
    ModalWindowPropertyCreatingThankful
} from "@/components/Modals/ModalWindowPropertyCreatingThankful/modalWindowPropertyCreatingThankful";
import { PropertyStatuses } from "@/utils/Constants/Enums/PropertyStatuses"
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Properties: React.FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([dispatch(fetchPropertiesExtranet())])
            .then(
                () => {
                    setIsLoaded(true);
                },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                }
            )
    }, [])

    return (
        <AccountHeader
            name={`${isLoaded && state.property.properties ? state.property.properties.filter((item: any) => item.status === PropertyStatuses.inactive || item.status === PropertyStatuses.active).length : 0} ${getNoun((isLoaded && state.property.properties ? state.property.properties.filter((item: any) => item.status === PropertyStatuses.inactive || item.status === PropertyStatuses.active).length : 5), 'объявление', 'объявления', 'объявлений')}`}
            endElement={
                <Link href="/host/properties/create">
                    <IconButton aria-label="add_circle_outline">
                        <AddCircleOutline />
                    </IconButton>
                </Link>
            }
        >
            {isLoaded && state.property.properties ? (
                <div>
                    {state.property.properties.length ? (
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

            <ModalWindowPropertyCreatingThankful />
        </AccountHeader>
    )
}


