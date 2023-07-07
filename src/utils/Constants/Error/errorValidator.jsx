export function errorTranslator(error) {
    const errors = {
        'The with_user_id is invalid.': 'Невозможно отправлять сообщение себе.',
        'Route not found.': 'Ошибка',
        'Сообщение отправлено': 'Сообщение отправлено',
        'Unauthenticated': 'Вы не авторизованы'
    }

    return errors[error.split(' (').at(0)]
}

export const errorAuthTranslator = (error) => {
    const errors = {
        'Такое значение поля email уже существует.': 'Этот e-mail уже занят',
        'Значение password confirmation должно совпадать с password.': 'Поле "пароль" не совпадает с полем "повторите пароль".',
        'Поле password не совпадает с подтверждением.': 'Поле "пароль" не совпадает с полем "повторите пароль".',
        'Поле password должно быть не короче 8 символов.': 'Поле "пароль" должно быть не короче 8 символов'
    }

    return errors[error.message.split(' (').at(0)]
}

export const errorAuthCheckingTranslator = (error) => {
    const errors = {
        'Неверный формат номера': 'Мы не можем отправить код на этот номер. Проверьте, пожалуйста, количество цифр',
        'Поле phone имеет ошибочный формат.': 'Неверный формат телефона',
    }
    
    return errors[error.message.split(' (').at(0)]
}

export const errorBookingTranslator = (error) => {
    const errors = {
        'You cannot create a booking through closed dates.': 'Вы не можете создать бронирование на закрытые даты',
        'You cannot book your property.': 'Вы не можете забронировать своё объявление',
    }

    return errors[error.message.split(' (').at(0)] || 'Некорректные данные'
}