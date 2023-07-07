import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { addDays, addMonths } from "date-fns";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import "./bigCalendar.css";
import { dateForRequestFormat, rangeDateToSimpleDate } from "@/utils/Helpers/Date/date";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { getPropertyPrices } from "@/api/extranet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchPropertyPricePerDay } from "@/redux/thunk/property";

export const BigCalendar: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const [eventsData] = useState<any>([{
        id: 'skipped-dates',
        classNames: ['skipped-dates'],
        start: dateForRequestFormat(addMonths(new Date(), -6)),
        end: dateForRequestFormat(new Date()),
        display: 'background',
        backgroundColor: 'white'
    }]);
    const [isLoaded, setIsLoaded] = useState(false);
    let [closedBookingDates, setClosedBookingDates] = useState<any>([])
    let [closedBookedBookingDates, setClosedBookedBookingDates] = useState<any>([]);
    const [datesWithPrice, setDatesWithPrice] = useState<any>(false);
    const {id} = useParams();

    useEffect(() => {
        setClosedBookingDates(rangeDateToSimpleDate(state.property.property?.closed_booking_dates?.data?.filter((item: any) => !item.reason.startsWith('Забронировано'))));
        setClosedBookedBookingDates(rangeDateToSimpleDate(state.property.property?.closed_booking_dates?.data));

        state.property.property.closed_booking_dates?.data?.forEach(
            (item: any) => {
                if (item.reason.startsWith('Закрыто')) {
                    eventsData.push({
                        id: 'disabled',
                        groupId: 'disabled',
                        classNames: ['disabled'],
                        start: dateForRequestFormat(item.start_date.date),
                        end: dateForRequestFormat(item.end_date.date),
                        display: 'background',
                    });
                } else {
                    eventsData.push({
                        id: 'non-disabled',
                        groupId: 'non-disabled',
                        start: dateForRequestFormat(item.start_date.date),
                        end: dateForRequestFormat(item.end_date.date),
                        //display: 'background',
                        title: item.reason,
                    });
                }
            }
        )
        
        const fetchData = async () => {
            await getPropertyPrices(id, dateForRequestFormat(addDays(new Date(), -90)), dateForRequestFormat(addDays(new Date(), 360)))
                .then((res: any) => setDatesWithPrice(res.data))
        }
        fetchData()

        setIsLoaded(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.property.property.price])

    const handleSelect = ({ start, end }: any) => {
        {
            let expectedSelectedDateArray = 0;
            let SelectedSimpleDateArray = rangeDateToSimpleDate([{start_date: {date: start}, end_date: {date: end}}])

            closedBookedBookingDates.forEach((el: any) => {
                if (SelectedSimpleDateArray.includes(el)) {
                    expectedSelectedDateArray++;
                }
            })

            if (expectedSelectedDateArray === 0) {
                props.setIsFreeDates(1);
            } else if (SelectedSimpleDateArray.length === expectedSelectedDateArray) {
                props.setIsFreeDates(0);
            } else {
                props.setIsFreeDates('');
            }
        }

        if (addDays(start, 1) > new Date()) {
            props.propertyActions.setCalendarDate({'startDate': start, 'endDate': end});
            //setSearchParams({initialDate: dateForRequestFormat(new Date(end))});

            dispatch(fetchPropertyPricePerDay({id: id, start_date: dateForRequestFormat(start), end_date: dateForRequestFormat(addDays(new Date(end), -1))}))
                .then(() => props.setWindowScreen('filters'))
        }
    };

    const handleClick = ({ date }: any) => {
        if (addDays(date, 1) > new Date()) {
            props.propertyActions.setCalendarDate({'startDate': date, 'endDate': date});
            //setSearchParams({initialDate: dateForRequestFormat(new Date(date))});

            dispatch(fetchPropertyPricePerDay({id: id, start_date: dateForRequestFormat(date), end_date: dateForRequestFormat(addDays(new Date(date), 0))}))
                .then(() => props.setWindowScreen('filters'))
        }
    };

    return (
        <>
            {isLoaded ? (
                <FullCalendar
                    firstDay={1}
                    dayCellContent={(arg: any) => (
                        <div style={{ position: 'relative', paddingBottom: '5px' }}>
                            <div style={{ padding: '11px', backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(113, 113, 113)', display: 'flex', justifyContent: 'center' }}>
                                {/*{console.log(dateForRequestFormat(arg.date))}*/}
                                <span style={{ textDecoration: closedBookingDates.includes(dateForRequestFormat(arg.date)) ? 'line-through' : 'none' }}>
                                    {arg.dayNumberText}
                                </span>
                            </div>

                            <div style={{ position: 'absolute', paddingTop: '3.7em', display: 'flex', justifyContent: 'center', color: 'rgb(113, 113, 113)', width: '100%', fontSize: '11px', textAlign: 'center' }}>{closedBookingDates.includes(dateForRequestFormat(arg.date)) ? '' : `${Math.floor(datesWithPrice[dateForRequestFormat(arg.date)])} ${state.property.property.currency}`}</div>
                        </div>
                    )}
                    initialDate={searchParams.get('initialDate') ? new Date(searchParams.get('initialDate') || '') : new Date()}
                    eventClick={(event: any) => handleSelect(event.event._instance.range)}
                    /*dayCellDidMount={function(info) {
                        let element = "<div style='position: absolute; left: 4px; top: 4px;'><a href='https://www.w3schools.com/'>TEST-"+info.dayNumberText+"</a></div>";
                        return element
                    }}*/
                    dateClick={handleClick}
                    longPressDelay={500}
                    eventLongPressDelay={500}
                    selectLongPressDelay={500}
                    //unselectAuto={false}
                    height={window.screen.height - 200}
                    events={eventsData}
                    plugins={[
                        dayGridPlugin,
                        //timeGridPlugin,
                        //listPlugin,
                        interactionPlugin
                    ]}
                    headerToolbar={{
                        center: "",
                        left: "title",
                        right: "prev,next"
                    }}
                    selectConstraint={{
                        start: '2020-01-01',
                        end: '2200-01-01'
                    }}
                    selectable={true}
                    locale={'ru'}
                    select={handleSelect}
                    buttonText={{
                        //prev: "Пред.",
                        //next: "След.",
                        prevYear: "&nbsp;&lt;&lt;&nbsp;",
                        nextYear: "&nbsp;&gt;&gt;&nbsp;",
                        today: "Сегодня",
                        month: "Месяц",
                        week: "Неделя",
                        day: "День"
                    }}
                />
            ) : <SimpleLoader />}
        </>
    );
}
