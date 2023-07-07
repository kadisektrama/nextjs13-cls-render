import React from "react";
import { useState} from 'react';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Button from "@mui/material/Button";

import { ModalWindow } from "./ModalWindow/modalWindow";

export const Rules: React.FC = () => {
    const [openModalWindow, setOpenModalWindow] = useState(false);

    return (
        <div>
            <Stack
                spacing={2}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '10px', marginLeft: '10px', marginTop: '16px' }}>
                    <div>
                        <Typography component="div" variant="h6" gutterBottom>
                            Правила размещения
                        </Typography>
                    </div>
                    <>
                        <Button variant="text" sx={{ textDecoration: 'underline', color: 'black', textTransform: 'none' }} onClick={() => setOpenModalWindow(true)}>Редактировать<KeyboardArrowRightOutlinedIcon /></Button>
                    </>
                </div>
                <Divider />
            </Stack>

            <ModalWindow open={openModalWindow} handleClose={() => setOpenModalWindow(false)} />
        </div>
    )
}