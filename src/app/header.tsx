"use client"

// Core
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import Link from "next/link";
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// UI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuMaterial from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Settings from "@mui/icons-material/Settings";
import { ThemeProvider } from "@mui/material/styles";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { fetchUser } from "@/redux/thunk/user";

// Tools
import { themeHeader } from "@/utils/Themes/themes";
import logo from "../../public/logo/logo.png";

const theme = themeHeader;

export function Header() {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const token = useState(Cookies.get('token'))
    const pathname = usePathname()

    useEffect(() => {
        dispatch(fetchUser());
    }, [])

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        fetch(`${process.env.NEXT_PUBLIC_REST_API}/auth/logout`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.${window.location.protocol === 'https:' ? process.env.NEXT_PUBLIC_DOMAIN : process.env.NEXT_PUBLIC_LOCAL_DOMAIN};path=/`;
                    window.location.reload();
                },
                (error) => {
                    console.log(error)
                    document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.${window.location.protocol === 'https:' ? process.env.NEXT_PUBLIC_DOMAIN : process.env.NEXT_PUBLIC_LOCAL_DOMAIN};path=/`;
                    window.location.reload();
                }
            )
    }

    return (
        <nav id="navPanel">
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar component="div" position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Button color="inherit" aria-label="Главная">
                                    <Link
                                        key={"Basic"}
                                        aria-label="Главная"
                                        href={'/'}
                                        style={{ height: '22px' }}
                                    >
                                        <Image src={logo} alt='logo' height={22} />
                                        {/* <img style={{ height: '22px' }} src={logo} alt='' /> */}
                                    </Link>
                                </Button>
                            </Typography>

                            {token ? (
                                <>
                                    {state.user.user?.permissions?.find((item: any) => item.name === 'admin-panel') ? (
                                        <Link href={'/admin/dashboard'}>
                                            <Button  sx={{ color: '#000000' }}
                                                     color="inherit"
                                                     key={"admin"}
                                                     >
                                                Административная панель
                                            </Button>
                                        </Link>
                                    ) : ''}
                                    <Link href={state.user.user?.permissions?.find((item: any) => item.name === 'extranet')
                                                ? "/host/today"
                                                : "/host/properties/create"
                                        }
                                    >
                                        <Button sx={{ color: '#000000' }}
                                                 color="inherit"
                                                 key={"host"}
                                                 >
                                            К приёму гостей
                                        </Button>
                                    </Link>
                                    {!pathname.includes('host') ? (
                                        (
                                            <div>
                                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                                    <Tooltip title="Account settings">
                                                        <IconButton
                                                            onClick={handleClick}
                                                            size="small"
                                                            sx={{ ml: 2 }}
                                                            aria-controls={open ? 'Account-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                        >
                                                            <Avatar sx={{ width: 32, height: 32 }} src={state.user.user.user_profile?.photo?.url}>{state.user.user.user_profile?.first_name?.at(0)}</Avatar>
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                                <MenuMaterial
                                                    anchorEl={anchorEl}
                                                    id="account-menu"
                                                    open={open}
                                                    onClose={handleClose}
                                                    onClick={handleClose}
                                                    PaperProps={{
                                                        elevation: 0,
                                                        sx: {
                                                            overflow: 'visible',
                                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                            mt: 1.5,
                                                            '& .MuiAvatar-root': {
                                                                width: 32,
                                                                height: 32,
                                                                ml: -0.5,
                                                                mr: 1,
                                                            },
                                                            '&:before': {
                                                                content: '""',
                                                                display: 'block',
                                                                position: 'absolute',
                                                                top: 0,
                                                                right: 14,
                                                                width: 10,
                                                                height: 10,
                                                                bgColor: 'background.paper',
                                                                transform: 'translateY(-50%) rotate(45deg)',
                                                                zIndex: 0,
                                                            },
                                                        },
                                                    }}
                                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                >
                                                    <MenuItem>
                                                        <Link
                                                            style={{
                                                                position: "absolute",
                                                                top: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                left: 0
                                                            }}
                                                            href="/guest/inbox"
                                                        />
                                                        Сообщения
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Link
                                                            style={{
                                                                position: "absolute",
                                                                top: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                left: 0
                                                            }}
                                                            href="/guest/wishlists"
                                                        />
                                                        Избранные
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Link
                                                            style={{
                                                                position: "absolute",
                                                                top: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                left: 0
                                                            }}
                                                            href="/guest/reservations"
                                                        />
                                                        Бронирования
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Link
                                                            style={{
                                                                position: "absolute",
                                                                top: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                left: 0
                                                            }}
                                                            href="/guest/progress/reviews"
                                                        />
                                                        Отзывы
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Link
                                                            style={{
                                                                position: "absolute",
                                                                top: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                left: 0
                                                            }}
                                                            href="/guest/account-settings"
                                                        />
                                                        Аккаунт
                                                    </MenuItem>
                                                    <Divider />
                                                    <MenuItem onClick={handleLogout}>
                                                        <ListItemIcon>
                                                            <Logout fontSize="small" />
                                                        </ListItemIcon>
                                                        Выйти
                                                    </MenuItem>
                                                </MenuMaterial>
                                            </div>
                                        )
                                    ) : (
                                        <div>
                                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                                <Tooltip title="Account settings">
                                                    <IconButton
                                                        onClick={handleClick}
                                                        size="small"
                                                        sx={{ ml: 2 }}
                                                        aria-controls={open ? 'Account-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                    >
                                                        <Avatar sx={{ width: 32, height: 32 }} src={state.user.user.user_profile?.photo?.url}>{state.user.user.user_profile?.first_name?.at(0)}</Avatar>
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                            <MenuMaterial
                                                anchorEl={anchorEl}
                                                id="account-menu"
                                                open={open}
                                                onClose={handleClose}
                                                onClick={handleClose}
                                                PaperProps={{
                                                    elevation: 0,
                                                    sx: {
                                                        overflow: 'visible',
                                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                        mt: 1.5,
                                                        '& .MuiAvatar-root': {
                                                            width: 32,
                                                            height: 32,
                                                            ml: -0.5,
                                                            mr: 1,
                                                        },
                                                        '&:before': {
                                                            content: '""',
                                                            display: 'block',
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 14,
                                                            width: 10,
                                                            height: 10,
                                                            bgcolor: 'background.paper',
                                                            transform: 'translateY(-50%) rotate(45deg)',
                                                            zIndex: 0,
                                                        },
                                                    },
                                                }}
                                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                            >
                                                <MenuItem>
                                                    <ListItemIcon>
                                                        <ArrowCircleUpIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <Link style={{ color: "black" }} href="/host/booking-request/all">Запросы</Link>
                                                </MenuItem>
                                                <MenuItem>
                                                    <ListItemIcon>
                                                        <RateReviewOutlinedIcon />
                                                    </ListItemIcon>
                                                    <Link style={{ color: "black" }} href="/host/progress/reviews">Отзывы</Link>
                                                </MenuItem>
                                                <MenuItem>
                                                    <ListItemIcon>
                                                        <Settings fontSize="small" />
                                                    </ListItemIcon>
                                                    <Link style={{ color: "black" }} href="/host/account-settings">Аккаунт</Link>
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem onClick={handleLogout}>
                                                    <ListItemIcon>
                                                        <Logout fontSize="small" />
                                                    </ListItemIcon>
                                                    Выйти
                                                </MenuItem>
                                            </MenuMaterial>
                                        </div>
                                    )}
                                    
                                </>
                            ) : (
                                <div>
                                    <Link href={'login'}>
                                        <Button  sx={{ color: '#000000' }}
                                                 key={"Account4"}
                                                 >
                                            Зарегистрироваться
                                        </Button>
                                    </Link>
                                    <Link href={'login'}>
                                        <Button  sx={{ color: '#000000' }}
                                                 key={"Account5"}
                                                 >
                                            Войти в аккаунт
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
        </nav>
    )
}
