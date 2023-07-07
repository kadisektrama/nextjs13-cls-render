import { AdvancedFetch, requestOptions } from "@/utils/Helpers/Fetch/advancedFetch";
import lodash from "lodash";

export const getRoles = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/roles`, requestOptions as unknown as RequestInit)
}

export const getPermissions = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/permissions`, requestOptions as unknown as RequestInit)
}

export const createPropertyType = (propertyType: any) => {
    AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/property-types`, {
        ...requestOptions as unknown as RequestInit,
        body: JSON.stringify({
            name: propertyType.name,
        })
    })
}

export const getCurrency = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/currencies/${id}`, requestOptions as unknown as RequestInit)
}

export const getCurrencies = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/currencies`, requestOptions as unknown as RequestInit)
}

export const updateCurrency = (currency: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/currencies/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            iso_code: currency.iso_code
        })
    })
}

export const createCurrency = (currency: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/currencies`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            iso_code: currency.iso_code
        })
    })
}

export const getPropertyType = (id: any) => {
    return fetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/property-types/${id}`, requestOptions as unknown as RequestInit)
}

export const getRegion = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/regions/${id}`, requestOptions as unknown as RequestInit)
}

export const getRegions = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/regions`, requestOptions as unknown as RequestInit)
}

export const updateRegion = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/regions/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            lat: '',
            lng: '',
            parent_id: '',
            name: '',
        })
    })
}

export const createRegion = (region: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/regions`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            lat: region.lat,
            lng: region.lng,
            parent_id: region.parentId,
            name: region.name,
        })
    })
}

export const updatePropertyType = (propertyType: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/property-types/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            iso_code: propertyType.name
        })
    })
}

export async function createProperty(property: any, userId: any) {
    const createPhotos = (property: any, content: any) => {
        return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/properties/${content.id}/photos`, {
            ...requestOptions as unknown as RequestInit,
            method: 'POST',
            body: JSON.stringify({
                images: property.photos,
            })
        })
    }

    const createContent = (property: any, userId: any) => {
        return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/properties`, {
            ...requestOptions as unknown as RequestInit,
            method: 'POST',
            body: JSON.stringify({
                user_id: userId,
                name: property.name,
                description: property.description,
                price: property.price,
                currency: property.currency,
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
                (result) => {
                    return result
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    let response = await createContent(property, userId);
    await Promise.all([
        createPhotos(property, response),
        updateAmenities(response.id, property.amenities),
        createPropertyRules(response.id, property.property.rules)
    ])
}

export const updateProperty = (property: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/properties/${id}`, {
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
            status: property.status,
            additional_guests: property.additionalGuests,
            cost_per_additional_guest: property.costPerAdditionalGuest,
        })
    })
}

export const updatePropertyPhotos = (property: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/properties/${id}/photos`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            images: property.photos,
        })
    })
}

export const getBookings = (params: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/bookings?${params}`, requestOptions as unknown as RequestInit)
}

export const getBooking = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/bookings/${id}`, requestOptions as unknown as RequestInit)
}

export const getLogs = (params: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/system-logs?${params}`, requestOptions as unknown as RequestInit)
}

export const getLog = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/system-logs/${id}`, requestOptions as unknown as RequestInit)
}

export const deleteLog = (params: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/system-logs?${params}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'DELETE'
    })
}

export const getAmenities = (params = '') => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/amenities${params}`, requestOptions as unknown as RequestInit)
}

export const getAmenityCategories = (params = '') => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/amenity-categories${params}`, requestOptions as unknown as RequestInit)
}

export const createAmenityCategory = (amenityCategory: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/amenity-categories`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            name: amenityCategory.name,
            is_active: amenityCategory.is_active,
            icon_path: amenityCategory.icon_path,
        })
    })
}

export const getAmenityCategory = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/amenity-categories/${id}`, requestOptions as unknown as RequestInit)
}

export const updateAmenityCategory = (amenityCategory: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/amenity-categories/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            name: amenityCategory.name,
            is_active: amenityCategory.is_active,
            icon_path: amenityCategory.icon_path,
            order: amenityCategory.order,
        })
    })
}

export const createAmenity = (amenity: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/amenities`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify({
            name: amenity.name,
            is_active: amenity.is_active,
            icon_path: amenity.icon_path,
            is_popular: amenity.is_popular,
            category_id: amenity.category_id,
        })
    })
}

export const getAmenity = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/amenities/${id}`, requestOptions as unknown as RequestInit)
}

export const updateAmenity = (amenity: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/amenities/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify({
            name: amenity.name,
            category_id: amenity.category_id,
            is_active: amenity.is_active,
            is_popular: amenity.is_popular,
            icon_path: amenity.icon_path,
        })
    })
}

export const updateAmenities = (id: any, amenities: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/properties/${id}/amenities`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(amenities)
    })
}

export const deleteAmenityCategory = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/amenity-categories/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'DELETE',
    })
}

export const deleteAmenity = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/amenities/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'DELETE',
    })
}

export const getProperties = (params: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/properties?${params}`, requestOptions as unknown as RequestInit)
}

export const getUsers = (params: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/users?${params}`, requestOptions as unknown as RequestInit)
}

export const addUserPhone = (body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/user-phones`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(body)
    })
}

export const getUserPhones = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/user-phones`, requestOptions as unknown as RequestInit)
}

export const deleteUserPhone = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/user-phones/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'DELETE',
    })
}

export const getAnswerTimeIndex = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/answer-time-index`, requestOptions as unknown as RequestInit)
}

export const getCalendarUpdateTimeIndex = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/calendar-update-time-index`, requestOptions as unknown as RequestInit)
}

export const updateAnswerTimeIndex = (id: any, body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/answer-time-index/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(body)
    })
}


export const updateCalendarUpdateTimeIndex = (id: any, body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/calendar-update-time-index/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(body)
    })
}

export const getReviews = (params: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/booking-reviews?${params}`, requestOptions as unknown as RequestInit)
}

export const createReview = (review: any) => {
    // const review = state.review.review
    Object.keys(review).forEach(k => review[k] === '' && delete review[k])

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/booking-reviews`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(review)
    })
}

export const createExpandReviewScores = (review: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/booking-reviews/${id}/expanded-review-scores`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(review.expandedReviewScores)
    })
}

export const getReview = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/booking-reviews/${id}`, requestOptions as unknown as RequestInit)
}

export const getExpandedReviewScores = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/booking-reviews/${id}/expanded-review-scores`, requestOptions as unknown as RequestInit)
}

export const updateReview = (review: any, id: any) => {
    Object.keys({...review}).forEach(k => review[k] === ('' || null) && delete review[k])

    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/booking-reviews/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(review)
    })
}

export const getReviewScoreCategories = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/review-score-categories`, requestOptions as unknown as RequestInit)
}

export const createReviewScoreCategory = (reviewScoreCategory: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/review-score-categories`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(reviewScoreCategory.reviewScoreCategory)
    })
}

export const getReviewScoreCategory = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/review-score-categories/${id}`, requestOptions as unknown as RequestInit)
}

export const updateReviewScoreCategory = (reviewScoreCategory: any, id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/review-score-categories/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(reviewScoreCategory.reviewScoreCategory)
    })
}

export const getBookingFeedbacks = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/booking-feedbacks`, requestOptions as unknown as RequestInit)
}

export const getBookingFeedback = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/booking-feedbacks/${id}`, requestOptions as unknown as RequestInit)
}

export const updateBooking = (id: any, body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/bookings/${id}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(body)
    })
}

export const getDashboard1 = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/widget/dashboard-1`, requestOptions as unknown as RequestInit)
}

export const getDashboard2 = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/widget/dashboard-2`, requestOptions as unknown as RequestInit)
}

export const getKeyStorageItems = () => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/key-storage-items`, requestOptions as unknown as RequestInit)
}

export const updateKeyStorageItem = (key: any, body: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/key-storage-items/${key}`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(body)
    })
}

export const getProperty = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/properties/${id}`, requestOptions as unknown as RequestInit)
        // .then(
        //     (result) => {
        //         props.propertyActions.getProperty(result);

        //         let photos = [];
        //         let initialPhotos = [];

        //         result.photos.forEach((el) => {
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

export const getPropertyRules = (id: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/properties/${id}/property-rules`, requestOptions as unknown as RequestInit)
}

export const updatePropertyRules = (id: any, rules: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/admin/properties/${id}/property-rules`, {
        ...requestOptions as unknown as RequestInit,
        method: 'PUT',
        body: JSON.stringify(lodash(rules).omitBy(lodash.isNil).value())
    })
}

export const createPropertyRules = (id: any, rules: any) => {
    return AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/extranet/properties/${id}/property-rules`, {
        ...requestOptions as unknown as RequestInit,
        method: 'POST',
        body: JSON.stringify(lodash(rules).omitBy(lodash.isNil).value())
    })
}