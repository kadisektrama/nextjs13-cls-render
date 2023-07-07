import { AdvancedFetch, requestOptions } from "@/utils/Helpers/Fetch/advancedFetch";

export const getBookings = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/bookings?include=review&per_page=100`, requestOptions as unknown as RequestInit)
}

export const getBooking = (status = '', customParams = '') => {
    const req = {
        status: status,
    };

    let params = new URLSearchParams(req);
    let keysForDel: any[] = [];

    params.forEach((value, key) => { // never reaches `c`
        if (value === '') {
            keysForDel.push(key);
        }
    });

    keysForDel.forEach(key => {
        params.delete(key);
    });

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/bookings?` + params.toString() + customParams, requestOptions as unknown as RequestInit)
}

export const updateBooking = (id: any, status: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/bookings/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            status: status
        })
    })
}

export const getChatChannels = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/chat-channels?include=booking,lastChatMessage&sort=-last-chat-message-or-booking`, requestOptions as unknown as RequestInit)
}

export async function createChatChannel(property: any) {
    const getLastBooking = (property: any) => {
        const req = {
            'limit': 1,
            'sort': '-created_at',
            'property_id': `eq:${property.id}`,
        };

        let params = new URLSearchParams(req as unknown as string[][]);

        return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/bookings?` + params.toString(), requestOptions as unknown as RequestInit)
    }

    const createChatChannelChat = (property: any, lastBooking: any) => {
        return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/chat-channels`, {
            ...requestOptions as unknown as RequestInit,
            method: 'POST',
            body: JSON.stringify({
                'property_id': property.id,
                'with_user_id': property.user.id,
                'details': {
                    booking: {
                        start_date: lastBooking.start_date,
                        end_date: lastBooking.end_date,
                        guests: {
                            adults: lastBooking.guests
                        },
                    }
                }
            })
        })
    }

    let lastBooking = await getLastBooking(property);
    let chat = await createChatChannelChat(property, lastBooking.data[0]);

    return chat
}

// Причины отказа от бронирования
export function createReservationFeedback(id: any, body: any) {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/bookings/${id}/feedback`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(body)
    })
}

export const createReview = (review: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/bookings/${id}/review`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(review.review)
    })
}

export const createExpandReviewScores = (review: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/bookings/${id}/expanded-review-scores`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(review.expandedReviewScores)
    })
}

export const getReviews = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/reviews`, requestOptions as unknown as RequestInit)
}

export const getReview = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/bookings/${id}/review`, requestOptions as unknown as RequestInit)
}

export const getExpandedReviewScores = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/booking-reviews/${id}/expanded-review-scores`, requestOptions as unknown as RequestInit)
}