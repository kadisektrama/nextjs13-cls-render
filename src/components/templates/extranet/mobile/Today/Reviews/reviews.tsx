import Link from "next/link"
import React, { useEffect, useState } from 'react'

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { Button } from "@mui/material"

import { CardReview } from "@/components/Cards/CardReviewOnTodayHost/cardReview"
import { useAppSelector } from "@/redux/hooks/hooks"

export const Reviews: React.FC = () => {
    const state = useAppSelector(state => state)
    let [isLoaded, setIsLoaded] = useState(false)
    const [reviews, setReviews] = useState<any>([])

    useEffect(() => {
        setReviews(state.review.reviews.filter((item: any) => item.is_read_host === false))
        setIsLoaded(true)
    }, [])

    return (
        <>
            {isLoaded && (
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column' }}>
                    <Box sx={{ m: 2, mb: 0, width: '100%' }}>
                        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                            {reviews.slice(0, 2).map((item: any) => (
                                <React.Fragment key={item.id}>
                                    <CardReview item={item} />
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Box>

                    {reviews.length > 2 ? (
                        <div>
                            <Link href={'/host/progress/reviews'}>
                                <Button sx={{ whiteSpace: 'nowrap' }} variant="text">Показать все ({reviews.length})</Button>
                            </Link>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            )}
        </>
    )
}