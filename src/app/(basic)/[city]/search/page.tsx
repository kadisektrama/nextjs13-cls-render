'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { CitySearch } from "@/components/templates/mobile/citySearch/citySearch"
import { useRouter } from "next/navigation" 

export const dynamic = 'force-dynamic'

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })
    const router = useRouter()

    isDesktop && router.push('/brest')

	return (
		<div>
			{isDesktop ? '' : <CitySearch />}
		</div>
	)
}
