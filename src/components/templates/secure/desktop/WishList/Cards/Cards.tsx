import React from 'react';

import Stack from "@mui/material/Stack";

import { Card } from "./Card/Card";
import { useAppSelector } from '@/redux/hooks/hooks';

export const Cards: React.FC = () => {
    const state = useAppSelector(state => state)

    return (
        <div>
            <Stack spacing={3}>
                {state.propertyFavourite.propertyFavourites.map((business: any, index: any) => (
                    <Card key={business.id} { ...business } />
                ))}
            </Stack>
        </div>
    )
}
