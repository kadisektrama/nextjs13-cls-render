import * as React from 'react';

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 'calc(100% - 100px)',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
    m: 1
};

export const ModalWindow: React.FC<any> = ({ amenityCategories, amenities, ...props }) => {
    let propertyAmenitiesStatusFalse = amenities?.filter((propertyAmenity: any) => (propertyAmenity.status === false))

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <Box sx={style}>
                    <div style={{
                        height: '75px',
                        padding: '0px',
                        margin: '0px',
                        zIndex: 1,
                        position: 'sticky',
                        top: '0px',
                        left: '0px',
                        backgroundColor: 'white',
                    }}>
                        <IconButton
                            sx={{ border: '1px solid black' }}
                            style={{ margin: '1.5rem' }}
                            color="inherit"
                            size="small"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div style={{ overflow: 'auto', padding: '1.5rem', position: 'relative' }}>
                        <Typography component="div" variant="h6">Какие удобства вас ждут</Typography>
                        <div style={{ marginTop: '-32px' }}>
                            {amenityCategories.map((amenityCategory: any) => {
                                let propertyCategoryAmenity = amenities?.find((propertyAmenity: any) => (propertyAmenity.category_id === amenityCategory.id && propertyAmenity.status === true))

                                return (
                                    <React.Fragment key={amenityCategory.id}>
                                        {propertyCategoryAmenity && (
                                            <div key={amenityCategory.id}>
                                                <div id={amenityCategory.name} style={{ fontSize: '18px', fontWeight: '600', paddingTop: '48px', paddingBottom: '8px' }}>{amenityCategory.name}</div>
                                                {amenities?.filter((amenity: any) => amenity.category_id === amenityCategory.id).map((amenity: any) => {
                                                    let propertyAmenity = amenities?.find((propertyAmenity: any) => (propertyAmenity.id === amenity.id && propertyAmenity.status === true))

                                                    return (
                                                        <React.Fragment key={amenity.id}>
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
                                                        </React.Fragment>
                                                    )}
                                                )}
                                            </div>
                                        )}
                                    </React.Fragment>
                                )
                            })}

                            {propertyAmenitiesStatusFalse.length > 0 && (
                                <>
                                    <div style={{ fontSize: '18px', fontWeight: '600', paddingTop: '48px', paddingBottom: '8px' }}>Не включено</div>
                                    {propertyAmenitiesStatusFalse.map((amenity: any) => (
                                        <div key={amenity.id}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem', textDecoration: 'line-through' }}>
                                                <div>{amenity.name}</div>
                                            </div>
                                            <Divider />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
}