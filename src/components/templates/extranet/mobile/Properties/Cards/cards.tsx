import React from "react"

import List from "@mui/material/List";
import { Divider } from "@mui/material";

import { Card } from './Card/card';
import { PropertyStatuses } from "@/utils/Constants/Enums/PropertyStatuses";
import { useAppSelector } from "@/redux/hooks/hooks";

export const Cards: React.FC = () => {
    const state = useAppSelector(state => state)

    return(
        <List sx={{ pt:0, pb: 8 }}>
            <Divider component="li" />

            {state.property.properties && state.property.properties.filter((item: any) => item.status === PropertyStatuses.inactive || item.status === PropertyStatuses.active).map((property: any, index: any) => (
                <div key={index}>
                    <Card property={property} />
                </div>
                ))}
        </List>
    )
}


