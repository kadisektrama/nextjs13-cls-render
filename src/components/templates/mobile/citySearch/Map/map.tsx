import React from "react"
import { Placemark, YMaps, Map as YandexMap, Clusterer } from "react-yandex-maps";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

import { Balloon } from "./Balloon/balloon";
import "./map.scss";
import { useAppSelector } from "@/redux/hooks/hooks";

const BalloonContentLayout = (layoutFactory: any, Component: any) => {
    const html = ReactDOMServer.renderToString(Component);
    const Layout = layoutFactory.createClass(`<div id="balloon">${html}</div>`, {
        build: function() {
            Layout.superclass.build.call(this);
        }
    });

    return Layout;
};

export const Map: React.FC<any> = (props) => {
    const [ymaps, setYmaps] = React.useState<any>(null);
    const state = useAppSelector(state => state)

    return (
        <div id="yandex-map" style={{ position: 'relative', top: `-${(document.documentElement.clientHeight - 208) / 3 + 40}px` }}>
            <YMaps query={{ lang: "ru_RU", load: "templateLayoutFactory" }}>
                <YandexMap
                    defaultState={{
                        center: [52.096251, 23.681005],
                        zoom: 12
                    }}
                    onLoad={ymaps => setYmaps(ymaps)}
                    width="100%"
                    height={`${document.documentElement.clientHeight - 208}px`}
                >
                    {ymaps && (
                        <Clusterer
                            options={{
                                preset: 'islands#blueClusterIcons',
                                groupByCoordinates: false,
                                balloonPanelMaxMapArea: Infinity + 50,
                                zoomMargin: 70,
                                useMapMargin: true,
                            }}
                        >
                            {state.property.propertiesForMap?.data.map((point: any, index: any) => (
                                <Placemark
                                    modules={[
                                        "geoObject.addon.balloon",
                                    ]}
                                    key={index}
                                    geometry={[+point.lat, +point.lng]}
                                    onBalloonOpen={() => {
                                        ReactDOM.hydrate(
                                            <Balloon point={point} />,
                                            document.getElementById("balloon")
                                        );
                                    }}
                                    properties={{
                                        iconContent: `${parseFloat(point.price)} ${point.currency}`,
                                    }}
                                    options={{
                                        preset: 'islands#yellowStretchyIcon',
                                        iconColor: 'blue',

                                        balloonContentLayout: BalloonContentLayout(
                                            ymaps.templateLayoutFactory,
                                            <Balloon point={point}/>
                                        ),
                                        balloonPanelMaxMapArea: 0
                                    }}
                                />
                            ))}
                        </Clusterer>
                    )}
                </YandexMap>
            </YMaps>
        </div>
    )
}