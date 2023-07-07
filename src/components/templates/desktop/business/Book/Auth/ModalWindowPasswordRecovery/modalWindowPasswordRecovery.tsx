import { useRouter } from 'next/navigation';
import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

import { getUserExists } from "@/api/commonApi";
import { recoveryPassword } from "@/api/basicApi";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { setIsRecoveryPassword, setIsAccessToRedirect } from "@/redux/slices/internalSystem";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 430,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
    p: 3,
};

export const ModalWindowPasswordRecovery: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [error, setError] = useState(false)
    const router = useRouter()

    async function handleSubmit(event: any) {
        event.preventDefault();

        let user = await getUserExists(props.mail);
        if (user.available_to_login) {
            recoveryPassword(props.mail)
                .then((res) => {
                    if (res.status > 400) {
                        setError(true);
                    } else {
                        dispatch(setIsRecoveryPassword(true))
                        dispatch(setIsAccessToRedirect(true))
                    }
                })
        } else {
            console.log('Incorrect login')
            setError(true);
        }
    };

    return (
        <>
            {state.internalSystem.isAccessToRedirect && router.push('/')}

            <Modal
                open={props.open}
                onClose={() => props.setOpenModalWindow('')}
            >
                <Box
                    sx={style}
                >
                    <Typography component="div" variant="h5" gutterBottom>
                        Поменять пароль
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Введите адрес своей электронной почты, связанной с аккаунтом на kvartiranasutki.com, и мы вышлем вам ссылку для изменения пароля.
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            id="user[email]"
                            name="user[email]"
                            margin="normal"
                            type="email"
                            required
                            fullWidth
                            label="Электронная почта"
                            error={error}
                            helperText={error ? "Такой адрес электронной почты в системе не зарегистрирован. Возможно, вы использовали другой или неправильный адрес при регистрации." : ''}
                            autoComplete="user[email]"
                            onChange={(event) => {
                                props.setMail(event.target.value)
                            }}
                        />
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Продолжить
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

