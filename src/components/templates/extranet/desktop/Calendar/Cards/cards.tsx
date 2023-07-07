import Stack from "@mui/material/Stack";
import React from "react";

import { BusinessCard as Card } from "./Card/card";
import { PropertyStatuses } from "@/utils/Constants/Enums/PropertyStatuses";
import { useAppSelector } from "@/redux/hooks/hooks";

export const Cards: React.FC = () => {
    const state = useAppSelector(state => state)

    return(
        <Stack
            direction="column"
            justifyContent="flex-start"
            spacing={3}
        >
            {state.property.properties.filter((business: any) => business.status === PropertyStatuses.active || business.status === PropertyStatuses.inactive).map((business: any, index: any) => (
                <div key={business.id}>
                    <Card key={index} { ...business } />
                </div>
            ))}
        </Stack>
    )
}