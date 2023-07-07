import React, { useState } from 'react';
import { YMaps, Map as YandexMap, Placemark, Clusterer } from 'react-yandex-maps';
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

import { Typography } from "@mui/material";

import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector } from '@/redux/hooks/hooks';

function Balloon({point}: any) {
    const [incr, setIncr] = useState(0);

    const icrement = () => {
        setIncr(incr + 1);
    };

    return (
        <div>
            <Typography variant="h6" component="span">
                Test {point.id}
            </Typography>
            {point.description === false ? <div>Управляется визическим лицом</div> : ''}
            <div>
                {point.description}
            </div>
            <button onClick={icrement}>Click me</button>
            Clicked: {incr}
        </div>
    );

}

const BalloonContentLayout = (layoutFactory: any, Component: any) => {
    const html = ReactDOMServer.renderToString(Component);
    const Layout = layoutFactory.createClass(`<div id="balloon">${html}</div>`, {
        build: function() {
            Layout.superclass.build.call(this);
        }
    });

    return Layout;
};

export const Map = () => {
    const [ymaps, setYmaps] = React.useState<any>(null);
    const state = useAppSelector(state => state)

    return (
        <div>
            <Typography component="div" variant="h6">Информация о месте</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Точное месторасположение будет указано после бронирования.
            </Typography>
            {state.property.property ? (
                <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
                    <YandexMap
                        defaultState={{
                            center: [state.property.property.lat, state.property.property.lng],
                            zoom: 15
                        }}
                        onLoad={ymaps => setYmaps(ymaps)}
                        width="100%"
                        height="600px"
                    >
                        {ymaps && (
                            <Clusterer
                                options={{
                                    preset: "islands#invertedVioletClusterIcons",
                                    groupByCoordinates: false,
                                    balloonPanelMaxMapArea: Infinity
                                }}
                            >
                                {ymaps && (
                                    <Placemark
                                        modules={[
                                            "geoObject.addon.balloon",
                                            "geoObject.addon.hint"
                                        ]}
                                        key={1}
                                        geometry={[state.property.property.lat, state.property.property.lng]}
                                        onBalloonOpen={() => {
                                            ReactDOM.hydrate(
                                                <Balloon point={state.property.property} />,
                                                document.getElementById("balloon")
                                            );
                                        }}
                                        options={{
                                            balloonContentLayout: BalloonContentLayout(
                                                ymaps.templateLayoutFactory,
                                                <Balloon point={state.property.property}/>
                                            ),
                                            balloonPanelMaxMapArea: 0
                                        }}
                                    />
                                )}
                            </Clusterer>
                        )}
                    </YandexMap>
                </YMaps>
                ) : (
                <SimpleLoader />
            )}
        </div>

    );
}