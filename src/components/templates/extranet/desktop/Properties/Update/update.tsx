import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import lodash from 'lodash'

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FormControlLabel, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import Checkbox from "antd/es/checkbox/Checkbox";
import Typography from "@mui/material/Typography";

import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { Photos } from "@/components/Property/Photos/photos";
import { CreateMap as Map } from "@/components/Property/Map/map";
import { createProperty } from "@/api/extranet";
import { fetchAmenities } from '@/redux/thunk/amenity';
import { fetchAmenityCategories } from '@/redux/thunk/amenityCategory';
import { fetchCurrencies } from '@/redux/thunk/currency';
import { fetchPropertyTypes } from '@/redux/thunk/propertyType';
import { fetchRegions } from '@/redux/thunk/region';
import { fetchUserPhones } from '@/redux/thunk/user';
import {
    createPropertyRules,
    updateProperty,
    updatePropertyPhotos,
    updatePropertyRules
} from "@/api/extranet";
import { fetchPropertyExtranet } from "@/redux/thunk/property";
import { Amenities } from "./Amenities/amenities";
import { Rules } from "./Rules/rules";
import { Common } from "@/components/Property/Common/common"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setInstantBookingAvailable } from "@/redux/slices/property";

export const Update: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [error, setError] = useState(null);
    const [updateError, setUpdateError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [openAlertReject, setOpenAlertReject] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [rulesIsExist, setRulesIsExist] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        if (!(!!state.region.regions)) {
            Promise.all([
                dispatch(fetchPropertyExtranet(id)),
                dispatch(fetchCurrencies()),
                dispatch(fetchRegions()),
                dispatch(fetchPropertyTypes()),
                dispatch(fetchAmenities('?is_popular=1')),
                dispatch(fetchUserPhones()),
                dispatch(fetchAmenityCategories()),
            ])
                .then(
                    (res) => {
                        setRulesIsExist(!!res[0].payload.rules)
                        setIsLoaded(true);
                    },
                    (error) => {
                        setError(error);
                        throw new Error('404 Page Not Found');
                    }
                )
        }

        // if (location.state?.redirect) {
        //     let result = !lodash.isEmpty(lodash(lodash.omit(state.property.property.rules, ['damage_deposit_amount', 'down_payment_amount'])).omitBy(lodash.isNil).value());

        //     setRulesIsExist(result)
        //     setIsLoaded(true)
        //     window.history.pushState({}, undefined)
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleSubmitUpdate = (event: any) => {
        (document.getElementById('submit') as HTMLButtonElement).disabled = true;
        event.preventDefault();

        if (state.property.property.photos.length < 5) {
            setUpdateError('Минимальное количество фото - 5');
            (document.getElementById('submit') as HTMLButtonElement).disabled = false;
            setOpenAlertReject(true);
        } else {
            Promise.all([
                updateProperty(state.property.property, id),
                updatePropertyPhotos(state.property.property, id),
                rulesIsExist ? updatePropertyRules(id, state.property.property.rules) : createPropertyRules(id, state.property.property.rules)
            ])
                .then(() => window.location = `${window.location.origin}/host/properties` as unknown as Location)
        }
    };

    if (error) {
        throw new Error('404 Page Not Found');
    }

    return(
        <>
            <div>Обновить объявление</div>
            {isLoaded ? (
                !error ? (
                    <Box component="form" onSubmit={handleSubmitUpdate} sx={{ mt: 1, paddingBottom: '100px' }}>
                        <Common />
                        <Amenities />
                        <Rules />
                        <div style={{ margin: '20px' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={!!state.property.property.instant_booking_available} onChange={handleChangeBooking} name={'book'} />
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
                            <Map />
                        </div>
                        <div>
                            <Button
                                id="submit"
                                type="submit"
                                disabled={isDisabled}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                <div>
                                    Обновить
                                </div>
                            </Button>
                        </div>
                    </Box>
                ) : (<div>{error}</div>)
            ) : (
                <SimpleLoader />
            )}

            <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {updateError}
                </Alert>
            </Snackbar>
        </>
    )
}
