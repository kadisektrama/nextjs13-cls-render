import { useState } from "react";

import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";

import { ModalWindow } from "./ModalWindow/modalWindow";
import { useAppSelector } from "@/redux/hooks/hooks";

export const Amenities: React.FC = () => {
    const [openModalWindow, setOpenModalWindow] = useState(false);
    const property = useAppSelector(state => state.property.property)

    return (
        <div style={{ padding: '24px' }}>
            <div>
                <Typography variant="h6" component="div">Какие удобства вас ждут</Typography>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {property.amenities.filter((amenity: any) => amenity.is_popular === true).slice(0, 10).map((amenity: any) => (
                        <div key={amenity.id} style={{ padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: property.amenities?.find((item: any) => (item.id === amenity.id && item.status === true)) ? 'none' : 'line-through' }}>
                            <Avatar src={amenity.icon?.url} sx={{ borderRadius: 0, marginRight: '20px', width: '32px', height: '32px' }}>-</Avatar>
                            <div>{amenity.name}</div>
                        </div>
                    ))}
                </div>

                <Button variant="outlined" sx={{ borderColor: 'black', color: 'black', marginTop: '10px' }} onClick={() => setOpenModalWindow(true)}>Посмотреть все удобства: {property.amenities?.filter((amenity: any) => amenity.status === true)?.length}</Button>
            </div>

            <ModalWindow open={openModalWindow} handleClose={() => setOpenModalWindow(false)} />
        </div>
    )
}