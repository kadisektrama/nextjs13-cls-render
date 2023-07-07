import { addDays } from "date-fns";
import React, { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Stack, Button, Paper, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { DateRangePickerFilter } from "@/components/DateRangePicker/dateRangePicker";
import { TUrlParams } from "@/types/other";

export const DateFilter: React.FC<any> = (props) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [startDate, setStartDate] = useState<any>(searchParams.get('start_date') || null);
    const [endDate, setEndDate] = useState<any>(searchParams.get('end_date') || null);

    const search = () => {
        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries() || []),
            start_date: startDate,
            end_date: endDate,
            page: 1,
        }
        urlParams = Object.fromEntries(Object.entries(urlParams).filter((item: any) => item[1] !== null));

        //setSearchParams(urlParams);
        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 

        props.setWindowScreen('')
    }

    const cleanFilterParams = () => {
        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries() || []),
            start_date: dateForRequestFormat(new Date()),
            end_date: dateForRequestFormat(addDays(new Date(), 1)),
            page: 1,
        }
        urlParams = Object.fromEntries(Object.entries(urlParams).filter((item: any) => item[1] !== null));

        //setSearchParams(urlParams);
        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 

        props.setWindowScreen('')

        setStartDate(dateForRequestFormat(new Date()));
        setEndDate(dateForRequestFormat(addDays(new Date(), 1)));
    }

    return (
        <>
            <Paper
                style={{
                    position: 'fixed',
                    top: 0,
                    height: '60px',
                    width: '100%',
                    padding: "0 5%",
                    backgroundColor: 'white',
                    zIndex: 999,
                    //display: 'flex',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    //justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 0
                }}
                elevation={3}
            >
                <IconButton sx={{ justifySelf: 'start' }} onClick={() => props.setWindowScreen('')}>
                    <ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} />
                </IconButton>

                <div style={{ justifySelf: 'center' }}><b>Фильтры</b></div>

                {/* <div style={{ justifySelf: 'end' }} onClick={() => deleteFilterParams()}></div> */}
            </Paper>

            <Stack
                spacing={2}
                direction="column"
                alignItems="center"
                sx={{ padding: '84px 24px 84px 24px' }}
            >                
                <div style={{ paddingTop: '12px' }}>
                    <DateRangePickerFilter
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={(value: any) => setStartDate(value)}
                        setEndDate={(value: any) => setEndDate(value)}
                    />
                </div>
            </Stack>

            <Paper
                sx={{
                    zIndex: 6,
                    position: 'fixed !important',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    gap: '10px'
                }}
                style={{ padding: '6px', paddingLeft: '10px', paddingRight: '10px' }}
                elevation={3}
            >
                <Button
                    onClick={cleanFilterParams}
                    variant="text"
                    sx={{ width: '30%', position: 'relative' }}
                    size="large"
                >
                    <div>Очистить</div>
                </Button>
                <Button
                    onClick={search}
                    variant="contained"
                    sx={{ width: '70%', position: 'relative' }}
                    size="large"
                >
                    <div>Показать варианты</div>
                </Button>
            </Paper>
        </>
    )
}
