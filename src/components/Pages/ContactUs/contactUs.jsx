import React from "react"

import viber from "../../../../Img/viber.png";
import telegram from "../../../../Img/telegram.png";
import whatsapp from "../../../../Img/whatsapp.png";

import Container from "@mui/material/Container";
import { Stack } from "@mui/material";

export default function ContactUs() {
    return (
        <div className="container">
            <Container fixed sx={{ paddingTop: '75px' }}>
                <h1>Связаться с нами</h1>
                <Stack spacing={1}>
                    <div>
                        <div>
                            <a href="tel:+375445558775" target="_blank" rel="noreferrer">+375445558775</a> (А1) -
                            <a href="https://t.me/Kvartira_com" target="_blank" rel="noreferrer"><img style={{ height: '32px', padding: '2px', paddingLeft: '5px' }} src={telegram} alt='telegram' /></a>
                            <a href="viber://chat?number=%2B375445558775" target="_blank" rel="noreferrer"><img style={{ height: '32px', padding: '2px' }} src={viber} alt='viber' /></a>
                            <a href="https://wa.me/375445558775" target="_blank" rel="noreferrer"><img style={{ height: '32px', padding: '2px' }} src={whatsapp} alt='whatsapp' /></a>
                        </div>
                        <div><a href="tel:+375339933323" target="_blank" rel="noreferrer">+375339933323</a> (MTC)</div>
                    </div>
                    <div>Электронная почта: <a href="mailto:info@kvartiranasutki.com" target="_blank" rel="noreferrer">info@kvartiranasutki.com</a></div>
                    <div>Мы принимаем звонки, отвечаем на письма и модерируем объявления с понедельника по пятницу с 9:00 до 18:00.</div>
                </Stack>
                <br/>
                <Stack spacing={1}>
                    <div>ООО «КонтактЛайнСервис»</div>
                    <div>
                        <div>Юридический адрес: РБ, г. Брест, ул. Янки Купалы 100/1, к. 3.</div>
                        <div>Зарегистрировано Администрацией Ленинского района г. Бреста 12.03.2012 г.</div>
                    </div>
                    <div>УНП 291080945</div>
                </Stack>
            </Container>
        </div>
    )
}
