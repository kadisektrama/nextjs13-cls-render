'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Review } from "@/components/templates/secure/desktop/Reservations/Review/review"
import { Review as ReviewMobile } from "@/components/templates/secure/mobile/Reservations/Review/review"

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Review /> : <ReviewMobile />}
		</div>
	)
}
