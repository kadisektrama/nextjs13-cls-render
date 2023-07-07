'use client'

import React, { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import SearchIcon from "@material-ui/icons/Search";
import { Button, Divider, Popover } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { getNoun } from "@/utils/Helpers/Translator/translator";
import './filter.scss';
import { DateRangePickerFilter } from "@/components/DateRangePicker/dateRangePicker";
import { TUrlParams } from "@/types/other";

export const Filter: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [place] = useState('Брест');
    const [startDate, setStartDate] = useState<any>(searchParams.get('start_date'));
    const [endDate, setEndDate] = useState<any>(searchParams.get('end_date'));
    const [adults, setAdults] = useState<any>(searchParams.get('adults') || 1);
    const [children, setChildren] = useState<any>(searchParams.get('children'));
    const [infants, setInfants] = useState<any>(searchParams.get('infants'));
    const [pets, setPets] = useState<any>(searchParams.get('pets'));

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const search = () => {
        const search = searchParams.toString() ? Object.fromEntries(searchParams.entries() || []) : {}

        let urlParams: TUrlParams = {
            ...search,
            start_date: startDate,
            end_date: endDate,
            adults: adults,
            children: children,
            infants: infants,
            pets: pets,
            page: 1,
        }
        urlParams = Object.fromEntries(Object.entries(urlParams).filter(item => item[1] !== null));
        router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`)  
    }

    return(
        <Box
            //xs="true"
            sx={{
                borderRadius: 1,
                padding: 2,
                border: 1,
                borderColor: "#e7e7e7",
            }}
        >
            <Stack
                spacing={1}
            >
                <Typography component="h2" variant="h6">Найти</Typography>
                <div style={{ paddingTop: '12px' }}>
                    <div>
                        <TextField
                            value={place}
                            label="Место / название объекта"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                                startAdornment:
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                            }}
                        />
                    </div>
                </div>
                <div style={{ paddingTop: '12px' }}>
                    <DateRangePickerFilter
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={(value: any) => setStartDate(value)}
                        setEndDate={(value: any) => setEndDate(value)}
                    />
                </div>
                <div>
                    <TextField
                        label={false}
                        aria-describedby={id}
                        value={+adults + +children + getNoun(+adults + parseInt(children || ''), ' гость',' гостя', ' гостей')}
                        onClick={handleClick}
                        sx={{
                            '& legend': { display: 'none' },
                            '& fieldset': { top: 0 },
                            width: "100%"
                        }}
                    />
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        sx={{
                            width: '300px',
                            borderRadius: '5px',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box sx={{ p: 2 }}>
                            <Stack spacing={1}>
                                <div style={{ width: '236px', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <span>Взрослые</span>
                                        <Typography variant="body2" component="h2" color="text.secondary">
                                            {"От 13 лет"}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setAdults(+adults - 1)} disabled={+adults === 0}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{+adults || 1}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setAdults(+adults + 1)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span>Дети</span>
                                        <Typography variant="body2" component="h2" color="text.secondary">
                                            {"2-12 лет"}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setChildren(+children - 1)} disabled={+children === 0}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{+children}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setChildren(+children + 1)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span>Младенцы</span>
                                        <Typography variant="body2" component="h2" color="text.secondary">
                                            {"Младше 2 лет"}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setInfants(+infants - 1)} disabled={+infants === 0}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{+infants}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setInfants(+infants + 1)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Питомцы</span>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton aria-label="fingerprint" onClick={() => setPets(+pets - 1)} disabled={+pets === 0}>
                                            <RemoveRoundedIcon />
                                        </IconButton>
                                        <div>{+pets}</div>
                                        <IconButton aria-label="fingerprint" onClick={() => setPets(+pets + 1)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </Stack>
                        </Box>
                    </Popover>
                </div>
                <div>
                    {/*<div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={isType}
                                id="flexCheckType"
                                onChange={() => {
                                    setIsType(!isType);
                                }}
                            />
                            <label className="form-check-label" style={{ fontSize: "12px" }} htmlFor="flexCheckType">
                                Дома и апартаменты целиком
                            </label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={isJob}
                                id="flexCheckJob"
                                onChange={() => {
                                    setIsJob(!isJob);
                                }}
                            />
                            <label className="form-check-label" style={{ fontSize: "12px" }} htmlFor="flexCheckJob">
                                Я путешествую по работе
                            </label>
                        </div>
                    </div>*/}
                </div>
                <Button
                    style={{ backgroundColor: '#14a800' }}
                    onClick={search}
                    sx={{ width: "100%" }}
                    variant="contained"
                    size="large"
                >Найти</Button>
            </Stack>
        </Box>
    )
}
