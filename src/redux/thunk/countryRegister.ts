import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCountryRegisters } from "@/api/commonApi"
// TODO
export const fetchCountryRegisters = createAsyncThunk(
    'countrtyRegisters/fetchAll',
    async (_, fetchAPI) => {
        try {
            return await getCountryRegisters();
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)