import React, { useState } from "react";

import List from "@mui/material/List";

import { ChatInterface } from "./ChatInterface/chatInterface";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector } from "@/redux/hooks/hooks";

export const ListChat: React.FC = () => {
    const state = useAppSelector(state => state)
    const [isLoaded] = useState(true);

    return (
        <>
            {isLoaded ? (
                <List sx={{ width: '100%' }}>
                    {(state.user.chats.data.map((item: any) => (
                        <ChatInterface key={item.id} item={item} index={item.id} />
                    )))}
                </List>
            ) : (
                <SimpleLoader />
            )}
        </>
    )
}