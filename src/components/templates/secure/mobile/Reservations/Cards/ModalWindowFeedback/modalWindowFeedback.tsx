import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import TextField from "@mui/material/TextField";

import { createReservationFeedback, updateBooking } from "@/api/secure";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchBookingsSecure } from "@/redux/thunk/booking";

export const ModalWindowFeedback: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [radioState, setRadioState] = useState('Забронировал другое жильё на Kvartiranasutki.com');
    const [checkBoxState, setCheckBoxState] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    });

    const handleChangeCheckbox = (event: any) => {
        setCheckBoxState({
            ...checkBoxState,
            [event.target.name]: event.target.checked ? event.target.value : false,
        });
    };
    const handleChangeRadio = (event: any) => {
        setRadioState(event.target.value);
    };

    const handleReject = () => {
        let body = {
            "feedback": {
                "result": radioState,
                "reasons": Object.values(checkBoxState).filter((reason: any) => !(reason === false || reason === 'no'))
            }
        }

        Promise.all([updateBooking(props.id, 'canceled'), createReservationFeedback(props.id, body)])
            .then(() => dispatch(fetchBookingsSecure()))
            .then(() => props.handleClose())
    }

    return (
        <BottomSheet
            open={props.open}
            onDismiss={() => props.handleClose()}
            blocking={false}
            snapPoints={({maxHeight }) => [
                maxHeight - 80,
            ]}
        >
            <Box sx={{ paddingBottom: '60px' }}>
                <Stack spacing={2}>
                    <Box sx={{ paddingLeft: '40px', paddingRight: '40px' }}>
                        <Typography sx={{ fontWeight: 500 }} variant="h6" component="h2" gutterBottom>Пожалуйста, укажите причину отмены заявки</Typography>
                    </Box>

                    <Box sx={{ paddingLeft: '40px', paddingRight: '40px' }}>
                        <FormControl>
                            {/*<FormLabel id="demo-controlled-radio-buttons-group">Пожалуйста, укажите причину отмены заявки</FormLabel>*/}
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={radioState}
                                onChange={handleChangeRadio}
                            >
                                <FormControlLabel value="Забронировал другое жильё на Kvartiranasutki.com" control={<Radio />} label="Забронировал другое жильё на Kvartiranasutki.com" />
                                <FormControlLabel value="Забронировал жильё на другом сайте" control={<Radio />} label="Забронировал жильё на другом сайте" />
                                <FormControlLabel value="Передумал бронировать вовсе" control={<Radio />} label="Передумал бронировать вовсе" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Divider />
                    <Box sx={{ paddingLeft: '40px', paddingRight: '40px' }}>
                        <Stack
                            spacing={2}
                        >
                            <Typography sx={{ fontWeight: 500 }} variant="h6" component="h2" gutterBottom>Почему</Typography>

                            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                <FormGroup onChange={handleChangeCheckbox}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={checkBoxState['1']} name="1" value="Цена не соответсвует заявленной на сайте" />
                                        }
                                        label="Цена не соответсвует заявленной на сайте"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={checkBoxState['2']} name="2" value="Даты оказались заняты" />
                                        }
                                        label="Даты оказались заняты"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={checkBoxState['3']} name="3" value="Нашёл вариант подешевле" />
                                        }
                                        label="Нашёл вариант подешевле"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={checkBoxState['4']} name="4" value="Хозяин не отвечает на звонки и сообщения" />
                                        }
                                        label="Хозяин не отвечает на звонки и сообщения"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={checkBoxState['5']} name="5" />
                                        }
                                        label="Другое"
                                    />
                                </FormGroup>
                            </FormControl>

                            {checkBoxState['5'] && (
                                <TextField
                                    placeholder="Дополните ответ или укажите другую причину"
                                    multiline
                                    rows={4}
                                    maxRows={10}
                                    name="5"
                                    onBlur={(event) => {
                                        setCheckBoxState({
                                            ...checkBoxState,
                                            [event.target.name]: event.target.value,
                                        });
                                    }}
                                    sx={{
                                        width: '100%',
                                        marginRight: '3px',
                                        '& .MuiOutlinedInput-input': {
                                            padding: '5px',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            '& .css-hdw1oc': {
                                                display: 'none'
                                            },
                                        },
                                    }}
                                />
                            )}
                        </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '40px', paddingRight: '40px' }}>
                        <Button
                            variant="outlined"
                            onClick={() => {handleReject()}}
                            sx={{ width: '48%' }}
                        >
                            Отменить заявку
                        </Button>

                        <Button
                            variant="contained"
                            onClick={props.handleClose}
                            sx={{ width: '48%' }}
                        >
                            Не отменять
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </BottomSheet>
    );
}