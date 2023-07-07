'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPropertyTypes, fetchPropertyType } from '../thunk/propertyType';

type TInitialState = {
    error: string,
    loading: boolean,
    propertyType: any,
    propertyTypes: any,
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    propertyType: null,
    propertyTypes: null,
}

export const amenitySlice = createSlice({
    name: 'propertyType',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPropertyTypes.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.propertyTypes = action.payload;
        },
        [fetchPropertyTypes.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchPropertyTypes.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})



export default amenitySlice.reducer;