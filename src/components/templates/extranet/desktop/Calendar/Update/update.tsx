import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import { Stack, Typography } from "@mui/material";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from "@mui/icons-material/Close";

import { dateForRequestFormat, diffDates, rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import { fetchCalculatePrice, fetchPropertyExtranet, fetchClosedBookingDatesExtranet, fetchIcalExtranet, fetchIcalsExtranet } from '@/redux/thunk/property';
import {
    deleteClosedBookingDates,
    setClosedBookingDates,
    updatePrice,
    createIcals,
    deleteIcals
} from "@/api/extranet";
import { BigCalendar } from "./BigCalendar/bigCalendar";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

const CustomizedTextField = styled(TextField)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }

  & .MuiSlider-thumb {
    border-radius: 1px;
  }
  
  .MuiOutlinedInput-input {
    cursor: pointer
  }
`;

export const Update: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [viewWindow, setViewWindow] = useState('main');
    const [error, setError] = useState<any>(false);
    const [isFreeDates, setIsFreeDates] = useState('');
    const [openAlertReject, setOpenAlertReject] = useState(false);
    let { id } = useParams();

    const handleCloseDates = () => {
        setClosedBookingDates(id, dateForRequestFormat(state.property.property.startDate), dateForRequestFormat(state.property.property.endDate))
            .then((res: any) => {
                if (res.status >= 400) {setOpenAlertReject(true); setError('Нельзя закрыть уже закрытые даты')} else window.location.reload()
            })
    }

    const handleOpenDates = () => {
        Promise.all([deleteClosedBookingDates(id, dateForRequestFormat(state.property.property.startDate), dateForRequestFormat(state.property.property.endDate))])
            .then(() => window.location.reload())
    }

    const handleUpdatePrice = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        Promise.all([
            updatePrice(id, dateForRequestFormat(state.property.property.startDate), dateForRequestFormat(state.property.property.endDate), data.get('price')),
            dispatch(fetchCalculatePrice({id: id, start_date: dateForRequestFormat(state.property.property.startDate), end_date: dateForRequestFormat(state.property.property.endDate), guests: {adults: state.property.property.guests, children: 0}})),
        ])
            //.then(() => window.location.reload())
    }

    const handleDeleteIcalLink = (icalId: any) => {
        deleteIcals(icalId)
            .then(() => dispatch(fetchIcalsExtranet(id)))
    }

    const handleAddIcalLink = () => {
        createIcals(id, (document.getElementById('icalLink') as HTMLInputElement).value)
            .then(() => dispatch(fetchIcalExtranet(id)))
    }

    useEffect(() => {
        Promise.all([dispatch(fetchPropertyExtranet(id)), dispatch(fetchIcalsExtranet(id)), dispatch(fetchIcalExtranet(id))])
            .then(() => dispatch(fetchClosedBookingDatesExtranet({id: id, query: ''})))
            .then(
                () => {
                    setIsLoaded(true);
                },
                () => {
                    setError('404');
                    throw new Error('404 Page Not Found');
                }
            )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (error) {
        throw new Error('404 Page Not Found');
    }

    return(
        <div>
            {isLoaded ? (
                <>
                    <Typography variant="h6" gutterBottom>{state.property.property.name}</Typography>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '69%' }}>
                            <BigCalendar setIsFreeDates={(value: any) => setIsFreeDates(value)} />
                        </div>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Stack style={{ width: '30%' }} spacing={2}>
                            {viewWindow === 'main' ?
                                (
                                    <>
                                        <Stack spacing={1} sx={{ pl: 3 }}>
                                            <Typography variant="h6" gutterBottom>{(state.property.property.startDate && state.property.property.endDate) ? rangeStartDateEndDate(state.property.property.startDate, state.property.property.endDate) : 'Выберите даты'}</Typography>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="h6" gutterBottom>Свободно</Typography>
                                                <div>
                                                    <div>
                                                        <IconButton
                                                            sx={{ border: '1px solid black', backgroundColor: +isFreeDates === 0 ? 'black' : 'white', color: +isFreeDates === 0 ? 'white' : 'black' }}
                                                            onClick={handleCloseDates}
                                                            aria-label="fingerprint"
                                                            size="small"
                                                            disabled={!(state.property.property.endDate && state.property.property.startDate)}
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>

                                                        <IconButton
                                                            sx={{ border: '1px solid black', marginRight: '20px', marginLeft: '20px', backgroundColor: +isFreeDates === 1 ? 'black' : 'white', color: +isFreeDates === 1 ? 'white' : 'black' }}
                                                            onClick={handleOpenDates}
                                                            aria-label="fingerprint"
                                                            size="small"
                                                            disabled={!(state.property.property.endDate && state.property.property.startDate)}
                                                        >
                                                            <CheckIcon />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </Stack>
                                        <Divider />
                                        <Stack spacing={1} sx={{ pl: 3 }}>
                                            <div>
                                                <b>Цена</b>
                                                <div>
                                                    <CustomizedTextField
                                                        margin="normal"
                                                        required
                                                        value={
                                                            state.property.property.price.maxPrice && state.property.property.price.minPrice ? (
                                                                state.property.property.price.maxPrice === state.property.property.price.minPrice
                                                                    ? `${state.property.property.price.minPrice} ${state.property.property.currency}`
                                                                    : `${state.property.property.price.minPrice} - ${state.property.property.price.maxPrice} ${state.property.property.currency}`
                                                            ) : ' - '
                                                        }
                                                        name="price"
                                                        label="Цена за день"
                                                        id="price"
                                                        onFocus={() => setViewWindow('price')}
                                                    />
                                                </div>
                                            </div>
                                        </Stack>
                                        <Divider />
                                        <Stack spacing={1} sx={{ pl: 3 }}>
                                            <Typography variant="h6" gutterBottom>Синхронизация календарей</Typography>
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
                                            <div>
                                                <Button
                                                    onClick={() => handleAddIcalLink()}
                                                    variant="contained"
                                                    sx={{ mt: 1 }}
                                                >
                                                    Добавить
                                                </Button>
                                            </div>
                                        </Stack>
                                    </>
                                ) : ''
                            }

                            {viewWindow === 'price' ?
                                (
                                    <>
                                        <Stack spacing={1} sx={{ pl: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <IconButton
                                                sx={{ m: 1 }}
                                                color="inherit"
                                                onClick={() => setViewWindow('main')}
                                                aria-label="close"
                                            >
                                                <CloseIcon />
                                            </IconButton>

                                            <Typography variant="h6" style={{ marginTop: 0 }} sx={{ justifyContent: 'space-around', m: 0 }}>{(state.property.property.startDate && state.property.property.endDate) ? rangeStartDateEndDate(state.property.property.startDate, state.property.property.endDate) : 'Выберите даты'}</Typography>

                                            <div style={{ width: 57.5 }}></div>
                                        </Stack>
                                        <Divider />
                                        <Stack spacing={1} sx={{ pl: 3 }}>
                                            <div>
                                                <b>Цена</b>
                                            </div>
                                            <Box component="form" onSubmit={handleUpdatePrice} sx={{mt: 1}}>
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
                                ) : ''
                            }
                        </Stack>
                    </div>
                </>
            ) : (
                <SimpleLoader />
            )}

            <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={() => setOpenAlertReject(false)}>
                <Alert onClose={() => setOpenAlertReject(false)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    )
}
