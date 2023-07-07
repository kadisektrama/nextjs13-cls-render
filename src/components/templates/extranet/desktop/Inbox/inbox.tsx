// Core
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

// UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

// Tools
import { fetchUserChatsExtranet } from "@/redux/thunk/user";
import { Chat } from "./Chat/chat";
import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { Information } from "./Information/information";
import { ListChat } from "./ListChat/listChat";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Content: React.FC = () => {
    const {id} = useParams();

    return (
        <>
            <Grid item xs={5.8}>
                {id && (
                    <Chat />
                )}
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={3}>
                {id && (
                    <Information />
                )}
            </Grid>
        </>
    )
}

export const Inbox: React.FC<{children: React.ReactNode}> = ({children}) => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        Promise.all([dispatch(fetchUserChatsExtranet())])
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <>
            {isLoaded ? (
                <Box sx={{ flexGrow: 1, height: '100%' }}>
                    <Grid container spacing={3} columnSpacing={0} sx={{ height: '100%', marginTop: 0 }}>
                        <Grid item xs={3}>
                            <Typography component="h1" variant="h5" sx={{ pl: 2 }}>
                                Все сообщения
                            </Typography>
                            <div style={{ overflowY: 'scroll', maxHeight: `${document.documentElement.clientHeight - 194}px` }}>
                                {state.user.chats.length
                                    ? <ListChat  />
                                    : <Box sx={{ p: 2 }}><InfoWindowEmpty firstRow={'Нет чатов'}/></Box>
                                }
                            </div>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        {children}
                        {/* <Grid item xs={5.8}>
                            {id && (
                                <Chat  />
                            )}
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={3}>
                            {id && (
                                <Information />
                            )}
                        </Grid> */}
                    </Grid>
                </Box>
            ) : (
                <SimpleLoader />
            )}
        </>
    )
}