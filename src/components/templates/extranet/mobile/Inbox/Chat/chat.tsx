import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import { createChatMessage } from "@/api/commonApi";
import { fetchUserId, fetchUserChatSecure } from "@/redux/thunk/user";
import { fetchBookingsExtranet } from "@/redux/thunk/booking";
import { fetchUserChatsExtranet } from "@/redux/thunk/user";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { Messages as MessageImp } from "./Messages/messages";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

const Messages: React.FC = (props) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<any>(false);
    const [chat] = useState(state.user.chats.find((item: any) => item.id === +id));

    useEffect(() => {
        dispatch(fetchBookingsExtranet({status: 'eq:created', query: `&start_date[]=eq:${chat?.details.booking.start_date}&end_date[]=eq:${chat?.details.booking.end_date}&property_id=eq:${chat?.property.id}&user_id=eq:${chat?.guest_user.id}`}))
            .then(
                () => {
                    setIsLoaded(true)
                }
            )
            .catch((err: any) => {
                if (err.message === 'Поле property id должно быть целым числом. (and 4 more errors)') {
                    setError('403 forbidden ')
                } else {
                    setError('404 page not founded')
                }
            })
    },[id])

    if (error) {
        throw new Error(error);
    }

    return(
        <>
            {isLoaded && (
                <MessageImp />
            )}
        </>
    )
}

const MessagesHoc: React.FC = () => {
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchUserChatsExtranet())
            .then(() => setIsLoaded(true))
    },[])

    return(
        <>
            {isLoaded ? (
                <Messages />
            ) : ''}
        </>
    )
}

export const Chat = () => {
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState<any>(false);
    const [message, setMessage] = React.useState('');
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    const {id} = useParams();

    useEffect(() => {
        Promise.all([dispatch(fetchUserChatSecure(id)), dispatch(fetchUserId())])
            .then(
                () => {
                    setIsLoaded(true)
                },
                () => {
                    setError('404');
                    throw new Error('404 Page Not Found');
                }
            )

        const timer = setInterval(() => {
            id && dispatch(fetchUserChatSecure(id))
            forceUpdate();
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
            .then(() => (document.getElementById("messages") as HTMLInputElement).scrollTo(0, (document.getElementById("messages") as HTMLInputElement).scrollHeight + 200))
    };

    if (error) {
        throw new Error('404 Page Not Found');
    }

    return(
        <AccountHeader
            name={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <Link href={'/host/inbox'}><ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} /></Link>
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
                        <MessagesHoc />
                    </>
                )}
            </Box>
            <Box style={{ position: 'fixed', bottom: 56, display: 'flex', height: '50px', justifyContent: 'space-between', width: '100%', backgroundColor: '#ffffff', zIndex: 999, alignItems: 'flex-end', marginBottom: '10px', marginTop: '10px', padding: '0 4px' }}>
                <TextField
                    placeholder="Введите сообщение"
                    onChange={(e: any) => setMessage(e.target.value)}
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