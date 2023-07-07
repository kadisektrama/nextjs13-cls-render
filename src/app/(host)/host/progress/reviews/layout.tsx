"use client"

import React from "react"

import { useMediaQuery } from "react-responsive";
import { Reviews } from "@/components/templates/extranet/desktop/Progress/Reviews/reviews"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
    const [isDesktop, setIsDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' })); 

	return (
        <>
            {isDesktop ? <Reviews>{children}</Reviews> : ''}
        </>
  	)
}
