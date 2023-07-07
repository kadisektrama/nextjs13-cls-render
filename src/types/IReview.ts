import { IUserProfile } from "@/types/IUser";

export interface IReview {
    is_anonymous: any,
    public_comment: any,
    private_comment: any,
    created_at: any,
    score: any,
    status: any,
    user?: IUserProfile,
    booking_id: any,
    is_read_manager: any,
    is_read_host: any,
    property_id: any,
}

export type TExpandedReviewScore = {
    value: any,
    reviewScoreCategory: {
        id: any
    }
}