export interface IUser {
    id: null,
    created_at: null,
    name: null,
    phones: null,
    permissions: [],
    roles: null,
    email: null,
    email_verified: null,
    telegram: null,
    telegramSubscribeLink: null,
    statusTelegram: null,
    statusEmail: null,
    user_profile: IUserProfile,
    avgAnswerTime: any,
    answerRate: any,
}

export interface IUserProfile {
    photo: {
        url?: any,
    },
    first_name: string,
}