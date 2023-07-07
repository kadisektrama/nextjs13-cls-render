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
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks"
import { fetchReviews } from "@/redux/thunk/review";

export const Reviews: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    let {id} = useParams();

    useEffect(() => {
        dispatch(fetchReviews())
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
                                    Отзывы
                                </Typography>
                                <div style={{ overflowY: 'scroll', maxHeight: `${document.documentElement.clientHeight - 194}px` }}>
                                    {state.review.reviews.length
                                        ? <ListReview />
                                        : <Box sx={{ p: 2 }}><InfoWindowEmpty firstRow={'Нет отзывов'}/></Box>
                                    }
                                </div>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item xs={8.8}>
                                {id && (
                                    <Information />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </>
            ) : (
                <SimpleLoader />
            )}
        </>
    )
}