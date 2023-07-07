import React from "react";

import List from "@mui/material/List";
import { ChatInterface } from "./ChatInterface/chatInterface";

import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const ListChat: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [isLoaded] = React.useState(true);

    return (
        <>
            {isLoaded ? (
                <List sx={{ width: '100%' }}>
                    {(state.user.chats.map((item: any) => (
                        <ChatInterface key={item.id} item={item} index={item.id} />
                    )))}
                </List>
            ) : (
                <SimpleLoader />
            )}
        </>
    )
}