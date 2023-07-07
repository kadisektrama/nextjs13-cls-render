import React, { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { addDays } from "date-fns";

import { Divider, Tooltip, Typography, Button, Grid, Popover, Stack, Box, Switch, FormControlLabel } from "@mui/material";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import IconButton from "@mui/material/IconButton";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { StaticDateRangePickerFilter } from "@/components/DateRangePicker/staticDateRangePicker";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import { ModalWindowOtherFilters } from "./ModalWindowOtherFilters/modalWindowOtherFilters";
import { GroupCheckbox as CustomGroupCheckbox } from "@/components/Checkbox/groupCheckbox"
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { setIsCityWithMap } from "@/redux/slices/internalSystem";
import { TUrlParams } from "@/types/other";

const Item = ({ children }: any) => 
    <Grid
        container
        item
        direction="column"
        sx={{padding: "20px"}}
    >
        {children}
    </Grid>

export const Filters = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const [popover, setPopover] = useState<any>('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const [modalWindow, setModalWindow] = React.useState('')
    const [place] = useState('Брест');
    const [startDate, setStartDate] = useState<any>(searchParams.get('start_date'));
    const [endDate, setEndDate] = useState<any>(searchParams.get('end_date'));
    const [adults, setAdults] = useState<any>(searchParams.get('adults') || 1);
    const [children, setChildren] = useState<any>(searchParams.get('children'));
    const [infants, setInfants] = useState<any>(searchParams.get('infants'));
    const [pets, setPets] = useState<any>(searchParams.get('pets'));
    const [amenity, setAmenity] = useState<any>((searchParams.get('filter[amenity]') as unknown as string))
    const [numberOfBeds, setNumberOfBeds] = useState<any>(parseInt(searchParams.get('filter[number_of_beds]') || '0'))
    const [numberOfBedrooms, setNumberOfBedrooms] = useState<any>(parseInt(searchParams.get('filter[number_of_bedrooms]') || '0'))
    const [smokingAllowed, setSmokingAllowed] = useState<any>(Boolean(parseInt(searchParams.get('filter[smoking_allowed]') || '0')))
    const [petsAllowed, setPetsAllowed] = useState<any>(Boolean(parseInt(searchParams.get('filter[pets_allowed]') || '0')))
    const [eventsAllowed, setEventsAllowed] = useState<any>(Boolean(parseInt(searchParams.get('filter[events_allowed]') || '0')))
    const [withRentalAgreement, setWithRentalAgreement] = useState<any>(Boolean(parseInt(searchParams.get('filter[with_rental_agreement]') || '0')))
    const [propertyType, setPropertyType] = useState<any>((searchParams.get('filter[property_type]') || ''))
    const [instantBookingAvailable, setInstantBookingAvailable] = useState<any>(searchParams.get('instant_booking_available'));
    console.log(typeof searchParams.get('filter[amenity]'))
    const handleClick = (value: any) => (event: any) => {
        setPopover(value)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setPopover(null);
        setAnchorEl(null);
    };

    const cleanPropertyType = () => {
        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries() || []),
            'filter[property_type]': null,
            page: 1,
        }
        urlParams = Object.fromEntries(Object.entries(urlParams).filter(item => item[1] !== null));


        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 
        handleClose();
        
        setPropertyType(null);
    }

    const cleanOtherFilters = () => {
        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries()),
            'filter[amenity]': null,
            'filter[number_of_beds]': null,
            'filter[number_of_bedrooms]': null,
            'filter[pets_allowed]': null,
            'filter[smoking_allowed]': null,
            'filter[events_allowed]': null,
            'filter[with_rental_agreement]': null,
            page: 1,
        }
        urlParams = Object.fromEntries(Object.entries(urlParams).filter(item => item[1] !== null));


        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 
        setModalWindow('');

        setAmenity(null);
        setNumberOfBeds(null);
        setNumberOfBedrooms(null);
        setSmokingAllowed(null);
        setPetsAllowed(null);
        setEventsAllowed(null);
        setWithRentalAgreement(null);
    }

    const searchPropertyType = () => {
        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries() || []),
            start_date: startDate,
            end_date: endDate,
            adults: adults,
            children: children,
            infants: infants,
            pets: pets,
            'filter[property_type]': propertyType ? propertyType.toString() : null,
            page: 1,
        }
        urlParams = Object.fromEntries(Object.entries(urlParams).filter(item => item[1] !== null));

        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 
        handleClose();
    }

    const searchOtherFilters = () => {
        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries() || []),
            start_date: startDate,
            end_date: endDate,
            adults: adults,
            children: children,
            infants: infants,
            pets: pets,
            'filter[amenity]': amenity ? amenity.toString() : null,
            'filter[number_of_beds]': numberOfBeds || null,
            'filter[number_of_bedrooms]': numberOfBedrooms || null,
            'filter[pets_allowed]': +petsAllowed || null,
            'filter[smoking_allowed]': +smokingAllowed || null,
            'filter[events_allowed]': +eventsAllowed || null,
            'filter[with_rental_agreement]': +withRentalAgreement || null,
            page: 1,
        }
        urlParams = Object.fromEntries(Object.entries(urlParams).filter(item => item[1] !== null));

        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 
        setModalWindow('');
    }

    const search = (params?: any) => {
        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries() || []),
            start_date: startDate,
            end_date: endDate,
            adults: adults,
            children: children,
            infants: infants,
            pets: pets,
            instant_booking_available: params ? params.instant_booking_available : searchParams.get('instant_booking_available'),
            'filter[amenity]': amenity ? amenity.toString() : null,
            'filter[number_of_beds]': numberOfBeds || null,
            'filter[number_of_bedrooms]': numberOfBedrooms || null,
            'filter[pets_allowed]': +petsAllowed || null,
            'filter[smoking_allowed]': +smokingAllowed || null,
            'filter[events_allowed]': +eventsAllowed || null,
            'filter[with_rental_agreement]': +withRentalAgreement || null,
            'filter[property_type]': propertyType ? propertyType.toString() : null,
            page: 1,
        }
        urlParams = Object.fromEntries(Object.entries(urlParams).filter(item => item[1] !== null));

        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 
    }
    
    return (
        <>
        <div style={{ display: "flex", height: '76px', alignItems: 'center' }}>
            {state.amenity.loading === true && state.propertyType.loading === true && (
                <>
                    <div>
                        <Button style={{ marginLeft: '16px', color: 'black', borderColor: 'black' }} variant="outlined" onClick={handleClick('property_type')}>
                            Тип жилья
                        </Button>
                        <Popover
                            open={popover === 'property_type'}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                        >
                            <Item>
                                <CustomGroupCheckbox setData={(value) => setPropertyType(value)} data={propertyType} initData={state.propertyType.propertyTypes} field_name={'filter[property_type]'} />
                                <div style={{ marginTop: '16px' }}>
                                    <Button variant="text" onClick={() => cleanPropertyType()}>Сбросить</Button>
                                    <Button variant="contained" onClick={() => searchPropertyType()}>Применить</Button>
                                </div>
                            </Item>
                        </Popover>
                    </div>
                    <div>
                        <Button style={{ marginLeft: '16px', color: 'black', borderColor: 'black' }} variant="outlined" onClick={() => setModalWindow('other_filters')}>
                            Еще фильтры
                        </Button>
                    </div>
                </>
            )} 

            <div style={{ flex: 1 }}>
                <FormControlLabel
                    control={<Switch
                        checked={!!instantBookingAvailable}
                        onChange={(event) => {
                            setInstantBookingAvailable(event.target.checked);
                            search({instant_booking_available: (event.target.checked ? 1 : null)})
                        }}
                        color="primary" />
                    }
                    label={<div style={{ fontSize: '17px', display: 'flex' }}><Tooltip title="Ваше бронирование будет мгновенно подтверждено. Вам не придётся ожидать подтверждения бронирования от хозяина"><FlashOnRoundedIcon sx={{ zIndex: 1, color: '#14A800' }} /></Tooltip>Мгновенное бронирование</div>}
                    labelPlacement="start"
                />
            </div>

            <div style={{ backgroundColor: '#f6f6f6', height: '42px', borderRadius: '8px', display: 'flex', flexDirection: 'row', flex: 1, margin: '0 -8px', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ flex: 1, margin: '3px', alignItems: 'center', display: 'flex', justifyContent: 'center', fontWeight: 500 }}>{place}</div>
                <div style={{ width: '1px', margin: '6px 0', background: '#d8d8d8', alignSelf: 'stretch' }}></div>

                <div style={{ flex: 1, margin: '3px', alignItems: 'center', display: 'flex', justifyContent: 'center', fontWeight: 500 }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={handleClick('date')}>
                        {rangeStartDateEndDate(startDate || endDate || new Date(), endDate || startDate || addDays(new Date(), 1))}
                    </div>
                    <Popover
                        open={popover === 'date'}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        sx={{
                            marginTop: '10px',
                            borderRadius: '5px',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <StaticDateRangePickerFilter
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={(value: any) => setStartDate(value)}
                            setEndDate={(value: any) => setEndDate(value)}
                        />
                    </Popover>
                </div>

                <div style={{ width: '1px', margin: '6px 0', background: '#d8d8d8', alignSelf: 'stretch' }}></div>

                <div style={{ flex: 1, margin: '3px', alignItems: 'center', display: 'flex', justifyContent: 'center', fontWeight: 500 }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={handleClick('guests')}>
                        {+adults + parseInt(children) + getNoun(+adults + parseInt(children), ' гость',' гостя', ' гостей')}
                    </div>
                    <Popover
                        open={popover === 'guests'}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        sx={{
                            marginTop: '10px',
                            borderRadius: '5px',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box sx={{ p: 2 }}>
                            <Stack spacing={1}>
                                <div style={{ width: '236px', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <span>Взрослые</span>
                                        <Typography variant="body2" component="h2" color="text.secondary">
                                            {"От 13 лет"}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setAdults(+adults - 1)} disabled={+adults === 1}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{+adults}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setAdults(+adults + 1)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span>Дети</span>
                                        <Typography variant="body2" component="h2" color="text.secondary">
                                            {"2-12 лет"}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setChildren(parseInt(children) - 1)} disabled={parseInt(children) === 0}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{parseInt(children)}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setChildren(parseInt(children) + 1)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span>Младенцы</span>
                                        <Typography variant="body2" component="h2" color="text.secondary">
                                            {"Младше 2 лет"}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setInfants(parseInt(infants) - 1)} disabled={parseInt(infants) === 0}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{parseInt(infants)}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setInfants(parseInt(infants) + 1)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Питомцы</span>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setPets(parseInt(pets) - 1)} disabled={parseInt(pets) === 0}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{parseInt(pets)}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setPets(parseInt(pets) + 1)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </Stack>
                        </Box>
                    </Popover>
                </div>
                <Button
                    style={{ backgroundColor: '#14a800', height: 'inherit', width: '90px' }}
                    size={"medium"}
                    variant={"contained"}
                    onClick={() => search()}
                >
                    Найти
                </Button>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <FormControlLabel
                    control={
                        <Switch checked={state.internalSystem.isCityWithMap} onChange={(event) => dispatch(setIsCityWithMap(event.target.checked))} color="primary" />
                    }
                    label="Карта"
                />
            </div>
        </div>

        <ModalWindowOtherFilters             
            isOpen={modalWindow === 'other_filters'} 
            numberOfBeds={numberOfBeds}
            numberOfBedrooms={numberOfBedrooms}
            smokingAllowed={smokingAllowed}
            petsAllowed={petsAllowed}
            eventsAllowed={eventsAllowed}
            withRentalAgreement={withRentalAgreement}
            amenities={amenity}
            setAmenities={(value: any) => setAmenity(value)}
            setSmokingAllowed={(value: any) => setSmokingAllowed(value)}
            setPetsAllowed={(value: any) => setPetsAllowed(value)}
            setEventsAllowed={(value: any) => setEventsAllowed(value)}
            setWithRentalAgreement={(value: any) => setWithRentalAgreement(value)}
            setNumberOfBeds={(value: any) => setNumberOfBeds(value)}
            setNumberOfBedrooms={(value: any) => setNumberOfBedrooms(value)}
            handleClose={(value: any) => setModalWindow(value)} 
            search={() => searchOtherFilters()}
            clean={() => cleanOtherFilters()}
        />
        </>
    )
}