'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRegions } from '../thunk/region';
import { IRegion } from '@/types/IRegion';

type TInitialState = {
    error: string,
    loading: boolean,
    region: IRegion | null,
    regions: IRegion[],
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    region: null,
    regions: [],
}

export const regionSlice = createSlice({
    name: 'region',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchRegions.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.regions = action.payload;
        },
        [fetchRegions.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchRegions.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export default regionSlice.reducer;


// const initialState = {
//     regions: null,
//     region: null,
//     name: null,
//     parentId: null,
//     lat: null,
//     lng: null,
// }
// //TODO
// export default function region(state= initialState, action) {
//     switch(action.type){
//         case "GET_REGION":
//             return {...state,
//                 name: action.payload.name,
//                 parentId: action.payload.parent_id,
//                 lat: action.payload.lat,
//                 lng: action.payload.lng,
//             };
//         case "GET_REGIONS":
//             return {...state, regions: action.payload};
//         case "SET_NAME":
//             return {...state, name: action.payload};
//         case "SET_PARENT_ID":
//             return {...state, parentId: action.payload};
//         case "SET_LAT":
//             return {...state, lat: action.payload};
//         case "SET_LNG":
//             return {...state, lng: action.payload};
//         default: return state;
//     }
// };