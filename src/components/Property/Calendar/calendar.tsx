import React from 'react';
import * as locales from "react-date-range/dist/locale";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, usePathname, useRouter } from "next/navigation";
import { addDays, addMonths } from "date-fns";

import { getCalculatePrice } from "@/api/basicApi";
import { dateForRequestFormat, changeTimezone, diffDates } from "@/utils/Helpers/Date/date";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { fetchCalculatePrice } from '@/redux/thunk/property';

export const Calendar: React.FC<any> = (props) => {
    const [dateArray] = useState<any>([]);
    const {id} = useParams();
    const searchParams = useSearchParams();
    const [initData, setInitData] = useState<{start_date: any, end_date: any}>({ start_date: null, end_date: null })
    const [tooltip, setTooltip] = useState<any>(false)
    const property = useAppSelector(state => state.property.property)
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    useEffect(() => {
        property.closed_booking_dates.forEach(
            (item: any, index: any) => {
                dateArray[index] =  new Date(`${item}T00:00`).getTime();
            }
        )

        setInitData({
            start_date: searchParams.get('start_date'),
            end_date: searchParams.get('end_date')
        })
    }, [])

    const handleCleanDates = () => {
        router.push(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), start_date: initData.start_date, end_date: initData.end_date}).toString()}`)

        setTooltip(false)
        dispatch(fetchCalculatePrice({
            id: id,
            start_date: initData.start_date,
            end_date: initData.end_date,
            guests: {adults: searchParams.get('adults') || 1, children: searchParams.get('children') || 0}
        }));
    }

    const isUnderDisableDate = (startDate: any) => {
        let date = (new Date(dateArray.find((date: any) => new Date(startDate) < new Date(date))));

        return date.toString() === 'Invalid Date' ? addDays(new Date(startDate), 30) : date
    }

    return (
        <div
            onClick={(e: any) => {setTooltip(e.target?.offsetParent?.offsetParent?.offsetTop ? { top: e.target.offsetParent.offsetParent.offsetTop - 38, left: e.target.offsetParent.offsetParent.offsetLeft - 29 } : false)}}
            onMouseLeave={() => setTooltip(false)}
        >       
            <DateRange
                className="my-demo"
                onChange={(item: any) => {                                  
                    router.push(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), start_date: dateForRequestFormat(item.selection['startDate']), end_date: dateForRequestFormat(item.selection['endDate'])}).toString()}`)                     

                    item.selection['startDate'] && item.selection['endDate'] && item.selection['startDate'] < item.selection['endDate']
                        && dispatch(fetchCalculatePrice({
                            id: id,
                            start_date: dateForRequestFormat(addDays(item.selection['startDate'], 1)),
                            end_date: dateForRequestFormat(addDays(item.selection['endDate'], 1)),
                            guests: {adults: searchParams.get('adults') || 1, children: searchParams.get('children') || 0}
                        }));
                }}
                minDate={
                    searchParams.get('start_date') && searchParams.get('end_date') && searchParams.get('start_date') === searchParams.get('end_date')
                        ? addDays(new Date(searchParams.get('start_date') || ''), 1)
                        : changeTimezone(new Date(), "Europe/Minsk")
                }
                maxDate={
                    searchParams.get('start_date') && searchParams.get('end_date') && searchParams.get('start_date') === searchParams.get('end_date')
                        ? isUnderDisableDate(searchParams.get('start_date'))
                        : addMonths(new Date(), 15)
                }
                moveRangeOnFirstSelection={false}
                ranges={[{
                    startDate: searchParams.get('start_date') ? new Date(searchParams.get('start_date') || '') : new Date(),
                    endDate: searchParams.get('end_date') ? new Date(searchParams.get('end_date') || '') : addDays(new Date(), 1),
                    key: "selection"
                }]}
                disabledDay={
                    (date: any) => searchParams.get('start_date') && searchParams.get('end_date') && searchParams.get('start_date') === searchParams.get('end_date')
                        ? null
                        : dateArray.includes(date.getTime())
                }
                months={props.months || 1}
                locale={locales["ru"]}
                direction="horizontal"
                monthDisplayFormat="LLLL yyyy"
                weekdayDisplayFormat="EEEEEE"
                showDateDisplay={false}
            />
            {tooltip && diffDates(searchParams.get('start_date'), searchParams.get('end_date')) < (property.rules?.min_stay_days || 0) && (
                <div className="ant-tooltip ant-tooltip-placement-top "
                     style={{ left: tooltip.left, top: tooltip.top, transformOrigin: '50% 52.3125px' }}>
                    <div className="ant-tooltip-content">
                        <div className="ant-tooltip-arrow"><span className="ant-tooltip-arrow-content"></span></div>
                        <div className="ant-tooltip-inner" role="tooltip">Мин. ночей {property.rules?.min_stay_days || 1}</div>
                    </div>
                </div>
            )}

            <div>
                <Button variant="text" style={{ marginLeft: '16px', fontSize: '13px', textDecoration: 'underline', color: "black" }} onClick={handleCleanDates}>Очистить даты</Button>
            </div>
        </div>
    );
}