'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { All } from "@/components/templates/extranet/desktop/Bookings/All/all";
import { All as AllMobile } from "@/components/templates/extranet/mobile/Bookings/All/all";

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <All /> : <AllMobile />}
		</div>
	)
}
