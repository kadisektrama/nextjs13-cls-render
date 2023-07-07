'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Confirmation } from "@/components/templates/desktop/business/Book/Confirmation/confirmation"
import { Confirmation as ConfirmationMobile } from "@/components/templates/mobile/business/Book/Confirmation/confirmation"
import { useRouter } from "next/navigation" 

export const dynamic = 'force-dynamic'

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })
    const router = useRouter()

	return (
		<div>
			{isDesktop ? <Confirmation /> : <ConfirmationMobile />}
		</div>
	)
}