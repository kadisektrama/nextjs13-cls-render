'use client'

import React from 'react'
import { redirect } from 'next/navigation'

const Login: React.FC = () => {
    React.useEffect(() => {
        redirect('/login/sign-up')
    }, [])

    return (
        <div>test</div>
    )
}

export default Login