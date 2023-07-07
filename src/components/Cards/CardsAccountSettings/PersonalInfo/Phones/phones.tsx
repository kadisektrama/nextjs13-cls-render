import { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Alert from '@mui/material/Alert';

import {
    addUserPhone,
    deleteUserPhone,
    sendVerifyCode,
    updateUserPhone
} from "@/api/commonApi";
import { fetchUserPhones } from "@/redux/thunk/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

export const Phones: React.FC<any> = (props) => {
    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const [showFormArea, setShowFormArea] = useState(state.user.user.user.phones.length === 0);
    const [showInputArea, setShowInputArea] = useState(true);
    const [showChangeFormArea, setShowChangeFormArea] = useState(false);
    const [showChangeInputArea, setShowChangeInputArea] = useState(true);
    const [error, setError] = useState('');

    const handleDeleteUserPhone = (phoneId: any) => {
        deleteUserPhone(phoneId)
            .then(() => dispatch(fetchUserPhones()))
    }

    const handleSendVerifyCode = () => {
        let body = {
            country_calling_code: props.countryCallingCode,
            phone: props.phone.substring(props.countryCallingCode.length),
        };

        sendVerifyCode(body)
            .then(() => setShowInputArea(false))
    }

    const handleSendVerifyCodeOnChange = () => {
        let body = {
            country_calling_code: props.countryCallingCode,
            phone: props.phone.substring(props.countryCallingCode.length),
        };

        sendVerifyCode(body)
            .then(() => setShowChangeInputArea(false))
    }

    const handleAddPhone = () => {
        let body = {
            country_calling_code: props.countryCallingCode,
            phone: props.phone.substring(props.countryCallingCode.length),
            verify_code: (document.getElementById('code') as HTMLInputElement)?.value,
        };

        addUserPhone(body)
            .then((res) => dispatch(fetchUserPhones()))
            .then(() => setShowFormArea(false))
            .catch(err => {
                setError(err.message)
            })
    }

    const handleUpdatePhone = (id: any) => {
        let body = {
            country_calling_code: props.countryCallingCode,
            phone: props.phone.substring(props.countryCallingCode.length),
            verify_code: (document.getElementById('code') as HTMLInputElement)?.value,
        };

        updateUserPhone(id, body)
            .then(() => dispatch(fetchUserPhones()))
            .then(() => setShowChangeFormArea(false))
    }

    return(
        <>
            <div>
                {state.user.user.phones.length === 1 ?
                    (
                        <div>
                            {
                                state.user.user.phones.map((phone: any) => (
                                    <div key={phone.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>{phone.phone}</div>
                                        {showChangeFormArea === false ? <Button sx={{ color: 'black', textTransform: 'none' }} variant="text" onClick={() => {setShowChangeFormArea(true); setShowFormArea(false)}}>Редактировать</Button> : ''}
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div>
                            {
                                state.user.user.phones.map((phone: any) => (
                                    <div key={phone.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <div>{phone.phone}</div>
                                        <Button sx={{ color: 'black', textTransform: 'none' }} variant="text" onClick={() => handleDeleteUserPhone(phone.id)}>Удалить</Button>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <Typography sx={{ marginTop: 0.7 }} variant="body2" color="text.secondary" gutterBottom>
                Контактный телефон (для связи с Kvartiranasutki и гостями, подтвердившими бронирование). Также можно добавить в аккаунт другие номера и указать их назначение.
            </Typography>
            {showChangeFormArea ? (
                showChangeInputArea === false ? (
                    <div>
                        <div>Введите код безопасности</div>
                        <div>Введите 3-значный код Kvartiranasutki, высланный на {`${props.phone}`}</div>
                        <div>
                            <TextField
                                margin="normal"
                                type="number"
                                required
                                name="code"
                                label="Код"
                                id="code"
                                autoComplete="off"
                                style = {{ width: 244 }}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => handleUpdatePhone(state.user.user.phones[0].id)}
                            >
                                Продолжить
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Typography variant="body2" gutterBottom>
                                <div>Добавить другой номер</div>
                            </Typography>
                            <Button sx={{ color: 'black', textTransform: 'none' }} variant="text" onClick={() => setShowChangeFormArea(false)}>Отмена</Button>
                        </div>

                        <div>
                            <TextField
                                margin="normal"
                                select
                                required
                                defaultValue={state.countryRegister.countryRegisters.findIndex((register: any) => register.country_calling_code === props.geoData?.country_calling_code)}
                                label="Страна/регион"
                                id="country_register"
                                name="country_register"
                                autoComplete="off"
                                onChange={(event) => {
                                    props.setCountryCallingCode(state.countryRegister.countryRegisters[event.target.value].country_calling_code);
                                    props.setPhone(state.countryRegister.countryRegisters[event.target.value].country_calling_code)
                                }}
                                style = {{ width: 244 }}
                            >
                                {state.countryRegister.countryRegisters.map((option: any, index: any) => (
                                    <MenuItem key={index} value={index}>
                                        {option.country_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div>
                            <TextField
                                margin="normal"
                                type="tel"
                                required
                                value={props.phone}
                                name="phone"
                                label="Номер телефона"
                                id="phone"
                                autoComplete="off"
                                onChange={(event) => {
                                    if (event.target.value.toString().startsWith(props.countryCallingCode.toString())) {props.setPhone(event.target.value)}
                                }}
                                style = {{ width: 244 }}
                            />
                        </div>
                        <Typography variant="body2" gutterBottom>
                            Мы отправим вам код для подтверждения номера. Может взиматься плата по тарифному плану вашего мобильного оператора.
                        </Typography>

                        <div>
                            <Button
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => handleSendVerifyCodeOnChange()}
                            >
                                Подтвердить
                            </Button>
                        </div>
                    </Box>
                )
            ) : (
                showFormArea ? (
                    <>
                        {showInputArea ? (
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography variant="body2" gutterBottom>
                                    Введите новый номер телефона
                                </Typography>
                                <div>
                                    <TextField
                                        margin="normal"
                                        select
                                        required
                                        defaultValue={state.countryRegister.countryRegisters.findIndex((register: any) => register.country_calling_code === props.geoData?.country_calling_code)}
                                        label="Страна/регион"
                                        id="country_register"
                                        name="country_register"
                                        autoComplete="off"
                                        onChange={(event) => {
                                            props.setCountryCallingCode(state.countryRegister.countryRegisters[event.target.value].country_calling_code);
                                            props.setPhone(state.countryRegister.countryRegisters[event.target.value].country_calling_code)
                                        }}
                                        style = {{ width: 244 }}
                                    >
                                        {state.countryRegister.countryRegisters.map((option: any, index: any) => (
                                            <MenuItem key={index} value={index}>
                                                {option.country_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div>
                                    <TextField
                                        margin="normal"
                                        type="tel"
                                        required
                                        value={props.phone}
                                        name="phone"
                                        label="Номер телефона"
                                        id="phone"
                                        autoComplete="off"
                                        onChange={(event) => {
                                            if (event.target.value.toString().startsWith(props.countryCallingCode.toString())) {props.setPhone(event.target.value)}
                                        }}
                                        style = {{ width: 244 }}
                                    />
                                </div>
                                {/*<Typography variant="body2" gutterBottom>
                                    Мы отправим вам код для подтверждения номера. Может взиматься плата по тарифному плану вашего мобильного оператора.
                                </Typography>*/}

                                <div>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => handleSendVerifyCode()}
                                    >
                                        Подтвердить
                                    </Button>
                                </div>
                            </Box>
                        ) : (
                            <div>
                                <div>Введите код безопасности</div>
                                <div>Введите 3-значный код Kvartiranasutki, высланный на {`${props.phone}`}</div>
                                <div>
                                    <TextField
                                        margin="normal"
                                        type="number"
                                        required
                                        name="code"
                                        label="Код"
                                        id="code"
                                        autoComplete="off"
                                        style = {{ width: 244 }}
                                    />
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => handleAddPhone()}
                                    >
                                        Продолжить
                                    </Button>
                                    {error && <Alert severity="error">{error}</Alert>}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <Button sx={{ marginTop: 2 }} variant="outlined" onClick={() => setShowFormArea(true)}>Добавить другой номер</Button>
                )
            )}
        </>
    )
}