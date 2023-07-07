import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { InfoCircleOutlined } from "@ant-design/icons";

import { dateForViewDayMonth } from "@/utils/Helpers/Date/date";
import { createChatMessage } from "@/api/commonApi";
import { fetchUserChatSecure, fetchUserChatsSecure } from "@/redux/thunk/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

export const Messages: React.FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const {id} = useParams();
    const [message, setMessage] = useState('');

    useEffect(() => {
        (document.getElementById("messages") as HTMLDivElement).scrollTo(0, (document.getElementById("messages") as HTMLDivElement).scrollHeight)
    }, [])

    const handleSubmitMessage = () => {
        createChatMessage(id, message)
            .then(async () => await Promise.all([dispatch(fetchUserChatsSecure()), dispatch(fetchUserChatSecure(id))]))
            .then(() => setMessage(''))
            .then(() => (document.getElementById("messages") as HTMLDivElement).scrollTo(0, (document.getElementById("messages") as HTMLDivElement).scrollHeight + 200))
    };

    return (
        <Box style={{ borderColor: '#e2dfdf' }}>
            <div id="messages" style={{  height: (window.screen.height - 200 + 'px'), overflow: 'scroll' }}>
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
                                    <div>
                                        <div><b>Спасибо за ваше мнение!</b></div>
                                        <div style={{ marginTop: '4px', fontSize: '15px' }}>Вы поставили своему проживанию оценку <span style={{ color: 'white', backgroundColor: '#14a800', fontWeight: 600, width: '28px', height: '28px', borderRadius: '5.5px', padding: '3px', marginLeft: '6px' }}>{message.message.split(' ').at(-1)}</span></div>
                                    </div>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
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