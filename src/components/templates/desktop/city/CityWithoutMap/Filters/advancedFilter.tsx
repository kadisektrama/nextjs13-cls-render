'use client'

import React from "react";
import { useSearchParams } from "next/navigation"

import { FormControlLabel, Switch, Grid, Box } from "@mui/material";

import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { GroupButton as CustomGroupButton } from "@/components/Button/groupButtonViaSP"
import { CustomCheckbox } from "@/components/Checkbox/checkboxViaSP"
import { GroupCheckbox as CustomGroupCheckbox } from "@/components/Checkbox/groupCheckboxViaSP"
import { useAppSelector } from "@/redux/hooks/hooks";
import { TUrlParams } from "@/types/other";

const Item = ({ children }: any) => 
    <Grid
        container
        item
        direction="column"
        sx={{ padding: "20px" }}
    >
        {children}
    </Grid>

const SecondFilters = () => {   
    const state = useAppSelector(state => state)

    return (
        <Box
            //xs="true"
            sx={{
                border: 1,
                borderRadius: 1,
                borderColor: "#e7e7e7",
            }}
        >
            <div style={{ display:"flex",padding: "7px", paddingLeft: "11px", fontSize: "16px", fontWeight: "700" }}>Все фильтры</div>
            <div style={{ width: '100%', height: 1, backgroundColor: "#e7e7e7" }}></div>
            <Item>
                <div style={{ fontSize: "14px", fontWeight: "700", paddingBottom: "2px", paddingTop: "-3px" }}>Тип жилья</div>
                <CustomGroupCheckbox data={state.propertyType.propertyTypes} field_name={'filter[property_type]'} />
            </Item>
            <div style={{ width: '100%', height: 1, backgroundColor: "#e7e7e7" }}></div>
            <Item>
                <div style={{ fontSize: "14px", fontWeight: "700", paddingBottom: "2px", paddingTop: "-3px" }}>Удобства</div>
                <CustomGroupCheckbox filter_name={'is_popular'} data={state.amenity.amenities} field_name={'filter[amenity]'} />                                  
            </Item>
            <div style={{ width: '100%', height: 1, backgroundColor: "#e7e7e7" }}></div>
            <Item>
                <div style={{ fontSize: "14px", fontWeight: "700", paddingBottom: "2px", paddingTop: "-3px" }}>Кровати/диваны</div>
                <CustomGroupButton field_name={'filter[number_of_beds]'} />
            </Item>
            <div style={{ width: '100%', height: 1, backgroundColor: "#e7e7e7" }}></div>
            <Item>
                <div style={{ fontSize: "14px", fontWeight: "700", paddingBottom: "2px", paddingTop: "-3px" }}>Отдельные спальни</div>
                <CustomGroupButton field_name={'filter[number_of_bedrooms]'} />
            </Item>
            <div style={{ width: '100%', height: 1, backgroundColor: "#e7e7e7" }}></div>
            <Item>
                <div style={{ fontSize: "14px", fontWeight: "700", paddingBottom: "2px", paddingTop: "-3px" }}>Правила размещения</div>
                <CustomCheckbox name={'Можно с питомцами'} field_name={'filter[pets_allowed]'} />
                <CustomCheckbox name={'Можно курить'} field_name={'filter[smoking_allowed]'} />
                <CustomCheckbox name={'Разрешены мероприятия и вечеринки'} field_name={'filter[events_allowed]'} />
                <CustomCheckbox name={'Владелец предоставляет отчетные документы о проживании'} field_name={'filter[with_rental_agreement]'} />
            </Item>
            <div style={{ width: '100%', height: 1, backgroundColor: "#e7e7e7" }}></div>
        </Box>
    )
}

export function AdvancedFilter() {
    const searchParams = useSearchParams();
    const [instantBookingAvailable, setInstantBookingAvailable] = React.useState<any>(searchParams.get('instant_booking_available'));
    const state = useAppSelector(state => state)

    const search = (params: any) => {
        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries() || []),
            instant_booking_available: params.instant_booking_available,
            page: 1,
        }
        urlParams = Object.fromEntries(Object.entries(urlParams).filter(item => item[1] !== null));

        //setSearchParams(urlParams);
    }

    // useEffect c dependencies для обновления объявлений, с приостановкой старых запросов
    
    return (
        <>
            <Box
                //xs="true"
                sx={{
                    border: 1,
                    borderRadius: 1,
                    borderColor: "#e7e7e7",
                }}
            >
                <FormControlLabel
                    control={
                        <Switch checked={!!instantBookingAvailable}
                            onChange={(event) => {
                                setInstantBookingAvailable(!!event.target.checked);
                                search({instant_booking_available: (event.target.checked ? 1 : null)})
                            }}
                            color="primary" />
                        }
                    label={<div style={{ fontSize: '15px' }}>Мгновенное бронирование</div>}
                    labelPlacement="start"
                />
            </Box>
            <br/>
            {
                state.amenity.loading === true && state.propertyType.loading === true
                    ? <SecondFilters /> 
                    : <SimpleLoader />    
            }
        </>
    )
}
