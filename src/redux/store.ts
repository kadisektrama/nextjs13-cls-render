'use client';

import { configureStore } from '@reduxjs/toolkit';
import propertySlice from './slices/property';
import amenitySlice from './slices/amenity';
import amenityCategorySlice from './slices/amenityCategory';
import bookingSlice from './slices/booking';
import bookingFeedbackSlice from './slices/bookingFeedback';
import propertyTypeSlice from './slices/propertyType';
import internalSystemSlice from './slices/internalSystem';
import userSlice from './slices/user';
import countryRegisterSlice from './slices/countryRegister';
import propertyFavouriteSlice from './slices/propertyFavourite';
import reviewSlice from './slices/review';
import reviewScoreCategorySlice from './slices/reviewScoreCategory';
import currencySlice from './slices/currency';
import regionSlice from './slices/region';

export const store = configureStore({
    reducer: {
        property: propertySlice,
        amenity: amenitySlice,
        amenityCategory: amenityCategorySlice,
        booking: bookingSlice,
        bookingFeedback: bookingFeedbackSlice,
        propertyType: propertyTypeSlice,
        internalSystem: internalSystemSlice,
        user: userSlice,
        countryRegister: countryRegisterSlice,
        propertyFavourite: propertyFavouriteSlice,
        review: reviewSlice,
        reviewScoreCategory: reviewScoreCategorySlice,
        currency: currencySlice,
        region: regionSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;