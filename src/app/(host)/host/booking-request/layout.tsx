"use client"

import React from "react"

import { useMediaQuery } from "react-responsive";
import { BookingRequest } from "@/components/templates/extranet/desktop/Bookings/bookingRequest";
import { BookingRequest as BookingRequestMobile } from "@/components/templates/extranet/mobile/Bookings/bookingRequest"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
    const [isDesktop, setIsDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' })); 

	return (
        <>
            {isDesktop ? <BookingRequest>{children}</BookingRequest> : <BookingRequestMobile>{children}</BookingRequestMobile>}
        </>
  	)
}
