import { createAsyncThunk } from "@reduxjs/toolkit"
import { getBooking, getBookings } from "@/api/secure";
import { getBookingRequests, getAddedBookingRequests } from "@/api/extranet";
// TODO
export const fetchBookingsSecure = createAsyncThunk(
    'bookingsSecure/fetchAll',
    async (_, fetchAPI) => {
        try {            
            return await getBookings()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchBooking = createAsyncThunk(
    'booking/fetchOne',
    async (params: any, fetchAPI) => {
        try {
            return await getBooking(params.status, params.customParams)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchBookingsExtranet = createAsyncThunk(
    'bookingsExtranet/fetchAll',
    async (params: {status: string, query: string}, fetchAPI) => {
        try {            
            return await getBookingRequests(params.status, params.query)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchAddedBookingsExtranet = createAsyncThunk(
    'addedBookingsExtranet/fetchAll',
    async (params: {status: string, query: string}, fetchAPI) => {
        try {            
            return await getAddedBookingRequests(params.status, params.query)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)