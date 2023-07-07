import * as React from "react";

import { Divider } from "@mui/material";
import List from "@mui/material/List";

import { BusinessCard as Card } from "./Card/card";
import { PropertyStatuses } from "@/utils/Constants/Enums/PropertyStatuses"
import { useAppSelector } from "@/redux/hooks/hooks";

export const Cards: React.FC = () => {
    const state = useAppSelector(state => state)

    return(
        <List sx={{ pt:0, pb: 8 }}>
            <Divider component="li" />

            {state.property.properties && state.property.properties.filter((business: any, index: any) => business.status === PropertyStatuses.active || business.status === PropertyStatuses.inactive).map((business: any, index: any) => (
                <Card key={business.id} property={business} />
            ))}
        </List>
    )
}