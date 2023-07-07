import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Link from "next/link";

import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import { Anchor } from 'antd';
import 'antd/dist/reset.css';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { updateAmenities } from "@/api/extranet";
import { fetchPropertyExtranet } from '@/redux/thunk/property';
import { PropertyStatusesViewAdmin } from "@/utils/Constants/Enums/PropertyStatuses";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { fetchAmenities } from '@/redux/thunk/amenity';
import { fetchAmenityCategories } from '@/redux/thunk/amenityCategory';

export const PageAmenities: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [error, setError] = useState<any>(false);
    const [isLoaded, setIsLoaded] = useState(false);
    //let location = useLocation()
    let { id } = useParams();

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
        <Container maxWidth="lg">
            {isLoaded && (
                <>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div><Typography variant="h6" gutterBottom>{state.property.property.name}</Typography></div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div style={{ paddingRight: '40px' }}>{'Статус "' + PropertyStatusesViewAdmin[state.property.property.status as unknown as keyof typeof PropertyStatusesViewAdmin] + '"'}</div>
                            <div style={{ paddingRight: '40px' }}>{'МБ "' + (state.property.property.instant_booking_available ? 'Да' : 'Нет') + '"'}</div>
                            <div>
                                <Link href={`/${state.property.property.region.slug}/${state.property.property.id}`}>
                                    <Button variant="outlined" sx={{ borderColor: 'black', color: 'black' }}>Посмотреть объявление</Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '30%' }}>
                            <div style={{ position: 'sticky', top: '2px', height: '300px', display: 'inline-block', paddingTop: '48px' }}>
                                <Link href={`/host/properties/${id}/update`}>
                                    <Button variant="contained" sx={{ color: 'black', paddingLeft: 0, marginBottom: '0.5rem' }}><KeyboardArrowLeftIcon />Удобства</Button>
                                </Link>
                                <Anchor>
                                    {state.amenityCategory.amenityCategories.map((amenityCategory: any) => <Anchor.Link key="anchor" href={`#${amenityCategory.name}`} title={amenityCategory.name} />)}
                                </Anchor>
                            </div>
                        </div>
                        <div style={{ width: '70%' }}>
                            {state.amenityCategory.amenityCategories.map((amenityCategory: any) => (
                                <div key={amenityCategory.id}>
                                    <div id={amenityCategory.name} style={{ fontSize: '18px', fontWeight: '600', paddingTop: '48px', paddingBottom: '8px' }}>{amenityCategory.name}</div>

                                    {state.amenity.amenities.filter((amenity: any) => amenity.category_id === amenityCategory.id).map((amenity: any) => {
                                        let propertyAmenity = state.property.property.amenities.find((propertyAmenity: any) => propertyAmenity.id === amenity.id)

                                        return(
                                        <div key={amenity.id}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                                                <div>{amenity.name}</div>
                                                <div>
                                                    <IconButton
                                                        style={{ backgroundColor: propertyAmenity?.status === false ? 'black' : 'white' }}
                                                        sx={{ border: '1px solid black', backgroundColor: propertyAmenity?.status === false ? 'black' : 'white', color: propertyAmenity?.status === false ? 'white' : 'black' }}
                                                        onClick={() => handleChangeStatusAmenity(amenity.id, 0)}
                                                        aria-label="fingerprint"
                                                    >
                                                        <ClearIcon />
                                                    </IconButton>

                                                    <IconButton
                                                        style={{ backgroundColor: propertyAmenity?.status === true ? 'black' : 'white' }}
                                                        sx={{ border: '1px solid black', marginRight: '20px', marginLeft: '20px', backgroundColor: propertyAmenity?.status === true ? 'black' : 'white', color: propertyAmenity?.status === true ? 'white' : 'black' }}
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
                </>
            )}
        </Container>
    );
};