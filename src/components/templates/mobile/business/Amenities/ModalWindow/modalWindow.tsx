import React from 'react';
import { BottomSheet } from "react-spring-bottom-sheet";

import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppSelector } from '@/redux/hooks/hooks';

export const ModalWindow: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    let propertyAmenitiesStatusFalse = state.property.property.amenities?.filter((propertyAmenity: any) => (propertyAmenity.status === false))

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
                    <Typography variant="h6" component="div">Какие удобства вас ждут</Typography>
                    <div style={{ marginTop: '-32px' }}>
                        {state.amenityCategory.amenityCategories.map((amenityCategory: any) => {
                            let propertyCategoryAmenity = state.property.property.amenities?.find((propertyAmenity: any) => (propertyAmenity.category_id === amenityCategory.id && propertyAmenity.status === true))

                            return (
                                <>
                                    {propertyCategoryAmenity && (
                                        <div key={amenityCategory.id}>
                                            <div id={amenityCategory.name} style={{ fontSize: '18px', fontWeight: '600', paddingTop: '48px', paddingBottom: '8px' }}>{amenityCategory.name}</div>
                                            {state.property.property.amenities?.filter((amenity: any) => amenity.category_id === amenityCategory.id).map((amenity: any) => {
                                                let propertyAmenity = state.property.property.amenities?.find((propertyAmenity: any) => (propertyAmenity.id === amenity.id && propertyAmenity.status === true))

                                                return(
                                                    <>
                                                        {propertyAmenity ?
                                                            (
                                                                <div key={amenity.id}>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem', textDecoration: 'none' }}>
                                                                        <div>{amenity.name}</div>
                                                                    </div>
                                                                    <Divider />
                                                                </div>
                                                            ) : ''
                                                        }
                                                    </>
                                                )}
                                            )}
                                        </div>
                                    )}
                                </>
                            )
                        })}

                        {propertyAmenitiesStatusFalse.length > 0 && (
                            <>
                                <div style={{ fontSize: '18px', fontWeight: '600', paddingTop: '48px', paddingBottom: '8px' }}>Не включено</div>
                                {propertyAmenitiesStatusFalse.map((amenity: any) => (
                                        <>
                                            <div key={amenity.id}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem', textDecoration: 'line-through' }}>
                                                    <div>{amenity.name}</div>
                                                </div>
                                                <Divider />
                                            </div>
                                        </>
                                    )
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </BottomSheet>
    );
}