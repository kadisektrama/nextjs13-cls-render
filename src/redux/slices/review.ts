'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchReviews, fetchReview, fetchExpandedReviewScores, fetchReviewsExtranet, fetchExpandedReviewScoresExtranet, fetchReviewExtranet } from '../thunk/review';
import { IReview, TExpandedReviewScore } from '@/types/IReview';

type TInitialState = {
    error: string,
    loading: boolean,
    reviews: IReview[],
    review: IReview,
    expandedReviewScores: TExpandedReviewScore[],
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    reviews: [],
    review: {
        booking_id: null,
        is_read_manager: null,
        is_read_host: null,
        property_id: null,
        is_anonymous: false,
        public_comment: null,
        private_comment: null,
        created_at: null,
        score: null,
        status: null,
    },
    expandedReviewScores: [],
}

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setScore: (state, action: PayloadAction<number>) => {
            state.review.score = action.payload
        },
        setBookingId: (state, action: PayloadAction<number>) => {
            state.review.booking_id = action.payload
        },
        setPublicComment: (state, action: PayloadAction<string>) => {
            state.review.public_comment = action.payload
        },
        setPrivateComment: (state, action: PayloadAction<string>) => {
            state.review.private_comment = action.payload
        },
        setIsAnonymous: (state, action: PayloadAction<number>) => {
            state.review.is_anonymous = action.payload
        },
        setIsReadManager: (state, action: PayloadAction<number>) => {
            state.review.is_read_manager = action.payload
        },
        setIsReadHost: (state, action: PayloadAction<number>) => {
            state.review.is_read_host = action.payload
        },
        setPropertyId: (state, action: PayloadAction<number>) => {
            state.review.property_id = action.payload
        },
        setExpandedReviewScores: (state, action: PayloadAction<TExpandedReviewScore[]>) => {
            state.expandedReviewScores = action.payload
        },
        setStatus: (state, action: PayloadAction<number>) => {
            state.review.status = action.payload
        },
    },
    extraReducers: {
        [fetchReview.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.review = action.payload;
        },
        [fetchReview.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchReview.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchReviews.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.reviews = action.payload;
        },
        [fetchReviews.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchReviews.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchExpandedReviewScores.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.expandedReviewScores = action.payload;
        },
        [fetchExpandedReviewScores.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchExpandedReviewScores.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchReviewsExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.reviews = action.payload;
        },
        [fetchReviewsExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchReviewsExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchExpandedReviewScoresExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.expandedReviewScores = action.payload;
        },
        [fetchExpandedReviewScoresExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchExpandedReviewScoresExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchReviewExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.review = action.payload;
        },
        [fetchReviewExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchReviewExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export const { setScore, setBookingId, setPublicComment, setPrivateComment, setIsAnonymous, setIsReadManager, setIsReadHost, setPropertyId, setExpandedReviewScores, setStatus } = reviewSlice.actions
export default reviewSlice.reducer;

// export default function review(state = initialState, action) {
//     switch (action.type) {
//         case "GET_REVIEWS":
//             return {...state, reviews: action.payload};
//         case "GET_REVIEW":
//             return {...state, review: action.payload};
//         case "SET_SCORE":
//             return {...state, review: {...state.review, score: action.payload}};
//         case "SET_BOOKING_ID":
//             return {...state, review: {...state.review, booking_id: action.payload}};
//         case "SET_PUBLIC_COMMENT":
//             return {...state, review: {...state.review, public_comment: action.payload}};
//         case "SET_PRIVATE_COMMENT":
//             return {...state, review: {...state.review, private_comment: action.payload}};
//         case "SET_IS_ANONYMOUS":
//             return {...state, review: {...state.review, is_anonymous: action.payload}};
//         case "SET_IS_READ_MANAGER":
//             return {...state, review: {...state.review, is_read_manager: action.payload}};
//         case "SET_IS_READ_HOST":
//             return {...state, review: {...state.review, is_read_host: action.payload}};
//         case "SET_PROPERTY_ID":
//             return {...state, review: {...state.review, property_id: action.payload}};
//         case "SET_EXPANDED_REVIEW_SCORES":
//             return {...state, expandedReviewScores: action.payload};
//         case "SET_STATUS":
//             return {...state, review: {...state.review, status: action.payload}};
//         default: return state;
//     }
// };