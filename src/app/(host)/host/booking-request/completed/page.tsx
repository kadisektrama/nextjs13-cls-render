'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Completed } from "@/components/templates/extranet/desktop/Bookings/Completed/completed";
import { Completed as CompletedMobile } from "@/components/templates/extranet/mobile/Bookings/Completed/completed";

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Completed /> : <CompletedMobile />}
		</div>
	)
}
