import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import 'react-spring-bottom-sheet/dist/style.css';
import Cookies from "js-cookie";

import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { BackTop } from 'antd';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

import { Header } from "./Header/header";
import { Map } from "./Map/map"
import { Ads } from "./Ads/ads"
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { Filters } from "./Filter/filters";
import { DateFilter } from "./Filter/dateFilter";
import { OtherFilters } from "./Filter/otherFilters";
import './citySearch.scss';
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchProperties, fetchPropertiesForMap } from '@/redux/thunk/property';
import { fetchAmenities } from '@/redux/thunk/amenity';
import { fetchPropertyTypes } from '@/redux/thunk/propertyType';
import { fetchUser } from "@/redux/thunk/user";
import { Menu } from "../Menu/menu"
import { TUrlParams } from "@/types/other";

export const CitySearch: React.FC = () => {
    const [windowScreen, setWindowScreen] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const searchParams = useSearchParams();
    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const token = useState(Cookies.get('token'))
   
    useEffect(() => {
        let urlRequestParams: TUrlParams = {
			...Object.fromEntries(searchParams.entries() || []),
			status: 1
		}
        Object.keys(urlRequestParams).forEach(k => urlRequestParams[k] === 0 && delete urlRequestParams[k])

        Promise.all([
            dispatch(fetchProperties(urlRequestParams)),
		    //dispatch(fetchPropertiesForMap(urlRequestParams))	,
            token && dispatch(fetchUser()),

        ])
            .then(
                () => setIsLoaded(true),
                (error) => setError(error)
            )
    }, [searchParams])

    React.useEffect(() => {
        dispatch(fetchPropertyTypes())
		dispatch(fetchAmenities(''))
    }, [])

    if (error) {
        throw new Error('404 Page Not Found');
    }

    return (
        <div>
            {windowScreen === '' && (
                <>
                    {isLoaded ? (
                        <>
                            <Header setWindowScreen={(value: any) => setWindowScreen(value)} />

                            <div style={{ marginTop: "104px", paddingBottom: '56px' }}>
                                <div id="container-yandex-map" style={{ maxHeight: `${document.documentElement.clientHeight - 208}px`, minHeight: `${(document.documentElement.clientHeight - 208) / 3 + 40}px`, height: `${(document.documentElement.clientHeight - 208) / 3 + 40}px` }} >
                                    <Map mapHeight={document.documentElement.clientHeight - 208} />
                                </div>

                                {state.property.properties ? (
                                    <ErrorBoundary>
                                        <Ads />
                                    </ErrorBoundary>
                                ) : (
                                    <SimpleLoader />
                                )}

                                <BackTop style={{ width: '100%', marginBottom: '20px' }} visibilityHeight={1000}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ backgroundColor: 'rgb(34, 34, 34)', borderRadius: '24px', color: 'rgb(255, 255, 255)', display: 'flex', padding: '11px 19px', alignItems: 'center' }}>
                                            <div style={{ paddingRight: '5px' }}>Карта</div><MapOutlinedIcon fontSize={'14px' as 'small'} />
                                        </div>
                                    </div>
                                </BackTop>
                            </div>
                        </>
                    ) : <SimpleLoader />}
                </>
            )}

            {windowScreen === 'filters' && (                
                <Filters setWindowScreen={(value: any) => setWindowScreen(value)} />                
            )}

            {windowScreen === 'date_filter' && (               
                <DateFilter setWindowScreen={(value: any) => setWindowScreen(value)} />               
            )}

            {windowScreen === 'other_filters' && (                
                <OtherFilters setWindowScreen={(value: any) => setWindowScreen(value)} />                
            )}
            <Menu />
        </div>
    )
}


