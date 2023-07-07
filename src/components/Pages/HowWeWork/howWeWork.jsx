import React from "react"

import Container from "@mui/material/Container";

export default function HowWeWork() {
    return (
        <div className="container">
            <Container fixed sx={{ paddingTop: '75px', paddingBottom: '75px' }}>
                <h2>Общие положения</h2>
                <div>1.1. Данные правила действуют в случае использования гостем возможности бронирования выбранного объекта для проживания с помощью онлайн-площадки Kvartiranasutki.com</div>
                <div>1.2. Стоимость проживания — это сумма, указанная хозяином при подтверждении брони. Платные услуги, которые есть у хозяина, могут быть предоставлены только с согласия гостя, и в стоимость проживания не входят.</div>

                <h2>2. Требования к жилью</h2>
                <div>2.1. Хозяин обязуется предоставить жилье, соответствующее заявленному в объявлении, в том числе по следующим параметрам:</div>
                <ul>
                    <li>тип жилья;</li>
                    <li>адрес;</li>
                    <li>цена;</li>
                    <li>количество комнат;</li>
                    <li>количество спальных мест;</li>
                    <li>соответствие интерьера жилья фотографиям, размещенным в объявлении и другой информации в объявлении.</li>
                </ul>

                <h2>3. Права и обязанности гостя</h2>
                <div>3.1. Гость обязан:</div>
                <ul>
                    <li>по запросу хозяина предоставить при заселении документы, подтверждающие личность;</li>
                    <li>внести залог за сохранность имущества хозяина, если условие внесения залога и его размер указаны в объявлении;</li>
                    <li>в случае спорных ситуаций предоставить менеджеру сайта Kvartiranasutki.com доказательства невыполнения обязательств со стороны хозяина или несоответствия жилья требованиям, указанным в п. 2 настоящих правил, а также другие подтверждения и факты по запросу менеджера сайта Kvartiranasutki.com.</li>
                </ul>
                <div>Гость имеет право:</div>
                <ul>
                    <li>отказаться от брони до заселения в соответствии с условиями отмены, указанными в п. 6 настоящих правил;</li>
                    <li>обратиться к хозяину для решения всех спорных вопросов при заселении и проживании до момента обращения к менеджеру сайта Kvartiranasutki.com;</li>
                    <li>отказаться от заселения в случае, если жилье не соответствует требованиям, указанным в п. 2. настоящих правил;</li>
                    <li>отказаться от заселения в случае отказа хозяина предоставить отчетные документы (если возможность их оформления указана в объявлении);</li>
                </ul>

                <h2>4. Права и обязанности хозяина</h2>
                <div>4.1. Хозяин обязан:</div>
                <ul>
                    <li>заселить гостя и предоставить для проживания жилье в соответствии с условиями брони (даты проживания, время заезда и выезда, стоимость проживания);</li>
                    <li>предоставить гостю жилье в соответствии с требованиями, указанными в п. 2 настоящих правил;</li>
                    <li>обрабатывать все запросы на бронь;</li>
                    <li>поддерживать актуальный календарь занятости на Kvartiranasutki.com и закрывать даты, недоступные для бронирования;</li>
                    <li>поддерживать актуальные цены в своих объявлениях на Kvartiranasutki.com;</li>
                    <li>В случае, если гость не приехал в установленный день, в течение 48 часов с полуночи дня запланированного заезда сообщить Kvartiranasutki.com о незаезде, воспользовавшись кнопкой «Отметить “незаезд”». Если хозяин не воспользовался кнопкой «Отметить “незаезд”» в течение установленного времени, то бронирование считается состоявшимся.</li>
                </ul>
                <div>Обратите внимание: кнопка «Отметить “незаезд”» доступна в течение 48 часов с полуночи дня запланированного заезда;</div>
                <ul>
                    <li>самостоятельно рассмотреть и принять меры для решения всех спорных вопросов с гостем;</li>
                    <li>отвечать на телефонные звонки и сообщения менеджеров Kvartiranasutki.com для решения спорных ситуаций в день заселения гостя;</li>
                    <li>в случае спорных ситуаций предоставить для их разрешения менеджеру Kvartiranasutki.com доказательства выполнения обязательств по заселению гостя и предоставлению жилья, соответствующего требованиям, указанным в п. 2 настоящих правил, а также другие подтверждения и факты по запросу менеджера Kvartiranasutki.com;</li>
                </ul>
                <div>4.2. Хозяин имеет право:</div>
                <ul>
                    <li>отменить бронь на Kvartiranasutki.com в соответствии с правилами отмены, указанными в п. 5 настоящих правил;</li>
                    <li>отказаться от заселения гостя в случае неприбытия гостя в день/ночь заселения, установленный в заявке на бронь;</li>
                    <li>отказаться от заселения гостя в случае отказа гостя от внесения залога за сохранность имущества в случае, если условие внесения залога и его размер указаны в объявлении;</li>
                    <li>отказаться от заселения гостя в случае, если количество гостей превышает указанное гостем в заявке на бронь (либо максимально допустимое для проживания при мгновенном бронировании: в таком случае хозяин вправе потребовать оплату за каждого дополнительного гостя, если таковая указана в объявлении);</li>
                    <li>отказаться от заселения гостей, если ни один из них не является совершеннолетним;</li>
                    <li>отказаться от заселения гостей, если ни один из них не предоставит документ, удостоверяющий личность;</li>
                    <li>отказаться от заселения гостей, если гость меняет сроки проживания;</li>
                    <li>требовать от гостя полной оплаты стоимости проживания при заселении;</li>
                    <li>требовать от гостя внесения залога за сохранность имущества в случае, если условие внесения залога и его размер указаны в объявлении;</li>
                    <li>обратиться к менеджеру Kvartiranasutki.com для решения спорной ситуации в случае отказа гостя от заселения на основаниях, предусмотренных п. 3.2 настоящих правил.</li>
                </ul>

                <h2>5. Условия отмены брони хозяином</h2>
                <div>5.1. После подтверждения бронирования отменить его можно только по уважительным причинам, которые невозможно предвидеть в момент бронирования. С запросом об отмене бронирования необходимо обращаться к менеджеру  Kvartiranasutki.com. Мы в индивидуальном порядке рассматриваем каждый случай для того, чтобы обезопасить гостей от недобросовестных хозяев, которые без причины отменяют бронирование.</div>
                <div>5.2. К уважительным причинам для отмены брони мы относим:</div>
                <ul>
                    <li>стихийные бедствия;</li>
                    <li>нестабильную политическую обстановку;</li>
                    <li>боевые и военные действия;</li>
                    <li>эпидемии;</li>
                    <li>нанесённый жилью ущерб;</li>
                    <li>смерть члена семьи;</li>
                    <li>серьезную болезнь хозяина или его родственника.</li>
                </ul>
                <div>Для того, чтобы бронирование было отменено без применения штрафных санкций, хозяину жилья необходимо предоставить сайту Kvartiranasutki.com все необходимые документы, доказывающие уважительную причину отмены бронирования.</div>
                <div>5.3. В случае отмены брони без уважительной причины к хозяину могут быть применены штрафные санкции, а именно:</div>
                <ul>
                    <li>автоматический отзыв в объявлении;</li>
                    <li>понижение рейтинга;</li>
                    <li>приостановка публикации объявлений;</li>
                    <li>блокировка аккаунта.</li>
                </ul>
                <div>5.4 Администрация сайта Kvartiranasutki.com имеет право отклонить заявку на отмену брони ввиду недостатка необходимых доказательств, либо по иным причинам, не применяя штрафные санкции.</div>

                <h2>6. Условия отмены брони гостем</h2>
                <div>По умолчанию, отмена бронирования может быть осуществлена не менее чем за 1 сутки до заезда.</div>
                <div>При совершении бронирования гостю доступны условия отмены бронирования.</div>

                <h2>7. Разрешение спорных ситуаций, связанных с отменой бронирования и отказом от заселения</h2>
                <div>7.1. Администрация сайта Kvartiranasutki.com принимает и рассматривает обращения по урегулированию спорных ситуаций в следующих случаях:</div>
                <ul>
                    <li>по обращению гостя или хозяина в день заселения, если хозяин отказывает в заселении;</li>
                    <li>по обращению гостя в момент заселения, если жилье не соответствует требованиям к жилью, предусмотренным п. 2 настоящих правил.</li>
                </ul>
                <div>7.2. Решение по спорным ситуациям Kvartiranasutki.com принимает в индивидуальном порядке, основываясь на данных правилах и представленных хозяином и гостем доказательствах.</div>
            </Container>
        </div>
    )
}