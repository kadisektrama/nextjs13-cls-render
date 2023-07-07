'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
//import { Profile } from "@/components/templates/extranet/desktop/Profile/profile";
import { Profile as ProfileMobile } from "@/components/templates/extranet/mobile/Profile/profile"

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? '' : <ProfileMobile />}
		</div>
	)
}
