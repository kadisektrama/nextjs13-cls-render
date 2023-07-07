'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAmenityCategories } from '../thunk/amenityCategory';

export interface TInitialState {
    error: string,
    loading: boolean,
    amenityCategory: any,
    amenityCategories: any,
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    amenityCategory: null,
    amenityCategories: null,
}

export const amenityCategorySlice = createSlice({
    name: 'amenityCategory',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAmenityCategories.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.amenityCategories = action.payload;
        },
        [fetchAmenityCategories.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchAmenityCategories.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export default amenityCategorySlice.reducer;