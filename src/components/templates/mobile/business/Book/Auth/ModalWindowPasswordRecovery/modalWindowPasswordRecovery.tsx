import { useRouter } from "next/navigation";
import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { BottomSheet } from "react-spring-bottom-sheet";

import { getUserExists } from "@/api/commonApi";
import { recoveryPassword } from "@/api/basicApi";
import { Router } from "next/router";
import { useAppSelector } from "@/redux/hooks/hooks";

export const ModalWindowPasswordRecovery: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const router = useRouter()
    const [error, setError] = React.useState(false)

    async function handleSubmit(event: any) {
        event.preventDefault();

        let user = await getUserExists(props.mail);
        if (user.available_to_login) {
            recoveryPassword(props.mail)
                .then((res) => {
                    if (res.status > 400) {
                        setError(true);
                    } else {
                        props.internalSystemActions.setIsRecoveryPassword(true)
                        props.internalSystemActions.setIsAccessToRedirect(true)
                    }
                })
        } else {
            setError(true);
        }
    };

    return (
        <>
            {state.internalSystem.isAccessToRedirect && router.push('/')}

            <BottomSheet
                open={props.open}
                onDismiss={() => props.setOpenModalWindow('')}
                blocking={false}
                snapPoints={({maxHeight }) => [
                    maxHeight - 120,
                ]}
            >
                <Box sx={{ m: 3 }}>
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
            </BottomSheet>
        </>
    )
}

