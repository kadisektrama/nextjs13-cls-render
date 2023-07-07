"use client"

import React from "react"

import { useMediaQuery } from "react-responsive";
import { Inbox } from "@/components/templates/extranet/desktop/Inbox/inbox";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
    const [isDesktop, setIsDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' })); 

	return (
        <>
            {isDesktop ? <Inbox>{children}</Inbox> : children}
        </>
  	)
}
