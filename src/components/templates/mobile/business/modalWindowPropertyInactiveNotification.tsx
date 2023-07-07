import { Modal, Box, IconButton, Divider } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    fontSize: '16px',
    width: '90%'
};

export function ModalWindowPropertyInactiveNotification({isOpen, setIsOpen}: any) {
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <Box sx={{ ...style }}>
                <IconButton
                    sx={{ m: 1 }}
                    color="inherit"
                    onClick={() => setIsOpen(false)}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                <Divider />
                
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '16px', color: 'red' }}>
                    <div>Этот объект на данный момент нельзя забронировать. Подберите, пожалуйста, для себя другое жилье.</div>
                </div>
            </Box>
        </Modal>
    );
}