export const cachedProperty = (props) => {
    return {
        ...props.property,
        name: localStorage.getItem('property[name]') || null,
        description: localStorage.getItem('property[description]') || null,
        ad_type: { id: localStorage.getItem('property[ad_type]') ? +localStorage.getItem('property[ad_type]') : 1 },
        region: { id: localStorage.getItem('property[region]') ? +localStorage.getItem('property[region]') : 3 },
        address: localStorage.getItem('property[address]') || null,
        address_supplement: localStorage.getItem('property[address_supplement]') || null,
        price: localStorage.getItem('property[price]') || null,
        currency: localStorage.getItem('property[currency]') || 'BYN',
        phone: { id: +localStorage.getItem('property[phone]') || props.user.user.phones?.at(0).id },
        guests: localStorage.getItem('property[guests]') || null,
        additional_guests: localStorage.getItem('property[additional_guests]') || null,
        cost_per_additional_guest: localStorage.getItem('property[cost_per_additional_guest]') || null,
        instant_booking_available: localStorage.getItem('property[instant_booking_available]') ? localStorage.getItem('property[rules.pets_allowed]') === 'true' : false,
        lat: localStorage.getItem('property[lat]') || null,
        lng: localStorage.getItem('property[lng]') || null,
        amenities: localStorage.getItem('property[amenities]') ? JSON.parse(localStorage.getItem('property[amenities]')) : [],
        rules: {
            damage_deposit_amount: localStorage.getItem('property[rules.damage_deposit_amount]') || null,
            down_payment_amount: localStorage.getItem('property[rules.down_payment_amount]') || 0,
            check_in_time: localStorage.getItem('property[rules.check_in_time]') || "12:00",
            check_out_time: localStorage.getItem('property[rules.check_out_time]') || "14:00",
            min_stay_days: +localStorage.getItem('property[rules.min_stay_days]') || 1,
            pets_allowed: localStorage.getItem('property[rules.pets_allowed]') ? localStorage.getItem('property[rules.pets_allowed]') === 'true' : null,
            smoking_allowed: localStorage.getItem('property[rules.smoking_allowed]') ? localStorage.getItem('property[rules.smoking_allowed]') === 'true' : null,
            events_allowed: localStorage.getItem('property[rules.events_allowed]') ? localStorage.getItem('property[rules.events_allowed]') === 'true' : null,
            with_rental_agreement: localStorage.getItem('property[rules.with_rental_agreement]') ? localStorage.getItem('property[rules.with_rental_agreement]') === 'true' : null,
            suitable_for_children: localStorage.getItem('property[rules.suitable_for_children]') ? localStorage.getItem('property[rules.suitable_for_children]') === 'true' : null,
            suitable_for_infants: localStorage.getItem('property[rules.suitable_for_infants]') ? localStorage.getItem('property[rules.suitable_for_infants]') === 'true' : null,
            additional_rules: localStorage.getItem('property[rules.additional_rules]') || null,
        },
        rooms_and_spaces: {
            summary: {
                number_of_beds: localStorage.getItem('property[number_of_beds]') || null,
                number_of_bathrooms: localStorage.getItem('property[number_of_bathrooms]') || null,
                number_of_bedrooms: localStorage.getItem('property[number_of_bedrooms]') || null,
            }
        },
    }
}