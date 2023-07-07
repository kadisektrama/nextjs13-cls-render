'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Chat as ChatMobile } from "@/components/templates/extranet/mobile/Inbox/Chat/chat";
import { Content } from "@/components/templates/extranet/desktop/Inbox/inbox";

export default function Home() {
	const [isDesktop, setIsDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' })); 

	return (
		<div>
			{isDesktop ? <Content /> : <ChatMobile />}
		</div>
	)
}
