import Link from "next/navigation";
import React, { useState } from 'react';

import Box from "@mui/material/Box";
import { TabContext, TabPanel } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import 'react-spring-bottom-sheet/dist/style.css';

import s from "@/utils/Themes/reactComponents.module.scss";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { usePathname } from "next/navigation";

export const BookingRequest: React.FC<{children: React.ReactNode}> = ({children}) => {
    const pathname = usePathname();
    const [value, setValue] = React.useState<any>(pathname.split('/')[3]);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return(
        <AccountHeader name={'Бронирования'}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '90px',
                }}
            >
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} variant="scrollable">
                            {/*@ts-ignore*/}
                            <Tab label="Предстоящие" value='upcoming' component={Link} className={s.Link} href={"/host/booking-request/upcoming"} />
                            {/*@ts-ignore*/}
                            <Tab label="Завершено" value='completed' component={Link} className={s.Link} href={"/host/booking-request/completed"} />
                            {/*@ts-ignore*/}
                            <Tab label="Отменено" value='cancelled' component={Link} className={s.Link} href={"/host/booking-request/cancelled"} />
                            {/*@ts-ignore*/}
                            <Tab label="Все" value='all' component={Link} className={s.Link} href={"/host/booking-request/all"} />
                        </TabList>
                    </Box>
                    {children}
                    {/* <TabPanel value='upcoming'>
                        <Upcoming />
                    </TabPanel>
                    <TabPanel value='completed'>
                        <Completed />
                    </TabPanel>
                    <TabPanel value='cancelled'>
                        <Cancelled />
                    </TabPanel>
                    <TabPanel value='all'>
                        <All />
                    </TabPanel> */}
                </TabContext>
            </Box>
        </AccountHeader>
    )
}


