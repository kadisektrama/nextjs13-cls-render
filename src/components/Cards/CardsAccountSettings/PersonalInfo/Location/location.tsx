import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { updateUserProfile } from "@/api/commonApi";
import { setUserProfileLocation } from "@/redux/slices/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

export const Location: React.FC<any> = (props) => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state) 

    const handleSubmit = () => {
        updateUserProfile(state.user.user)
            .then((res: any) => {
                if (res.status === 204) {
                    props.handleClose()
                }
            })
    };

    return(
        <>
            <div style={{ display: 'flex' }}>
                <TextField
                    margin="normal"
                    defaultValue={state.user.user.user_profile.location}
                    required
                    label="Адрес"
                    name="location"
                    id="location"
                    onBlur={(event) => {dispatch(setUserProfileLocation(event.target.value))}}
                    style = {{ width: 244, paddingRight: '20px' }}
                />
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