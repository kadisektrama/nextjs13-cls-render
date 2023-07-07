import { useParams } from "next/navigation";
import React, { useEffect, useState, useReducer } from "react";

import { fetchUserChatSecure } from "@/redux/thunk/user";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { Messages } from "./Messages/messages";

export const Chat: React.FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<any>(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        Promise.all([dispatch(fetchUserChatSecure(id))])
            .then(
                (res) => {
                    setIsLoaded(true)
                },
                (error) => {
                    setError('404');
                    throw new Error('404 Page Not Found');
                }
            )

        const timer = setInterval(() => {
            id && dispatch(fetchUserChatSecure(id))
            forceUpdate();
        }, 15000);

        return function cleanup() {
            clearInterval(timer);
        };
    }, [id])

    if (error) {
        throw new Error('404 Page Not Found');
    }

    return(
        <>
            {isLoaded && (
                <Messages />
            )}
        </>
    )
}