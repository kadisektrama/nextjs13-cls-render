import moment from "moment";
import { addDays } from "date-fns";
import { getNoun } from "../Translator/translator";

export function diffDates(startDate, endDate) {
    let diff = moment(endDate).diff(moment(startDate));
    let diffDuration = moment.duration(diff).days();

    return diffDuration;
}

export function dateForRequestFormat(date) {
    date = new Date(date);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${ye}-${mo}-${da}`;
}

export function dateForViewFormat(date) {
    date = new Date(date);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${da}-${mo}-${ye}`;
}

export function rangeStartDateEndDate(startDate, endDate) {
    return ((new Date(startDate)).toLocaleDateString("ru", { month: 'short' }) === (new Date(endDate)).toLocaleDateString("ru", { month: 'short' }) ?
        (new Date(startDate)).toLocaleDateString("ru", { day: 'numeric' }) :
        (new Date(startDate)).toLocaleDateString("ru", { month: 'short', day: 'numeric' }))
    + '—'
    + (new Date(endDate)).toLocaleDateString("ru", { month: 'short', day: 'numeric' })
}

export function differenceDateFromNowHour(startDate) {
    let ms = moment(new Date(startDate),"DD/MM/YYYY HH:mm:ss").diff(moment(new Date(),"DD/MM/YYYY HH:mm:ss"));
    let d = moment.duration(ms);
    let s = Math.floor(d.asHours());

    return s * -1;
}

export function rangeDateToSimpleDate(rangeArray) {
    let result = [];

    if (Array.isArray(rangeArray)){
        rangeArray.forEach((item) => {
            let date = new Date(item.start_date.date),
                date2 = new Date(item.end_date.date)

            while (date < date2) {
                result.push(dateForRequestFormat(date));
                date = addDays(new Date(date), 1)
            }
        })
    }

    return result;
}

export const dateForViewDayMonth = (date) => {
    return new Date(date).toLocaleDateString("ru", { month: 'short', day: 'numeric' })
}

export function roundedTime(date) {
    if (date < 1) return 'менее минуты'
    if (date < 60) return `${date} ${getNoun(date, 'минута', 'минуты', 'минут')}`
    if (date >= 60) {
        let result = Math.floor(date / 60);

        return `${result} ${getNoun(result, 'час', 'часа', 'часов')}`
    }
}

export function changeTimezone(date, ianatz) {
    const invdate = new Date(date.toLocaleString('en-US', {
        timeZone: ianatz
    }));

    const diff = date.getTime() - invdate.getTime();

    return new Date(date.getTime() - diff); // needs to substract
}