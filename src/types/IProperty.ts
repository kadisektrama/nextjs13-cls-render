import { IUser } from "@/types/IUser"
import { IReview } from "@/types/IReview"
import { PropertyStatusesViewAdmin } from "@/utils/Constants/Enums/PropertyStatuses"
import { IRegion } from "@/types/IRegion"

export interface IProperty {
    rules: {
        check_in_time: any,
        check_out_time: any,
        min_stay_days: any,
        down_payment_amount: any,
        pets_allowed: any,
        smoking_allowed: any,
        with_rental_agreement: any,
        suitable_for_children: any,
        damage_deposit_amount: any,
        additional_rules: any,
        events_allowed: any,
        suitable_for_infants: any,
        damage_deposit_currency: any,
    },
    id: any,
    status: keyof typeof PropertyStatusesViewAdmin,
    startDate: any,
    endDate: any,
    closed_booking_dates: any,
    currency: any,
    phone: any,
    region: IRegion,
    ad_type: any,
    lat: any,
    lng: any,
    name: any,
    description: any,
    price: any,
    guests: any,
    instant_booking_available: number,
    rooms_and_spaces: {
        summary: {
            //additional_guests: any,
            number_of_bedrooms: any,
            number_of_beds: any,
            number_of_bathrooms: any,
        },
        bedrooms_info: any,
    },
    cost_per_period: any,
    period: any,
    address: any,
    address_supplement: any,
    additional_guests: any,
    cost_per_additional_guest: any,
    additional_price: any,
    amenities: any,
    photos: any,
    initialPhotos: any,
    user: IUser | null,
    moderatedReviews: {
        data: {
            reviews: IReview[],
            scoreCount: any,
            scoreAvg: number,
            scorePerCategory: TScorePerCategory[],
        }
    },
    ical: any,
    icals: any,
}

export type TScorePerCategory = {
    name: string,
    scoreAvg: number    
}