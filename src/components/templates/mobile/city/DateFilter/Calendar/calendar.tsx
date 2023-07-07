import React, { useState } from "react"
import * as locales from "react-date-range/dist/locale";
import { DateRange } from "react-date-range";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { addDays, addMonths } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { dateForRequestFormat } from "@/utils/Helpers/Date/date";

export const Calendar: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter()
    const pathname = usePathname()
    const [dateArray] = useState<any>([])

    const isUnderDisableDate = (startDate: any) => {
        let date = (new Date(dateArray.find((date: any) => new Date(startDate) < new Date(date))));

        return date.toString() === 'Invalid Date' ? addDays(new Date(startDate), 30) : date
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DateRange
                className="my-demo"
                onChange={(item) => {
                    const urlParams = {
                        ...Object.fromEntries(searchParams || []),
                        start_date: dateForRequestFormat(item.selection['startDate']),
                        end_date: dateForRequestFormat(item.selection['endDate']),
                    }

                    router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 
                }}
                minDate={
                    searchParams.get('start_date') && searchParams.get('end_date') ?
                        dateForRequestFormat(searchParams.get('start_date')) === dateForRequestFormat(searchParams.get('end_date')) ? addDays(new Date(searchParams.get('start_date') || ''), 1) : new Date() :
                        new Date()
                }
                maxDate={
                    searchParams.get('start_date') && searchParams.get('end_date')
                        ? dateForRequestFormat(searchParams.get('start_date')) === dateForRequestFormat(searchParams.get('end_date'))
                            ? isUnderDisableDate(searchParams.get('start_date'))
                            : addMonths(new Date(), 15)
                        : addMonths(new Date(), 15)
                }
                moveRangeOnFirstSelection={false}
                ranges={[{
                    startDate: searchParams.get('start_date') ? new Date(searchParams.get('start_date') || '') : new Date(),
                    endDate: searchParams.get('end_date') ? new Date(searchParams.get('end_date') || '') : new Date(),
                    key: "selection"
                }]}
                locale={locales["ru"]}
                direction="horizontal"
                monthDisplayFormat="LLLL yyyy"
                weekdayDisplayFormat="EEEEEE"
                showDateDisplay={false}
            />
        </div>
    );
}


