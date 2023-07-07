'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchReviewScoreCategories, fetchReviewScoreCategory } from "@/redux/thunk/reviewScoreCategory"

type TInitialState = {
    error: string,
    loading: boolean,
    reviewScoreCategory: any,
    reviewScoreCategories: any,
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    reviewScoreCategory: {
        is_active: false,
    },
    reviewScoreCategories: null,
}

export const reviewScoreCategorySlice = createSlice({
    name: 'reviewScoreCategory',
    initialState,
    reducers: {
        setReviewScoreCategoryName: (state, action: PayloadAction<number>) => {
            state.reviewScoreCategory.name = action.payload
        },
        setReviewScoreCategoryIsActive: (state, action: PayloadAction<number>) => {
            state.reviewScoreCategory.is_active = action.payload
        },
    },
    extraReducers: {
        [fetchReviewScoreCategory.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.reviewScoreCategory = action.payload;
        },
        [fetchReviewScoreCategory.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchReviewScoreCategory.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchReviewScoreCategories.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.reviewScoreCategories = action.payload;
        },
        [fetchReviewScoreCategories.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchReviewScoreCategories.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export const { setReviewScoreCategoryName, setReviewScoreCategoryIsActive } = reviewScoreCategorySlice.actions
export default reviewScoreCategorySlice.reducer;

// const initialState = {
//     reviewScoreCategory: {
//         is_active: false,
//     },
//     reviewScoreCategories: null,
// }

// export default function review(state = initialState, action) {
//     switch (action.type) {
//         case "GET_REVIEW_SCORE_CATEGORY":
//             return {...state, reviewScoreCategory: action.payload};
//         case "GET_REVIEW_SCORE_CATEGORIES":
//             return {...state, reviewScoreCategories: action.payload};
//         case "SET_REVIEW_SCORE_CATEGORY_NAME":
//             return {...state, reviewScoreCategory: {...state.reviewScoreCategory, name: action.payload}};
//         case "SET_REVIEW_SCORE_CATEGORY_IS_ACTIVE":
//             return {...state, reviewScoreCategory: {...state.reviewScoreCategory, is_active: action.payload}};
//         default: return state;
//     }
// };