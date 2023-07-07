'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Create } from "@/components/templates/extranet/desktop/Properties/Create/create"
import { Create as CreateMobile } from "@/components/templates/extranet/mobile/Properties/Create/create"

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Create /> : <CreateMobile />}
		</div>
	)
}
