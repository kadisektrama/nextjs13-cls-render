import React from "react"
import Container from "@mui/material/Container";

export default function Payment() {
    return (
        <div className="container">
            <Container fixed sx={{ paddingTop: '75px', paddingBottom: '75px' }}>
                <h2>Оплата</h2>
                <div>Оплатить услугу вы можете банковской карточкой через интернет. Для этого вам необходимо:</div>
                <br />
                <div>1. Перейти в раздел «Оплата» на сайте.</div>
                <div>2. Заполнить поле «Номер счета».</div>
                <div>3. Внести сумму платежа.</div>
                <div>
                    4. После нажатия кнопки «Оплатить» вы перейдете на специальную защищенную платежную
                    страницу процессинговой системы <a href={' https://bepaid.by/'}><span style={{ color: '#e67f2a', textDecoration: 'underline', fontWeight: 500 }}>be</span><span style={{ color: '#3434ff', textDecoration: 'underline', fontWeight: 500 }}>Paid</span></a>.
                    На платежной странице будет указан номер заказа и сумма платежа. Для оплаты вам необходимо
                    ввести свои карточные данные и подтвердить платеж, нажав кнопку «Оплатить».
                    Если ваша карта поддерживает технологию 3-D Secure, системой вам будет предложено пройти
                    стандартную одноминутную процедуру проверки владельца карты на странице вашего банка
                    (банка, который выдал вашу карту).
                </div>

                <br />
                <div>
                    Обращаем ваше внимание, что после проведения платежа на указанный вами электронный адрес придет подтверждение оплаты.
                    Просим вас сохранять данные оплат. Мы принимаем платежи по следующим банковским картам: Visa, Visa Electron, MasterCard, Maestro, Белкарт.
                </div>
                <br />
                <div>
                    Платежи по банковским картам осуществляются через систему электронных платежей bePaid. Платежная страница системы <a href={' https://bepaid.by/'}><span style={{ color: '#e67f2a', textDecoration: 'underline', fontWeight: 500 }}>be</span><span style={{ color: '#3434ff', textDecoration: 'underline', fontWeight: 500 }}>Paid</span></a> отвечает
                    всем требованиям безопасности передачи данных (PCI DSS Level 1). Все конфиденциальные данные хранятся в зашифрованном
                    виде и максимально устойчивы к взлому. Доступ к авторизационным страницам осуществляется с использованием протокола, обеспечивающего
                    безопасную передачу данных в Интернетe (SSL/TLS).
                </div>
                <br />

                <div>Возврат денежных средств не предусмотрен.</div>
                <div>Стоимость размещения объявления зависит от срока его размещения (30 дней - 100 руб.).</div>
            </Container>
        </div>
    )
}
