import React from "react"
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import Paper from '@mui/material/Paper';

export const Menu: React.FC = () => {
    const router = useRouter()
    const pathname = usePathname()
    const token = React.useState(Cookies.get('token'))

    return(
        <Paper
            id="bottom-nav"
            sx={{
                zIndex: 5,
                position: 'fixed !important',
                bottom: 0,
                left: 0,
                right: 0,
            }}
            elevation={3}
        >
                {!token && (
                    <BottomNavigation showLabels value={'search'}>
                        <BottomNavigationAction
                            sx={{ minWidth: '60px', padding: 0 }}
                            label={<div style={{ fontSize: '11px' }}>Поиск</div>}
                            value="search"
                            onClick={() => router.push('/')}
                            icon={<SearchIcon />}
                        />
                        <BottomNavigationAction
                            sx={{ minWidth: '60px', padding: 0 }}
                            label={<div style={{ fontSize: '11px' }}>Войти</div>}
                            value="sign-in"
                            onClick={() => router.push(`${pathname}/login`)}
                            icon={<AccountCircleIcon />}
                        />
                    </BottomNavigation>
                )}
                
                {token && (
                    <>
                        {pathname.split('/')[1] === 'host' && (
                            
                            <BottomNavigation
                                showLabels
                                sx={{ fontSize: '11px' }}
                                value={pathname.split('/')[2]}
                            >
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Сегодня</div>}
                                    value="today"
                                    onClick={() => router.push(`/host/today`)}
                                    icon={<TodayIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Входящие</div>}
                                    value="inbox"
                                    onClick={() => router.push(`/host/inbox`)}
                                    icon={<ChatIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Календарь</div>}
                                    value="calendar"
                                    onClick={() => router.push(`/host/calendar`)}
                                    icon={<CalendarMonthIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Объявления</div>}
                                    value="properties"
                                    onClick={() => router.push(`/host/properties`)}
                                    icon={<LocalTaxiIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Профиль</div>}
                                    value="profile"
                                    onClick={() => router.push(`/host/profile`)}
                                    icon={<DehazeOutlinedIcon />}
                                />
                            </BottomNavigation>
                        )}
                        {/* {pathname.split('/')[1] === 'guest' && (
                            <BottomNavigation showLabels value={pathname.split('/')[2]}>
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Поиск</div>}
                                    value="search"
                                    onClick={() => router.push('/')}
                                    icon={<SearchIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Избранные</div>}
                                    value="wishlists"
                                    onClick={() => router.push(`/guest/wishlists`)}
                                    icon={<FavoriteIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Поездки</div>}
                                    value="reservations"
                                    onClick={() => router.push(`/guest/reservations`)}
                                    icon={<LocalTaxiIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Входящие</div>}
                                    value="inbox"
                                    onClick={() => router.push(`/guest/inbox`)}
                                    icon={<MailIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Профиль</div>}
                                    value="profile"
                                    onClick={() => router.push(`/guest/profile`)}
                                    icon={<AccountCircleIcon />}
                                />
                            </BottomNavigation>
                        )} */}
                        {(pathname.split('/')[1] !== 'host') && (
                            <BottomNavigation showLabels sx={{ fontSize: '11px' }} value={'search'}>
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Поиск</div>}
                                    value="search"
                                    onClick={() => router.push('/')}
                                    icon={<SearchIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Избранные</div>}
                                    value="wishlists"
                                    onClick={() => router.push(`/guest/wishlists`)}
                                    icon={<FavoriteIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Поездки</div>}
                                    value="reservations"
                                    onClick={() => router.push(`/guest/reservations`)}
                                    icon={<LocalTaxiIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Входящие</div>}
                                    value="inbox"
                                    onClick={() => router.push(`/guest/inbox`)}
                                    icon={<MailIcon />}
                                />
                                <BottomNavigationAction
                                    sx={{ minWidth: '60px', padding: 0 }}
                                    label={<div style={{ fontSize: '11px' }}>Профиль</div>}
                                    value="profile"
                                    onClick={() => router.push(`/guest/profile`)}
                                    icon={<AccountCircleIcon />}
                                />
                            </BottomNavigation>                    
                        )}
                    </>
                )}
        </Paper>
    )
}