import { BottomSheet } from "react-spring-bottom-sheet";
import 'react-spring-bottom-sheet/dist/style.css';

import {
    ModalWindowPhoneConfirmationComponent
} from "@/components/Screens/ModalWindowPhoneConfirmationComponent/modalWindowPhoneConfirmationComponent";

export const ModalWindowPhoneConfirmation: React.FC<any> = (props) => {
    return (
        <>
            <BottomSheet
                open={props.open}
                onDismiss={() => props.handleClose()}
                blocking={false}
                snapPoints={({maxHeight }) => [
                    maxHeight - 80,
                ]}
            >
                <div style={{ zIndex: 999 }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                        <span style={{ fontWeight: 600 }}>Создайте профиль</span>
                    </div>
                    <ModalWindowPhoneConfirmationComponent {...props} />
                </div>
            </BottomSheet>
        </>
    );
}