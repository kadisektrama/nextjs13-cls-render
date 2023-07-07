// Core
import React from "react"
import { useSearchParams, useParams, usePathname } from "next/navigation";
import Link from 'next/link';
import lodash from "lodash";

// UI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import StarRateIcon from '@mui/icons-material/StarRate';
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";

// Tools
import s from "./productCard.module.scss";
import { diffDates, rangeStartDateEndDate } from "@/utils/Helpers/Date/date";

export function ProductCard(props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { city } = useParams();


    const setDates = () => {
        //props.props.propertyActions.setPrice(props.cost_per_period);
        //props.props.propertyActions.setCalendarDate({'startDate': new Date(props.period.start_date), 'endDate': new Date(props.period.end_date)})
    }

    return (
        <Card sx={{ boxShadow: 0 }}>
            <CardActionArea sx={{ position: 'relative' }} onClick={() => setDates()}>
                <div>
                    <img className={s.imageAspectRatio} src={`${props.photos[0].url}?width=480`} />
                </div>

                <CardContent sx={{ padding: 0, paddingTop: 1 }}>
                    <Typography variant="h6" component="div">
                        {props.name}
                    </Typography>
                    <Typography component="div" variant="body2" color="text.secondary" gutterBottom>
                        <div>Комнат: {props.rooms_and_spaces.summary.number_of_bedrooms}</div>
                        <div>{rangeStartDateEndDate(props.period.start_date, props.period.end_date)}</div>
                        {/*{props.description.substr(0, 100)}*/}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: "flex" }}>
                            {props.instant_booking_available === 1 && <FlashOnRoundedIcon sx={{ marginLeft: '-6px' }} color="disabled" />}
                            <Box sx={{ fontWeight: 600 }}>
                                {lodash.round(props.cost_per_period / diffDates(props.period.start_date, props.period.end_date), 2) + " " + props.currency}
                            </Box>
                            <div>&nbsp;/ ночь</div>
                        </Box>
                        {props.countReviews ? (
                            <div style={{ display: 'flex' }}>
                                <div style={{ color: 'white', backgroundColor: '#14a800', wontWeight: 600, width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5.5px', marginLeft: '10px', }}>{props.avgReviewScore ? props.avgReviewScore : ' - '}</div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </CardContent>
                <Link style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} className={'Link'} href={`${city}/${props.id}?${new URLSearchParams({...lodash.omit(Object.fromEntries([...searchParams]), ['page']), start_date: props.period.start_date, end_date: props.period.end_date}).toString()}`}></Link>
            </CardActionArea>
        </Card>
    )
}


