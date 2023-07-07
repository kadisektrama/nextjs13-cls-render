'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { AccountSettings } from "@/components/templates/secure/desktop/AccountSettings/accountSettings"
import { AccountSettings as AccountSettingsMobile } from "@/components/templates/secure/mobile/AccountSettings/accountSettings"

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <AccountSettings /> : <AccountSettingsMobile />}
		</div>
	)
}
