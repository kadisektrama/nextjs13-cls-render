import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import List from "@mui/material/List";

import { InfoWindowEmpty } from "@/components/InfoWindow/infoWindowEmpty";
import { ListChat } from "./ListChat/listChat";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { fetchUserChatsSecure } from "@/redux/thunk/user";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";

export const Inbox: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([dispatch(fetchUserChatsSecure())])
            .then(() => setIsLoaded(true))
    }, [id])

    return (
        <AccountHeader name={'Входящие'}>
            {isLoaded ? (
                <List sx={{ paddingBottom: 7 }}>
                    {state.user.chats.data.length
                        ? <ListChat />
                        : <InfoWindowEmpty firstRow={'Нет чатов'}/>
                    }
                </List>
            ) : <SimpleLoader />}
        </AccountHeader>
    )
}