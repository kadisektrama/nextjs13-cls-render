import { createAsyncThunk } from "@reduxjs/toolkit"
import { getRegions } from "@/api/commonApi";

export const fetchRegions = createAsyncThunk(
    'regions/fetchAll',
    async (_, fetchAPI) => {
        try {            
            return await getRegions()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)