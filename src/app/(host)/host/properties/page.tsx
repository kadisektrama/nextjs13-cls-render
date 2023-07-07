'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import dynamic from 'next/dynamic'

const Properties = dynamic(() =>
  import("@/components/templates/extranet/desktop/Properties/properties").then((mod) => mod.Properties), {ssr: false}
)
const PropertiesMobile = dynamic(() =>
  import("@/components/templates/extranet/mobile/Properties/properties").then((mod) => mod.Properties), {ssr: false}
)

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Properties /> : <PropertiesMobile />}
		</div>
	)
}
