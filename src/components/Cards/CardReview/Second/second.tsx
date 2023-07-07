// UI
import Typography from "@mui/material/Typography";
import { Button, Stack, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FormControlLabel } from "@material-ui/core";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { setIsAnonymous, setPublicComment } from "@/redux/slices/review";

export const Second: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const handleChangeIsAnonymous = (event: any) => {
        dispatch(setIsAnonymous(event.target.checked));
    };

    return (
        <Stack spacing={1}>
            <Typography variant="h6" component="h2" gutterBottom>Оставьте публичный отзыв</Typography>
            <div>Напишите честный и справедливый отзыв о вашем проживании,чтобы другие гости знали, чего ожидать.</div>

            <div>
                <TextField
                    id="review[public_comment]"
                    name="review[public_comment]"
                    margin="normal"
                    multiline
                    rows={5}
                    label="Публичный отзыв"
                    onBlur={(event) => {dispatch(setPublicComment(event.target.value))}}
                    style = {{ width: 360 }}
                    autoComplete="review[public_comment]"
                />
            </div>
            <div style={{ margin: '20px' }}>
                <Tooltip title="На сайте не будет указано ваше имя и какая-либо информация о вас.">
                    <FormControlLabel
                        control={
                            <Checkbox checked={state.review.review.is_anonymous} onChange={handleChangeIsAnonymous} name={'review[is_anonymous]'}/>
                        }
                        label={'Опубликовать отзыв анонимно'}
                    />
                </Tooltip>
            </div>

            <div>
                <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => props.setScreen('third')}>Далее</Button>
            </div>
        </Stack>
    )
}