import { useState, memo } from "react";

import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";

import { ModalWindow } from "./ModalWindow/modalWindow";
import { useAppSelector } from "@/redux/hooks/hooks";

export const Amenities = () => {
    const [openModalWindow, setOpenModalWindow] = useState(false);
    const { property: {property: {amenities}}, amenityCategory: {amenityCategories} } = useAppSelector(state => state)

    return (
        <>
            <div>
                <Typography component="div" variant="h6">Какие удобства вас ждут</Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {amenities.filter((amenity: any) => amenity.is_popular === true).slice(0, 10).map((amenity: any) => (
                        <div key={amenity.id} style={{ padding: '10px', flex: '0 0 50%', display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: amenities?.find((item: any) => (item.id === amenity.id && item.status === true)) ? 'none' : 'line-through' }}>
                            <Avatar src={amenity.icon?.url} sx={{ borderRadius: 0, marginRight: '20px', width: '32px', height: '32px' }}>-</Avatar>
                            <div>{amenity.name}</div>
                        </div>
                    ))}
                </div>

                <Button variant="outlined" sx={{ borderColor: 'black', color: 'black', marginTop: '10px' }} onClick={() => setOpenModalWindow(true)}>Посмотреть все удобства: {amenities?.filter((amenity: any) => amenity.status === true)?.length}</Button>
            </div>

            <ModalWindow amenityCategories={amenityCategories} amenities={amenities} open={openModalWindow} handleClose={() => setOpenModalWindow(false)} />
        </>
    )
}