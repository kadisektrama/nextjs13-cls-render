import * as React from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 880,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
};

export const ModalWindow: React.FC<any> = (props) => {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <Box sx={style}>
                    <IconButton
                        sx={{ m: 1 }}
                        color="inherit"
                        onClick={props.handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ paddingLeft: '40px', paddingRight: '40px', fontSize: '14px' }}>
                        <Stack
                            spacing={1}
                        >
                            <Typography sx={{ fontWeight: 700 }} variant="h6" component="h5" gutterBottom>Спальня</Typography>
                            <div>Количество кроватей в каждом объявлении основано на выбранных параметрах</div>
                            <Stack
                                spacing={3}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>Двухспальная кровать</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>Диван</div>
                                </div>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}