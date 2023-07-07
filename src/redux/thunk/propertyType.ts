import { createAsyncThunk } from "@reduxjs/toolkit"
import { AdvancedFetch, requestOptions } from "../../utils/Helpers/Fetch/advancedFetch";
// TODO
export const fetchPropertyTypes = createAsyncThunk(
    'propertyTypes/fetchAll',
    async (_, fetchAPI) => {
        try {                 
            return await AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/property-types`, requestOptions as unknown as RequestInit)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchPropertyType = createAsyncThunk(
    'propertyTypes/fetchOne',
    async (_, fetchAPI) => {
        try {
            return await AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/property-types`, requestOptions as unknown as RequestInit)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

