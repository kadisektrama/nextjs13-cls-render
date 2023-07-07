import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import 'react-spring-bottom-sheet/dist/style.css';

import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import { rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import { getNoun } from "@/utils/Helpers/Translator/translator";

export const Header: React.FC<any> = (props) => {
    const searchParams = useSearchParams();

    return(
        <Paper
            style={{
                position: 'fixed',
                top: 0,
                height: '104px',
                width: '100%',
                padding: "0 5%",
                backgroundColor: 'white',
                zIndex: 999,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 0,
                flexDirection: 'column',
            }}
            elevation={3}
        >
            <div style={{ height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <IconButton>
                    <Link href={window.location.pathname.split('/').slice(0, -1).join('/')}><ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} /></Link>
                </IconButton>
                <Typography variant="h5" component="h1">Брест</Typography>
                {/*<Button id={1} variant="contained" style={{ borderRadius: '8% / 50%', backgroundColor: '#666', width: '70%' }}>Contained</Button>*/}
                <div style={{ width: '37.25px' }}></div>
            </div>
            <Divider />
            <div style={{ height: '44px', display: 'flex', width: '100%', paddingBottom: '5px', paddingTop: '3px', overflow: "auto" }}>
                <Button variant="outlined" size="large" sx={{ fontSize: '12px', marginRight: '8px', border: '1px solid #d1d1d1', color: '#000', whiteSpace: 'nowrap' }} onClick={() => props.setWindowScreen('date_filter')}>
                    {rangeStartDateEndDate(searchParams.get('start_date'), searchParams.get('end_date'))}
                </Button>
                <Button variant="outlined" size="large" sx={{ fontSize: '12px', marginRight: '8px', border: '1px solid #d1d1d1', color: '#000', whiteSpace: 'nowrap' }} onClick={() => props.setWindowScreen('other_filters')}>
                    {`${parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0') === 0 ? 1 : parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0')} ${getNoun(parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0') === 0 ? 1 : parseInt(searchParams.get('adults') || '0') + parseInt(searchParams.get('children') || '0'), 'гость', 'гостя', 'гостей')}`}
                </Button>
                <Button variant="outlined" size="large" sx={{ fontSize: '12px', border: '1px solid #000', color: '#000' }} onClick={() => props.setWindowScreen('filters')}>
                    Фильтры
                </Button>
                {/*<div style={{ padding: '0 11px', border: '1px solid #d1d1d1', borderRadius: '50px', fontSize: '14px', height: '36px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        {rangeStartDateEndDate(searchParams.get('startDate'), searchParams.get('endDate'))}
                    </div>
                </div>
                <div style={{ padding: '0 11px', border: '1px solid #d1d1d1', borderRadius: '50px', fontSize: '14px', height: '36px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        {`${+searchParams.get('adults') + +searchParams.get('children') === 0 ? 1 : +searchParams.get('adults') + +searchParams.get('children')} гость`}
                    </div>
                </div>
                <div style={{ padding: '0 11px', border: '1px solid #000', borderRadius: '50px', fontSize: '14px', height: '36px' }} onClick={() => props.setWindowScreen('filters')}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        Фильтры
                    </div>
                </div>*/}
            </div>
        </Paper>
    )
}
