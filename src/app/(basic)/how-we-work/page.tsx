"use client"

import React from "react";
import dynamic from 'next/dynamic'

export const runtime = 'edge'
const HowWeWork = dynamic(() => import('@/components/Pages/HowWeWork/howWeWork'), { ssr: false })

const Main: React.FC = () => {

    return (
        <HowWeWork />
    )
}

export default Main