import { IUser } from "@/types/IUser"

export interface IBooking {
    cost: any,
    created_at: any,
    details: {
        guests: {
            adults: any,
            children: any,
            pets: any,
            infants: any,

        }
    }
    end_date: any,
    guests: any,
    id: any,
    property: any,
    reservation_code: any,
    review: any,
    service_fee: any,
    start_date: any,
    status: any,
    total_cost: any,
    updated_at: any,
    user: IUser,
}