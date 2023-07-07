import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import Stack from "@mui/material/Stack";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import Button from "@mui/material/Button";

import { getNoun } from "@/utils/Helpers/Translator/translator";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchCalculatePrice } from '@/redux/thunk/property';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
};

export const ModalWindowGuest: React.FC<any> = (props) => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const searchParams = useSearchParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [adults, setAdults] = useState(searchParams.get('adults') || 1);
    const [children, setChildren] = useState(searchParams.get('children') || 0);
    const [infants, setInfants] = useState( searchParams.get('infants') || 0);
    const [pets, setPets] = useState(searchParams.get('pets') || 0);

    let { id } = useParams();

    useEffect(() => {
        setIsLoaded(true);
    }, [])

    return (
        <>
            {isLoaded && (
                <Modal
                    open={props.open}
                    onClose={() => props.setOpenModalWindow('')}
                >
                    <Box sx={style}>
                        <IconButton
                            sx={{ m: 1 }}
                            color="inherit"
                            onClick={() => props.setOpenModalWindow('')}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Stack
                            spacing={2}
                        >
                            <Box sx={{ paddingLeft: '40px', paddingRight: '40px' }}>
                                <div style={{ fontSize: '15px' }}>Гости</div>
                            </Box>
                            <Box sx={{ paddingLeft: '40px', paddingRight: '40px' }}>
                                <Typography component="div" variant="caption">
                                    Жилье рассчитано максимум на {state.property.property.guests + state.property.property.additional_guests} {getNoun(state.property.property.guests + state.property.property.additional_guests, 'гостя', 'гостей', 'гостей')}.
                                </Typography>
                            </Box>
                            <Stack spacing={1}>
                                <Box sx={{ paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '15px' }}>Взрослые</span>
                                        <Typography variant="body2" component="h2" color="text.secondary">
                                            {"От 13 лет"}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setAdults(+adults - 1)} disabled={+adults === 1}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{adults}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setAdults(+adults + 1)} disabled={+children + +adults === state.property.property.guests + state.property.property.additional_guests}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </Box>
                                <Box sx={{ paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '15px' }}>Дети</span>
                                        <Typography variant="body2" component="h2" color="text.secondary">
                                            {"2-12 лет"}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setChildren(+children - 1)} disabled={+children === 0}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{children}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setChildren(+children + 1)} disabled={+children + +adults === state.property.property.guests + state.property.property.additional_guests}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </Box>
                                <Box sx={{ paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '15px' }}>Младенцы</span>
                                        <Typography variant="body2" component="h2" color="text.secondary">
                                            {"Младше 2 лет"}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setInfants(+infants - 1)} disabled={+infants === 0}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{infants}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setInfants(+infants + 1)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </Box>
                                <Box sx={{ paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontSize: '15px' }}>Питомцы</div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setPets(+pets - 1)} disabled={+pets === 0}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{pets}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setPets(+pets + 1)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </Box>
                            </Stack>
                            <Divider />
                            <Box sx={{ paddingLeft: '40px', paddingRight: '40px', paddingBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Button
                                    variant="text"
                                    onClick={() => props.setOpenModalWindow('')}
                                >
                                    Отменить
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        // setSearchParams({
                                        //     ...Object.fromEntries([...searchParams]),
                                        //     adults: adults,
                                        //     children: children,
                                        //     infants: infants,
                                        //     pets: pets,
                                        // })
                                        dispatch(fetchCalculatePrice({id: id, start_date: searchParams.get('start_date'), end_date: searchParams.get('end_date'), guests: {adults: +adults, children: +children}}))

                                        props.setOpenModalWindow('')
                                    }}
                                >
                                    Сохранить
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Modal>
            )}
        </>
    );
}