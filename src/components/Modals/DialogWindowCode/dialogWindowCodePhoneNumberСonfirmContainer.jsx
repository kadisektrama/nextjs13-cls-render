import { useState } from 'react';

import { addUserPhone, getUserPhones, verifyCode } from "@/api/commonApi";
import { DialogWindowCode } from "./dialogWindowCode";

export function DialogWindowCodePhoneNumberConfirmContainer(props) {
    const [openAlert, setOpenAlert] = useState(false)

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

            await addUserPhone(body)
            await getUserPhones(props)
        } else {
            setOpenAlert(true)
        }
    }

    return (
        <DialogWindowCode
            openAlert={openAlert}
            handleSubmitPin={handleSubmitPin}
            setOpenAlert={(value) => setOpenAlert(value)}
            {...props}
        />
    );
}