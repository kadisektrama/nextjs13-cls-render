'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Reviews as ReviewsMobile } from "@/components/templates/extranet/mobile/Progress/Reviews/reviews"

export default function Home() {
    const [isDesktop, setIsDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' })); 

	return (
		<div>
			{isDesktop ? '' : <ReviewsMobile />}
		</div>
	)
}
