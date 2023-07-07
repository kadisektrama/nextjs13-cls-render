import { createAsyncThunk } from "@reduxjs/toolkit"
import { AdvancedFetch, requestOptions } from "@/utils/Helpers/Fetch/advancedFetch";
import { 
    getUser, 
    getUserProfile, 
    getUserPhones,
    getMailInfo,
    getTelegramInfo,
    getTelegramSubscribeLink,
    getChatMessages,
    getFirstChatMessage,
    getUserId
} from "@/api/commonApi";
import { getChatChannels as getChatChannelsSecure } from "@/api/secure";
import {
    getChatChannels as getChatChannelsExtranet,
} from "@/api/extranet";

// TODO
export const fetchUsers = createAsyncThunk(
    'users/fetchAll',
    async (customParams: any = '', fetchAPI) => {
        try {            
            return await AdvancedFetch(`${process.env.NEXT_PUBLIC_REST_API}/amenities${customParams}`, requestOptions as unknown as RequestInit)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetchOne',
    async (_, fetchAPI) => {
        try {
            return await getUser()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchUserPhones = createAsyncThunk(
    'userPhones/fetchOne',
    async (_, fetchAPI) => {
        try {
            return await getUserPhones()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchUserProfile = createAsyncThunk(
    'userProfile/fetchOne',
    async (_, fetchAPI) => {
        try {
            return await getUserProfile()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchMailInfo = createAsyncThunk(
    'userMailInfo/fetchOne',
    async (_, fetchAPI) => {
        try {
            return await getMailInfo()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchTelegramInfo = createAsyncThunk(
    'userTelegramInfo/fetchOne',
    async (_, fetchAPI) => {
        try {
            return await getTelegramInfo()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchTelegramSubscribeLink = createAsyncThunk(
    'userTelegramSubscribeLink/fetchOne',
    async (_, fetchAPI) => {
        try {
            return await getTelegramSubscribeLink()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchUserChatsSecure = createAsyncThunk(
    'userChatsSecure/fetchAll',
    async (_, fetchAPI) => {
        try {
            return await getChatChannelsSecure()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchUserChatSecure = createAsyncThunk(
    'userChatSecure/fetchOne',
    async (id: any, fetchAPI) => {
        try {
            return await getChatMessages(id)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchUserChatsExtranet = createAsyncThunk(
    'userChatsExtranet/fetchAll',
    async (_, fetchAPI) => {
        try {
            return await getChatChannelsExtranet()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchUserFirstChatMessage = createAsyncThunk(
    'userFirstChatMessage/fetchOne',
    async (params: {user: any, id: any, limit: any, sort: any}, fetchAPI) => {
        try {
            return await getFirstChatMessage(params.user, params.id, params.limit, params.sort)
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchUserId = createAsyncThunk(
    'userId/fetchOne',
    async (_, fetchAPI) => {
        try {
            return await getUserId()
        } catch (e: any) {
            return fetchAPI.rejectWithValue(e.message)
        }
    }
)