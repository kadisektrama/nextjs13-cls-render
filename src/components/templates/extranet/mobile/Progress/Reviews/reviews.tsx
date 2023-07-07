// Core
import { useState, useEffect } from "react";

// Tools
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { Cards } from "./Cards/cards";
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { fetchReviewsExtranet } from "@/redux/thunk/review";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Reviews: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchReviewsExtranet())
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