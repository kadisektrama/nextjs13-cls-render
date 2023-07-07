import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchCalculatePrice } from '@/redux/thunk/property';
import { diffDates } from "@/utils/Helpers/Date/date";
import { Calendar } from "@/components/Property/Calendar/calendar"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
};

export const ModalWindowDate: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const {id} = useParams();
    const searchParams = useSearchParams();
    const [initData, setInitData] = useState({})

    useEffect(() => {
        setInitData({
            start_date: searchParams.get('start_date'),
            end_date: searchParams.get('end_date')
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSave = () => {
        // setSearchParams({
        //     ...Object.fromEntries([...searchParams]),
        // })

        dispatch(fetchCalculatePrice({id: id, start_date: searchParams.get('start_date'), end_date: searchParams.get('end_date'), guests: { adults: searchParams.get('adults') || 1, children: searchParams.get('children') || 0 }}))
        props.setOpenModalWindow('')
    }

    const handleCancel = () => {
        // setSearchParams({
        //     ...Object.fromEntries([...searchParams]),
        //     start_date: initData.start_date,
        //     end_date: initData.end_date
        // })

        props.setOpenModalWindow('')
    }

    const difDates = (searchParams.get('start_date') && searchParams.get('end_date') !== searchParams.get('start_date')) && diffDates(searchParams.get('start_date'), searchParams.get('end_date'))

    return (
        <>
            <Modal
                open={props.open}
                onClose={handleCancel}
            >
                <Box sx={style}>
                    <IconButton
                        sx={{ m: 1 }}
                        color="inherit"
                        onClick={handleCancel}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Stack
                        spacing={2}
                    >
                        <Calendar months={2} />
                        <Divider />
                        <Box sx={{ paddingLeft: '40px', paddingRight: '40px', paddingBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button
                                variant="text"
                                onClick={handleCancel}
                                disabled={searchParams.get('start_date') === "undefined" || searchParams.get('end_date') === "undefined"}
                            >
                                Отменить
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleSave}
                                disabled={!(difDates && (state.property.property.rules?.min_stay_days || 0) <= difDates)}
                            >
                                Сохранить
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}