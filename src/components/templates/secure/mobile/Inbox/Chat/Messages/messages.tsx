import { useEffect } from 'react';

import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { InfoCircleOutlined } from "@ant-design/icons";

import "./messages.scss";
import { dateForViewDayMonth } from "@/utils/Helpers/Date/date";
import { useAppSelector } from '@/redux/hooks/hooks';

export const Messages: React.FC = () => {
    const state = useAppSelector(state => state)

    useEffect(() => {
        (document.getElementById("messages") as HTMLDivElement).scrollTo(0, (document.getElementById("messages") as HTMLDivElement).scrollHeight)
    }, [])
 
    return (
        <div id="messages" style={{ height: (window.screen.height - 200 + 'px'), overflow: 'scroll' }}>
            <div>
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
                            <Card variant="outlined" sx={{ borderRadius: 3, margin: '8px 5% 8px 5%' }}>
                                <CardContent>
                                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <div><b>Спасибо за ваше мнение!</b></div>
                                            <div style={{ marginTop: '4px', fontSize: '15px' }}>Вы поставили своему проживанию оценку <span style={{ color: 'white', backgroundColor: '#14a800', fontWeight: 600, width: '28px', height: '28px', borderRadius: '5.5px', padding: '3px', marginLeft: '6px' }}>{message.message.split(' ').at(-1)}</span></div>
                                        </div>
                                        <InfoCircleOutlined style={{ margin: '4px 4px 0 0', color: 'rgba(0, 0, 0, 0.12)', fontSize: '24px' }} />
                                    </CardContent>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
