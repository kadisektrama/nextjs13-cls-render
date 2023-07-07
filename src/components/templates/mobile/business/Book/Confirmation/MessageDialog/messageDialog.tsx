import React, { useState } from 'react';
import { useSearchParams } from "next/navigation";
import { BottomSheet } from "react-spring-bottom-sheet";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

import { createChatChannel } from "@/api/commonApi";
import s from "./ButtomSheetCity.module.scss"
import { errorTranslator } from "@/utils/Constants/Error/errorValidator";
import { useAppSelector } from '@/redux/hooks/hooks';

export const ModalMessageDialog: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const searchParams = useSearchParams();
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [openAlertReject, setOpenAlertReject] = useState(false);

    const handleSubmit = () => {
        createChatChannel(state.property.property, message, searchParams.get('start_date'), searchParams.get('end_date'))
            .then(result => {
                setError(errorTranslator(result.message ? result.message : 'Сообщение отправлено'))
                result.status === 201 ? setOpenAlertSuccess(true) :  setOpenAlertReject(true);
            })

        setMessage('');
        props.handleClose();
    };

    return (
        <>
            <BottomSheet
                className={s.bottomSheet}
                open={props.open}
                onDismiss={() => props.handleClose()}
                blocking={false}
                snapPoints={({maxHeight }) => [
                    maxHeight / 1.8,
                ]}
            >
                <Box>
                    <IconButton
                        sx={{ m: 1 }}
                        color="inherit"
                        onClick={props.handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Stack
                        spacing={2}
                    >
                        <Box component="form" sx={{ pr: 3, pl: 3, mb: 8 }}>
                            <Typography variant="h6">
                                Есть вопросы? Напишите хозяину
                            </Typography>
                            <TextField
                                value={message}
                                name="message"
                                label="Введите сообщение"
                                id="message"
                                fullWidth
                                multiline
                                rows={4}
                                sx={{ my: 3 }}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button onClick={handleSubmit} variant="outlined" size="large">
                                Отправить сообщение
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </BottomSheet>

            <Snackbar open={openAlertSuccess} autoHideDuration={6000} onClose={() => setOpenAlertSuccess(false)}>
                <Alert onClose={() => setOpenAlertSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    {'Сообщение отправлено'}
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={() => setOpenAlertReject(false)}>
                <Alert onClose={() => setOpenAlertReject(false)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}