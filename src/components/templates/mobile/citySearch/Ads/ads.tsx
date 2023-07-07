// @ts-nocheck
import React from "react"
import 'react-spring-bottom-sheet/dist/style.css'
import { useSearchParams } from "next/navigation";
import PropTypes from 'prop-types';
import { DndProvider, useDrag, DragSourceMonitor  } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import { ProductCard } from '@/components/Mobile/ProductCard/productCard'
import { fetchProperties } from "@/redux/thunk/property";
import { Footer } from "../../Footer/footer";
import { delay } from "@/utils/Helpers/delay";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { TUrlParams } from "@/types/other";
import { useRouter, usePathname } from "next/router";

const Ads: React.FC<any> = () => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state);
    const pathname = usePathname();
    const router = useRouter();

    const [, drag] = useDrag(
        () => ({
            type: "MAP",
            item: () => {
                return { id, index }
            },
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: monitor.isDragging(),
            }),
            isDragging(monitor: DragSourceMonitor) {
                const offSet = monitor.getClientOffset()
                let y = offSet?.y - 104
                let top = (document.documentElement.clientHeight - 104 - offSet?.y) / 1.5

                if (offSet?.y > (144 + (document.documentElement.clientHeight - 208) / 3) && offSet?.y < (document.documentElement.clientHeight - 104)) {
                    document.getElementById('container-yandex-map').style.height = `${y}px`
                    document.getElementById('yandex-map').style.top = `-${top}px`
                }
            },
            end: async (item: any, monitor: DragSourceMonitor) => {
                const didDrop = monitor.didDrop()
                const difOffSet = monitor.getDifferenceFromInitialOffset().y

                document.getElementById('yandex-map').style.transition = 'all 1s ease-in-out'
                document.getElementById('container-yandex-map').style.transition = 'all 1s ease-in-out'

                if (!didDrop) {
                    if (difOffSet > 30) {
                        document.getElementById('yandex-map').style.top = `-0px`
                        document.getElementById('container-yandex-map').style.height = `${(document.documentElement.clientHeight - 208)}px`
                    }
                    if (difOffSet < -30) {
                        document.getElementById('yandex-map').style.top = `-${(document.documentElement.clientHeight - 208) / 3 + 40}px`
                        document.getElementById('container-yandex-map').style.height = `${(document.documentElement.clientHeight - 208) / 3 + 40}px`
                    }
                }

                await delay(0)
                document.getElementById('yandex-map').style.transition = 'all 0s ease-in-out'
                document.getElementById('container-yandex-map').style.transition = 'all 0s ease-in-out'
            },
        }),
        [],
    )

    const paginationChange = (event: any, value: any) => {
        let urlParams: TUrlParams = {
            ...Object.fromEntries(searchParams.entries() || []),
            page: value,
        }

        //setSearchParams(Object.fromEntries(Object.entries(urlParams).filter(item => !(item[1] === null || item[1] === 'undefined' || item[1] === undefined))));
        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 

        let urlRequestParams: TUrlParams = {
            ...urlParams,
            status: 1,
        }
        Object.keys(urlRequestParams).forEach(k => urlRequestParams[k] === 0 && delete urlRequestParams[k])

        dispatch(fetchProperties(urlRequestParams))
            .then(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            })
    };

    const Puller = styled(Box)(({ theme }) => ({
        width: 40,
        height: 4,
        backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
        borderRadius: 3,
    }));

    return (
        <div style={{
                minWidth: '250px',
                position: 'sticky',
                marginTop: '-40px',
                backgroundColor: 'white',
                borderRadius: '28px 28px 0 0',
            }}
        >
            <div
                ref={(node) => drag(node)}
                className="puller"
                style={{
                    width: '100%',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    bottom: '100px',
                    zIndex: 1,
                    justifyContent: 'center',

                }}
            >
                <Puller />
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
                    <span>Брест: найдено {state.property.properties.meta.total } вариантов</span>
                    <Stack spacing={2}>
                        <Box
                            //xs
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

Ads.propTypes = {
    window: PropTypes.func,
};

function AdsContainer() {
    return (
        <DndProvider backend={TouchBackend} options={{enableMouseEvents: true}}>
            <Ads />
        </DndProvider>
    )
}

export { AdsContainer as Ads }