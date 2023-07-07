import React from 'react';

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

export const AccountHeader: React.FC<any> = (props) => {
    return (
        <>
            <Box sx={{
                p: 2,
                pt: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                {props.startElement && props.startElement}

                <Typography component="h1" variant="h5">
                    {props.name}
                </Typography>

                {props.endElement && props.endElement}
            </Box>

            <div style={{ paddingBottom: '70px' }}>
                {props.children}
            </div>
        </>
    );
}
