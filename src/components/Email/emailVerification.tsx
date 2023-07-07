import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

import { getUserEmailVerify } from "@/api/commonApi";

export const EmailVerification: React.FC = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (Cookies.get('token')) {
            getUserEmailVerify(searchParams.get('expires'), searchParams.get('signature'))
                .then(() => window.location = (window.location.protocol === 'https:' ? process.env.REACT_APP_SECURE + "/account-settings" : process.env.REACT_APP_LOCAL_SECURE + "/account-settings") as unknown as Location)
        } else {
            let isRedirect = window.confirm('Вы не авторизованы. Хотите авторизироваться?')
            if (isRedirect) {
                window.location = ((window.location.protocol === 'https:' ? process.env.REACT_APP_BASIC : process.env.REACT_APP_LOCAL_BASIC) + '/login') as unknown as Location;
            } else {
                window.location = (window.location.protocol === 'https:' ? process.env.REACT_APP_BASIC : process.env.REACT_APP_LOCAL_BASIC) as unknown as Location;
            }
        }
    }, [])

    return (
        <>

        </>
    )
}

export default EmailVerification