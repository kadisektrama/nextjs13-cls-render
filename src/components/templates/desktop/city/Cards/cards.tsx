import React  from "react";
import { useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import { Card } from "./Card/card";
//import { getProperties } from "../../../../../../Requests/BasicRequests/basicRequests";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { TUrlParams } from "@/types/other";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function Cards() {
    const searchParams = useSearchParams();
    const state = useAppSelector(state => state)
    const router = useRouter()
    const pathname = usePathname()

    const paginationChange = (event: any, value: any) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });

        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries() || []),
            page: value,
        }

        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`, {scroll: false})
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                {/*<TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={tabListChange} aria-label="lab API tabs example">
                            <Tab key={1} label="Наши рекомендации" value="1" />
                            <Tab key={2} label="Сначала дома и апартаменты" value="2" />
                            <Tab key={3} label="Звезды (сначала больше всего)" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">*/}
                        <Stack
                            direction="column"
                            justifyContent="flex-start"
                            spacing={3}
                        >
                            {state.property.properties.data && state.property.properties.data.map((property: any, index: any) => (
                                <div key={property.id}>
                                    <Card key={index} property={property} />
                                </div>
                            ))}
                        </Stack>
                        <br/>
                        {state.property.properties.data.length > 0 ? (
                            <div>
                                <span>Брест: найдено {state.property.properties.meta.total } {getNoun(state.property.properties.meta.total, 'вариант', 'варианта', 'вариантов')}</span>
                                <Stack spacing={2}>
                                    <Box
                                        //xs="true"
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
                                </Stack>
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <span style={{ color: "#4a4747", fontSize: "22px" }}>Объявлений не найдено</span>
                            </div>
                        )}
                    {/*</TabPanel>
                    <TabPanel value="2">
                        Test
                    </TabPanel>
                    <TabPanel value="3">Тестовые данные</TabPanel>
                </TabContext>*/}
            </Box>
        </>
    )
}
