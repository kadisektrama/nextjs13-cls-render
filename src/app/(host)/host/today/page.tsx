'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Today } from "@/components/templates/extranet/desktop/Today/today"
import { Today as TodayMobile } from "@/components/templates/extranet/mobile/Today/today"

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Today /> : <TodayMobile />}
		</div>
	)
}
