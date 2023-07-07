import { BottomSheet } from "react-spring-bottom-sheet";
import 'react-spring-bottom-sheet/dist/style.css';

import { ModalWindowPhoneConfirmationComponent } from "@/components/Screens/ModalWindowPhoneConfirmationComponent/modalWindowPhoneConfirmationComponent";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { setIsEmptyPhone } from "@/redux/slices/internalSystem";

export function ModalWindowPhoneConfirmation() {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setIsEmptyPhone(false))
    }

    return (
        <>
            <BottomSheet
                open={state.internalSystem.isEmptyPhone}
                onDismiss={handleClose}
                blocking={false}
                snapPoints={({maxHeight }) => [
                    maxHeight - 80,
                ]}
            >
                <div style={{ zIndex: 999 }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                        <span style={{ fontWeight: 600 }}>Создайте профиль</span>
                    </div>
                    <ModalWindowPhoneConfirmationComponent />
                </div>
            </BottomSheet>
        </>
    );
}