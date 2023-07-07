import { createAsyncThunk } from "@reduxjs/toolkit"
import { getPropertyFavourites } from "@/api/commonApi";
// TODO
export const fetchPropertyFavourites = createAsyncThunk(
    'propertyFavourites/fetchAll',
    async (_, fetchAPI) => {
        try {
            return await getPropertyFavourites();
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)