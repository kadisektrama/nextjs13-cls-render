import React from "react"
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";

export default function PrivacyPolicy() {
    return (
        <>
            <Container fixed>
                <Stack
                    spacing={1}
                >
                    <Typography variant="h6" gutterBottom component="div" sx={{textIndent: '40px'}}>
                        Политика конфиденциальности (Политика в отношении обработки персональных данных)
                    </Typography>
                    <div>1. Настоящая Политика по работе с персональными данными субъектов в ООО «КонтактЛайнСервис» (далее – Оператор/Компания).</div>
                    <div>2. Политика обработки персональных данных (далее – Политика) составлена в соответствии с законодательством Республики Беларусь и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, Пользователей сайта <Link to="/">https://kvartiranasutki.com</Link>.</div>
                    <div>3. Пользуясь сайтом и его составными частями, в т. ч. пройдя регистрацию на сайте, Пользователь безоговорочно принимает политику конфиденциальности и дает свое согласие на обработку персональных данных.</div>

                    <Typography variant="h6" gutterBottom component="div" sx={{textIndent: '40px'}}>
                        Основные термины и определения
                    </Typography>
                    <div>4. Веб-сайт — совокупность графических и информационных материалов, текстов, дизайна, видеоматериалов и иных результатов интеллектуальной деятельности Оператора, а также программ для ЭВМ, обеспечивающих их доступность в сети Интернет по сетевому адресу <Link to="/">https://kvartiranasutki.com</Link>.</div>
                    <div>5. Обработка персональных данных — любое действие или совокупность действий, совершаемые с персональными данными, включая сбор, систематизацию, хранение, изменение, использование, обезличивание, блокирование, распространение, предоставление, удаление персональных данных.</div>
                    <div>6. Общедоступные персональные данные — персональные данные, распространенные самим субъектом персональных данных либо с его согласия или распространенные в соответствии с требованиями законодательных актов.</div>
                    <div>7. Оператор/Компания — лицо, самостоятельно или совместно с другими лицами организующее и (или) осуществляющее обработку персональных данных, а также определяющее цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.</div>
                    <div>8. Персональные данные — любая информация, относящаяся к идентифицированному физическому лицу или физическому лицу, которое может быть идентифицировано.</div>
                    <div>9. Пользователь/Субъект персональных данных – любой посетитель веб-сайта <Link to="/">https://kvartiranasutki.com</Link>.</div>
                    <div>10. Стороны — Пользователь и Оператор.</div>
                    <div>11. Предоставление персональных данных — действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.</div>
                    <div>12. Распространение персональных данных — действия, направленные на ознакомление с персональными данными неопределенного круга лиц.</div>
                    <div>13. Защита персональных данных — комплекс мер (организационно-распорядительных, технических, юридических), направленных на защиту от предоставления неправомерного или случайного доступа к персональным данным, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий.</div>
                    <div>14. Трансграничная передача персональных данных — передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу.</div>

                    <Typography variant="h6" gutterBottom component="div" sx={{textIndent: '40px'}}>
                        Цели обработки персональных данных
                    </Typography>
                    <div>15. Компания осуществляет обработку персональных данных с использованием средств автоматизации и без использования таких средств, а также смешанным образом в следующих целях:</div>
                    <ul className="list">
                        <li>идентификации Пользователя, зарегистрированного на ресурсе;</li>
                        <li>установления с Пользователем обратной связи;</li>
                        <li>определения места нахождения Пользователя (в случае необходимости);</li>
                        <li>подтверждения достоверности и полноты персональных данных, предоставленных Пользователем (в случае необходимости);</li>
                        <li>осуществления информационной рассылки о продуктах и сервисах ресурса (Стороны подтверждают, что данная информация не является спамом, и на ее получение Пользователь дает свое согласие);</li>
                        <li>предоставления доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте <Link to="/">https://kvartiranasutki.com</Link>;</li>
                        <li>продвижения услуг, оказываемых Компанией, и улучшения их качества.</li>
                    </ul>
                    <div>16. В случае если Компания поручает обработку персональных данных другому лицу, ответственность перед субъектом персональных данных за действия указанного лица несет Компания. Лицо, осуществляющее обработку персональных данных по поручению Компании, несет ответственность перед Компанией.</div>
                    <div>17. Компания обязуется и обязывает иных лиц, получивших доступ к персональным данным, не раскрывать их третьим лицам и не распространять их без согласия субъекта персональных данных, если иное не предусмотрено законодательством Республики Беларусь.</div>

                    <Typography variant="h6" gutterBottom component="div" sx={{textIndent: '40px'}}>
                        Срок, на который дается согласие субъекта персональных данных
                    </Typography>
                    <div>18. Данные, отражающие фамилии, имена и отчества; номера телефона; электронную почту; почтовый адрес, другую информацию, которая необходима, от пользователя — физического лица.</div>
                    <div>19. Название организации, юридический и почтовый адреса, банковские реквизиты, УНП, ФИО руководителя или лица, имеющего право подписи, номера телефонов от пользователя — юридического лица.</div>
                    <div>20. Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т. ч. файлов cookie) с помощью сервисов интернет-статистики (Яндекс.Метрика, Google Аналитика и др.).</div>
                    <div>21. Пользователь дает свое согласие на получение информационных рассылок и рекламных материалов от Оператора либо от иных лиц по поручению Оператора на адрес электронной почты, указанной Пользователем при регистрации.
                        Пользователь всегда может отказаться от получения информационных рассылок и рекламных материалов, перейдя по ссылке в информационном письме <span style={{color: "blue", textDecoration: "underline"}}>info@kvartiranasutki.com</span> и кликнув по тексту «отписаться».</div>

                    <Typography variant="h6" gutterBottom component="div" sx={{textIndent: '40px'}}>
                        Цели обработки персональных данных
                    </Typography>
                    <div>22. Оператор осуществляет обработку персональных данных в течение срока использования Пользователем функционала сайта.</div>
                    <div>23. Обработка персональных данных прекращается при наступлении одного или нескольких из указанных событий:</div>
                    <ul className="list">
                        <li>поступления от Пользователя отзыва согласия на обработку его персональных данных в порядке, установленном Политикой (за исключением случаев, предусмотренных действующим законодательством);</li>
                        <li>достигнуты цели их обработки;</li>
                        <li>истек срок действия согласия субъекта или он отозвал согласие на обработку персональных данных;</li>
                        <li>обнаружена неправомерная обработка персональных данных;</li>
                        <li>прекращена деятельность организации.</li>
                    </ul>
                    <div>24. Пользователь дает свое согласие на сбор и анализ определенных видов технической информации, в т. ч.:</div>
                    <ul className="list">
                        <li>тип компьютера или мобильного устройства;</li>
                        <li>тип платформы (например, Apple iOS или Android);</li>
                        <li>версию операционной системы Пользователя;</li>
                        <li>тип и язык браузера;</li>
                        <li>ссылки и страницы выхода, а также URL-адреса;</li>
                        <li>дату и время работы на сайте;</li>
                        <li>количество кликов на функции приложения или веб-страницы;</li>
                        <li>количество времени, потраченного на функцию приложения или веб-страницу;</li>
                        <li>количество просмотренных страниц и порядка этих страниц.</li>
                    </ul>
                    <div>25. Иную информацию, необходимую для обеспечения прозрачности процесса обработки персональных данных.</div>

                    <Typography variant="h6" gutterBottom component="div" sx={{textIndent: '40px'}}>
                        Основные права и обязанности субъектов персональных данных
                    </Typography>


                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width: '50%'}}>Субъекты персональных данных</TableCell>
                                    <TableCell style={{width: '50%'}}>Обязанности Оператора</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>А1. Вправе в любое время без объяснения причин отозвать свое согласие посредством подачи Оператору заявления</TableCell>
                                    <TableCell>Б1. Обязан в 15-дневный срок после получения заявления субъекта персональных данных в соответствии с его содержанием прекратить обработку персональных данных, осуществить их удаление и уведомить об этом субъект персональных данных</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>А2. Имеют право на получение информации, касающейся обработки своих персональных данных, содержащей наименование и местонахождение Оператора, подтверждение факта обработки персональных данных Оператором, его персональные данные и источник их получения, правовые основания и цели обработки персональных данных, срок, на который дано их согласие</TableCell>
                                    <TableCell>Б2. Обязан в течение пяти рабочих дней после получения соответствующего заявления субъекта персональных данных предоставить ему в доступной форме информацию либо уведомить его о причинах отказа в ее предоставлении</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>А3. Вправе требовать от Оператора внесения изменений в свои персональные данные в случае, если персональные данные являются неполными, устаревшими или неточными</TableCell>
                                    <TableCell>Б3. Обязан в 15-дневный срок после получения заявления субъекта персональных данных внести соответствующие изменения в его персональные данные и уведомить об этом субъект персональных данных либо уведомить субъект персональных данных о причинах отказа во внесении таких изменений</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>А4. Вправе получать от Оператора информацию о предоставлении своих персональных данных третьим лицам один раз в календарный год бесплатно</TableCell>
                                    <TableCell>Б4. Обязан в 15-дневный срок после получения заявления субъекта персональных данных предоставить ему информацию о том, какие персональные данные этого субъекта и кому предоставлялись в течение года, предшествовавшего дате подачи заявления, либо уведомить субъект персональных данных о причинах отказа в ее предоставлении</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>А5. Вправе требовать от Оператора бесплатного прекращения обработки своих персональных данных, включая их удаление, при отсутствии оснований для обработки персональных данных</TableCell>
                                    <TableCell>Б5. Обязан в 15-дневный срок после получения заявления субъекта персональных данных прекратить обработку персональных данных, а также осуществить их удаление (обеспечить прекращение обработки персональных данных, а также их удаление уполномоченным лицом) и уведомить об этом субъект персональных данных</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>А6. Вправе обжаловать действия (бездействие) и решения Оператора, нарушающие его права при обработке персональных данных, в уполномоченный орган по защите прав субъектов персональных данных</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <Typography variant="h6" gutterBottom component="div" sx={{textIndent: '40px'}}>
                        Меры, применяемые для защиты персональных данных субъектов
                    </Typography>
                    <div>26. Оператор принимает необходимые и достаточные правовые, организационные и технические меры для защиты персональных данных Пользователей от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий.</div>
                    <div>27. К правовым мерам, принимаемым Оператором, относятся:</div>
                    <ul className="list">
                        <li>разработка и применение нормативных документов по обработке и защите персональных данных в Компании;</li>
                        <li>включение в соглашения, заключаемые Компанией с контрагентами, требований соблюдения конфиденциальности и обеспечения безопасности персональных данных субъектов при их обработке.</li>
                    </ul>
                    <div>28. К организационным мерам, принимаемым Оператором, относятся:</div>
                    <ul className="list">
                        <li>ознакомление работников Компании с требованиями законодательства Республики Беларусь и нормативными документами Компании в области работы с персональными данными;</li>
                        <li>издание внутренних документов, определяющих политику Компании в отношении обработки персональных данных, локальных нормативных актов по вопросам обработки персональных данных, а также локальных нормативных актов, устанавливающих процедуры, направленные на предотвращение и выявление нарушений при работе с персональными данными, устранение последствий таких нарушений;</li>
                        <li>применение организационных и технических мер по обеспечению безопасности персональных данных при их обработке, необходимых для выполнения требований к защите персональных данных (использование защищенных и сертифицированных каналов передачи данных);</li>
                        <li>учет машинных носителей персональных данных;</li>
                        <li>осуществление внутреннего контроля за соблюдением работниками Компании, осуществляющими работу с персональными данными субъектов, требований законодательства Республики Беларусь и внутренних локальных нормативных правовых актов, а также контроль за принимаемыми мерами по обеспечению безопасности персональных данных;</li>
                        <li>обеспечение регистрации и учета всех действий, совершаемых с персональными данными, обрабатываемыми с использованием компьютерных устройств;</li>
                        <li>реализация разграничения/ограничения доступа работников к документам, информационным ресурсам, техническим средствам и носителям информации, информационным системам и связанным с их использованием работам;</li>
                        <li>регулярный мониторинг безопасности персональных данных, совершенствование системы их защиты.</li>
                    </ul>
                    <div>29. Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу <Link to="/privacy_policy">https://kvartiranasutki.com/privacy_policy/</Link>.</div>
                    <div>30. Компания при необходимости в одностороннем порядке вносит в Политику соответствующие изменения с последующим их размещением на сайте. Субъекты самостоятельно получают на сайте информацию об изменениях.</div>
                </Stack>
            </Container>
        </>
    )
}
