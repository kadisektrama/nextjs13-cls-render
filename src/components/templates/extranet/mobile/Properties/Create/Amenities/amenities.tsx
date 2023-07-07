import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Button from "@mui/material/Button";

import { ModalWindow } from "./ModalWindow/modalWindow";
import { useAppSelector } from "@/redux/hooks/hooks";

export const Amenities: React.FC = () =>{
    const state = useAppSelector(state => state)
    const [openModalWindow, setOpenModalWindow] = useState(false);

    return (
        <div>
            <Stack
                spacing={2}
            >
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '10px', marginLeft: '10px' }}>
                    <div>
                        <Typography component="div" variant="h6" gutterBottom>
                            Удобства
                        </Typography>
                    </div>
                    <>
                        <Button variant="text" sx={{ textDecoration: 'underline', color: 'black', textTransform: 'none' }} onClick={() => setOpenModalWindow(true)}>Редактировать<KeyboardArrowRightOutlinedIcon /></Button>
                    </>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '10px', marginLeft: '10px', marginTop: 0 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        <div>
                            {state.amenity.amenities?.filter((amenity: any) => amenity.is_popular === true).slice(0, 8).map((amenity: any) => (
                                <div key={amenity.id}>{amenity.name}</div>
                            ))}
                        </div>
                    </Typography>
                </div>
                <Divider />
            </Stack>

            <ModalWindow open={openModalWindow} handleClose={() => setOpenModalWindow(false)} />
        </div>
    )
}