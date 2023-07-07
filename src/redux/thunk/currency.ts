import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCurrencies } from "@/api/commonApi";

export const fetchCurrencies = createAsyncThunk(
    'currencies/fetchAll',
    async (_, fetchAPI) => {
        try {            
            return await getCurrencies()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)