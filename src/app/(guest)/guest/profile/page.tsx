'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import dynamic from 'next/dynamic'

const ProfileMobile = dynamic(() =>
  import('@/components/templates/secure/mobile/Profile/profile').then((mod) => mod.Profile), {ssr: false}
)

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? 'test' : <ProfileMobile />}
		</div>
	)
}
