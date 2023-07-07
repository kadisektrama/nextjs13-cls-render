import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import 'antd/dist/antd.min.css';

import { ModalWindow } from "./ModalWindow/modalWindow";
import { Room } from "./Room/room";
import { updateProperty } from "@/api/extranet";
import { fetchPropertyExtranet } from '@/redux/thunk/property';
import { useAppDispatch } from '@/redux/hooks/hooks';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const RoomsAndSpaces: React.FC<any> = (props) => {
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);

    let {id} = useParams();

    useEffect(() => {
        dispatch(fetchPropertyExtranet(id))
            .then(
                () => {
                    setIsLoaded(true);
                },
                () => {
                    setIsLoaded(true);
                }
            )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleSubmitUpdate = () => {
        updateProperty(props, id);
    };

    return (
        <>
            {isLoaded && (
                <>
                    <Link href={`/host/properties/${id}/update`}>
                        <Button variant="text" sx={{ textDecoration: 'underline', color: 'black' }}><KeyboardArrowLeftIcon />Редактировать: {props.property.name}</Button>
                    </Link>

                    <Stack spacing={2}>
                        <Typography component="div" variant="h5" gutterBottom>
                            Комнаты и помещения
                        </Typography>

                        <div>
                            Добавьте или отредактируйте помещения, которые смогут использовать гости, а также отметьте все помещения, которые будут в общем пользовании
                        </div>

                        <Item>
                            <div>Спальня({props.property.roomsAndSpaces.summary.number_of_bedrooms}) &#183; Ванная({props.property.roomsAndSpaces.summary.number_of_bathrooms})</div>
                            <Button variant="text" sx={{ textDecoration: 'underline', color: 'black' }} onClick={() => handleOpen()}>Редактировать комнаты и помещения</Button>
                        </Item>

                        {props.property.roomsAndSpaces.bedrooms_info.map((item: any, index: any) => (
                            <Room item={item} props={props} index={index} key={index} />
                        ))}

                        <Button
                            variant="contained"
                            onClick={handleSubmitUpdate}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Обновить
                        </Button>
                    </Stack>


                    <ModalWindow {...props} open={open} handleClose={handleClose} />
                </>
            )}
        </>
    );
};