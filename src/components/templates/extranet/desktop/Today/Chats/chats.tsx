import React, { useEffect } from 'react';

import List from "@mui/material/List";

import { fetchUserFirstChatMessage } from "@/redux/thunk/user";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

export const Chats: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        Promise.all(state.user.chats.map((item: any) => {
            const fetchData = async () => {
                await dispatch(fetchUserFirstChatMessage({user: state.user, id: item.id, limit: 1, sort: "-created_at"}))
            }
            fetchData()
        }))
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <>
            Непрочитанные сообщения
            {isLoaded ? (
                <List sx={{ width: '100%' }}>
                    {(state.user.chats.filter((item: any) => item.firstMessage.is_read === 0).sort((a: any, b: any) => b.firstMessage.id - a.firstMessage.id).map((item: any, index: any) => (
                        <div key={index}>{item.firstMessage.message}</div>
                    )))}
                </List>
            ) : (
                <SimpleLoader />
            )}
        </>
    )
}