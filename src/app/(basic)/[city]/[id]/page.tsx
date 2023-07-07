'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Business } from "@/components/templates/desktop/business/business"
import { Business as BusinessMobile } from "@/components/templates/mobile/business/business"
import { useRouter } from "next/navigation" 

export const dynamic = 'force-dynamic'

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })
    const router = useRouter()

	return (
		<div>
			{isDesktop ? <Business /> : <BusinessMobile />}
		</div>
	)
}
