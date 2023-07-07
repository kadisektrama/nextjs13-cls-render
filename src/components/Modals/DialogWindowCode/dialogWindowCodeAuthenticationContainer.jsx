import { useState } from 'react';

import { verifyCode } from "@/api/commonApi";
import { DialogWindowCode } from "./dialogWindowCode";

export function DialogWindowCodeAuthenticationContainer(props) {
    const [openAlert, setOpenAlert] = useState(false);

    async function handleSubmitPin() {
        let body = {
            country_calling_code: props.countryCallingCode,
            phone: props.phone.substring(props.countryCallingCode.length),
            verify_code: document.getElementById('code').value,
        }

        let res = await verifyCode(body);

        if (res.status === 200) {
            props.setVerifyCode(document.getElementById('code').value)
            props.handleClose();
            props.setOpenModalWindow('registration');
        } else {
            setOpenAlert(true)
        }
    }

    return (
        <DialogWindowCode
            openAlert={openAlert}
            setOpenAlert={(value) => setOpenAlert(value)}
            handleSubmitPin={handleSubmitPin}
            {...props}
        />
    );
}