import React from "react";
import Link from "next/link";

import { Button, Modal, Box } from "@mui/material";

import { useAppSelector } from "@/redux/hooks/hooks";
import { setPropertyWasCreated } from "@/redux/slices/internalSystem";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    fontSize: '16px',
};

export const ModalWindowPropertyCreatingThankful: React.FC = () => {
    const state = useAppSelector(state => state)
    
    const handleClose = () => {
        setPropertyWasCreated(null);
    }

    return (
        <>
            <Modal
                open={!!state.internalSystem.propertyWasCreated}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '16px' }}>
                        <div>Ваше объявление успешно создано!</div>
                        <div>Вы можете посмотреть его по ссылке</div>
                        <div><Link style={{ textDecoration: 'underline' }} href={`/${state.internalSystem.propertyWasCreated?.region}/${state.internalSystem.propertyWasCreated?.id}`}>{`${window.location.origin}/${state.internalSystem.propertyWasCreated?.region}/${state.internalSystem.propertyWasCreated?.id}`}</Link></div>
                        <Button variant="contained" sx={{ mt: 1 }} onClick={handleClose}>Закрыть</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}