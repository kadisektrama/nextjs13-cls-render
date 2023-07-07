import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { updateUserProfile } from "@/api/commonApi";
import { setUserProfileFirstName, setUserProfileLastName } from "@/redux/slices/user";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Name: React.FC<any> = (props) => {
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

    return(
        <>
            <div style={{ display: 'flex' }}>
                <TextField
                    margin="normal"
                    defaultValue={state.user.user.user_profile.first_name}
                    required
                    label="Имя"
                    name="firstName"
                    id="firstName"
                    onBlur={(event) => {dispatch(setUserProfileFirstName(event.target.value))}}
                    style = {{ width: 244, paddingRight: '20px' }}
                />

                <TextField
                    margin="normal"
                    defaultValue={state.user.user.user_profile.last_name}
                    required
                    label="Фамилия"
                    name="lastName"
                    id="lastName"
                    onBlur={(event) => {dispatch(setUserProfileLastName(event.target.value))}}
                    style = {{ width: 244 }}
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