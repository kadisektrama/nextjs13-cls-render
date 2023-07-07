import React from 'react'
import { BottomSheet } from "react-spring-bottom-sheet";

import IconButton from "@mui/material/IconButton";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Divider } from "@mui/material";

export const ModalWindow: React.FC<any> = (props) => {
    const handleChangeStatusAmenity = (amenityId: any, amenityStatus: any) => {
        let amenities = props.property.amenities
        let amenityIndex = amenities.findIndex((amenity: any) => amenity.amenity_id === amenityId);
        if (amenityIndex !== -1) {
            amenities[amenityIndex].status = amenityStatus
        } else {
            amenities.push({
                'amenity_id': amenityId,
                'status': amenityStatus,
            })
        }

        localStorage.setItem('property[amenities]', JSON.stringify(amenities))
        props.propertyActions.setAmenities(amenities);
    }

    return (
        <BottomSheet
            open={props.open}
            onDismiss={() => props.handleClose()}
            blocking={false}
            snapPoints={({maxHeight }) => [
                maxHeight - 80,
            ]}
        >
            {props.open && (
                <div style={{ overflow: 'auto', padding: '8px', position: 'relative' }}>
                    <h3>Удобства</h3>
                    <div style={{ marginTop: '-32px' }}>
                        {props.amenityCategory.amenityCategories?.map((amenityCategory: any) => (
                            <div key={amenityCategory.id}>
                                <div id={amenityCategory.name} style={{ fontSize: '18px', fontWeight: '600', paddingTop: '48px', paddingBottom: '8px' }}>{amenityCategory.name}</div>

                                {props.amenity.amenities?.filter((amenity: any) => amenity.category_id === amenityCategory.id).map((amenity: any) => {
                                    let propertyAmenity = props.property.amenities.find((propertyAmenity: any) => propertyAmenity.amenity_id === amenity.id)

                                    return(
                                        <div key={amenity.id}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 127px', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                                                <div>{amenity.name}</div>
                                                <div style={{ minWidth: '115px' }}>
                                                    <IconButton
                                                        style={{ backgroundColor: propertyAmenity?.status === 0 ? 'black' : 'white' }}
                                                        sx={{ border: '1px solid black', backgroundColor: propertyAmenity?.status === 0 ? 'black' : 'white', color: propertyAmenity?.status === 0 ? 'white' : 'black' }}
                                                        onClick={() => handleChangeStatusAmenity(amenity.id, 0)}
                                                        aria-label="fingerprint"
                                                    >
                                                        <ClearIcon />
                                                    </IconButton>

                                                    <IconButton
                                                        style={{ backgroundColor: propertyAmenity?.status === 1 ? 'black' : 'white' }}
                                                        sx={{ border: '1px solid black', marginRight: '20px', marginLeft: '20px', backgroundColor: propertyAmenity?.status === 1 ? 'black' : 'white', color: propertyAmenity?.status === 1 ? 'white' : 'black' }}
                                                        onClick={() => handleChangeStatusAmenity(amenity.id, 1)}
                                                        aria-label="fingerprint"
                                                    >
                                                        <CheckIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <Divider />
                                        </div>
                                    )})}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </BottomSheet>
    );
}