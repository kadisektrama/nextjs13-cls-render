import 'react-spring-bottom-sheet/dist/style.css';
import { useState } from 'react';
import { useParams } from "next/navigation";
import { addDays } from "date-fns";
import ruLocale from 'date-fns/locale/ru';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { Typography, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import {
    createIcals,
    deleteClosedBookingDates,
    deleteIcals,
    setClosedBookingDates,
    updatePrice
} from "@/api/extranet";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { fetchCalculatePrice, fetchIcalsExtranet } from "@/redux/thunk/property";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

export const Filters: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [radioButtonState, setRadioButtonState] = useState('price');
    const [error, setError] = useState<any>(false);
    const [openAlertReject, setOpenAlertReject] = useState(false);
    let { id } = useParams();

    const handleChangeRadioButton = (event: any) => {
        setRadioButtonState(event.target.value);
    };

    const handleCloseDates = () => {
        setClosedBookingDates(id, dateForRequestFormat(state.property.property.startDate), dateForRequestFormat(addDays(state.property.property.endDate, 1)))
            .then(() => window.location.reload())
            .catch(e => {
                setOpenAlertReject(true); 
                setError('Нельзя закрыть уже закрытые даты')
            })
    }

    const handleOpenDates = () => {
        Promise.all([deleteClosedBookingDates(id, dateForRequestFormat(state.property.property.startDate), dateForRequestFormat(addDays(state.property.property.endDate, 1)))])
            .then(() => window.location.reload())
            .catch(e => {
                setOpenAlertReject(true); 
                setError('Нельзя открыть уже открытые даты')
            })
    }

    const handleUpdatePrice = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        Promise.all([
            updatePrice(id, dateForRequestFormat(state.property.property.startDate), dateForRequestFormat(addDays(state.property.property.endDate, 1)), data.get('price')),
        ])
            .then(() => dispatch(fetchCalculatePrice({id: id, start_date: dateForRequestFormat(dateForRequestFormat(state.property.property.startDate)), end_date: dateForRequestFormat(addDays(state.property.property.endDate, 2)), guests: {adults: state.property.property.guests, children: 0}})))
            .then(() => props.setWindowScreen(''))
    }

    const handleDeleteIcalLink = (icalId: any) => {
        deleteIcals(icalId)
            .then(() => dispatch(fetchIcalsExtranet(id)))
    }

    const handleAddIcalLink = () => {
        createIcals(id, (document.getElementById('icalLink') as HTMLInputElement).value)
            .then(() => dispatch(fetchIcalsExtranet(id)))
    }

    return (
        <>
            <Stack spacing={1} sx={{ paddingBottom: '60px', paddingTop: '20px' }}>
                <>
                    <Stack spacing={1} sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <IconButton onClick={() => props.setWindowScreen('')}>
                                <ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} />
                            </IconButton>
                            <Typography variant="h6" gutterBottom>Выбранные даты</Typography>
                            <div style={{ width: '37.25px' }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ paddingTop: '12px', width: '48%' }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                                    <Stack spacing={3}>
                                        <MobileDatePicker
                                            //label="For mobile"
                                            value={state.property.property.startDate}
                                            onChange={(newValue) => {
                                                console.log(newValue)
                                                props.propertyActions.setCalendarDate({'startDate': newValue, 'endDate': props.property.endDate})
                                            }}
                                            //fullWidth
                                            renderInput={(params) =>
                                                <TextField
                                                    sx={{
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            '& .css-hdw1oc': {
                                                                display: 'none'
                                                            },
                                                        },
                                                    }}
                                                    {...params}
                                                />
                                            }
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </div>
                            <div style={{ paddingTop: '12px', width: '48%' }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                                    <Stack spacing={3}>
                                        <MobileDatePicker
                                            //label="For mobile"
                                            value={state.property.property.endDate}
                                            onChange={(newValue) => {
                                                console.log(newValue)
                                                props.propertyActions.setCalendarDate({'startDate': props.property.startDate, 'endDate': newValue})
                                            }}
                                            //fullWidth
                                            renderInput={(params) =>
                                                <TextField
                                                    sx={{
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            '& .css-hdw1oc': {
                                                                display: 'none'
                                                            },
                                                        },
                                                    }}
                                                    {...params}
                                                />
                                            }
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </div>
                        </div>
                    </Stack>
                    <Divider />
                    <Stack spacing={1} sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
                        <div>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Действие с датами:</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    onChange={handleChangeRadioButton}
                                >
                                    <FormControlLabel value="price" checked={radioButtonState === 'price'} control={<Radio />} label="Установить цены" />
                                    <FormControlLabel value="date" checked={radioButtonState === 'date'} control={<Radio />} label="Закрыть/открыть для бронирования" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div>
                            {radioButtonState === 'price' && (
                                <>
                                    <Stack spacing={1}>
                                        <div>
                                            <b>Цена</b>
                                        </div>
                                        <Box component="form" onSubmit={handleUpdatePrice} sx={{ mt: 1 }}>
                                            <div>
                                                <div>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        type="number"
                                                        placeholder={
                                                            state.property.property.price.maxPrice && state.property.property.price.minPrice ? (
                                                                state.property.property.price.maxPrice === state.property.property.price.minPrice
                                                                    ? `${state.property.property.price.minPrice} ${state.property.property.currency}`
                                                                    : `${state.property.property.price.minPrice} - ${state.property.property.price.maxPrice} ${state.property.property.currency}`
                                                            ) : ' - '
                                                        }
                                                        name="price"
                                                        label="Цена за день"
                                                        id="price"
                                                    />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    disabled={!(state.property.property.endDate && state.property.property.startDate)}
                                                    sx={{ mt: 1 }}
                                                >
                                                    Назначить цену
                                                </Button>
                                            </div>
                                        </Box>
                                    </Stack>
                                </>
                            )}

                            {radioButtonState === 'date' && (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ width: '48%' }}>
                                            <Button
                                                onClick={() => handleOpenDates()}
                                                variant="contained"
                                                fullWidth
                                                sx={{ mt: 1 }}
                                            >
                                                Открыть
                                            </Button>
                                        </div>
                                        <div style={{ width: '48%' }}>
                                            <Button
                                                onClick={() => handleCloseDates()}
                                                variant="contained"
                                                fullWidth
                                                sx={{ mt: 1 }}
                                            >
                                                Закрыть
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Stack>


                    <Divider />
                    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                        <Typography variant="h6" gutterBottom>Синхронизация календарей</Typography>
                        <b>Ваша ссылка:</b>
                        <div>
                            <TextField
                                margin="normal"
                                value={state.property.property.ical}
                                name="link"
                                label="Ваша ссылка"
                                id="link"
                            />
                        </div>
                        <b>Ссылки:</b>
                        {state.property.property.icals === undefined
                            ? 'Пусто'
                            : (
                                <>
                                    {state.property.property.icals.map((ical: any) =>
                                        <div key={ical.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e7e5e554', padding: '4px', borderRadius: '8px' }}>
                                            <div style={{ wordBreak: 'break-word' }}>
                                                {ical.link}
                                            </div>
                                            <IconButton
                                                onClick={() => handleDeleteIcalLink(ical.id)}
                                                aria-label="fingerprint"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    )}
                                </>
                            )
                        }

                        <div>
                            <TextField
                                margin="normal"
                                name="icalLink"
                                label="Ссылка"
                                id="icalLink"
                            />
                        </div>

                        <div style={{ width: '59%' }}>
                            <Button
                                onClick={() => handleAddIcalLink()}
                                variant="contained"
                                fullWidth
                                sx={{ mt: 1 }}
                            >
                                Добавить
                            </Button>
                        </div>
                    </div>
                </>
            </Stack>

            <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={() => setOpenAlertReject(false)}>
                <Alert onClose={() => setOpenAlertReject(false)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}