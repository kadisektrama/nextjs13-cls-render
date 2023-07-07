import React, { useEffect, useRef, useState } from "react";
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import { useMediaQuery } from "react-responsive";
import { Ref } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { CircularProgress } from "@material-ui/core";

import { useAppSelector } from "@/redux/hooks/hooks";
import { setCoords } from "@/redux/slices/property";

export const CreateMap: React.FC = () => {
    const state = useAppSelector(state => state)
    const [isLoaded, setIsLoaded] = useState(false);
    const [coord, setCoord] = useState<any>();
    const searchControlRef = useRef<any>(null);
    const isDesktop = useMediaQuery({ query: '(min-width: 748px)' })

    useEffect(() => {
        (state.property.property.lat && state.property.property.lng) ? setCoord([state.property.property.lat, state.property.property.lng]) : setCoord([52.0960830335906, 23.68508659246824]);
        setIsLoaded(true);
    }, [])

    const onResultShow = () => {
        if (searchControlRef.current) {
            let control = searchControlRef.current?.getResultsArray();
            let coords = control[0].geometry.events.params.context._coordinates;
            setCoords({'lat': coords[0], 'lng': coords[1]})
        }
    };

    return (
        <div className="App">
            {isLoaded ? (
                <Grid container item>
                    <Grid container item xs={12}>
                        <YMaps query={{ lang: "ru_RU", load: "Map", apikey: process.env.REACT_APP_YANDEX_API_KEY }}>
                            <Map
                                defaultState={{
                                    center: coord,
                                    zoom: 15,
                                }}
                                width={isDesktop ? '85%' : '100%'}
                                height={window.screen.height * 0.6 + 'px'}
                                onClick={(event: any) => {
                                    setCoord([event.get('coords')[0], event.get('coords')[1]]);
                                    setCoords({'lat': event.get('coords')[0], 'lng': event.get('coords')[1]})
                                    localStorage.setItem('property[lat]', event.get('coords')[0])
                                    localStorage.setItem('property[lng]', event.get('coords')[1])
                                }}
                            >
                                <SearchControl
                                    instanceRef={searchControlRef as unknown as undefined}
                                    onResultShow={onResultShow}
                                />
                                <Placemark geometry={coord} />
                            </Map>
                        </YMaps>
                    </Grid>
                </Grid>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderColor: "#e7e7e7",
                    }}
                >
                    <CircularProgress disableShrink />
                </Box>
            )}
        </div>
    );
}
