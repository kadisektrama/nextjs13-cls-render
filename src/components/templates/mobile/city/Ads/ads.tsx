import React from "react"
import 'react-spring-bottom-sheet/dist/style.css'
import { useSearchParams } from "next/navigation";

import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";


import { ProductCard } from '@/components/Mobile/ProductCard/productCard'
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { Footer } from "../../Footer/footer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchProperties } from "@/redux/thunk/property";
import { TUrlParams } from "@/types/other";

export const Ads: React.FC = () => {
    const searchParams = useSearchParams();
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const paginationChange = (event: any, value: any) => {
        let urlParams: TUrlParams = {
			...Object.fromEntries(searchParams.entries() || []),
			page: value,
		}
        //setSearchParams(Object.fromEntries(Object.entries(urlParams).filter(item => !(item[1] === null || item[1] === 'undefined' || item[1] === undefined))));

        let urlRequestParams: TUrlParams = {
            ...urlParams,
            status: 1,
        }
        Object.keys(urlRequestParams).forEach(k => urlRequestParams[k] === 0 && delete urlRequestParams[k])

        dispatch(fetchProperties(urlRequestParams))
            .then(() => {
                window.scrollTo({
                    top: Math.floor(document.documentElement.clientHeight / 1.9),
                    left: 0,
                    behavior: 'smooth',
                });
            })
    };

    return (
        <div style={{ minWidth: '250px' }}>
            <div style={{ padding: '0 20px 20px', fontSize: '22px', fontWeight: 700 }}>
                {`Найдено ${state.property.properties.meta.total} ${getNoun(state.property.properties.meta.total, 'вариант', 'варианта', 'вариантов')}`}
            </div>
            <Stack spacing={5} sx={{ display: 'flex', alignItems: 'center' }}>
                {state.property.properties.data.map((business: any, index: any) => (
                    <div key={business.id} style={{ width: '90%' }}>
                        <ProductCard {...business} index={index} />
                    </div>
                ))}
            </Stack>
            <br />
            {state.property.properties.data.length > 0 ? (
                <div>
                    <span>{`Брест: найдено ${state.property.properties.meta.total} ${getNoun(state.property.properties.meta.total, 'вариант', 'варианта', 'вариантов')}`}</span>
                    <Stack spacing={2}>
                        <Box
                            //xs={true}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                padding: "5px",
                                border: "1px solid #e7e7e7",
                                borderRadius: 1,
                                alignItems: "center",
                                paddingLeft: "10px",
                                paddingRight: "10px"
                            }}
                        >
                            <Pagination sx={{ margin: "2px" }} count={state.property.properties.meta.last_page} page={state.property.properties.meta.current_page} onChange={paginationChange} />
                            <div>Показаны {state.property.properties.meta.from} - {state.property.properties.meta.to}</div>
                        </Box>
                        <Footer />
                    </Stack>
                </div>
            ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <span style={{ color: "#4a4747", fontSize: "22px" }}>Объявлений не найдено</span>
                </div>
            )}
        </div>
    )
}