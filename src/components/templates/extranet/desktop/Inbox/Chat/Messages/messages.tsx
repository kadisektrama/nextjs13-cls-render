import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import lodash from 'lodash'

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// @ts-ignore
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { InfoCircleOutlined } from '@ant-design/icons';

import { createChatMessage } from "@/api/commonApi";
import { dateForViewDayMonth } from "@/utils/Helpers/Date/date";
import { getChatChannels } from "@/api/extranet";
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { fetchUserChatSecure, fetchUserChatsExtranet } from "@/redux/thunk/user";

export const Messages: React.FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [message, setMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        (document.getElementById("messages") as HTMLInputElement).scrollTo(0, (document.getElementById("messages") as HTMLInputElement).scrollHeight)
    }, [])

    const handleSubmitMessage = () => {
        createChatMessage(id, message)
            .then(async () => await Promise.all([dispatch(fetchUserChatsExtranet()), dispatch(fetchUserChatSecure(id))]))
            .then(() => setMessage(''))
            .then(() => (document.getElementById("messages") as HTMLInputElement).scrollTo(0, (document.getElementById("messages") as HTMLInputElement).scrollHeight + 200))
    };

    return (
        <Box style={{ borderColor: '#e2dfdf' }}>
            <div id="messages" style={{ height: (document.documentElement.clientHeight - 215 + 'px'), overflow: 'scroll' }}>
                {state.user.chat.map((message: any, index: any) => (
                    <div key={index}>
                        {dateForViewDayMonth(message.created_at) !== dateForViewDayMonth(state.user.chat[index - 1]?.created_at) && (
                            <Divider sx={{ color: '#8b8383', margin: '8px', fontSize: '14px' }}>{dateForViewDayMonth(message.created_at)}</Divider>
                        )}

                        {message.from_user ? (
                            <ChatMsg
                                key={message.id}
                                avatar={message.from_user.user_profile?.photo?.url}
                                side={message.from_user.id === state.user.user.id ? 'right' : 'left'}
                                messages={[
                                    message.message
                                ]}
                            />
                        ) : (
                            <Card variant="outlined" sx={{ borderRadius: 3, margin: '8px 15% 8px 15%' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>{lodash.dropRight(message.message.split(' ')).join(' ')}<span style={{ color: 'white', backgroundColor: '#14a800', fontWeight: 600, width: '28px', height: '28px', borderRadius: '5.5px', padding: '3px', marginLeft: '6px' }}>{message.message.split(' ').at(-1)}</span></div>
                                    <InfoCircleOutlined style={{ margin: '4px 4px 0 0', color: 'rgba(0, 0, 0, 0.12)', fontSize: '24px' }} />
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ))}
            </div>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px', marginTop: '10px' }}>
                <TextField
                    placeholder="Введите сообщение"
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    value={message}
                    size={'medium'}
                    onKeyDown={e => {
                        if (e.keyCode === 13) {
                            handleSubmitMessage();
                        }
                    }}
                    sx={{
                        width: '100%',
                        marginRight: '3px',
                        '& .MuiOutlinedInput-input': {
                            padding: '5px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            '& .css-hdw1oc': {
                                display: 'none'
                            },
                        },
                    }}
                />
                <Button onClick={handleSubmitMessage} variant="contained">Отправить</Button>
            </Box>
        </Box>
    )
}
