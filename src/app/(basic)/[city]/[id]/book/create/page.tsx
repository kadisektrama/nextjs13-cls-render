'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Book } from "@/components/templates/desktop/business/Book/book"
import { Book as BookMobile } from "@/components/templates/mobile/business/Book/book"
import { useRouter } from "next/navigation" 

export const dynamic = 'force-dynamic'

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })
    const router = useRouter()

	return (
		<div>
			{isDesktop ? <Book /> : <BookMobile />}
		</div>
	)
}