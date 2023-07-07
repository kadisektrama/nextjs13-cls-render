import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { updateUserProfile } from "@/api/commonApi";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { setUserProfileGender } from "@/redux/slices/user";

export const Gender: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        updateUserProfile(state.user.user)
            .then((res: any) => {
                if (res.status === 204) {
                    props.handleClose()
                }
            })
    };

    return (
        <>
            <div>
                <TextField
                    margin="normal"
                    select
                    defaultValue={state.user.user.user_profile.gender}
                    required
                    label="Пол"
                    name="user[gender]"
                    id="user[gender]"
                    onChange={(event) => {dispatch(setUserProfileGender(event.target.value))}}
                    style = {{ width: 244 }}
                >
                    {[{id: 'male', name: 'Мужской'}, {id: 'female', name: 'Женский'}].map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSubmit()}
            >
                Сохранить
            </Button>
        </>
    )
}