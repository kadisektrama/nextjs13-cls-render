'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrency } from "@/types/ICurrency";
import { fetchCurrencies } from '../thunk/currency';

type TInitialState = {
    error: string,
    loading: boolean,
    currency: ICurrency | null,
    currencies: ICurrency[],
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    currency: null,
    currencies: [],
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCurrencies.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.currencies = action.payload;
        },
        [fetchCurrencies.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchCurrencies.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export default currencySlice.reducer;


// const initialState = {
//     currency: null,
//     currencies: null,
//     iso_code: null,
// }
// //TODO
// export default function currency(state= initialState, action) {
//     switch(action.type){
//         case "GET_CURRENCY":
//             return {...state, currency: action.payload};
//         case "GET_CURRENCIES":
//             return {...state, currencies: action.payload};
//         case "SET_ISO_CODE":
//             return {...state, iso_code: action.payload};
//         default: return state;
//     }
// };