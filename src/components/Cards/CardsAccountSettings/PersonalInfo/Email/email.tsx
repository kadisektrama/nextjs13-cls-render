import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { updateUserEmail } from "@/api/commonApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUser } from "@/redux/thunk/user";

export const Email: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        let body = {
            email: (document.getElementById('email') as HTMLInputElement).value
        };

        updateUserEmail(body)
            .then(() => dispatch(fetchUser()))
            .then(res => {
                props.handleClose()
            })
    };

    return(
        <>
            <div style={{ display: 'flex' }}>
                <TextField
                    margin="normal"
                    defaultValue={state.user.user.email}
                    required
                    label="Электронная почта"
                    name="email"
                    id="email"
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