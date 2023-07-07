'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Reservations } from "@/components/templates/secure/desktop/Reservations/reservations"
import { Reservations as ReservationsMobile } from "@/components/templates/secure/mobile/Reservations/reservations"

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Reservations /> : <ReservationsMobile />}
		</div>
	)
}
