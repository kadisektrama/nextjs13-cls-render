// Core
import React from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

// UI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

// Tools
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { useAppSelector } from "@/redux/hooks/hooks";

export const Profile: React.FC = () => {
    const router = useRouter()
    const state = useAppSelector(state => state)

    const handleLogout = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        };

        fetch(`${process.env.REACT_APP_REST_API}/auth/logout`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.${window.location.protocol === 'https:' ? process.env.REACT_APP_DOMAIN : process.env.REACT_APP_LOCAL_DOMAIN};path=/`;
                    window.location = (window.location.protocol === 'https:' ? process.env.REACT_APP_BASIC : process.env.REACT_APP_LOCAL_BASIC) as unknown as Location;
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <AccountHeader name={'Профиль'}>
            <Stack
                sx={{ pt: 2, paddingBottom: '70px', paddingRight: '15px', paddingLeft: '15px' }}
                direction="column"
                justifyContent="center"
                alignItems="baseline"
                spacing={2}
            >
                <Avatar src={state.user.user.user_profile.photo?.url}>{state.user.user.user_profile.first_name[0]}</Avatar>
                <Typography component="div" variant="h5">{state.user.user.user_profile.first_name}</Typography>
                {/*<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', width: '100%'}}>
                    <div style={{display: "flex"}}>
                        <AccountCircleOutlinedIcon style={{marginRight: '10px'}}/>
                        <span>Личная информация</span>
                    </div>
                    <KeyboardArrowRightOutlinedIcon />
                </div>*/}
                <div style={{ position: 'relative', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                        <div style={{ display: "flex" }}>
                            <SettingsApplicationsOutlinedIcon style={{ marginRight: '10px' }} />
                            <span>Аккаунт</span>
                        </div>
                        <KeyboardArrowRightOutlinedIcon />
                    </div>
                    <Link style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} className={'Link'} href={`/guest/account-settings`}></Link>
                </div>
                <div style={{ position: 'relative', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                        <div style={{ display: "flex" }}>
                            <RateReviewOutlinedIcon style={{ marginRight: '10px' }} />
                            <span>Отзывы</span>
                        </div>
                        <KeyboardArrowRightOutlinedIcon />
                    </div>
                    <Link style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} className={'Link'} href={`/guest/progress/reviews`}></Link>
                </div>
                <div style={{ width: '100%', height: 1, backgroundColor: "#e7e7e7" }}></div>
                <Typography component="div" style={{ fontSize: '22px !important', lineHeight: '26px', fontWeight: 600 }}>Прием гостей</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', width: '100%' }}
                     onClick={() => router.push(state.user.user.permissions.find((item: any) => item.name === 'extranet')
                         ? "/host/today/leaving"
                         : "/host/properties/create"
                     )}
                >
                    <div style={{ display: "flex" }}>
                        <CalendarMonthOutlinedIcon style={{ marginRight: '10px' }}/>
                        <span>Управление объявлениями</span>
                    </div>
                    <KeyboardArrowRightOutlinedIcon />
                </div>
                <div style={{ width: '100%', height: 1, backgroundColor: "#e7e7e7" }}></div>
                {/*<div style={{fontSize: '22px !important', lineHeight: '26px', fontWeight: 600}}>Поддержка</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', width: '100%'}}>
                    <div style={{display: "flex"}}>
                        <HelpOutlineOutlinedIcon style={{marginRight: '10px'}}/>
                        <span>Помощь</span>
                    </div>
                    <KeyboardArrowRightOutlinedIcon />
                </div>
                <div style={{ width: '100%', height: 1, backgroundColor: "#e7e7e7" }}></div>*/}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Button onClick={handleLogout} variant="outlined" sx={{ width: '70%' }}>Выйти</Button>
                </div>
                {/*<div>Помощь и поддержка</div>*/}
                <div style={{ fontSize: "12px", margin:"10px" }}>© 2022–{new Date().getFullYear()} Kvartiranasutki.com™. Все права защищены.</div>
            </Stack>
        </AccountHeader>
    );
}
