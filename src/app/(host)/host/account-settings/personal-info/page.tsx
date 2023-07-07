'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { PersonalInfo } from "@/components/templates/extranet/desktop/AccountSettings/PersonalInfo/personalInfo";
import { PersonalInfo as PersonalInfoMobile } from "@/components/templates/extranet/mobile/AccountSettings/PersonalInfo/personalInfo";

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <PersonalInfo /> : <PersonalInfoMobile />}
		</div>
	)
}
