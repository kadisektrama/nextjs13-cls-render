import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import { Messages } from "./Messages/messages";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { fetchUserChatSecure } from "@/redux/thunk/user";
import { useAppDispatch } from "@/redux/hooks/hooks";

export const Chat: React.FC = () => {
    const dispatch = useAppDispatch()
    const [isLoaded, setIsLoaded] = React.useState<any>(false);
    const [error, setError] = React.useState<any>(false);
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchUserChatSecure(id))
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
            {isLoaded ? (
                <Messages />
            ) : (
                <SimpleLoader />
            )}
        </>
    )
}