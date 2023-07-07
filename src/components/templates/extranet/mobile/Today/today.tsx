import React, { useEffect, useState } from 'react';

import { useRouter } from "next/navigation";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

import s from "@/utils/Themes/reactComponents.module.scss";
import { Arriving } from "./Arriving/arriving";
import { Upcoming } from "./Upcoming/upcoming";
import { Living } from "./Living/living";
import { Leaving } from "./Leaving/leaving";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { Requests } from "../../desktop/Today/Requests/requests";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { Reviews } from "./Reviews/reviews";
import { BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchUserPhones } from "@/redux/thunk/user";
import { fetchBookingsExtranet } from '@/redux/thunk/booking';
import { fetchReviewsExtranet } from '@/redux/thunk/review';

export const Today: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('leaving');
    const [isLoaded, setIsLoaded] = useState(false);
    const [all, setAll] = useState<any>(false);
    let router = useRouter();

    useEffect(() => {
        Promise.all([dispatch(fetchBookingsExtranet({status: '', query: ''})), dispatch(fetchReviewsExtranet()), dispatch(fetchUserPhones())])
            .then((res) => setAll(res[0].payload.data))
            .then(() => setIsLoaded(true))
    }, [])

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <AccountHeader name={'Сегодня'}>
            {isLoaded ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {state.user.user.phones.length < 1 && (
                        <Box sx={{ m: 2, mb: 0, mt: 4 }}>
                            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography variant="subtitle2">
                                            Подтвердите важные данные
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#C13515' }}>
                                            Необходимо для публикации
                                        </Typography>
                                        <Button variant="text" sx={{ color: 'black', textDecoration: 'underline', fontSize: '14px', pl: 0 }} onClick={() => router.push(`/host/account-settings/personal-info?cellPhones=1`)}>Начать</Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Box>
                    )}

                    <Box sx={{ pr: 2, pl: 2 }}>
                        <Requests requests={all} />
                        <Reviews />
                    </Box>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                        <Typography variant="h6" component="div" gutterBottom>Бронирования</Typography>
                        <Link style={{ color: 'black', textDecoration: 'none' }} href={'/host/booking-request/all'}>Все ({all.filter((item: any) => item.status !== BookingStatuses.created).length})</Link>
                    </div>

                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'scroll' }}>
                            <TabList onChange={handleChange} variant="scrollable">
                                {/*@ts-ignore*/}
                                <Tab label="Выезжают" value='leaving' className={s.Link} />
                                {/*@ts-ignore*/}
                                <Tab label="Проживают" value='living' className={s.Link} />
                                {/*@ts-ignore*/}
                                <Tab label="Скоро приедут" value='arriving' className={s.Link} />
                                {/*<Tab label="Предстоящие" value='upcoming' component={Link} className={s.Link} to={"/today/upcoming"} />*/}
                            </TabList>
                        </Box>
                        <TabPanel value='leaving'>
                            <Leaving />
                        </TabPanel>
                        <TabPanel value='living'>
                            <Living />
                        </TabPanel>
                        <TabPanel value='arriving'>
                            <Arriving />
                        </TabPanel>
                        <TabPanel value='upcoming'>
                            <Upcoming />
                        </TabPanel>
                    </TabContext>
                </Box>
            ) : <SimpleLoader />}
        </AccountHeader>
    );
}