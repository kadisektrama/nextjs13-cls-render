'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Cancelled } from "@/components/templates/extranet/desktop/Bookings/Cancelled/cancelled";
import { Cancelled as CancelledMobile } from "@/components/templates/extranet/mobile/Bookings/Cancelled/cancelled";

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Cancelled /> : <CancelledMobile />}
		</div>
	)
}
