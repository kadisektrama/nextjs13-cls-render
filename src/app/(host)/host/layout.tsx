"use client"

import React from "react"

import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import s from "@/utils/Themes/reactComponents.module.scss"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
    const pathname = usePathname()
    const [isDesktop, setIsDesktop] = React.useState(useMediaQuery({ query: '(min-width: 748px)' })); 
    const [value, setValue] = React.useState(pathname.split('/')[2]);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <>
            {isDesktop ? (
                <Box sx={{ width: '100%', bgColor: 'background.paper' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Сегодня" value="today" component={Link} className={s.Link} href={"/host/today"}/>
                        <Tab label="Входящие" value="inbox" component={Link} className={s.Link} href={"/host/inbox"}/>
                        <Tab label="Календарь" value="calendar" component={Link} className={s.Link} href={"/host/calendar"}/>
                        <Tab label="Объявления" value="properties" component={Link} className={s.Link} href={"/host/properties"}/>
                        <Tab label="Бронирования" value="booking-request" component={Link} className={s.Link} href={"/host/booking-request/upcoming"}/>
                    </Tabs>
                    {children}
                </Box>
            ) : children}
        </>
    );
}