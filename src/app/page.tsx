'use client'

import React from 'react'
import { redirect } from 'next/navigation'

const Main: React.FC = () => {
    //const router = useRouter()

    React.useEffect(() => {
        redirect(`/brest${window.location.search}`)
    }, [])

    return (
        <div></div>
    )
}

export default Main
