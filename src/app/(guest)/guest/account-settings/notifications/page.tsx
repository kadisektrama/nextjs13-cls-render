'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Notifications } from "@/components/templates/secure/desktop/AccountSettings/Notifications/notifications"
import { Notifications as NotificationsMobile } from "@/components/templates/secure/mobile/AccountSettings/Notifications/notifications"

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Notifications /> : <NotificationsMobile />}
		</div>
	)
}
