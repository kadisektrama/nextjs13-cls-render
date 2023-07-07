import { useRouter, usePathname, useParams, useSearchParams } from "next/navigation";
import Link from 'next/link';
import { addDays } from "date-fns";

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { Calendar } from "./Calendar/calendar";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";

export const DateFilter: React.FC<any> = (props) => {
    const { city } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const deleteFilterParams = () => {
        const urlParams = {
            ...Object.fromEntries(searchParams || []),
            start_date: dateForRequestFormat(new Date()),
            end_date: dateForRequestFormat(addDays(new Date(), 1)),
        }

        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 0
                }}
                elevation={3}
            >
                <IconButton onClick={() => props.setWindowScreen('')}>
                    <ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} />
                </IconButton>

                <Button sx={{ color: 'black' }} variant="text" onClick={() => deleteFilterParams()}>Сбросить даты</Button>
            </Paper>

            <div style={{ marginTop: '60px' }}>
                <Calendar />
            </div>

            <Paper
                sx={{
                    zIndex: 6,
                    position: 'fixed !important',
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                style={{ padding: '6px' }}
                elevation={3}
            >
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: '100%', position: 'relative' }}
                    size="large"
                >
                    <div>Показать варианты</div>
                    <Link style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} className={'Link'} href={`/${city}/search?${new URLSearchParams(Object.fromEntries(searchParams.entries() || []))}`}></Link>
                </Button>
            </Paper>
        </>
    )
}