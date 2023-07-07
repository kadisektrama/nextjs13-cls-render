'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPropertyFavourites } from '../thunk/propertyFavourite';

type TInitialState = {
    error: string,
    loading: boolean,
    propertyFavourite: any,
    propertyFavourites: any,
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    propertyFavourite: null,
    propertyFavourites: null,
}

export const propertyFavouriteSlice = createSlice({
    name: 'propertyType',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPropertyFavourites.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.propertyFavourites = action.payload;
        },
        [fetchPropertyFavourites.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchPropertyFavourites.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})



export default propertyFavouriteSlice.reducer;