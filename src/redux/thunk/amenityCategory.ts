import { createAsyncThunk } from "@reduxjs/toolkit"
import { AdvancedFetch, requestOptions } from "@/utils/Helpers/Fetch/advancedFetch";
import { getCategoryAmenities } from "@/api/commonApi";
// TODO
export const fetchAmenityCategories = createAsyncThunk(
    'amenityCategories/fetchAll',
    async (_, fetchAPI) => {
        try {            
            return await getCategoryAmenities()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchAmenityCategory = createAsyncThunk(
    'amenityCategory/fetchOne',
    async (customParams: any = '', fetchAPI) => {
        try {
            return await AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/amenities${customParams}`, requestOptions as unknown as RequestInit)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)