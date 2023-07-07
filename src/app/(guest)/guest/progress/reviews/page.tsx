'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Reviews } from "@/components/templates/secure/desktop/Progress/Reviews/reviews"
import { Reviews as ReviewsMobile } from "@/components/templates/secure/mobile/Progress/Reviews/reviews"

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Reviews /> : <ReviewsMobile />}
		</div>
	)
}
