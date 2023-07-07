import { AdvancedFetch, requestOptions } from "@/utils/Helpers/Fetch/advancedFetch";
import lodash from "lodash"

export async function createProperty (property: any) {
    const createPhotos = (property: any, id: any) => {
        return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/photos`, {
            ...requestOptions as unknown as RequestInit,
            method: 'POST',
            body: JSON.stringify({
                images: property.photos,
            })
        })
    }

    const createContent = (property: any) => {
        return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties`, {
            ...requestOptions as unknown as RequestInit,
            method: 'POST',
            body: JSON.stringify({
                name: property.name,
                description: property.description,
                price: property.price,
                currency: property.currency,
                user_phone_id: property.phone.id,
                region_id: property.region.id,
                property_type_id: property.ad_type.id,
                lat: lodash.round(property.lat, 6),
                lng: lodash.round(property.lng, 6),
                guests: property.guests,
                instant_booking_available: property.instantBookingAvailable,
                rooms_and_spaces: property.roomsAndSpaces,
                address: property.address,
                address_supplement: property.address_supplement,
                additional_guests: property.additionalGuests,
                cost_per_additional_guest: property.costPerAdditionalGuest,
            })
        })
            .then(
                (result) => result,
                (error) => console.log(error)
            )
    }

    let response = await createContent(property);
    await Promise.all([
        updateAmenities(response.id, property.amenities),
        createPhotos(property, response.id),
        createPropertyRules(response.id, lodash.pickBy(property.property.rules, lodash.identity))
    ])

    return property
}

export const updatePropertyStatus = (id: any, status: any) => {
    return fetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            status
        })
    })
}

export const getProperty = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}`, requestOptions as unknown as RequestInit)
        // .then(
        //     (result) => {
        //         props.propertyActions.getProperty(result);

        //         let photos = [];
        //         let initialPhotos = [];
        //         result.photos.forEach(el => {
        //             photos.push({
        //                 'path': el.path
        //             });

        //             initialPhotos.push({
        //                 'url': el.url
        //             });
        //         })

        //         props.propertyActions.setPhotos(photos);
        //         props.propertyActions.getInitialPhotos(initialPhotos);

        //         return result
        //     },
        //     (error) => {
        //         console.log(error);
        //         throw new Error('404 Page Not Found');
        //     }
        // )
}

export const updateProperty = (property: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            name: property.name,
            description: property.description,
            price: property.price,
            currency: property.currency,
            user_phone_id: property.phone.id,
            region_id: property.region.id,
            property_type_id: property.ad_type.id,
            lat: lodash.round(property.lat, 6),
            lng: lodash.round(property.lng, 6),
            guests: property.guests,
            instant_booking_available: property.instantBookingAvailable,
            rooms_and_spaces: property.roomsAndSpaces,
            address: property.address,
            address_supplement: property.address_supplement,
            additional_guests: property.additionalGuests,
            cost_per_additional_guest: property.costPerAdditionalGuest,
            //status: props.property.status,
        })
    })
}

export const updatePropertyPhotos = (property: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/photos`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            images: property.photos,
        })
    })
}

export const getProperties = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties`, requestOptions as unknown as RequestInit)
}

export const getBookingRequests = (status = '', customParams = '') => {
    let params = new URLSearchParams({
        status: status,
    });

    Array.from(params.entries()).forEach(([key, value]) => {
        if (!value) params.delete(key)
    });

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/bookings?${params.toString()}` + customParams, requestOptions as unknown as RequestInit)
}

export const getAddedBookingRequests = (status = '', customParams = '') => {
    let params = new URLSearchParams({
        status: status,
    });

    Array.from(params.entries()).forEach(([key, value]) => {
        if (!value) params.delete(key)
    });

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/bookings?${params.toString()}${customParams}`, requestOptions as unknown as RequestInit)
}

export const updateBookingAccept = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/bookings/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            status: 'confirmed'
        })
    })
}

export const updateBooking = (id: any, status: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/bookings/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            status: status
        })
    })
}

export const updateBookingReject = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/bookings/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            status: 'rejected'
        })
    })
}

export const getClosedBookingDates = (id: any, customParams = '?format=dates') => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/closed-booking-dates${customParams}`, requestOptions as unknown as RequestInit)
}

export const setClosedBookingDates = (id: any, startDate: any, endDate: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/closed-booking-dates`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            'start_date': startDate,
            'end_date': endDate,
        })
    })
}

export const deleteClosedBookingDates = (id: any, startDate: any, endDate: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/closed-booking-dates`, {
        ...requestOptions as unknown as RequestInit,
        method: 'DELETE',
        body: JSON.stringify({
            'start_date': startDate,
            'end_date': endDate,
        })
    })
}

export const updatePrice = (id: any, startDate: any, endDate: any, price: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/property-prices`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            'start_date': startDate,
            'end_date': endDate,
            'price': price,
        })
    })
}

export const getChatChannels = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/chat-channels?include=booking,lastChatMessage&sort=-last-chat-message-or-booking`, requestOptions as unknown as RequestInit)
}

export async function createChatChannel(props: any, startDate: any, endDate: any) {
    const getLastBooking = (props: any) => {
        let params = new URLSearchParams({
            'limit': 1,
            'sort': '-created_at',
            'property_id': `eq:${props.property.id}`,
            'user_id': `eq:${props.user.id}`,
            'start_date[]': `eq:${startDate}`,
            'end_date[]': `eq:${endDate}`,
        } as unknown as string[][]);

        return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/bookings?${params.toString()}`, requestOptions as unknown as RequestInit)
    }

    const createChatChannelChat = (props: any, lastBooking: any) => {
        return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/chat-channels`, {
            ...requestOptions as unknown as RequestInit,
            method: 'POST',
            body: JSON.stringify({
                'property_id': props.property.id,
                'with_user_id': props.user.id,
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

    let lastBooking = await getLastBooking(props);
    let chat = await createChatChannelChat(props, lastBooking.data[0]);

    return chat
}

export const updateAmenities = (id: any, amenities: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/amenities`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(amenities)
    })
}

export const createPropertyRules = (id: any, rules: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/property-rules`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(lodash.omitBy(rules, lodash.isNil))
    })
}

export const updatePropertyRules = (id: any, rules: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/property-rules`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(lodash.omitBy(rules, lodash.isNil))
    })
}

export const getIcals = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/i-cals`, requestOptions as unknown as RequestInit)
}

export const createIcals = (id: any, link: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/i-cals`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            link: link,
        })
    })
}

export const deleteIcals = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/i-cals/${id}`, {...requestOptions as unknown as RequestInit, method: 'DELETE'})
}

export const getIcal = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/export-i-cal`, requestOptions as unknown as RequestInit)
}

export const getPropertyPrices = (id: any, startDate: any, endDate: any) => {
    let params = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
    });

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/price-per-day?` + params.toString(), requestOptions as unknown as RequestInit)
}

export const getPropertyPricePerDay = (id: any, startDate: any, endDate: any) => {
    let params = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
    });

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/price-per-day?${params.toString()}`, requestOptions as unknown as RequestInit)
}

export const getReviews = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/reviews`, requestOptions as unknown as RequestInit)
}

export const getReview = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/reviews/${id}`, requestOptions as unknown as RequestInit)
}

export const getExpandedReviewScores = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/booking-reviews/${id}/expanded-review-scores`, requestOptions as unknown as RequestInit)
}

export const updateReview = (id: any, body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/reviews/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(body)
    })
}

export const getPropertyRules = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/property-rules`, requestOptions as unknown as RequestInit)
}