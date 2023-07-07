import React from "react"
import Link from "next/link";

import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";

import { themeFooter } from "@/utils/Themes/themes";
import s from "./footer.module.scss";
import { LogoImages } from "@/components/Logo/logo";

const theme = themeFooter;

export function Footer() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Container fixed>
                        <div style={{ textAlign: "center" }}>
                            <div><Link className={s.Link} href="/contact-us">Связаться с нами</Link></div>
                            <div><Link className={s.Link} href="/terms">Правила публикации объявлений</Link></div>
                            <div><Link className={s.Link} href="/how-we-work">Правила бронирования</Link></div>
                            <div><Link className={s.Link} href="/public-contract">Публичный договор</Link></div>
                            <div><Link className={s.Link} href="/payment">Оплата</Link></div>
                        </div>
                    </Container>

                    <Container fixed>
                        <div style={{ textAlign: "center", fontSize: "12px", margin:"10px" }}>
                            <div>
                                ООО «КонтактЛайнСервис»
                            </div>
                            <div>
                                Юридический адрес: РБ, г. Брест, ул. Янки Купалы 100/1, к. 3.
                                Зарегистрировано Администрацией Ленинского района г. Бреста 12.03.2012 г.
                                УНП 291080945
                            </div>

                            <div style={{ marginTop: '4px' }}>
                                Чтобы связаться с администрацией сайта, наберите номер <a href="tel:+375445558775" target="_blank" rel="noreferrer">+375445558775</a> <a href="mailto:info@kvartiranasutki.com" target="_blank" rel="noreferrer">info@kvartiranasutki.com</a>
                            </div>
                            <div>Часы работы: пн—пт, 9:00—18:00 МСК</div>

                            <div style={{ marginTop: '4px' }}>Copyright © 2022–{new Date().getFullYear()} Kvartiranasutki.com™. Все права защищены.</div>
                            <div><LogoImages /></div>
                        </div>
                    </Container>
                </AppBar>
            </ThemeProvider>
        </div>
    )
}


