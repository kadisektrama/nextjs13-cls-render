'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Update } from "@/components/templates/extranet/desktop/Calendar/Update/update"
import { Update as UpdateMobile } from "@/components/templates/extranet/mobile/Calendar/Update/update"

export default function Home() {
	const [isDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' }))

	return (
		<div>
			{isDesktop ? <Update /> : <UpdateMobile />}
		</div>
	)
}
