import * as React from 'react';
import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/lab";
import { Snackbar } from "@material-ui/core";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContentText from '@mui/material/DialogContentText';
import {PhoneTwoTone} from "@ant-design/icons";

export function DialogWindowCode(props) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpenAlert(false);
    };

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.countryCallingCode === '+7' ? (
                        "Вам поступит звонок"
                    ) : (
                        "Код подтверждения"
                    )}
                </DialogTitle>
                <DialogContent>
                    {props.countryCallingCode === '+7' && (
                        <DialogContentText id="alert-dialog-description">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '8px', marginBottom: '12px' }}>
                                <PhoneTwoTone style={{ fontSize: '28px' }} twoToneColor="#14a800" rotate={90} />
                                <b><span style={{ color: 'grey' }}>+7 000 000 0</span><span style={{ color: 'black' }}>1 23</span></b>
                            </div>
                            <div>Введите в поле последние 3 цифры номера, с которого Вам позвонят</div>
                        </DialogContentText>
                    )}
                    <TextField
                        required
                        fullWidth
                        sx={{ mt: 1 }}
                        defaultValue={''}
                        id="code"
                        label="Код"
                        name="code"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Отмена</Button>
                    <Button onClick={() => {
                        props.handleSubmitPin();
                    }} autoFocus>
                        Отправить
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={props.openAlert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Неправильный код
                </Alert>
            </Snackbar>
        </>
    );
}