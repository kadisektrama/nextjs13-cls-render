import React from "react"
import { Clusterer, Placemark, YMaps, Map as YandexMap } from "react-yandex-maps";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

import Typography from "@mui/material/Typography";

import { useAppSelector } from "@/redux/hooks/hooks";

const Balloon: React.FC<any> = (props) => {
    const [incr, setIncr] = React.useState(0);

    const icrement = () => {
        setIncr(incr + 1);
    };

    return (
        <div>
            <Typography variant="h6" component="span">
                Test {props.point.id}
            </Typography>
            {props.point.description == false ? <div>Управляется визическим лицом</div> : ''}
            <div>
                { props.point.description }
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

export function Map() {
    const property = useAppSelector(state => state.property.property)
    const [ymaps, setYmaps] = React.useState<any>(null);
    const [selectedPoint, setSelectedPoint] = React.useState(null);

    const onPlacemarkClick = (point: any) => () => {
        setSelectedPoint(point);
    };

    return (
        <div style={{ padding: '24px' }}>
            {property ? (
                <>
                    <Typography variant="h6" component="div">Где вы будете</Typography>
                    <Typography variant="body1" component="div" sx={{ mb: 2 }}>{`${property.region.parent.parent.name}, ${property.region.name}`}</Typography>
                    <div style={{ borderRadius: '18px', overflow: 'hidden', transform: 'translate3d(0, 0, 0)' }}>
                        <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
                            <YandexMap
                                defaultState={{
                                    center: [property.lat, property.lng],
                                    zoom: 15
                                }}
                                onLoad={ymaps => setYmaps(ymaps)}
                                width={`${document.body.clientWidth - 48}px`}
                                height={`${document.body.clientWidth - 48}px`}
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
                                                geometry={[property.lat, property.lng]}
                                                onBalloonOpen={() => {
                                                    ReactDOM.hydrate(
                                                        <Balloon point={property} />,
                                                        document.getElementById("balloon")
                                                    );
                                                }}
                                                onClick={onPlacemarkClick(property)}
                                                options={{
                                                    balloonContentLayout: BalloonContentLayout(
                                                        ymaps.templateLayoutFactory,
                                                        <Balloon point={property}/>
                                                    ),
                                                    balloonPanelMaxMapArea: 0
                                                }}
                                            />
                                        )}
                                    </Clusterer>
                                )}
                            </YandexMap>
                        </YMaps>
                    </div>
                </>
            ) : ''}
        </div>
    )
}


