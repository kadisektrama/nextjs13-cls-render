// Core
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";

// Tools
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { Information } from "./Information/information";
import { ListReview } from "./ListReview/listReview";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchReviewsExtranet } from "@/redux/thunk/review";

export const Content: React.FC = () => {
    let {id} = useParams();
    
    return (
        <Grid item xs={8.8}>
            {id && (
                <Information />
            )}
        </Grid>
    )
}

export const Reviews: React.FC<{children: React.ReactNode}> = ({children}) => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [isLoaded, setIsLoaded] = useState<any>(false);

    let {id} = useParams();

    useEffect(() => {
        dispatch(fetchReviewsExtranet())
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <>
            {isLoaded ? (
                <>
                    <Box sx={{ flexGrow: 1, height: '100%' }}>
                        <Grid container spacing={3} sx={{ height: '100%', marginTop: 0 }}>
                            <Grid item xs={3} sx={{ borderColor: 'black', borderRight: '1px' }}>
                                <Typography component="h1" variant="h5" sx={{ pl: 2 }}>
                                    Все отзывы
                                </Typography>
                                <div style={{ overflowY: 'scroll', maxHeight: `${document.documentElement.clientHeight - 194}px` }}>
                                    {state.review.reviews.length
                                        ? <ListReview />
                                        : <Box sx={{ p: 2 }}><InfoWindowEmpty firstRow={'Нет отзывов'}/></Box>
                                    }
                                </div>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            {children}
                        </Grid>
                    </Box>
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    )
}