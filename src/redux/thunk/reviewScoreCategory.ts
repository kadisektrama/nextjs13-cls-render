import { createAsyncThunk } from "@reduxjs/toolkit"
import { getBooking, getBookings } from "@/api/secure";
import { getReviewScoreCategories } from "@/api/commonApi";

// TODO
export const fetchReviewScoreCategories = createAsyncThunk(
    'reviewScoreCategories/fetchAll',
    async (_, fetchAPI) => {
        try {            
            return await getReviewScoreCategories()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchReviewScoreCategory = createAsyncThunk(
    'reviewScoreCategory/fetchOne',
    async (_, fetchAPI) => {
        try {
            return await getReviewScoreCategories()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

