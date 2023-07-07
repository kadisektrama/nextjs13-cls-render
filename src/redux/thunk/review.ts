import { createAsyncThunk } from "@reduxjs/toolkit"
import { getReviews, getReview, getExpandedReviewScores } from "@/api/secure";
import { getReviews as getReviewsExtranet, getExpandedReviewScores as getExpandedReviewScoresExtranet, getReview as getReviewExtranet } from "@/api/extranet";

// TODO
export const fetchReviews = createAsyncThunk(
    'reviews/fetchAll',
    async (_, fetchAPI) => {
        try {            
            return await getReviews()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchReview = createAsyncThunk(
    'review/fetchOne',
    async (id: any, fetchAPI) => {
        try {
            return await getReview(id)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchExpandedReviewScores = createAsyncThunk(
    'expandedReviewScores/fetchAll',
    async (id: any, fetchAPI) => {
        try {            
            return await getExpandedReviewScores(id)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchReviewsExtranet = createAsyncThunk(
    'reviewsExtranet/fetchAll',
    async (_, fetchAPI) => {
        try {            
            return await getReviewsExtranet()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchExpandedReviewScoresExtranet = createAsyncThunk(
    'expandedReviewScoresExtranet/fetchAll',
    async (id: any, fetchAPI) => {
        try {            
            return await getExpandedReviewScoresExtranet(id)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchReviewExtranet = createAsyncThunk(
    'reviewExtranet/fetchOne',
    async (id: any, fetchAPI) => {
        try {
            return await getReviewExtranet(id)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)