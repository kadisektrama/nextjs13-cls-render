'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { PageAmenities } from "@/components/templates/extranet/desktop/Properties/Update/PageAmenities/pageAmenities";
import { PageAmenities as PageAmenitiesMobile } from "@/components/templates/extranet/mobile/Properties/Update/PageAmenities/pageAmenities";

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <PageAmenities /> : <PageAmenitiesMobile />}
		</div>
	)
}
