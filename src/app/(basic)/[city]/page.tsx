'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { City } from "@/components/templates/desktop/city/city"
import { City as CityMobile } from "@/components/templates/mobile/city/city"

//export const dynamic = 'force-dynamic'

export default function Home() {
	const [isDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' }))

	return (
		<>
			<React.Suspense fallback={null}>
				{isDesktop ? <City /> : <CityMobile />}
			</React.Suspense>
		</>
	)
}
