'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBooking, fetchBookingsSecure, fetchBookingsExtranet, fetchAddedBookingsExtranet } from "@/redux/thunk/booking"
import { IBooking } from "@/types/IBooking";

export interface TInitialState {
    error: string,
    loading: boolean,
    booking: IBooking | null,
    bookings: IBooking[],
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    booking: null,
    bookings: [],
}

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchBooking.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.booking = action.payload;
        },
        [fetchBooking.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchBooking.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchBookingsSecure.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.bookings = action.payload.data;
        },
        [fetchBookingsSecure.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchBookingsSecure.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchBookingsExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.bookings = action.payload.data;
        },
        [fetchBookingsExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchBookingsExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchAddedBookingsExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.bookings = [...state.bookings, ...action.payload];
        },
        [fetchAddedBookingsExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchAddedBookingsExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export default bookingSlice.reducer;