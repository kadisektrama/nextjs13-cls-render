'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Calendar } from "@/components/templates/extranet/desktop/Calendar/calendar"
import { Calendar as CalendarMobile } from "@/components/templates/extranet/mobile/Calendar/calendar"

export default function Home() {
	const [isDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' }))

	return (
		<div>
			{isDesktop ? <Calendar /> : <CalendarMobile />}
		</div>
	)
}
