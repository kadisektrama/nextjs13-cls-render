import { createAsyncThunk } from "@reduxjs/toolkit"
import { AdvancedFetch, requestOptions } from "@/utils/Helpers/Fetch/advancedFetch";
import { getProperty, getCalculatePrice } from "@/api/basicApi";
import { 
    getPropertyPricePerDay as getPropertyPricePerDayExtranet, 
    getProperties as getPropertiesExtranet, 
    getProperty as getPropertyExtranet, 
    getClosedBookingDates as getClosedBookingDatesExtranet, 
    getIcals as getIcalsExtranet, 
    getIcal as getIcalExtranet,
} from "@/api/extranet";

export const fetchProperties = createAsyncThunk(
    'properties/fetchAll',
    async (urlParams: object = {}, fetchAPI) => {
        try {
            let params = new URLSearchParams(urlParams as unknown as string);
            
            return await AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/regions/3/properties?${params.toString()}`, requestOptions as unknown as RequestInit)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchPropertiesForMap = createAsyncThunk(
    'propertiesForMap/fetchAll',
    async (urlParams: object = {}, fetchAPI) => {       
        try {
            urlParams = (Object.fromEntries(Object.entries(urlParams).filter(item => !(item[1] === null || item[1] === 'undefined' || item[1] === undefined || item[1] === 'null'))));
            let params = new URLSearchParams(urlParams.toString());

            return await AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/regions/3/properties-for-map?${params.toString()}`, requestOptions as unknown as RequestInit)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchProperty = createAsyncThunk(
    'property/fetchOne',
    async (id: any, fetchAPI) => {
        try {
            return await getProperty(id)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchCalculatePrice = createAsyncThunk(
    'propertyCalculatePrice/fetchOne',
    async (data: any, fetchAPI) => {
        try {
            return await getCalculatePrice(data.id, data.start_date, data.end_date, data.guests)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchPropertiesExtranet = createAsyncThunk(
    'propertiesExtranet/fetchAll',
    async (_, fetchAPI) => {
        try {   
            return await getPropertiesExtranet()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchPropertyExtranet = createAsyncThunk(
    'propertyExtranet/fetchOne',
    async (id: any, fetchAPI) => {
        try {   
            return await getPropertyExtranet(id)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchClosedBookingDatesExtranet = createAsyncThunk(
    'closedBookingDatesExtranet/fetchAll',
    async (params: {id: any, query: any}, fetchAPI) => {
        try {   
            return await getClosedBookingDatesExtranet(params.id, params.query)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchIcalsExtranet = createAsyncThunk(
    'icalsExtranet/fetchAll',
    async (id: any, fetchAPI) => {
        try {   
            return await getIcalsExtranet(id)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchIcalExtranet = createAsyncThunk(
    'icalExtranet/fetchAll',
    async (id: any, fetchAPI) => {
        try {   
            return await getIcalExtranet(id)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchPropertyPricePerDay = createAsyncThunk(
    'propertyPricePerDayExtranet/fetchAll',
    async (params: {id: any, start_date: any, end_date: any}, fetchAPI) => {
        try {   
            return await getPropertyPricePerDayExtranet(params.id, params.start_date, params.end_date)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)