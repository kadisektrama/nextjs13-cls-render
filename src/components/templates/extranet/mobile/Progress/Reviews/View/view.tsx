// Core
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

// UI
import { Radio } from "antd";
import { Box } from "@mui/material";

// Tools
import { getExpandedReviewScores, updateReview } from "@/api/extranet";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { BookingReviewStatusesViewExtranet } from "@/utils/Constants/Enums/BookingReviewStatuses";
import { fetchReviewExtranet } from "@/redux/thunk/review";
import { fetchReviewScoreCategories } from "@/redux/thunk/reviewScoreCategory";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchExpandedReviewScoresExtranet } from "@/redux/thunk/review";

export const View: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);

    let {id} = useParams();

    useEffect(() => {
        Promise.all([dispatch(fetchReviewExtranet(id)), dispatch(fetchReviewScoreCategories())])
            .then((res: any) => {
                const fetchData = async () => {
                    await Promise.all([dispatch(fetchExpandedReviewScoresExtranet(res[0].id)), res[0].is_read_host || updateReview(res[0].id, {is_read_host: true})])
                }
                fetchData()
            })
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <AccountHeader name={'Отзывы'}>
            {isLoaded ? (
                <>
                    <div style={{ paddingLeft: '15px', paddingRight: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'start', gridRowGap: '8px' }}>
                        <div>Оценка:</div>
                        <div>{state.review.review.score}</div>
                        <div>Публичный отзыв:</div>
                        <div>{state.review.review.public_comment}</div>
                        <div>Приватный отзыв:</div>
                        <div>{state.review.review.private_comment}</div>
                        <div>Анонимный:</div>
                        <div>{state.review.review.is_anonymous ? 'Да' : 'Нет'}</div>
                        <div>Статус:</div>
                        <div>{BookingReviewStatusesViewExtranet[state.review.review.status as unknown as keyof typeof BookingReviewStatusesViewExtranet]}</div>
                        <div>Дата создания:</div>
                        <div>{format(new Date(state.review.review.created_at), 'dd-MM-yyyy')}</div>
                    </div>

                    <Box sx={{ pl: 2, pr: 2, pt: 3 }}>
                        {state.reviewScoreCategory.reviewScoreCategories.map((reviewScoreCategory: any) => (
                            <div key={reviewScoreCategory.id}>
                                <div>{reviewScoreCategory.name}</div>
                                <Radio.Group buttonStyle="solid" size="middle" value={+state.review.expandedReviewScores.find((review: any) => review.reviewScoreCategory.id === reviewScoreCategory.id)?.value}>
                                    {Array.from({length: 10}, (_, i) => i + 1).map((radio, index) => (
                                        <Radio.Button key={index} value={radio}>{radio}</Radio.Button>
                                    ))}
                                </Radio.Group>
                            </div>
                        ))}
                    </Box>
                </>
            ) : (
                <SimpleLoader />
            )}
        </AccountHeader>
    )
}