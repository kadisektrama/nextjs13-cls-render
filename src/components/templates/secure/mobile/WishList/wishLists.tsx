import React, { useEffect, useState } from 'react';

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { Cards } from "./Cards/Cards";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"
import { fetchPropertyFavourites } from "@/redux/thunk/propertyFavourite"

import Box from "@mui/material/Box";

export const WishLists: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)

    useEffect(() => {
        dispatch(fetchPropertyFavourites())
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <AccountHeader name={'Избранные'}>
            {isLoaded ? (
                state.propertyFavourite.propertyFavourites.length ? (
                    <Cards />
                ) : (
                    <Box sx={{ p: 3 }}>
                        <InfoWindowEmpty firstRow={'Нет избранных объявлений'}/>
                    </Box>
                )
            ) : <SimpleLoader />}
        </AccountHeader>
    );
}
