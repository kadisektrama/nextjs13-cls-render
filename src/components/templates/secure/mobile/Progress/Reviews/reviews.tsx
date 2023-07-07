// Core
import { useState, useEffect } from "react";

// Tools
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
//import { Cards } from "./Cards/cards";
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchReviews } from "@/redux/thunk/review";
import dynamic from 'next/dynamic'

const Cards = dynamic(() =>
  import('./Cards/cards').then((mod) => mod.Cards),
  {ssr: false}
)

export const Reviews: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchReviews())
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <AccountHeader name={'Отзывы'}>
            {isLoaded ? (
                <>
                    {state.review.reviews.length !== 0 ? (
                        <Cards />
                    ) : (
                        <InfoWindowEmpty firstRow={'Нет отзывов'} />
                    )}
                </>
            ) : (
                <SimpleLoader />
            )}
        </AccountHeader>
    )
}