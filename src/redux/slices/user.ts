'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserId, fetchUser, fetchUserPhones, fetchUserProfile, fetchMailInfo, fetchTelegramInfo, fetchTelegramSubscribeLink, fetchUserChatsSecure, fetchUserChatSecure, fetchUserChatsExtranet } from '../thunk/user'

type TInitialState = {
    error: string,
    loading: boolean,
    user: any,
    users: any,
    chat: any,
    chats: any
}

const initialState: TInitialState = {
    error: '',
    loading: false,
    users: null,
    user: {
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
        user_profile: null,
    },
    chats: null,
    chat: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFirstName: (state, action: PayloadAction<any>) => {
            state.user.firstName = action.payload
        },
        setEmail: (state, action: PayloadAction<any>) => {
            state.user.email = action.payload
        },
        setTelegram: (state, action: PayloadAction<any>) => {
            state.user.telegram = action.payload
        },
        setTelegramSubsribeLink: (state, action: PayloadAction<any>) => {
            state.user.telegramSubscribeLink = action.payload
        },
        setStatusEmail: (state, action: PayloadAction<any>) => {
            state.user.statusEmail = action.payload
        },
        setStatusTelegram: (state, action: PayloadAction<any>) => {
            state.user.statusTelegram = action.payload
        },
        setPhones: (state, action: PayloadAction<any>) => {
            state.user.phones = action.payload
        },
        setId: (state, action: PayloadAction<any>) => {
            state.user.id = action.payload
        },
        setPermissions: (state, action: PayloadAction<any>) => {
            state.user.permissions = action.payload
        },
        setUserProfileLastName: (state, action: PayloadAction<any>) => {
            state.user.user_profile.last_name = action.payload
        },
        setUserProfileFirstName: (state, action: PayloadAction<any>) => {
            state.user.user_profile.first_name = action.payload
        },
        setUserProfileBirthdate: (state, action: PayloadAction<any>) => {
            state.user.user_profile.birthdate = action.payload
        },
        setUserProfileGender: (state, action: PayloadAction<any>) => {
            state.user.user_profile.gender = action.payload
        },
        setUserProfileLocation: (state, action: PayloadAction<any>) => {
            state.user.user_profile.location = action.payload
        },
        setUserProfilePhoto: (state, action: PayloadAction<any>) => {
            state.user.user_profile.photo = action.payload
        },
    },

    extraReducers: {
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.user = action.payload;
        },
        [fetchUser.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchUser.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchUserPhones.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.user.phones = action.payload;
        },
        [fetchUserPhones.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchUserPhones.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchUserProfile.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.user.user_profile = action.payload;
        },
        [fetchUserProfile.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchUserProfile.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchMailInfo.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.user.user_profile = action.payload;
        },
        [fetchMailInfo.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchMailInfo.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchTelegramInfo.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.user.telegram = action.payload;
            state.user.statusTelegram = action.payload;
        },
        [fetchTelegramInfo.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchTelegramInfo.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchTelegramSubscribeLink.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.user.statusEmail = action.payload;
        },
        [fetchTelegramSubscribeLink.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchTelegramSubscribeLink.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchUserChatsSecure.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.chats = action.payload;
        },
        [fetchUserChatsSecure.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchUserChatsSecure.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchUserChatSecure.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.chat = action.payload;
        },
        [fetchUserChatSecure.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchUserChatSecure.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchUserChatsExtranet.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.chats = action.payload;
        },
        [fetchUserChatsExtranet.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchUserChatsExtranet.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
        [fetchUserId.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = '';
            state.user.id = action.payload;
        },
        [fetchUserId.pending.type]: (state) => {
            state.loading = false;
            state.error = '';
        },
        [fetchUserId.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export const { setFirstName, setEmail, setTelegram, setTelegramSubsribeLink, setStatusEmail, setStatusTelegram, setPhones, setId, setPermissions,
    setUserProfileLastName, setUserProfileFirstName, setUserProfileBirthdate, setUserProfileGender, setUserProfileLocation, setUserProfilePhoto } = userSlice.actions
export default userSlice.reducer;