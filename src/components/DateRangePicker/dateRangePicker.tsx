// Core
import React from 'react';
import ruLocale from "date-fns/locale/ru";
import { addMonths, format, addDays } from "date-fns";

// UI
import TextField from "@material-ui/core/TextField";
import { DateRange, LocalizationProvider, DateRangePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

// Tools
import { themeDateRangePicker } from "@/utils/Themes/themes";

export const DateRangePickerFilter: React.FC<any> = (props) => {
    const [value, setValue] = React.useState<DateRange<Date>>([props.startDate ? props.startDate : null, props.endDate ? props.endDate : null]);

    return (
        <ThemeProvider theme={themeDateRangePicker}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <DateRangePicker
                    mask="__.__.____"
                    minDate={new Date()}
                    maxDate={addMonths(new Date(), 15)}
                    startText="Дата заезда"
                    endText="Дата отъезда"
                    value={value}
                    toolbarTitle={'Выберите промежуток дат'}
                    okText={'Ок'}
                    clearText={'Очистить'}
                    cancelText={'Отмена'}
                    onAccept={(date: any) => {
                        setValue(date)
                        props.setStartDate(format(new Date(date[0]), 'yyyy-MM-dd'))
                        props.setEndDate(format(new Date(date[1]), 'yyyy-MM-dd'))
                    }}
                    onClose={() => {
                        if (!value[0] && !value[1]) {
                            props.setStartDate(format(new Date(), 'yyyy-MM-dd'))
                            props.setEndDate(format(addDays(new Date(), 1), 'yyyy-MM-dd'))

                            setValue([new Date(), addDays(new Date(), 1)])
                        }

                        if (!value[1] && value[0]) {
                            let endDate = format(addDays(new Date(props.startDate), 1), 'yyyy-MM-dd')

                            props.setEndDate(endDate)
                            setValue([new Date(props.startDate), new Date(endDate)])
                        }

                        if (!value[0] && value[1]) {
                            let startDate = format(addDays(new Date(props.endDate), -1), 'yyyy-MM-dd')

                            props.setStartDate(startDate)
                            setValue([new Date(startDate), new Date(props.endDate)])
                        }
                    }}
                    onChange={date => {
                        date[0] && props.setStartDate(format(new Date(date[0]), 'yyyy-MM-dd'))
                        date[1] && props.setEndDate(format(new Date(date[1]), 'yyyy-MM-dd'))
                        setValue(date)
                    }}
                    renderInput={(startProps, endProps) => (
                        <div>
                            <TextField {...startProps} onKeyDown={(e) => e.preventDefault()} helperText="" fullWidth style={{ paddingBottom: '20px' }} />
                            <TextField {...endProps} onKeyDown={(e) => e.preventDefault()} helperText="" fullWidth />
                        </div>
                    )}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}