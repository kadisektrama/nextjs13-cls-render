// Core
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormControlLabel, Snackbar } from "@material-ui/core";
import Checkbox from "antd/es/checkbox/Checkbox";
import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@material-ui/core";

// Tools
import { CreateMap as MapWithCache } from "@/components/Property/Map/mapWithCache";
import { Photos } from "@/components/Property/Photos/photos";
import { createProperty } from "@/api/extranet";
import { fetchAmenities } from '@/redux/thunk/amenity';
import { fetchAmenityCategories } from '@/redux/thunk/amenityCategory';
import { fetchCurrencies } from '@/redux/thunk/currency';
import { fetchPropertyTypes } from '@/redux/thunk/propertyType';
import { fetchRegions } from '@/redux/thunk/region';
import { fetchUserPhones } from '@/redux/thunk/user';
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { Amenities } from "./Amenities/amenities";
import { Rules } from "./Rules/rules";
import { CommonWithCache } from "@/components/Property/Common/commonWithCache"
import { cachedProperty } from "@/utils/Helpers/Cache/property";
import { setPropertyWasCreated } from '@/redux/slices/internalSystem';
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { deletePhotos, getProperty, setInstantBookingAvailable } from "@/redux/slices/property";

export const Create: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<any>(false);
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
            setError('Минимальное количество фото - 5');
            setOpenAlertReject(true);
            (document.getElementById('submit') as HTMLButtonElement).disabled = false;
        } else {
            setIsDisabled(true)
            Object.keys(localStorage).map(k => k.startsWith('property') && localStorage.removeItem(k))

            Promise.all([createProperty(state.property.property)])
                .then((res) => {
                    router.push('/host/properties')
                    setPropertyWasCreated({ region: state.region.regions?.find((r: any) => r.id === res.at(0).payload.region_id)?.slug, id: res.at(0).id });
                })
        }
    };

    return (
        <div>
            {isLoaded ? (
                <>
                    <div>СОЗДАНИЕ ОБЪЯВЛЕНИЯ</div>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <CommonWithCache />
                        <Amenities />
                        <Rules />
                        <div style={{ margin: '20px' }}>
                            <FormControlLabel
                                name="property[instant_booking_available]"
                                id="property[instant_booking_available]"
                                control={
                                    <Checkbox checked={!!state.property.property.instant_booking_available} onChange={(event: any) => {handleChangeBooking(event); localStorage.setItem('property[instant_booking_available]', event.target.checked)}} name={'book'} />
                                }
                                label={'Мгновенное бронирование'}
                            />
                            <Typography variant="body2" component="div" color="text.secondary">
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
                                {isDisabled ? <CircularProgress size={30} color={"green" as "inherit"} /> : 'Создать'}
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
        </div>
    )
}