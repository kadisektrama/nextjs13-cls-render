import React from "react";

import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

import { getNoun } from "@/utils/Helpers/Translator/translator";
import { useAppSelector } from "@/redux/hooks/hooks";

export const DescriptionAboutFlat = () => {
    const state = useAppSelector(state => state)

    return (
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
            <div>
                <Typography variant="h6" component="div">
                    {`${state.propertyType.propertyTypes.filter((item: any) => item.id === state.property.property.ad_type.id)[0]['name']}, хозяин: ${state.property.property.user?.user_profile?.first_name}`}
                </Typography>
                <Typography variant="body2" component="div" color="text.secondary">
                    {`${state.property.property.region.name}, ${state.property.property.address}`}
                </Typography>
                <span>
                    {(state.property.property.guests + state.property.property.additional_guests) + getNoun(state.property.property.guests + state.property.property.additional_guests, ' гость', ' гостя', ' гостей') + ' \u{00B7} '
                        + state.property.property.rooms_and_spaces.summary.number_of_bedrooms + getNoun(state.property.property.rooms_and_spaces.summary.number_of_bedrooms, ' спальня', ' спальни', ' спален') + ' \u{00B7} '
                        + state.property.property.rooms_and_spaces.summary.number_of_beds + getNoun(state.property.property.rooms_and_spaces.summary.number_of_beds, ' кровать', ' кровати', ' кроватей') + ' \u{00B7} '
                        + state.property.property.rooms_and_spaces.summary.number_of_bathrooms + getNoun(state.property.property.rooms_and_spaces.summary.number_of_bathrooms, ' ванная', ' ванные', ' ванных')}
                </span>
            </div>
            <Avatar sx={{ width: 40, height: 40 }} src={state.property.property.user?.user_profile.photo?.url}>{state.property.property.user?.user_profile?.first_name[0]}</Avatar>
        </div>
    );
}
