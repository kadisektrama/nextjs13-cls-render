import { addDays, format } from "date-fns";
import lodash from 'lodash';
import { AdvancedFetch, requestOptions } from "@/utils/Helpers/Fetch/advancedFetch";

export const getCurrencies = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/currencies`)
}

export const getRegions = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/regions`)
}

export const getPropertyTypes = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/property-types`)
}

export const getMailInfo = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user/notifications/mail/notify-status`, requestOptions as unknown as RequestInit)
}

export const getTelegramInfo = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user/notifications/telegram/notify-status`, requestOptions as unknown as RequestInit)
}

export const getTelegramSubscribeLink = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user/notifications/telegram/subscribe-link`, requestOptions as unknown as RequestInit)
}

export const updateStatusTelegram = (status: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user/notifications/telegram/update`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            'status': status,
        })
    })
}

const getLastBooking = (propertyId: any, startDate: any, endDate: any) => {
    const req = {
        'limit': 1,
        'sort': '-created_at',
        'property_id': `eq:${propertyId}`,
        'start_date[]': startDate,
        'end_date[]': endDate,
    };

    let params = new URLSearchParams(req as unknown as string[][]);

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/secure/bookings?` + params.toString(), requestOptions as unknown as RequestInit)
}

const createChatChannelChat = (property: any, lastBooking: any) => {
    let searchParams = new URLSearchParams(window.location.search)

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/chat-channels`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            'property_id': property.id,
            'with_user_id': property.user.id,
            'details': lastBooking
                ?
                {
                    booking: {
                        start_date: lastBooking.start_date,
                        end_date: lastBooking.end_date,
                        guests: {
                            adults: lastBooking.guests
                        },
                    }
                }
                :
                {
                    booking: {
                        start_date: searchParams.get('startDate') || format(new Date(), 'yyyy-MM-dd'),
                        end_date: searchParams.get('endDate') || format(addDays(new Date(), 1), 'yyyy-MM-dd'),
                        guests: {
                            adults: searchParams.get('adults') || 1,
                        },
                    }
                },
        })
    })
}

export async function createChatChannel(property: any, message: any, startDate: any, endDate: any) {
    const createChatChannelMessage = (id: any, message: any) => {
        return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/chat-channels/${id}/chat-messages`, {
            ...requestOptions as unknown as RequestInit,
            method: 'POST',
            body: JSON.stringify({
                message: message
            })
        })
    }

    let lastBooking = await getLastBooking(property.id, startDate, endDate);
    let chat = await createChatChannelChat(property, lastBooking[0]);
    if (!chat.id) return chat
    let result = await createChatChannelMessage(chat.id, message);

    return result
}

export const getChatMessages = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/chat-channels/${id}/chat-messages`, requestOptions as unknown as RequestInit)
        .then((res: any) => {
            if (res.status > 400) {
                throw new Error('404 Page Not Found')
            }

            return res;
        })

}

export function getFirstChatMessage(user: any, id: any, limit = '', sort = '') {
    const req = {
        limit: limit,
        sort: sort,
    };

    let params = new URLSearchParams(req);
    let keysForDel: any = [];
    params.forEach((value, key) => { // never reaches `c`
        if (value === '' || value === null) {
            keysForDel.push(key);
        }
    });

    keysForDel.forEach((key: any) => {
        params.delete(key);
    });

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/chat-channels/${id}/chat-messages?` + params.toString(), requestOptions as unknown as RequestInit)
        .then(
            (result) => {
                let upd = [...user.chats]
                return result.length && user.chats.map((item: any, index: any) => {
                    if (item.id === result[0].chat_channel_id) {
                        upd[index]['firstMessage'] = result[0];
                    }
                })
            }            
        )
}

export const createChatMessage = (id: any, message: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/chat-channels/${id}/chat-messages`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            message: message
        })
    })
}

export const getUserId = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user/identify`, requestOptions as unknown as RequestInit)
}

export const getUserPermissions = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user/identify`, requestOptions as unknown as RequestInit)
}

export const getUser = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user/identify`, requestOptions as unknown as RequestInit)
}

export const getCountryRegisters = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/country-registers`, requestOptions as unknown as RequestInit)
}

export const getUserExists = (login: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/auth/available-to-login`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            login: login
        })
    })
}

export const verifyCode = (body: any) => {
    return fetch(`${process.env.NEXT_PUBLIC_REST_API}/phone-verification/verify`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(body)
    })
}

export const sendVerifyCode = (body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/phone-verification/send-code`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(body)
    })
}

export const getUserProfile = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user-profiles`, requestOptions as unknown as RequestInit)
}

export const updateUserProfile = (user: any) => {
    let body = {
        photo_path: user.user_profile.photo?.path,
        first_name: user.user_profile.first_name,
        last_name: user.user_profile.last_name,
        gender: user.user_profile.gender,
        birthdate: user.user_profile.birthdate,
        location: user.user_profile.location,
    }

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user-profiles`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PATCH',
        body: JSON.stringify(lodash.omitBy(body, lodash.isNil))
    })
}

export const getPropertyFavourites = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/property-favorites`, requestOptions as unknown as RequestInit)
}

export const createPropertyFavourite = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/properties/${id}/favorite`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
    })
}

export const deletePropertyFavourite = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/properties/${id}/favorite`, {
        ...requestOptions as unknown as RequestInit,
        method: 'DELETE',
    })
}

export const getUserEmailResend = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user/email-resend`, requestOptions as unknown as RequestInit)
}

export const getUserEmailVerify = (expires: any, signature: any) => {
    const req = {
        'expires': expires,
        'signature': signature,
    };

    let params = new URLSearchParams(req);

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user/email-verify?` + params.toString(), requestOptions as unknown as RequestInit)
}

export const getGeoInfo = () => {
    return AdvancedFetch('https://ipapi.co/json/')
}

export const getAmenities = (customParams = '') => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/amenities${customParams}`, requestOptions as unknown as RequestInit)
}

export const getCategoryAmenities = (customParams = '') => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/amenity-categories`, requestOptions as unknown as RequestInit)
}

export const getUserPhones = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user-phones`, requestOptions as unknown as RequestInit)
}

export const deleteUserPhone = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user-phones/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'DELETE',
    })
}

export const addUserPhone = (body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user-phones`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(body)
    })
}

export const updateUserPhone = (id: any, body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user-phones/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(body)
    })
}

export const updateUserEmail = (body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/user`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(body)
    })
}

export const getReviewScoreCategories = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/review-score-categories`, requestOptions as unknown as RequestInit)
}

export const signUp = (body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/auth/sign-up`, {
        ...requestOptions as unknown as RequestInit,
        body: JSON.stringify(body),
        method: 'POST',
    })
}

export const signIn = (body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/auth/login`, {
        ...requestOptions as unknown as RequestInit,
        body: JSON.stringify(body),
        method: 'POST',
    })
}