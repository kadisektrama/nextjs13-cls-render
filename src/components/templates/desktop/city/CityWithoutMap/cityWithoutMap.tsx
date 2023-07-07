import React from "react";

import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { Cards } from "../Cards/cards";
import { Filter } from "./Filters/filter";
import { AdvancedFilter } from "./Filters/advancedFilter";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { setIsCityWithMap } from "@/redux/slices/internalSystem";

type TMapStateToProps = {
    isLoaded: boolean
}

export const CityWithoutMap: React.FC<TMapStateToProps> = ({isLoaded}) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={3} container direction="column">
                <Filter />
                <br/>
                <AdvancedFilter />
            </Grid>
            <Grid item container direction="column" xs={9}>
                {isLoaded ? (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="h5" marginBottom="1.5rem !important" component="h1">
                                Брест: найдено {state.property.properties.meta.total} {getNoun(state.property.properties.meta.total, 'объявление', 'объявления', 'объявлений')}
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Switch checked={state.internalSystem.isCityWithMap} onChange={(event) => dispatch(setIsCityWithMap(event.target.checked))} color="primary" />
                                }
                                label="Карта"
                            />
                        </div>
                        <Cards />
                    </>
                ) : (
                    <SimpleLoader />
                )}
            </Grid>
        </Grid>
    )
}
