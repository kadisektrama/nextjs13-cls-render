import React, { useState } from "react";

import { ChatInterface } from "./ChatInterface/chatInterface";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { useAppSelector } from "@/redux/hooks/hooks";

export const ListChat: React.FC = () => {
    const [isLoaded] = useState(true);
    const state = useAppSelector(state => state) 

    return (
        <>
            {isLoaded ? (
                (state.user.chats.data.map((item: any) => (
                    <ChatInterface key={item.id} item={item} index={item.id} />
                    )))
                )
                : <SimpleLoader />
            }
        </>
    )
}