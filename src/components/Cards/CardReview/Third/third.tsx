// Core
import { useParams } from "next/navigation";
import { useState } from "react";

// UI
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { setPrivateComment } from "@/redux/slices/review";

// Tools
import { createExpandReviewScores, createReview } from "@/api/secure";
import { RussianName } from "@/utils/Helpers/RussianNameProcessor/russianNameprocessor";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Third: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [fn] = useState(new RussianName(props.booking.property.user.user_profile.first_name))
    let {id} = useParams();

    const handleNextPage = () => {
        Promise.all([createReview(state.review, id), createExpandReviewScores(state.review, id)])
            .then(() => props.setScreen('thankYouPage'))
    }

    return (
        <Stack spacing={1}>
            <Typography variant="h6" component="h2" gutterBottom>Добавьте личный комментарий</Typography>
            <div>Подскажите, что стоит улучшить или поблагодарите хозяина за приём.</div>
            <div>Мы не опубликуем комментарий в профиле {fn.fullName(fn.gcaseRod)}.</div>

            <div>
                <TextField
                    id="review[private_comment]"
                    name="review[private_comment]"
                    margin="normal"
                    multiline
                    rows={5}
                    label="Личный комментарий"
                    onBlur={(event: any) => {dispatch(setPrivateComment(event.target.value))}}
                    style = {{ width: 360 }}
                    autoComplete="review[private_comment]"
                />
            </div>
            <div>
                <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleNextPage}>Завершить</Button>
            </div>
        </Stack>
    )
}