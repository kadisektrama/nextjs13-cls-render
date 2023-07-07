'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react';
import { Upcoming } from "@/components/templates/extranet/desktop/Bookings/Upcoming/upcoming";
import { Upcoming as UpcomingMobile } from "@/components/templates/extranet/mobile/Bookings/Upcoming/upcoming";

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <Upcoming /> : <UpcomingMobile />}
		</div>
	)
}
