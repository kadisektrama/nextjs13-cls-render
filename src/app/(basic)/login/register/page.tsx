'use client'

import React from 'react';
import { redirect } from "next/navigation";
//import { useRouter } from 'next/navigation'

const Register: React.FC = () => {
    React.useEffect(() => {
        redirect('/login/sign-up')
    }, [])

    return (
        <div>
            test
        </div>
    )
}

export default Register