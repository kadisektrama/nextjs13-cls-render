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
import { fetchPropertyPricePerDay } from "@/redux/thunk/property";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

export const BigCalendar: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const [eventsData] = useState<any[]>([{
        id: 'skipped-dates',
        classNames: ['skipped-dates'],
        start: dateForRequestFormat(addMonths(new Date(), -6)),
        end: dateForRequestFormat(new Date()),
        display: 'background',
        backgroundColor: 'white',
        //groupId: '',
    }]);
    const [isLoaded, setIsLoaded] = useState(false);
    let [closedBookingDates, setClosedBookingDates] = useState<any>([])
    let [closedBookedBookingDates, setClosedBookedBookingDates] = useState<any>([]);
    const [datesWithPrice, setDatesWithPrice] = useState<any>(false);
    const {id} = useParams();

    useEffect(() => {
        setClosedBookingDates(rangeDateToSimpleDate(state.property.property?.closed_booking_dates?.data?.filter((item: {reason: string}) => !item.reason.startsWith('Забронировано'))));
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
        fetchData();

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
            dispatch(fetchPropertyPricePerDay({id: id, start_date: dateForRequestFormat(start), end_date: dateForRequestFormat(addDays(new Date(end), -1))}));
            //setSearchParams({initialDate: dateForRequestFormat(new Date(end))});
        }
    };

    return (
        <>
            {isLoaded ? (
                <FullCalendar
                    firstDay={1}
                    dayCellContent={(arg) => (
                        <div style={{ padding: '10px', position: 'relative', paddingBottom: '5px' }}>
                            <div style={{ padding: '1px', backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(113, 113, 113)', display: 'flex', width: 'fit-content' }}>
                                {/*{console.log(dateForRequestFormat(arg.date))}*/}
                                <span style={{ textDecoration: closedBookingDates.includes(dateForRequestFormat(arg.date)) ? 'line-through' : 'none' }}>
                                    {arg.dayNumberText}
                                </span>
                                {dateForRequestFormat(arg.date) === dateForRequestFormat(new Date()) ? <span style={{ paddingLeft: '3px' }}>Сегодня</span> : ''}
                            </div>
                            <div style={{ position: 'absolute', paddingTop: '3em', display: 'flex', justifyContent: 'center', color: 'rgb(113, 113, 113)', width: '100%', paddingRight: '16px' }}>{closedBookingDates.includes(dateForRequestFormat(arg.date)) ? '' : `${Math.floor(datesWithPrice[dateForRequestFormat(arg.date)])} ${state.property.property.currency}`}</div>
                        </div>
                    )}
                    initialDate={searchParams.get('initialDate') ? new Date(searchParams.get('initialDate') || '') : new Date()}
                    /*dayCellDidMount={function(info) {
                        let element = "<div style='position: absolute; left: 4px; top: 4px;'><a href='https://www.w3schools.com/'>TEST-"+info.dayNumberText+"</a></div>";
                        return element
                    }}*/
                    selectLongPressDelay={100}
                    unselectAuto={false}
                    height={window.screen.height - 100}
                    events={eventsData}
                    plugins={[
                        dayGridPlugin,
                        //timeGridPlugin,
                        //listPlugin,
                        interactionPlugin
                    ]}
                    headerToolbar={{
                        center: "title",
                        left: "today prev,next",
                        right: ""
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
            ) : (
                <SimpleLoader />
            )}
        </>
    );
}
