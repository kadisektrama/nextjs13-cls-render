// Core
import React, { useState, useEffect } from "react"
import Link from "next/link";
import { useRouter, useParams } from "next/navigation"

// UI
import { Alert, Button } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import { Snackbar } from "@material-ui/core";
import Container from "@mui/material/Container";

// Tools
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { CardReview } from "@/components/Cards/CardReview/cardReview";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchBookingsSecure } from "@/redux/thunk/booking";
import { createReview, createExpandReviewScores } from "@/api/secure";

export const Review: React.FC = () => {
    const [openAlertReject, setOpenAlertReject] = useState(false);
    const [screen, setScreen] = useState('first');
    const [booking, setBooking] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    let router = useRouter();
    let {id} = useParams();
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchBookingsSecure())
            .then((res) => {
                setBooking(res.payload.data.filter((booking: any) => +booking.id === +id)[0])
            })
            .then(() => setIsLoaded(true))
    }, [])

    const handleChangeSave = () => {
        if (state.review.review.score) {
            Promise.all([createReview(state.review.review, id), createExpandReviewScores(state.review.review, id)])
                .then(() => router.push('/guest/reservations'))
        } else {
            setOpenAlertReject(true);
        }
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 2 }}>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <IconButton sx={{ height: '37.25px' }}>
                        <Link href={'/'}><ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} /></Link>
                    </IconButton>

                    <>
                        {screen === 'thankYouPage' ? (
                            <Link href={'/guest/reservations'}>
                                <Button sx={{ color: 'black' }}>выйти</Button>
                            </Link>
                        ) : (
                            <Button sx={{ color: 'black' }} onClick={handleChangeSave}>сохранить и выйти</Button>
                        )}
                    </>
                </div>
                {isLoaded ? (
                    <CardReview {...state} screen={screen} booking={booking} setScreen={(value: any) => setScreen(value)} setOpenAlertReject={(value: any) => setOpenAlertReject(value)} />
                ) : (
                    <SimpleLoader />
                )}
            </div>


            <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={() => setOpenAlertReject(false)}>
                <Alert onClose={() => setOpenAlertReject(false)} severity="error" sx={{ width: '100%' }}>
                    {'Укажите рейтинг хозяина'}
                </Alert>
            </Snackbar>
        </Container>
    )
}
