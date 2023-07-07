'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { WishLists } from "@/components/templates/secure/desktop/WishList/wishLists"
import { WishLists as WishListsMobile } from "@/components/templates/secure/mobile/WishList/wishLists"
import { useRouter } from "next/navigation" 

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })
    const router = useRouter()

	return (
		<div>
			{isDesktop ? <WishLists /> : <WishListsMobile />}
		</div>
	)
}
