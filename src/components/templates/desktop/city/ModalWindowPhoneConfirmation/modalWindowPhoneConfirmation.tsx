import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { setIsEmptyPhone } from "@/redux/slices/internalSystem";

import {
    ModalWindowPhoneConfirmationComponent
} from "../../../../Screens/ModalWindowPhoneConfirmationComponent/modalWindowPhoneConfirmationComponent";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    minHeight: 500,
    //height: '600px',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
};

export function ModalWindowPhoneConfirmation() {
    const isEmptyPhone = useAppSelector((state) => state.internalSystem.isEmptyPhone)
	const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setIsEmptyPhone(false))
    }

    return (
        <>
            <Modal
                open={isEmptyPhone}
                onClose={handleClose}
            >
                <div>
                    <ModalWindowPhoneConfirmationComponent                        
                        style={style}
                        header={
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton
                                        sx={{ m: 1 }}
                                        color="inherit"
                                        onClick={handleClose}
                                        aria-label="close"
                                    >
                                        <CloseIcon />
                                    </IconButton>

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                                        <span style={{ fontWeight: 600 }}>Создайте профиль</span>
                                    </div>

                                    <div style={{ width: 57.5 }}></div>
                                </div>
                                <Divider />
                            </div>
                        }
                    />
                </div>
            </Modal>
        </>
    );
}