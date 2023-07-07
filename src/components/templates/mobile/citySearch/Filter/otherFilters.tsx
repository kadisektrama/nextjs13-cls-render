import React, { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { FormControlLabel, Switch, Typography, Box, Stack, Button, Paper, IconButton, Checkbox } from "@mui/material";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";

import { GroupButton as CustomGroupButton } from "@/components/Button/groupButton"
import { CustomCheckbox } from "@/components/Checkbox/checkbox"
import { GroupCheckbox as CustomGroupCheckbox } from "@/components/Checkbox/groupCheckbox"
import { useAppSelector } from "@/redux/hooks/hooks";
import { TUrlParams } from "@/types/other";

export const OtherFilters: React.FC<any> = (props) => {
    const searchParams = useSearchParams();
    const state = useAppSelector(state => state)
    const router = useRouter();
    const pathname = usePathname();
    const [adults, setAdults] = useState<any>(searchParams.get('adults') || 1);
    const [children, setChildren] = useState<any>(searchParams.get('children') || null);
    const [infants, setInfants] = useState<any>(searchParams.get('infants') || null);
    const [pets, setPets] = useState<any>(searchParams.get('pets') || null);
    const [amenities, setAmenities] = useState<any>(searchParams.get('filter[amenity]'))
    const [numberOfBeds, setNumberOfBeds] = useState<any>(parseInt(searchParams.get('filter[number_of_beds]') || '0'))
    const [numberOfBedrooms, setNumberOfBedrooms] = useState<any>(parseInt(searchParams.get('filter[number_of_bedrooms]') || '0'))
    const [smokingAllowed, setSmokingAllowed] = useState<any>(Boolean(parseInt(searchParams.get('filter[smoking_allowed]') || '0')))
    const [petsAllowed, setPetsAllowed] = useState<any>(Boolean(parseInt(searchParams.get('filter[pets_allowed]') || '0')))
    const [eventsAllowed, setEventsAllowed] = useState<any>(Boolean(parseInt(searchParams.get('filter[events_allowed]') || '0')))
    const [withRentalAgreement, setWithRentalAgreement] = useState<any>(Boolean(parseInt(searchParams.get('filter[with_rental_agreement]') || '0')))
    const [propertyType, setPropertyType] = useState<any>(searchParams.get('filter[property_type]'))
    const [instantBookingAvailable, setInstantBookingAvailable] = useState<any>(searchParams.get('instant_booking_available') || null);

    const search = () => {
        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries() || []),
            adults: adults,
            children: children,
            infants: infants,
            pets: pets,
            instant_booking_available: instantBookingAvailable,
            'filter[amenity]': amenities ? amenities.toString() : null,
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

        let urlRequestParams: TUrlParams = {
            ...urlParams,
            status: 1,
            page: 1,
        }
        Object.keys(urlRequestParams).forEach(k => urlRequestParams[k] === 0 && delete urlRequestParams[k])

        //setSearchParams(urlParams);
        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 

        props.setWindowScreen('')
    }

    const cleanFilterParams = () => {
        let urlParams: TUrlParams = {
            'start_date': searchParams.get('start_date') || null,
            'end_date': searchParams.get('end_date') || null,
            page: '1',
        }
        urlParams = Object.fromEntries(Object.entries(urlParams).filter(item => item[1] !== null));

        //setSearchParams(urlParams);
        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 

        props.setWindowScreen('')

        setAmenities(null);
        setNumberOfBeds(null);
        setNumberOfBedrooms(null);
        setSmokingAllowed(null);
        setPetsAllowed(null);
        setEventsAllowed(null);
        setWithRentalAgreement(null);
        setPropertyType(null);
    }

    return (
        <>
            <Paper
                style={{
                    position: 'fixed',
                    top: 0,
                    height: '60px',
                    width: '100%',
                    padding: "0 5%",
                    backgroundColor: 'white',
                    zIndex: 999,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    alignItems: 'center',
                    borderRadius: 0
                }}
                elevation={3}
            >
                <IconButton sx={{ justifySelf: 'start' }} onClick={() => props.setWindowScreen('')}>
                    <ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} />
                </IconButton>

                <div style={{ justifySelf: 'center' }}><b>Фильтры</b></div>

                {/* <div style={{ justifySelf: 'end' }} onClick={() => deleteFilterParams()}></div> */}
            </Paper>

            <Stack
                spacing={2}
                direction="column"
                sx={{ padding: '84px 24px 84px 24px' }}
            >
                <FormControlLabel
                    style={{ width: '100%', justifyContent: 'space-between', margin: 0 }}
                    control={<Switch checked={!!instantBookingAvailable} onChange={(event) => {setInstantBookingAvailable((event.target.checked ? 1 : null))}} color="primary" />}
                    label={<div style={{ display: 'flex', alignItems: 'center' }}><FlashOnRoundedIcon color="disabled" />Мгновенное бронирование</div>}
                    labelPlacement="start"
                />
                
                <div style={{ paddingTop: '12px', width: '100%' }}>
                    <Typography variant="h6" gutterBottom>Гости</Typography>
                    <Stack spacing={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span>Дети</span>
                                <Typography variant="body2" component="h2" color="text.secondary">
                                    {"2-12 лет"}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton aria-label="fingerprint" onClick={() => setChildren(+children - 1)} disabled={+children === 0}>
                                    <RemoveRoundedIcon />
                                </IconButton>
                                <div>{+children}</div>
                                <IconButton aria-label="fingerprint" onClick={() => setChildren(+children + 1)}>
                                    <AddRoundedIcon />
                                </IconButton>
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span>Младенцы</span>
                                <Typography variant="body2" component="h2" color="text.secondary">
                                    {"Младше 2 лет"}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton aria-label="fingerprint" onClick={() => setInfants(+infants - 1)} disabled={+infants === 0}>
                                    <RemoveRoundedIcon />
                                </IconButton>
                                <div>{+infants}</div>
                                <IconButton aria-label="fingerprint" onClick={() => setInfants(+infants + 1)}>
                                    <AddRoundedIcon />
                                </IconButton>
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>Питомцы</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton aria-label="fingerprint" onClick={() => setPets(+pets - 1)} disabled={+pets === 0}>
                                    <RemoveRoundedIcon />
                                </IconButton>
                                <div>{+pets}</div>
                                <IconButton aria-label="fingerprint" onClick={() => setPets(+pets + 1)}>
                                    <AddRoundedIcon />
                                </IconButton>
                            </div>
                        </Box>
                    </Stack>
                </div>
                
                <Typography variant="h6" gutterBottom>Тип жилья</Typography>   
                <CustomGroupCheckbox setData={(value) => setPropertyType(value)} data={propertyType} initData={state.propertyType.propertyTypes} field_name={'filter[property_type]'} />
                
                <Typography variant="h6" gutterBottom>Удобства</Typography>
                <CustomGroupCheckbox content_style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} filter_name={'is_popular'} setData={(value) => setAmenities(value)} data={amenities} initData={state.amenity.amenities} field_name={'filter[amenity]'} />  
                
                <Typography variant="h6" gutterBottom>Спальные места</Typography>
                <CustomGroupButton value={numberOfBeds} setValue={(value) => setNumberOfBeds(value)} />

                <Typography variant="h6" gutterBottom>Отдельные комнаты</Typography>   
                <CustomGroupButton value={numberOfBedrooms} setValue={(value) => setNumberOfBedrooms(value)} />

                <Typography variant="h6" gutterBottom>Правила размещения</Typography>
                <div>
                    <CustomCheckbox value={petsAllowed} setValue={(value) => setPetsAllowed(value)} name={'Можно с питомцами'} />
                    <CustomCheckbox value={smokingAllowed} setValue={(value) => setSmokingAllowed(value)} name={'Можно курить'} />
                    <CustomCheckbox value={eventsAllowed} setValue={(value) => setEventsAllowed(value)} name={'Разрешены мероприятия и вечеринки'} />
                    <CustomCheckbox value={withRentalAgreement} setValue={(value) => setWithRentalAgreement(value)} name={'Владелец предоставляет отчетные документы о проживании'} />
                </div>
            </Stack>

            <Paper
                sx={{
                    zIndex: 6,
                    position: 'fixed !important',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    gap: '10px'
                }}
                style={{ padding: '6px', paddingLeft: '10px', paddingRight: '10px' }}
                elevation={3}
            >
                <Button
                    onClick={cleanFilterParams}
                    variant="text"
                    sx={{ width: '30%', position: 'relative' }}
                    size="large"
                >
                    <div>Очистить</div>
                </Button>
                <Button
                    onClick={search}
                    variant="contained"
                    sx={{ width: '70%', position: 'relative' }}
                    size="large"
                >
                    <div>Показать варианты</div>
                </Button>
            </Paper>
        </>
    )
}
