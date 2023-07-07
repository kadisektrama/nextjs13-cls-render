'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Reviews } from "@/components/templates/secure/desktop/Progress/Reviews/reviews"
import { View as ViewMobile } from "@/components/templates/secure/mobile/Progress/Reviews/View/view"

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Reviews /> : <ViewMobile />}
		</div>
	)
}
