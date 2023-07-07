import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

import { Chat } from "./Chat/chat";
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { ListChat } from "./ListChat/listChat";
import { Information } from "./Information/information";
import { fetchUserChatsSecure } from "@/redux/thunk/user";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Content: React.FC = () => {
    const {id} = useParams();
    const state = useAppSelector(state => state)
    
    return (
        <>
            <Grid item xs={6.5}>
                {id && (
                    <Chat />
                )}
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2.3}>
                {id && (
                    <Information chat={state.user.chats.data.find((item: any) => item.id === +id)} />
                )}
            </Grid>
        </>
    )
}

export const Inbox: React.FC<{children: React.ReactNode}> = ({children}) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([dispatch(fetchUserChatsSecure())])
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <>
            {isLoaded ?
                (
                    <Box sx={{ flexGrow: 1, height: '100%' }}>
                        <Grid container spacing={3} sx={{ height: '100%', marginTop: 0 }}>
                            <Grid item xs={3} sx={{ borderColor: 'black', borderRight: '1px' }}>
                                <Typography component="h1" variant="h5" sx={{ pl: 2 }}>
                                    Все сообщения
                                </Typography>
                                <div style={{ overflowY: 'scroll', maxHeight: `${document.documentElement.clientHeight - 194}px` }}>
                                    {state.user.chats.data.length
                                        ? <ListChat />
                                        : <Box sx={{ p: 2 }}><InfoWindowEmpty firstRow={'Нет чатов'}/></Box>
                                    }
                                </div>
                            </Grid>
                            <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                            {children}
                            {/* <Grid item xs={6.5}>
                                {id && (
                                    <Chat />
                                )}
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item xs={2.3}>
                                {id && (
                                    <Information chat={state.user.chats.data.find((item: any) => item.id === +id)} />
                                )}
                            </Grid> */}
                        </Grid>
                    </Box>
                ) : (
                    <SimpleLoader />
                )
            }
        </>
    )
}