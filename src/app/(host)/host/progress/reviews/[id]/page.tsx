'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { Content } from "@/components/templates/extranet/desktop/Progress/Reviews/reviews";
import { View } from "@/components/templates/extranet/mobile/Progress/Reviews/View/view";

export default function Home() {
	const [isDesktop, setIsDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' })); 

	return (
		<div>
			{isDesktop ? <Content /> : <View />}
		</div>
	)
}
