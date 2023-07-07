import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FormControlLabel, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import Checkbox from "antd/es/checkbox/Checkbox";
import Typography from "@mui/material/Typography";
import 'react-spring-bottom-sheet/dist/style.css';
import { CircularProgress } from "@material-ui/core";

import { Photos } from "@/components/Property/Photos/photos"
import { CreateMap as MapWithCache } from "@/components/Property/Map/mapWithCache";
import { createProperty } from "@/api/extranet";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { Amenities } from "./Amenities/amenities";
import { CommonWithCache } from "@/components/Property/Common/commonWithCache";
import { Rules } from "./Rules/rules"
import { cachedProperty } from "@/utils/Helpers/Cache/property";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchAmenities } from '@/redux/thunk/amenity';
import { fetchAmenityCategories } from '@/redux/thunk/amenityCategory';
import { fetchCurrencies } from '@/redux/thunk/currency';
import { fetchPropertyTypes } from '@/redux/thunk/propertyType';
import { fetchRegions } from '@/redux/thunk/region';
import { fetchUserPhones } from '@/redux/thunk/user';
import { deletePhotos, getProperty, setInstantBookingAvailable } from "@/redux/slices/property";
import { setPropertyWasCreated } from "@/redux/slices/internalSystem";

export const Create: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [openAlertReject, setOpenAlertReject] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        Promise.all([
            dispatch(fetchAmenities('')),
            dispatch(fetchAmenityCategories()),
            dispatch(fetchCurrencies()),
            dispatch(fetchPropertyTypes()),
            dispatch(fetchRegions()),
            dispatch(fetchUserPhones()),
            getProperty(cachedProperty(state)),
        ])
            .then(() => {
                deletePhotos();
                setIsLoaded(true)
            })
    }, [])

    const handleChangeBooking = (event: any) => {
        setInstantBookingAvailable(event.target.checked);
    };

    const handleClose = (event: any) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        setOpenAlertReject(false);
    };

    const handleSubmit = (event: any) => {
        (document.getElementById('submit') as HTMLButtonElement).disabled = true;
        event.preventDefault();

        if (state.property.property.photos.length < 5) {
            setError(`Минимальное количество фото - 5, ${state.property.property.photos.length}`);
            (document.getElementById('submit') as HTMLButtonElement).disabled = false;
            setOpenAlertReject(true);
        } else {
            setIsDisabled(true)
            Object.keys(localStorage).map(k => k.startsWith('property') && localStorage.removeItem(k))

            Promise.all([createProperty(state.property.property)])
                .then((res) => {
                    router.push('/host/properties')
                    setPropertyWasCreated({ region: state.region.regions.find((r: any) => r.id === res?.at(0).region_id)?.slug, id: res.at(0).id });
                })
        }
    };

    return (
        <AccountHeader name={'Создание'}>
            {isLoaded ? (
                <>
                    <Box component="form" onSubmit={handleSubmit} sx={{ paddingBottom: '70px', paddingRight: '15px', paddingLeft: '15px' }}>
                        <CommonWithCache />
                        <Amenities />
                        <Rules />
                        <div style={{ margin: '20px' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={!!state.property.property.instant_booking_available} onChange={(event: any) => {handleChangeBooking(event); localStorage.setItem('property[instant_booking_available]', event.target.checked)}} name={'book'} />
                                }
                                label={'Мгновенное бронирование'}
                            />
                            <Typography variant="body2" component="h2" color="text.secondary">
                                {"* Позволяет забронировать без подтверждения хозяина"}
                            </Typography>
                        </div>
                        <div>
                            <Photos setIsDisabled={(value: any) => setIsDisabled(value)} />
                        </div>
                        <div>
                            <div>Поставьте метку, где находится ваша недвижимость</div>
                            <MapWithCache />
                        </div>
                        <div>
                            <Button
                                id="submit"
                                type="submit"
                                disabled={isDisabled}
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: '102px' }}
                            >
                                <div>
                                    {isDisabled ? <div style={{ width: '25px', height: '25px' }}><CircularProgress size={25} color={"green" as "inherit"} /></div> : 'Создать'}
                                </div>
                            </Button>
                        </div>
                    </Box>
                </>
            ) : (
                <SimpleLoader />
            )}

            <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </AccountHeader>
    )
}