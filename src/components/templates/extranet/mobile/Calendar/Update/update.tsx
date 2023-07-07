import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Link from "next/link";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Typography } from "@mui/material";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from "@mui/material/IconButton";

import { fetchPropertyExtranet, fetchClosedBookingDatesExtranet, fetchIcalExtranet, fetchIcalsExtranet } from '@/redux/thunk/property';
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { BigCalendar } from "./BigCalendar/bigCalendar";
import { Filters } from "./Filters/filters";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

export const Update: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [windowScreen, setWindowScreen] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<any>(false);
    const [openAlertReject, setOpenAlertReject] = useState(false);
    const [isFreeDates, setIsFreeDates] = useState('');

    let { id } = useParams();

    useEffect(() => {
        Promise.all([dispatch(fetchPropertyExtranet(id)), dispatch(fetchIcalsExtranet(id)), dispatch(fetchIcalExtranet(id))])
            .then(() => dispatch(fetchClosedBookingDatesExtranet({id: id, query: ''})))
            .then(
                () => {
                    setIsLoaded(true);
                },
                () => {
                    setError('404');
                    throw new Error('404 Page Not Found')
                }
            )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (error) {
        throw new Error('404 Page Not Found');
    }

    return(
        <>
            {windowScreen === '' && (
                <AccountHeader
                    name={
                        <Typography component="div" variant="h5">
                            Календарь
                        </Typography>
                    }
                    startElement={
                        <IconButton>
                            <Link href={'/host/calendar'}><ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} /></Link>
                        </IconButton>
                    }
                    endElement={
                        <IconButton onClick={() => {setWindowScreen('filters')}}>
                            <TuneIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    {isLoaded ? (
                        <>
                            <div style={{ margin: '5px' }}>
                                <div>{state.property.property.name}</div>
                                <div>
                                    <BigCalendar setIsFreeDates={(value: any) => setIsFreeDates(value)} setWindowScreen={(value: any) => setWindowScreen(value)} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <SimpleLoader />
                    )}

                    <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={() => setOpenAlertReject(false)}>
                        <Alert onClose={() => setOpenAlertReject(false)} severity="error" sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>
                </AccountHeader>
            )}

            {windowScreen === 'filters' && (
                <div style={{ zIndex: 6 }}>
                    <Filters setWindowScreen={(value: any) => setWindowScreen(value)} />
                </div>
            )}

            {windowScreen === 'synchronization' && (
                <div style={{ zIndex: 6 }}>
                    <Filters />
                </div>
            )}
        </>
    )
}
