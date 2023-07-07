'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Inbox } from "@/components/templates/extranet/mobile/Inbox/inbox"

export default function Home() {
	const [isDesktop, setIsDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' })); 

	return (
		<div>
			{isDesktop ? "" : <Inbox />}
		</div>
	)
}
