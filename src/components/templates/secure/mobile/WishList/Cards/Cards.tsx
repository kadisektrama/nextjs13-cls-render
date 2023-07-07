import * as React from 'react';

import { Divider } from "@mui/material";
import List from "@mui/material/List";

import { Card } from "./Card/Card";
import { useAppSelector } from '@/redux/hooks/hooks';

export const Cards: React.FC = () => {
    const state = useAppSelector(state => state)

    return(
        <List sx={{ pb: 8 }}>
            <Divider component="li" />

            {state.propertyFavourite.propertyFavourites.map((business: any, index: any) => (
                <Card key={business.id} { ...business } />
            ))}
        </List>
    )
}
