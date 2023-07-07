import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { updateBooking } from "@/api/extranet";

export const ApprovalDialogWindow: React.FC<any> = (props) => {
    const handleReject = (id: any) => {
        updateBooking(id, 'failed')
            .then(() => {
                props.uploadRequest()
            })
        props.handleClose();
        props.modalWindowClose();
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите отметить незаезд?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Отменить</Button>
                    <Button onClick={() => handleReject({id: props.id})} autoFocus>Подтвердить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}