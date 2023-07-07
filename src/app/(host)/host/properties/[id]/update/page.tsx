'use client';

import { useMediaQuery } from "react-responsive";
import React from 'react'
import { PageRules } from "@/components/templates/extranet/desktop/Properties/Update/PageRules/pageRules";
import { PageRules as PageRulesMobile } from "@/components/templates/extranet/mobile/Properties/Update/PageRules/pageRules";

export default function Home() {
	const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

	return (
		<div>
			{isDesktop ? <PageRules /> : <PageRulesMobile />}
		</div>
	)
}
