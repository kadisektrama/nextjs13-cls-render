import Box from "@mui/material/Box";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import * as React from "react";
import Typography from "@mui/material/Typography";

export const InfoWindowEmpty: React.FC<{firstRow: any, secondRow?: any}> = (props) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: '18px',
                flexDirection: 'column',
                width: '100%',
                height: 272,
                backgroundColor: '#f7f7f7',
                '&:hover': {
                    backgroundColor: '#f7f7f7',
                    //opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            <AssignmentTurnedInOutlinedIcon sx={{ fontSize: "2.25rem", mb: "1rem", color: "text.secondary" }} />
            <Typography component="div" variant="body2" sx={{ textAlign: "center" }}>
                {props.firstRow}<br/>{props.secondRow}
            </Typography>
        </Box>
    )
}