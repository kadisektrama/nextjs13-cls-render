import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Link from "next/link";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from "@mui/material/Typography";
import TuneIcon from '@mui/icons-material/Tune';

import { updateAmenities } from "@/api/extranet";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ModalWindow } from "./ModalWindow/modalWindow";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchPropertyExtranet } from '@/redux/thunk/property';
import { fetchAmenities } from '@/redux/thunk/amenity';
import { fetchAmenityCategories } from '@/redux/thunk/amenityCategory';

export const PageAmenities = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<any>(false);
    const [openModalWindow, setOpenModalWindow] = useState(false);
    let {id} = useParams();

    useEffect(() => {
        Promise.all([dispatch(fetchPropertyExtranet(id)), dispatch(fetchAmenities('')), dispatch(fetchAmenityCategories())])
            .then(
                () => {
                    setIsLoaded(true);
                },
                () => {
                    setError('404');
                    throw new Error('404 Page Not Found');
                }
            )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangeStatusAmenity = (amenityId: any, amenityStatus: any) => {
        let amenities = state.property.property.amenities.map((amenity: any) => {return {'amenity_id': amenity.id, 'status': amenity.status}})
        let amenityIndex = amenities.findIndex((amenity: any) => amenity.id === amenityId);
        if (amenityIndex !== -1) {
            amenities[amenityIndex].status = amenityStatus
        } else {
            amenities.push({
                'amenity_id': amenityId,
                'status': amenityStatus,
            })
        }

        updateAmenities(id, amenities)
            .then(() => dispatch(fetchPropertyExtranet(id)))
    }

    if (error) {
        throw new Error('404 Page Not Found');
    }


    return (
        <AccountHeader
            name={
                <Typography component="h1" variant="h5">
                    Удобства
                </Typography>
            }
            startElement={
                <IconButton>
                    <Link href={`/host/properties/${id}/update`}><ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} /></Link>
                </IconButton>
            }
            endElement={
                <IconButton>
                    <TuneIcon onClick={() => {setOpenModalWindow((openModalWindow) => !openModalWindow)}} fontSize="small" />
                </IconButton>
            }
        >
            <Box sx={{ margin: 2, mt: -4 }}>
                {isLoaded && (
                    <>
                        {state.amenityCategory.amenityCategories.map((amenityCategory: any) => (
                            <div key={amenityCategory.id}>
                                <div id={amenityCategory.name} style={{ fontSize: '18px', fontWeight: '600', paddingTop: '48px', paddingBottom: '8px' }}>{amenityCategory.name}</div>

                                {state.amenity.amenities.filter((amenity: any) => amenity.category_id === amenityCategory.id).map((amenity: any) => {
                                    let propertyAmenity = state.property.property.amenities.find((propertyAmenity: any) => propertyAmenity.id === amenity.id)

                                    return(
                                    <div key={amenity.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                                            <div>{amenity.name}</div>
                                            <div style={{ minWidth: '115px' }}>
                                                <IconButton
                                                    style={{ backgroundColor: propertyAmenity?.status === false ? 'black' : 'white' }}
                                                    sx={{ border: '1px solid black', backgroundColor: propertyAmenity?.status === false ? 'black' : 'white', color: propertyAmenity?.status === false ? 'white' : 'black' }}
                                                    onClick={() => handleChangeStatusAmenity(amenity.id, 0)}
                                                    aria-label="fingerprint"
                                                    size="small"
                                                >
                                                    <ClearIcon />
                                                </IconButton>

                                                <IconButton
                                                    style={{ backgroundColor: propertyAmenity?.status === true ? 'black' : 'white' }}
                                                    sx={{ border: '1px solid black', marginRight: '20px', marginLeft: '20px', backgroundColor: propertyAmenity?.status === true ? 'black' : 'white', color: propertyAmenity?.status === true ? 'white' : 'black' }}
                                                    onClick={() => handleChangeStatusAmenity(amenity.id, 1)}
                                                    aria-label="fingerprint"
                                                    size="small"
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
                    </>
                )}
            </Box>

            <ModalWindow open={openModalWindow} handleClose={() => setOpenModalWindow(false)} />
        </AccountHeader>
    );
};