'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TInitialState = {
    isEmptyPhone: boolean,
    isRecoveryPassword: boolean,
    isResetPassword: boolean,
    isMailMessageWasSent: boolean,
    isAccessToRedirect: boolean,
    isCityWithMap: boolean,
    propertyWasCreated: {
        region: any,
        id: any,
    } | null,
}

const initialState: TInitialState = {
    isEmptyPhone: false,
    isRecoveryPassword: false,
    isResetPassword: false,
    isMailMessageWasSent: false,
    isAccessToRedirect: false,
    isCityWithMap: false,
    propertyWasCreated: null,
}

export const internalSystemSlice = createSlice({
    name: 'internalSystem',
    initialState,
    reducers: {
        setIsEmptyPhone: (state, action: PayloadAction<boolean>) => {state.isEmptyPhone = action.payload},
        setIsRecoveryPassword: (state, action: PayloadAction<boolean>) => {state.isRecoveryPassword = action.payload},
        setIsResetPassword: (state, action: PayloadAction<boolean>) => {state.isResetPassword = action.payload},
        setIsMailMessageWasSent: (state, action: PayloadAction<boolean>) => {state.isMailMessageWasSent = action.payload},
        setIsAccessToRedirect: (state, action: PayloadAction<boolean>) => {state.isAccessToRedirect = action.payload},
        setIsCityWithMap: (state, action: PayloadAction<boolean>) => {state.isCityWithMap = action.payload},
        setPropertyWasCreated: (state, action: PayloadAction<{region: any, id: any} | null>) => {state.propertyWasCreated = action.payload},
    },
})

export const { setIsEmptyPhone, setIsRecoveryPassword, setIsResetPassword, setIsMailMessageWasSent, setIsAccessToRedirect, setIsCityWithMap, setPropertyWasCreated } = internalSystemSlice.actions

export default internalSystemSlice.reducer;