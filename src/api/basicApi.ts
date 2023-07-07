import { AdvancedFetch, requestOptions } from "@/utils/Helpers/Fetch/advancedFetch";

export const getProperties = (urlParams = '') => {
    let params = new URLSearchParams(urlParams);

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/regions/3/properties?${params.toString()}`, requestOptions as unknown as RequestInit)
}

export const getPropertiesForMap = (urlParams = '') => {
    //urlParams = (Object.fromEntries(Object.entries(urlParams).filter(item => !(item[1] === null || item[1] === 'undefined' || item[1] === undefined || item[1] === 'null'))));
    let params = new URLSearchParams(urlParams);

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/regions/3/properties-for-map?${params.toString()}`, requestOptions as unknown as RequestInit)
}

export const getProperty = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/properties/${id}`, requestOptions as unknown as RequestInit)
}

export const setBooking = (id: any, startDate: any, endDate: any, adults: any, children: any, infants: any, pets: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/properties/${id}/book`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            'start_date': startDate,
            'end_date': endDate,
            'adults': adults,
            'children': children,
            'infants': infants,
            'pets': pets,
        })
    })
}

export const getCalculatePrice = (id: any, startDate: any, endDate: any, guests: any) => {
    const req = {
        start_date: startDate,
        end_date: endDate,
        adults: guests.adults,
        children: guests.children,
    };

    let params = new URLSearchParams(req);

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/properties/${id}/calculate-booking-cost?${params.toString()}`, requestOptions as unknown as RequestInit)
}

export const recoveryPassword = (email: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/forgot-password`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            email: email
        })
    })
}

export const resetRassword = (body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/reset-password`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(body)
    })
}