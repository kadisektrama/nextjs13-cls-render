'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAmenities, fetchAmenity } from '../thunk/amenity';

type TInitialState = {
    error: string,
    loading: boolean,
    amenity: any,
    amenities: any,
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    amenity: null,
    amenities: null,
}

export const amenitySlice = createSlice({
    name: 'amenity',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAmenities.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.amenities = action.payload;
        },
        [fetchAmenities.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchAmenities.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export default amenitySlice.reducer;