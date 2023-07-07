import React from 'react';
import Link from "next/link";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography } from "@mui/material";

function handleClick(event: any) {
    event.preventDefault();
}

export const Breadcrumb: React.FC<any> = ({ name }) => {
    return (
        <div role="presentation" style={{ padding: "4px", color: "#0071c2", fontSize: "12px" }} onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href={'/'} style={{ color: 'inherit' }}>
                    Главная
                </Link>
                <Link href={'/brest'} style={{ color: 'inherit' }}>
                    Брест
                </Link>
                <Typography color="text.primary">{name}</Typography>
            </Breadcrumbs>
        </div>
    );
}
