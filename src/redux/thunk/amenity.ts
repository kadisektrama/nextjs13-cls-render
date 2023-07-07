import { createAsyncThunk } from "@reduxjs/toolkit"
import { AdvancedFetch, requestOptions } from "@/utils/Helpers/Fetch/advancedFetch";
// TODO
export const fetchAmenities = createAsyncThunk(
    'amenities/fetchAll',
    async (customParams: any = '', fetchAPI) => {
        try {            
            return await AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/amenities${customParams}`, requestOptions as unknown as RequestInit)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchAmenity = createAsyncThunk(
    'amenity/fetchOne',
    async (customParams: any = '', fetchAPI) => {
        try {
            return await AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/amenities${customParams}`, requestOptions as unknown as RequestInit)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)