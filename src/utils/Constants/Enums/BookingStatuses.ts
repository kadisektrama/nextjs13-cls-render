export enum BookingStatuses {
    created = 'created',
    confirmed = 'confirmed',
    finished = 'finished',
    rejected = 'rejected',
    failed = 'failed',
    canceled = 'canceled',
    expired = 'expired',
    canceledByService = 'canceledByService',
}

export enum BookingStatusesViewAdmin {
    created = 'На рассмотрении',
    confirmed = 'Подтверждено',
    finished = 'Состоялось',
    rejected = 'Отменено хозяином',
    failed = 'Не состоялось',
    canceled = 'Отменено гостем',
    expired = 'Просрочено',
    canceledByService = 'Отменено Kvartiranasutki.com',
}

export enum BookingStatusesViewSecure {
    created = 'На рассмотрении',
    confirmed = 'Подтверждено',
    finished = 'Состоялось',
    rejected = 'Отменено хозяином',
    failed = 'Не состоялось',
    canceled = 'Отменено вами',
    expired = 'Запрос просрочен',
    canceledByService = 'Отменено Kvartiranasutki.com',
}

export enum BookingStatusesViewExtranet {
    created = 'На рассмотрении',
    confirmed = 'Подтверждено',
    finished = 'Состоялось',
    rejected = 'Отменено вами',
    failed = 'Не состоялось',
    canceled = 'Отменено гостем',
    expired = 'Запрос просрочен',
    canceledByService = 'Отменено Kvartiranasutki.com',
}