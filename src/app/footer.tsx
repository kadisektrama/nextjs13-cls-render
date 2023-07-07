"use client"

import React from "react"
import PropTypes from 'prop-types';
import Link from 'next/link';

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";

import s from "./footer.module.scss"
import { themeFooter } from "@/utils/Themes/themes";
import { LogoImages } from "@/components/Logo/logo";

const theme = themeFooter;

export function Footer() {

    const Item: React.FC<any> = (props) => {
        const { sx, ...other } = props;
        return (
            <Box
                sx={{
                    p: 1,
                    m: 1,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    ...sx,
                }}
                {...other}
            />
        );
    }

    Item.propTypes = {
        sx: PropTypes.oneOfType([
            PropTypes.arrayOf(
                PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
            ),
            PropTypes.func,
            PropTypes.object,
        ]),
    };

    return(
        <div className="container">
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <div style={{ width: '100%', textDecoration: "none"}}>
                        <Container fixed>
                            <Box
                                sx={{ display: 'flex', p: 1, borderRadius: 1, justifyContent: "space-between" }}
                            >
                                <Item>
                                    <Link className={s.Link} href="/contact-us">Связаться с нами</Link>
                                </Item>
                                <Item>
                                    <Link className={s.Link} href="/terms">Правила публикации объявлений</Link>
                                </Item>
                                <Item>                                
                                    <Link className={s.Link} href="/how-we-work">Правила бронирования</Link>                                    
                                </Item>
                                <Item>
                                    <Link className={s.Link} href="/public-contract">Публичный договор</Link>
                                </Item>
                                <Item>
                                    <Link className={s.Link} href="/payment">Оплата</Link>
                                </Item>
                            </Box>
                        </Container>
                    </div>
                    <br/>
                    <div>
                        <Container fixed>
                            <div style={{ textAlign: "center", fontSize: "12px", margin:"10px" }}>
                                <div style={{ marginBottom: '2px' }}>
                                    ООО «КонтактЛайнСервис»
                                    Юридический адрес: РБ, г. Брест, ул. Янки Купалы 100/1, к. 3.
                                    Зарегистрировано Администрацией Ленинского района г. Бреста 12.03.2012 г.
                                    УНП 291080945
                                </div>
                                <div>
                                    Чтобы связаться с администрацией сайта, наберите номер <a href="tel:+375445558775" target="_blank" rel="noreferrer">+375445558775</a> <a href="mailto:info@kvartiranasutki.com" target="_blank" rel="noreferrer">info@kvartiranasutki.com</a>
                                </div>
                                <div>Часы работы: пн—пт, 9:00—18:00 МСК</div>

                                <div style={{ marginTop: '4px' }}>Copyright © 2022–{new Date().getFullYear()} Kvartiranasutki.com™. Все права защищены.</div>
                                <div><LogoImages /></div>
                            </div>
                        </Container>
                    </div>
                </AppBar>
            </ThemeProvider>
        </div>
    )
}
