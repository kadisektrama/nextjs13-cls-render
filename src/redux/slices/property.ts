'use client';

import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { 
    fetchProperties, 
    fetchPropertiesForMap,
    fetchProperty,
    fetchCalculatePrice,
    fetchPropertiesExtranet, 
    fetchClosedBookingDatesExtranet,
    fetchIcalExtranet,
    fetchIcalsExtranet,
    fetchPropertyExtranet,
} from '../thunk/property'
import { IProperty } from "@/types/IProperty"
import { IRegion } from '@/types/IRegion';

type TInitialState = {
    error: string,
    loading: boolean,
    properties: any,
    propertiesForMap: any,
    property: IProperty,
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    properties: null,
    propertiesForMap: null,
    property: {
        rules: {
            check_in_time: "12:00",
            check_out_time: "14:00",
            min_stay_days: 1,
            down_payment_amount: 0,
            pets_allowed: null,
            smoking_allowed: null,
            with_rental_agreement: null,
            suitable_for_children: null,
            damage_deposit_amount: null,
            additional_rules: null,
            events_allowed: null,
            suitable_for_infants: null,
            damage_deposit_currency: null,
        },
        id: null,
        status: 'inactive',
        startDate: null,
        endDate: null,
        closed_booking_dates: null,
        currency: null,
        phone: null,
        region: {
            name: null,
            id: 3,
            slug: null,
            parent: null as unknown as IRegion
        },
        ad_type: null,
        lat: null,
        lng: null,
        name: null,
        description: null,
        price: null,
        guests: null,
        instant_booking_available: 0,
        rooms_and_spaces: {
            summary: {
                number_of_bedrooms: null,
                number_of_beds: null,
                number_of_bathrooms: null,
            },
            bedrooms_info: null
        },
        cost_per_period: null,
        period: null,
        address: null,
        address_supplement: null,
        additional_guests: null,
        cost_per_additional_guest: null,
        additional_price: null,
        amenities: [],
        photos: null,
        initialPhotos: null,
        user: null,
        moderatedReviews: {
            data: {
                reviews: [],
                scoreCount: null,
                scoreAvg: 0,
                scorePerCategory: [{
                    name: '',
                    scoreAvg: 0
                }]
            }
        },
        ical: null,
        icals: null,
    },
}

export const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {
        getProperty: (state, action: PayloadAction<any>) => {
            state.property = {...state.property, ...action.payload}
        },
        setCurrency: (state, action: PayloadAction<any>) => {
            state.property.currency = action.payload
        },
        setPhone: (state, action: PayloadAction<any>) => {
            state.property.phone.id = action.payload
        },
        setRegion: (state, action: PayloadAction<any>) => {
            state.property.region.id = action.payload
        },
        setAdType: (state, action: PayloadAction<any>) => {
            state.property.ad_type.id = action.payload
        },
        setName: (state, action: PayloadAction<any>) => {
            state.property.name = action.payload
        },
        setDescription: (state, action: PayloadAction<any>) => {
            state.property.description = action.payload
        },
        setPrice: (state, action: PayloadAction<any>) => {
            state.property.price = action.payload
        },
        setGuests: (state, action: PayloadAction<any>) => {
            state.property.guests = action.payload
        },
        setInstantBookingAvailable: (state, action: PayloadAction<any>) => {
            state.property.instant_booking_available = action.payload
        },
        setClosedBookingDates: (state, action: PayloadAction<any>) => {
            state.property.closed_booking_dates = action.payload
        },
        setSummaryBedrooms: (state, action: PayloadAction<any>) => {
            state.property.rooms_and_spaces.summary.number_of_bedrooms = action.payload
        },
        setSummaryBeds: (state, action: PayloadAction<any>) => {
            state.property.rooms_and_spaces.summary.number_of_beds = action.payload
        },
        setBedroomsInfo: (state, action: PayloadAction<any>) => {
            state.property.rooms_and_spaces.bedrooms_info = action.payload
        },
        setSummaryBathrooms: (state, action: PayloadAction<any>) => {
            state.property.rooms_and_spaces.summary.number_of_bathrooms = action.payload
        },
        setCostPerPeriod: (state, action: PayloadAction<any>) => {
            state.property.cost_per_period = action.payload
        },
        setAddress: (state, action: PayloadAction<any>) => {
            state.property.address = action.payload
        },
        setAddressSupplement: (state, action: PayloadAction<any>) => {
            state.property.address_supplement = action.payload
        },
        setStatus: (state, action: PayloadAction<any>) => {
            state.property.status = action.payload
        },
        setAdditionalGuests: (state, action: PayloadAction<any>) => {
            state.property.additional_guests = action.payload
        },
        setCostPerAdditionalGuest: (state, action: PayloadAction<any>) => {
            state.property.cost_per_additional_guest = action.payload
        },
        setAdditionalPrice: (state, action: PayloadAction<any>) => {
            state.property.additional_price = action.payload
        },
        setProperty: (state, action: PayloadAction<any>) => {
            state.property = {...state.property, ...action.payload}
        },
        setCoords: (state, action: PayloadAction<any>) => {
            state.property.photos = action.payload
        },
        setPhotos: (state, action: PayloadAction<any>) => {
            state.property.lat = action.payload.lat
            state.property.lng = action.payload.lng
        },
        deletePhotos: (state) => {
            state.property.photos = []
            state.property.initialPhotos = []
        },
        setAmenities: (state, action: PayloadAction<any>) => {
            state.property.amenities = action.payload
        },
        setRulesCheckInTime: (state, action: PayloadAction<any>) => {
            state.property.rules.check_in_time = action.payload
        },
        setRulesCheckOutTime: (state, action: PayloadAction<any>) => {
            state.property.rules.check_out_time = action.payload
        },
        setRulesMinStayDays: (state, action: PayloadAction<any>) => {
            state.property.rules.min_stay_days = action.payload
        },
        setRulesSuitableForChildren: (state, action: PayloadAction<any>) => {
            state.property.rules.suitable_for_children = action.payload
        },
        setRulesSuitableForInfants: (state, action: PayloadAction<any>) => {
            state.property.rules.suitable_for_infants = action.payload
        },
        setRulesPetsAllowed: (state, action: PayloadAction<any>) => {
            state.property.rules.pets_allowed = action.payload
        },
        setRulesSmokingAllowed: (state, action: PayloadAction<any>) => {
            state.property.rules.smoking_allowed = action.payload
        },
        setRulesEventsAllowed: (state, action: PayloadAction<any>) => {
            state.property.rules.events_allowed = action.payload
        },
        setRulesWithRentalAgreement: (state, action: PayloadAction<any>) => {
            state.property.rules.with_rental_agreement = action.payload
        },
        setRulesDamageDepositAmount: (state, action: PayloadAction<any>) => {
            state.property.rules.damage_deposit_amount = action.payload
        },
        setRulesDamageDepositCurrency: (state, action: PayloadAction<any>) => {
            state.property.rules.damage_deposit_currency = action.payload
        },
        setRulesDownPaymentAmount: (state, action: PayloadAction<any>) => {
            state.property.rules.down_payment_amount = action.payload
        },
        setRulesAdditionalRules: (state, action: PayloadAction<any>) => {
            state.property.rules.additional_rules = action.payload
        },
    },
    extraReducers: {
        [fetchProperties.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.properties = action.payload;
        },
        [fetchProperties.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchProperties.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchPropertiesForMap.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.propertiesForMap = action.payload;
        },
        [fetchPropertiesForMap.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchPropertiesForMap.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchProperty.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.property = action.payload;
        },
        [fetchProperty.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchProperty.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchCalculatePrice.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.error = '';
            state.property.price = action.payload;
        },
        [fetchCalculatePrice.pending.type]: (state) => {
            state.error = '';
        },
        [fetchCalculatePrice.rejected.type]: (state, action: PayloadAction<any>) => {
            state.error = action.payload
        },
        [fetchPropertiesExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.properties = action.payload;
        },
        [fetchPropertiesExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchPropertiesExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },

        [fetchClosedBookingDatesExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.property.closed_booking_dates = action.payload;
        },
        [fetchClosedBookingDatesExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchClosedBookingDatesExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },

        [fetchIcalExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.property.ical = action.payload;
        },
        [fetchIcalExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchIcalExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },

        [fetchIcalsExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.property.icals = action.payload;
        },
        [fetchIcalsExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchIcalsExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },

        [fetchPropertyExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.property = action.payload;
        },
        [fetchPropertyExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchPropertyExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export const { getProperty, setCurrency, setPhone, setRegion, setAdType, setName, setDescription, setPrice, setGuests, setInstantBookingAvailable, setClosedBookingDates,
    setSummaryBedrooms, setSummaryBeds, setBedroomsInfo, setSummaryBathrooms, setCostPerPeriod, setAddress, setAddressSupplement, setStatus, setAdditionalGuests, setCostPerAdditionalGuest,
    setAdditionalPrice, setCoords, setPhotos, deletePhotos, setAmenities, setRulesCheckInTime, setRulesCheckOutTime, setRulesMinStayDays, setRulesSuitableForChildren, setRulesSuitableForInfants, setRulesPetsAllowed,
    setRulesSmokingAllowed, setRulesEventsAllowed, setRulesWithRentalAgreement, setRulesDamageDepositAmount, setRulesDamageDepositCurrency, setRulesDownPaymentAmount, setRulesAdditionalRules } = propertySlice.actions;
export default propertySlice.reducer;

/*
export default function property(state= initialState, action) {
    switch(action.type){
        case "GET_PROPERTIES":
            return {...state, properties: action.payload};
        case "GET_PROPERTY":
            return {
                ...state,
                guests: action.payload.guests,
                name: action.payload.name,
                price: action.payload.price,
                description: action.payload.description,
                currency: action.payload.currency,
                phone: action.payload.phone,
                ad_type: action.payload.ad_type,
                region: action.payload.region,
                lat: action.payload.lat,
                lng: action.payload.lng,
                user: action.payload.user,
                photos: action.payload.photos,
                closedBookingDates: action.payload.closed_booking_dates,
                instantBookingAvailable: action.payload.instant_booking_available,
                roomsAndSpaces: action.payload.rooms_and_spaces,
                //costPerPeriod: action.payload.cost_per_period,
                period: action.payload.period,
                id: action.payload.id,
                address: action.payload.address,
                address_supplement: action.payload.address_supplement,
                status: action.payload.status,
                additionalGuests: action.payload.additional_guests,
                costPerAdditionalGuest: action.payload.cost_per_additional_guest,
                amenities: action.payload.amenities,
                moderatedReviews: action.payload.moderatedReviews,
                property: {...state.property, rules: action.payload.rules }
            };
        case "SET_CALENDAR_DATE":
            return {...state, startDate: action.payload.startDate, endDate: action.payload.endDate};
        case "SET_COORDS":
            return {...state, lat: action.payload.lat, lng: action.payload.lng};
        case "SET_PHOTOS":
            return {...state, photos: action.payload};
        case "GET_INITIAL_PHOTOS":
            return {...state, initialPhotos: action.payload};
        case "GET_ICALS":
            return {...state, property: {...state.property, iCals: action.payload}};
        case "GET_ICAL":
            return {...state, property: {...state.property, iCal: action.payload}};
        case "DELETE_PHOTOS":
            return {...state, photos: [], initialPhotos: []};
        case "SET_CURRENCY":
            return {...state, currency: action.payload};
        case "SET_PHONE":
            return {...state, phone: {...state.phone, id: action.payload}};
        case "SET_REGION":
            return {...state, region: {...state.region, id: action.payload}};
        case "SET_AD_TYPE":
            return {...state, ad_type: {...state.ad_type, id: action.payload}};
        case "SET_NAME":
            return {...state, name: action.payload};
        case "SET_DESCRIPTION":
            return {...state, description: action.payload};
        case "SET_PRICE":
            return {...state, price: action.payload};
        case "SET_GUESTS":
            return {...state, guests: action.payload};
        case "SET_INSTANT_BOOKING_AVAILABLE":
            return {...state, instantBookingAvailable: action.payload};
        case "GET_CLOSED_BOOKING_DATES":
            return {...state, closedBookingDates: action.payload};
        case "SET_SUMMARY_BEDROOMS":
            return {...state, roomsAndSpaces: {...state.roomsAndSpaces, summary: {...state.roomsAndSpaces.summary, number_of_bedrooms: action.payload}}};
        case "SET_SUMMARY_BEDS":
            return {...state, roomsAndSpaces: {...state.roomsAndSpaces, summary: {...state.roomsAndSpaces.summary, number_of_beds: action.payload}}};
        case "SET_BEDROOMS_INFO":
            return {...state, roomsAndSpaces: {...state.roomsAndSpaces, bedrooms_info: action.payload}};
        case "SET_SUMMARY_BATHROOMS":
            return {...state, roomsAndSpaces: {...state.roomsAndSpaces, summary: {...state.roomsAndSpaces.summary, number_of_bathrooms: action.payload}}};
        case "SET_COST_PER_PERIOD":
            return {...state, costPerPeriod: action.payload };
        case "SET_ADDRESS":
            return {...state, address: action.payload };
        case "SET_ADDRESS_SUPPLEMENT":
            return {...state, address_supplement: action.payload };
        case "SET_STATUS":
            return {...state, status: action.payload };
        case "SET_ADDITIONAL_GUESTS":
            return {...state, additionalGuests: action.payload };
        case "SET_COST_PER_ADDITIONAL_GUEST":
            return {...state, costPerAdditionalGuest: action.payload };
        case "SET_ADDITIONAL_PRICE":
            return {...state, additionalPrice: action.payload };
        case "SET_AMENITIES":
            return {...state, amenities: action.payload };
        case "GET_RULES":
            return {...state, property: {...state.property, rules: action.payload }};
        case "SET_RULES_CHECK_IN_TIME":
            return {...state, property: {...state.property, rules: {...state.property.rules, check_in_time: action.payload} }};
        case "SET_RULES_CHECK_OUT_TIME":
            return {...state, property: {...state.property, rules: {...state.property.rules, check_out_time: action.payload} }};
        case "SET_RULES_MIN_STAY_DAYS":
            return {...state, property: {...state.property, rules: {...state.property.rules, min_stay_days: action.payload} }};
        case "SET_RULES_SUITABLE_FOR_CHILDREN":
            return {...state, property: {...state.property, rules: {...state.property.rules, suitable_for_children: action.payload} }};
        case "SET_RULES_SUITABLE_FOR_INFANTS":
            return {...state, property: {...state.property, rules: {...state.property.rules, suitable_for_infants: action.payload} }};
        case "SET_RULES_PETS_ALLOWED":
            return {...state, property: {...state.property, rules: {...state.property.rules, pets_allowed: action.payload} }};
        case "SET_RULES_SMOKING_ALLOWED":
            return {...state, property: {...state.property, rules: {...state.property.rules, smoking_allowed: action.payload} }};
        case "SET_RULES_EVENTS_ALLOWED":
            return {...state, property: {...state.property, rules: {...state.property.rules, events_allowed: action.payload} }};
        case "SET_RULES_WITH_RENTAL_AGREEMENT":
            return {...state, property: {...state.property, rules: {...state.property.rules, with_rental_agreement: action.payload} }};
        case "SET_RULES_DAMAGE_DEPOSIT_AMOUNT":
            return {...state, property: {...state.property, rules: {...state.property.rules, damage_deposit_amount: action.payload} }};
        case "SET_RULES_DAMAGE_DEPOSIT_CURRENCY":
            return {...state, property: {...state.property, rules: {...state.property.rules, damage_deposit_currency: action.payload} }};
        case "SET_RULES_DOWN_PAYMENT_AMOUNT":
            return {...state, property: {...state.property, rules: {...state.property.rules, down_payment_amount: action.payload} }};
        case "SET_RULES_ADDITIONAL_RULES":
            return {...state, property: {...state.property, rules: {...state.property.rules, additional_rules: action.payload} }};
        case "GET_PROPERTIES_FOR_MAP":
            return {...state, propertiesForMap: action.payload };
        default: return state;
    }
};*/