'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Update } from "@/components/templates/extranet/desktop/Properties/Update/update";
import { Update as UpdateMobile } from "@/components/templates/extranet/mobile/Properties/Update/update";

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{/*isDesktop ? <Reservations /> : <ReservationsMobile />*/}
		</div>
	)
}
