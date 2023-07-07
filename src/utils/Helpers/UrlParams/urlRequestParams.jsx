const searchParams = new URLSearchParams(window.location.search);

export const urlRequestParams = {
    status: 1,
    start_date: Object.fromEntries([...searchParams])['startDate'],
    end_date: Object.fromEntries([...searchParams])['endDate'],
    adults: Object.fromEntries([...searchParams])['adults'],
    children: Object.fromEntries([...searchParams])['children'],
    infants: Object.fromEntries([...searchParams])['infants'],
    pets: Object.fromEntries([...searchParams])['pets'],
    instant_booking_available: Object.fromEntries([...searchParams])['instantBookingAvailable'],
    page: Object.fromEntries([...searchParams])['page'],
}