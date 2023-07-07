// Core
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

// UI
import { Radio } from "antd";
import { Box } from "@mui/material";

// Tools
import { BookingReviewStatusesViewSecure } from "@/utils/Constants/Enums/BookingReviewStatuses";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchReview, fetchExpandedReviewScores } from "@/redux/thunk/review";
import { fetchReviewScoreCategories } from "@/redux/thunk/reviewScoreCategory";
import { TExpandedReviewScore } from "@/types/IReview";

export const Information: React.FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [isLoaded, setIsLoaded] = useState(false);

    let {id} = useParams();

    useEffect(() => {
        Promise.all([dispatch(fetchReview(id)), dispatch(fetchReviewScoreCategories())])
            .then((res) => dispatch(fetchExpandedReviewScores(res[0].payload.id)))
            .then(() => setIsLoaded(true))
    }, [id])

    return (
        <>
            {isLoaded ? (
                <>
                    <div style={{ paddingLeft: '15px', paddingRight: '15px', display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'start', gridRowGap: '8px' }}>
                        <div>Оценка:</div>
                        <div>{state.review.review.score}</div>
                        <div>Публичный отзыв:</div>
                        <div>{state.review.review.public_comment}</div>
                        <div>Приватный отзыв:</div>
                        <div>{state.review.review.private_comment}</div>
                        <div>Анонимный:</div>
                        <div>{state.review.review.is_anonymous ? 'Да' : 'Нет'}</div>
                        <div>Статус:</div>
                        <div>{BookingReviewStatusesViewSecure[state.review.review.status as unknown as keyof typeof BookingReviewStatusesViewSecure]}</div>
                        <div>Дата создания:</div>
                        <div>{format(new Date(state.review.review.created_at), 'dd-MM-yyyy')}</div>
                    </div>

                    <Box sx={{ pl: 2, pr: 2, pt: 3 }}>
                        {state.reviewScoreCategory.reviewScoreCategories.map((reviewScoreCategory: any) => (
                            <div key={reviewScoreCategory.id}>
                                <div>{reviewScoreCategory.name}</div>
                                <Radio.Group buttonStyle="solid" size="middle" value={+state.review.expandedReviewScores.find((review: TExpandedReviewScore) => review.reviewScoreCategory.id === reviewScoreCategory.id)?.value}>
                                    {Array.from({length: 10}, (_, i) => i + 1).map((radio, index) => (
                                        <Radio.Button key={index} value={radio}>{radio}</Radio.Button>
                                    ))}
                                </Radio.Group>
                            </div>
                        ))}
                    </Box>
                </>
            ) : (
                <></>
            )}
        </>
    )
}