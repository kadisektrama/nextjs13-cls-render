import React from "react";

import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppSelector } from "@/redux/hooks/hooks";

import { setAmenities } from "@/redux/slices/property";

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

export const ModalWindow: React.FC<any> = (props) =>  {
    const state = useAppSelector(state => state)

    const handleChangeStatusAmenity = (amenityId: any, amenityStatus: any) => {
        let amenities = state.property.property.amenities
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
        setAmenities(amenities);
    }

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <Box sx={style}>
                    <div style={{
                        height: '50px',
                        padding: '0px',
                        margin: '0px',
                        zIndex: 1,
                        position: 'sticky',
                        top: '0px',
                        left: '0px',
                        backgroundColor: 'white',
                    }}>
                        <IconButton
                            sx={{ m: 1, border: '1px solid black' }}
                            color="inherit"
                            size="small"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div style={{ overflow: 'auto', padding: '16px', position: 'relative' }}>
                        <h3>Удобства</h3>
                        <div style={{ marginTop: '-32px' }}>
                            {state.amenityCategory.amenityCategories?.map((amenityCategory: any) => (
                                <div key={amenityCategory.id}>
                                    <div id={amenityCategory.name} style={{ fontSize: '18px', fontWeight: '600', paddingTop: '48px', paddingBottom: '8px' }}>{amenityCategory.name}</div>

                                    {state.amenity.amenities?.filter((amenity: any) => amenity.category_id === amenityCategory.id).map((amenity: any) => {
                                        let propertyAmenity = state.property.property.amenities.find((propertyAmenity: any) => propertyAmenity.amenity_id === amenity.id)

                                        return(
                                            <div key={amenity.id}>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 127px', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                                                    <div>{amenity.name}</div>
                                                    <div>
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
                </Box>
            </Modal>
        </>
    );
}