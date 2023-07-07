import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import { Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { createChatMessage } from "@/api/commonApi";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { Messages } from "./Messages/messages";
import { fetchUser, fetchUserChatSecure } from "@/redux/thunk/user";
import { useAppDispatch } from "@/redux/hooks/hooks";

export const Chat: React.FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        Promise.all([dispatch(fetchUserChatSecure(id)), dispatch(fetchUser())])
            .then(
                (res) => {
                    setIsLoaded(true)
                },
                (error) => {
                    //setError('404');
                    throw new Error('404 Page Not Found');
                }
            )

        const timer = setInterval(() => {
            id && dispatch(fetchUserChatSecure(id))
        }, 15000);

        if (document.getElementsByClassName('b24-widget-button-wrapper b24-widget-button-position-bottom-right b24-widget-button-visible')[0]) {
            (document.getElementsByClassName('b24-widget-button-wrapper b24-widget-button-position-bottom-right b24-widget-button-visible')[0] as HTMLDivElement).style.display = 'none'
        }

        return function cleanup() {
            if (document.getElementsByClassName('b24-widget-button-wrapper b24-widget-button-position-bottom-right b24-widget-button-visible')[0]) {
                (document.getElementsByClassName('b24-widget-button-wrapper b24-widget-button-position-bottom-right b24-widget-button-visible')[0] as HTMLDivElement).style.display = 'flex'
            }

            clearInterval(timer);
        };
    }, [])

    const handleSubmitMessage = () => {
        createChatMessage(id, message)
            .then(() => dispatch(fetchUserChatSecure(id)))
            .then(() => setMessage(''))
            .then(() => (document.getElementById("messages") as HTMLDivElement).scrollTo(0, (document.getElementById("messages") as HTMLDivElement).scrollHeight + 200))
    };

    if (error) {
        throw new Error('404');
    }

    return(
        <AccountHeader
            name={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <Link href={'/guest/inbox'}><ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} /></Link>
                    </IconButton>
                    <Typography component="h1" variant="h5">
                        Входящие
                    </Typography>
                </div>
            }
        >
            <Box style={{ margin: '5px', paddingBottom: '45px' }}>
                {isLoaded && (
                    <>
                        <Messages />
                    </>
                )}
            </Box>
            <Box style={{ position: 'fixed', bottom: 56, display: 'flex', height: '50px', justifyContent: 'space-between', width: '100%', backgroundColor: '#ffffff', zIndex: 999, alignItems: 'flex-end', marginBottom: '10px', marginTop: '10px', padding: '0 4px' }}>
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
        </AccountHeader>
    )
}