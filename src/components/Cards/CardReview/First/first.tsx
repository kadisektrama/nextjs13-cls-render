// Core
import { useState, useEffect } from "react";

// UI
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import { Radio } from "antd";

// Tools
import { getReviewScoreCategories } from "@/api/commonApi";
import { SimpleLoader }  from "@/components/Loader/simpleLoader";
import { RussianName } from "@/utils/Helpers/RussianNameProcessor/russianNameprocessor";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchReviewScoreCategories } from "@/redux/thunk/reviewScoreCategory";
import { setExpandedReviewScores, setScore } from "@/redux/slices/review";

export const First: React.FC<any> = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const state = useAppSelector(state => state)
    const [fn] = useState(new RussianName(props.booking.property.user.user_profile.first_name))
    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([dispatch(fetchReviewScoreCategories())])
            .then(() => setIsLoaded(true))
    }, [])

    const handleChangeScore = (reviewScoreCategoryId: any, value: any) => {
        const index = state.review.expandedReviewScores.findIndex((item: any) => item.review_score_category_id === reviewScoreCategoryId)

        if (index !== -1) {
            let updatedScores: any = [...state.review.expandedReviewScores];
            updatedScores[index] = {
                "review_score_category_id": reviewScoreCategoryId,
                "value": value
            };

            dispatch(setExpandedReviewScores(updatedScores));
        } else {
            let updatedScores: any = [...state.review.expandedReviewScores];
            updatedScores.push(
                {
                    "review_score_category_id": reviewScoreCategoryId,
                    "value": value
                }
            );

            dispatch(setExpandedReviewScores(updatedScores))
        }
    }

    const handleNextPage = () => {
        if (state.review.review.score) {
            props.setScreen('second');
        } else {
            props.setOpenAlertReject(true);
        }
    }

    return (
        <>
            {isLoaded ? (
                <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                    <Typography variant="h6" component="h2" gutterBottom>Расскажите хозяину о своем впечатлении</Typography>
                    <div>
                        <div>Вам понравилось пребывание у хозяина {fn.fullName(fn.gcaseRod)}?</div>
                        <Radio.Group defaultValue="8" buttonStyle="solid" size="large" onChange={(event) => dispatch(setScore(event.target.value))}>
                            {Array.from({length: 10}, (_, i) => i + 1).map((radio, index) => (
                                <Radio.Button key={index} value={radio}>{radio}</Radio.Button>
                            ))}
                        </Radio.Group>
                    </div>
                    <br/>
                    {state.reviewScoreCategory.reviewScoreCategories.map((reviewScoreCategory: any) => (
                        <div key={reviewScoreCategory.id}>
                            <div>{reviewScoreCategory.name}</div>
                            <Radio.Group defaultValue="8" buttonStyle="solid" size="large" onChange={(event) => handleChangeScore(reviewScoreCategory.id, event.target.value)}>
                                {Array.from({length: 10}, (_, i) => i + 1).map((radio, index) => (
                                    <Radio.Button key={index} value={radio}>{radio}</Radio.Button>
                                ))}
                            </Radio.Group>
                        </div>
                    ))}

                    <div>
                        <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => handleNextPage()}>Далее</Button>
                    </div>
                </Stack>
            ) : (
                <SimpleLoader />
            )}
        </>
    )
}