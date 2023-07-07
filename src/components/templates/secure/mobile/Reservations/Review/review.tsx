// Core
import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

// UI
import { Alert, Button } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import { Snackbar } from "@material-ui/core";

// Tools
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
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
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)

    useEffect(() => {
        dispatch(fetchBookingsSecure())
            .then((res) => setBooking(res.payload.data.filter((booking: any) => +booking.id === +id)[0]))
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
        <>
            <AccountHeader
                name={''}
                startElement={
                    <IconButton sx={{ height: '37.25px' }}>
                        <Link href={'/'}><ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} /></Link>
                    </IconButton>
                }
                endElement={
                    <>
                        {screen === 'thankYouPage' ? (
                            <Link href={'/guest/reservations'}>
                                <Button sx={{ color: 'black' }}>выйти</Button>
                            </Link>
                        ) : (
                            <Button sx={{ color: 'black' }} onClick={handleChangeSave}>сохранить и выйти</Button>
                        )}
                    </>
                }
            >
                {isLoaded ? (
                    <CardReview screen={screen} booking={booking} setScreen={(value: any) => setScreen(value)} setOpenAlertReject={(value: any) => setOpenAlertReject(value)} />
                ) : (
                    <SimpleLoader />
                )}
            </AccountHeader>

            <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={() => setOpenAlertReject(false)}>
                <Alert onClose={() => setOpenAlertReject(false)} severity="error" sx={{ width: '100%' }}>
                    {'Укажите рейтинг хозяина'}
                </Alert>
            </Snackbar>
        </>
    )
}
