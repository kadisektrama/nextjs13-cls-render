'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCountryRegisters } from '../thunk/countryRegister';

type TInitialState = {
    error: string,
    loading: boolean,
    countryRegister: any,
    countryRegisters: any,
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    countryRegister: null,
    countryRegisters: null,
}

export const amenitySlice = createSlice({
    name: 'countryRegister',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCountryRegisters.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.countryRegisters = action.payload;
        },
        [fetchCountryRegisters.pending.type]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [fetchCountryRegisters.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export default amenitySlice.reducer;