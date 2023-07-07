// Core
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ruLocale from 'date-fns/locale/ru';
import { addDays, addMonths } from "date-fns";
import lodash  from 'lodash';

// UI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Popover, Tooltip } from '@mui/material';
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Skeleton } from "antd";

// Tools
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { diffDates } from "@/utils/Helpers/Date/date";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { fetchCalculatePrice } from '@/redux/thunk/property';

export default function DescriptionBlockWithPrice() {
    const [dateArray] = useState<any[]>([]);
    const [priceIsLoaded, setPriceIsLoaded] = useState(false);
    const searchParams = useSearchParams();
    const [adults, setAdults] = useState(searchParams.get('adults') || 1);
    const [children, setChildren] = useState(searchParams.get('children') || 0);
    const [infants, setInfants] = useState( searchParams.get('infants') || 0);
    const [pets, setPets] = useState(searchParams.get('pets') || 0);
    const property = useAppSelector(state => state.property.property);
    const dispatch = useAppDispatch();
    let { id } = useParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        Promise.all([
            dispatch(fetchCalculatePrice({ id: id, start_date: dateForRequestFormat(searchParams.get('start_date')), end_date: dateForRequestFormat(searchParams.get('end_date')), guests: {adults: +adults + +children, children: 0} }))
                .then(() => setPriceIsLoaded(true))
        ])

    }, [adults, children])

    property.closed_booking_dates.forEach(
        (item: any, index: any) => {
            dateArray[index] =  new Date(`${item}T00:00`).getTime();
        }
    )

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const difDates = (searchParams.get('start_date') && searchParams.get('end_date') !== searchParams.get('start_date')) && diffDates(searchParams.get('start_date'), searchParams.get('end_date'))

    const isDisabled = (date: any) => {
        return property.closed_booking_dates.includes(dateForRequestFormat(date));
    };

    return (
        <Card
            sx={{
                boxShadow: 3,
                minWidth: 275,
                position: 'sticky',
                top: '30px',
                left: '30px',
                p: 3
            }}
            style={{ marginTop: '1.5rem' }}
        >
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {
                    (searchParams.get('start_date') && searchParams.get('end_date') !== searchParams.get('start_date'))
                        ?
                            (
                                <div>
                                    {priceIsLoaded ? (
                                        <Typography component="span" variant="h6" color="text.secondary">
                                            {Math.floor((property.price?.total_cost / diffDates(searchParams.get('start_date'), searchParams.get('end_date'))) * 100) / 100 + ' ' + property.currency}
                                        </Typography>
                                    ) : (
                                        <Skeleton.Button style={{ height: '24px' }} active />
                                    )}

                                    <Typography component="span" variant="body1">
                                        &nbsp;/ ночь
                                    </Typography>
                                </div>
                            )
                        :
                            (
                                <Typography component="span" variant="h6" color="text.secondary">
                                    Выберите даты
                                </Typography>
                            )
                }

                {property.moderatedReviews?.data.scoreCount ? (
                    <div style={{ display: 'flex' }}>
                        <div style={{ color: 'white', backgroundColor: '#14a800', fontWeight: 600, width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5.5px', marginLeft: '10px', }}>{Math.floor(+property.moderatedReviews.data.scoreAvg * 10) / 10}</div>
                    </div>
                ) : (
                    ''
                )}
            </Box>
            <Box
                sx={{
                    borderRadius: 1,
                    border: 1,
                    borderColor: "text.secondary",
                    fontSize: '13px',
                    fontWeight: 'bold',
                    mb: 2
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ flex: '1', paddingLeft: '3px' }}>
                        <span>Прибытие</span>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                            <MobileDatePicker
                                //disableToolbar="true"
                                //cancelText={'Отмена'}
                                //okText={'Ок'}
                                toolbarTitle={'Выберите дату'}
                                minDate={new Date()}
                                maxDate={addMonths(new Date(), 15)}
                                value={searchParams.get('start_date') ? new Date(searchParams.get('start_date') || new Date()) : new Date()}
                                onChange={(value: Date | null) => {
                                    if (new Date(value as unknown as string) >= new Date(searchParams.get('end_date') || new Date())) {                                                                         
                                        router.push(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), start_date: dateForRequestFormat(value), end_date: dateForRequestFormat(addDays(value as unknown as Date, 1))}).toString()}`) 
                                    } else {                                                                      
                                        router.push(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), start_date: dateForRequestFormat(value)}).toString()}`)                                     
                                    }

                                    searchParams.get('start_date') && searchParams.get('end_date')
                                        && dispatch(fetchCalculatePrice({
                                            id: id,
                                            start_date: searchParams.get('start_date') || dateForRequestFormat(new Date()),
                                            end_date: searchParams.get('end_date') || dateForRequestFormat(addDays(new Date(), 1)),
                                            guests: {adults: searchParams.get('adults') || 1, children: searchParams.get('children') || 0}   
                                        }));
                                }}
                                shouldDisableDate={isDisabled}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                renderInput={(params: any) => <TextField variant="standard" label='' sx={{ width: '100%' }} {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div style={{ borderLeft: '1px #6b6b6b solid', flex: '1', paddingLeft: '3px' }}>
                        <span>Выезд</span>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                            <MobileDatePicker
                                //disableToolbar="true"
                                value={searchParams.get('end_date') ? new Date(searchParams.get('end_date') || new Date()) : addDays(new Date(), 1)}
                                //cancelText={'Отмена'}
                                //okText={'Ок'}
                                toolbarTitle={'Выберите дату'}
                                minDate={new Date(searchParams.get('start_date') || new Date()) ? addDays(new Date(searchParams.get('start_date') || new Date()), 1) : addDays(new Date(), 1)}
                                maxDate={addMonths(new Date(), 15)}
                                onChange={(newValue: any) => {                                 
                                    router.replace(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), end_date: dateForRequestFormat(newValue)}).toString()}`)                                     

                                    searchParams.get('start_date') && searchParams.get('end_date')
                                        && dispatch(fetchCalculatePrice({
                                            id: id,
                                            start_date: searchParams.get('start_date') || dateForRequestFormat(new Date()),
                                            end_date: searchParams.get('end_date') || dateForRequestFormat(addDays(new Date(), 1)),
                                            guests: {adults: searchParams.get('adults') || 1, children: searchParams.get('children') || 0}    
                                        }));
                                }}
                                shouldDisableDate={isDisabled}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                renderInput={(params: any) => <TextField variant="standard" label='' sx={{ width: '100%' }} {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <Divider sx={{ fontSize: "50px", width: "100%", borderColor: '#6b6b6b' }}/>
                <div style={{ paddingLeft: '3px' }}>
                    <span>Гостей</span>
                    <div>
                        <Button aria-describedby={id} variant="text" sx={{ width: '100%', color: 'black' }} onClick={handleClick}>
                            {+adults + +children + getNoun(+adults + +children, ' гость', ' гостя', ' гостей')}
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            sx={{
                                width: '300px'
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 2 }}>
                                <Stack spacing={1}>
                                    <div style={{ width: '236px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span>Взрослые</span>
                                            <Typography variant="body2" component="div" color="text.secondary">
                                                {"От 13 лет"}
                                            </Typography>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton aria-label="fingerprint" onClick={() => {setAdults(+adults - 1); router.replace(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), adults: +adults - 1 + ''}).toString()}`)}} disabled={+adults === 1}>
                                                <RemoveRoundedIcon />
                                            </IconButton>
                                            <div>{adults}</div>
                                            <IconButton aria-label="fingerprint" onClick={() => {setAdults(+adults + 1); router.replace(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), adults: +adults + 1 + ''}).toString()}`)}} disabled={(+children + +adults) >= property.additional_guests + property.guests}>
                                                <AddRoundedIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span>Дети</span>
                                            <Typography variant="body2" component="div" color="text.secondary">
                                                {"2-12 лет"}
                                            </Typography>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton aria-label="fingerprint" onClick={() => {setChildren(+children - 1); router.replace(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), children: +children - 1 + ''}).toString()}`)}} disabled={+children === 0}>
                                                <RemoveRoundedIcon />
                                            </IconButton>
                                            <div>{children}</div>
                                            <IconButton aria-label="fingerprint" onClick={() => {setChildren(+children + 1); router.replace(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), children: +children + 1 + ''}).toString()}`)}} disabled={(+children + +adults) >= property.additional_guests + property.guests}>
                                                <AddRoundedIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span>Младенцы</span>
                                            <Typography variant="body2" component="div" color="text.secondary">
                                                {"Младше 2 лет"}
                                            </Typography>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton aria-label="fingerprint" onClick={() => {setInfants(+infants - 1); router.replace(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), infants: parseInt(searchParams.get('infants') || '0') - 1 + ''}).toString()}`)}} disabled={+infants === 0}>
                                                <RemoveRoundedIcon />
                                            </IconButton>
                                            <div>{infants}</div>
                                            <IconButton aria-label="fingerprint" onClick={() => {setInfants(+infants + 1); router.replace(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), adults: +adults + 1 + ''}).toString()}`)}}>
                                                <AddRoundedIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>Питомцы</span>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton aria-label="fingerprint" onClick={() => {setPets(+pets - 1); router.replace(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), pets: parseInt(searchParams.get('pets') || '0') - 1 + ''}).toString()}`)}} disabled={+pets === 0}>
                                                <RemoveRoundedIcon />
                                            </IconButton>
                                            <div>{pets}</div>
                                            <IconButton aria-label="fingerprint" onClick={() => {setPets(+pets + 1); router.replace(`${pathname}?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), adults: +adults - 1 + ''}).toString()}`)}}>
                                                <AddRoundedIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </Stack>
                            </Typography>
                        </Popover>
                    </div>
                </div>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: '100%', position: 'relative' }}
                    disabled={!(difDates && (property.rules?.min_stay_days || 0) <= difDates) || property.status !== 'active'}
                    size="large"
                >
                    {property.instant_booking_available === 1 && <Tooltip title="Ваше бронирование будет мгновенно подтверждено. Вам не придётся ожидать подтверждения бронирования от хозяина"><FlashOnRoundedIcon sx={{ zIndex: 1 }} /></Tooltip>}
                    <div>Забронировать</div>
                    <Link style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} className={'Link'} href={`${pathname}/book/create?${new URLSearchParams({...Object.fromEntries(searchParams.entries() || []), adults: parseInt(searchParams.get('adults') || '1') + '', children: parseInt(searchParams.get('children') || '0') + '', infants: parseInt(searchParams.get('infants') || '0') + '', pets: parseInt(searchParams.get('pets') || '0')  + ''}).toString()}`}></Link>
                </Button>
            </Box>
            {property.status !== 'active' && <div style={{ color: 'red', margin: '8px 0 8px 0' }}>Этот объект на данный момент нельзя забронировать. Подберите, пожалуйста, для себя другое жилье.</div>}
            {difDates ? (
                <>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Пока вы ни за что не платите
                        </Typography>
                    </Box>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                        <span style={{ textDecoration: 'underline' }}>
                            {
                                (function(){
                                    let value =
                                        +Math.floor((
                                            property.price?.total_cost / difDates
                                        ) * 100) / 100

                                    return `${value} ${property.currency} x ${difDates} ${getNoun(difDates, 'ночь', 'ночи', 'ночей')}`
                                }())
                            }
                        </span>
                        <span>
                            {(searchParams.get('start_date') && searchParams.get('end_date') !== searchParams.get('start_date'))
                            ? property.price?.total_cost + ' ' + property.currency
                            : ''}
                        </span>
                    </div>

                    {property.rules?.down_payment_amount > 0 && (
                        <div style={{ backgroundColor: '#f6f6f6', marginTop: '16px', padding: '2px', borderRadius: '1px' }}>
                            {`${lodash.round(property.rules.down_payment_amount * property.price?.total_cost / 100, 2)} ${property.currency}`} ({property.rules.down_payment_amount}%) предоплата напрямую хозяину (до заселения)
                        </div>
                    )}

                    {property.rules?.min_stay_days > difDates && (
                        <div style={{ marginTop: '16px', padding: '2px', color: 'red' }}>
                            {`Минимальное количество ночей ${property.rules?.min_stay_days}`}
                        </div>
                    )}
                </>
            ) : ''}
            <Divider sx={{ my: 3 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: "bold" }}>
                <span>Всего</span>
                <span>{difDates
                    ? property.price?.total_cost + ' ' + property.currency
                    : ''}</span>
            </div>
        </Card>
    );
}