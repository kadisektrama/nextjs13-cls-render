import React from 'react';
import Link from "next/link";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel } from "@mui/lab";

import s from "@/utils/Themes/reactComponents.module.scss";
import { Upcoming } from "./Upcoming/upcoming";
import { All } from "./All/all";
import { Cancelled } from "./Cancelled/cancelled";
import { Completed } from "./Completed/completed";

export const BookingRequest: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [value, setValue] = React.useState<any>(window.location.pathname.split('/')[3]);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom>Бронирования</Typography>

                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Предстоящие" value='upcoming' component={Link} className={s.Link} href={"/host/booking-request/upcoming"} />
                            <Tab label="Завершено" value='completed' component={Link} className={s.Link} href={"/host/booking-request/completed"} />
                            <Tab label="Отменено" value='cancelled' component={Link} className={s.Link} href={"/host/booking-request/cancelled"} />
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
        </>
    );
}
