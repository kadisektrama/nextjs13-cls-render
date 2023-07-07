'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react';

import { useAppSelector } from "@/redux/hooks/hooks";
import { Content } from "@/components/templates/secure/desktop/Inbox/inbox";
import { Chat } from "@/components/templates/secure/mobile/Inbox/Chat/chat";

export default function Page() {
	const [isDesktop, setIsDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' })); 

	return (
		<>
			{isDesktop ? <Content /> : <Chat />}
		</>
	)
}