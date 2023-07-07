"use client"

import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';
import { Footer } from './footer';
import { Header } from './header';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProviderContent } from '@/utils/Themes/provider';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUser } from "@/api/commonApi"
import { useMediaQuery } from "react-responsive";
import { Menu } from "@/components/templates/mobile/Menu/menu";
import { usePathname } from 'next/navigation';
import { themeContent } from '@/utils/Themes/themes'

//const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Kvartiranasutki',
	description: 'Квартиры на сутки по выгодным ценам',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [isDesktop, setIsDesktop] = useState(useMediaQuery({ query: '(min-width: 748px)' }))
	const pathname = usePathname()

	useEffect(() => {
		const fetchData = async () => {
			if (Cookies.get('token')) {
				const data = await getUser()

				if (data.payload?.message?.startsWith('Unauth')) {
					(document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.${window.location.protocol === 'https:' ? process.env.NEXT_PUBLIC_DOMAIN : process.env.NEXT_PUBLIC_LOCAL_DOMAIN};path=/`);
					window.location.reload()
				}
			}
		}
		fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

	return (
		<html lang="en" style={{ fontSize: '17px'}}>
			<body>
				<Providers>
					<div id="root" style={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column'
					}}>
						<header style={{ flex: '0 0 auto' }}>
							{isDesktop && <Header />}
						</header>
						<main style={{ flex: '1 0 auto' }}>
							<ThemeProviderContent>
								<>
									<CssBaseline />
									{children}
								</>		
							</ThemeProviderContent>
						</main>
						<footer style={{ flex: '0 0 auto' }}>
							{isDesktop && <Footer />}
							{!isDesktop && (pathname.includes('guest') || pathname.includes('host')) && <Menu />}
						</footer>
					</div>
				</Providers>
			</body>
    	</html>
  	)
}
