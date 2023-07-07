import { CircularProgress } from "@material-ui/core";
import Box from "@mui/material/Box";
import React from "react";

export const SimpleLoader: React.FC = () => {
    return(
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                borderColor: "#e7e7e7",
            }}
        >
            <CircularProgress disableShrink/>
        </Box>
    )
}