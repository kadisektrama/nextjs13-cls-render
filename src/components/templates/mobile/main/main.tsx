import React from "react"
import { useRouter } from "next/navigation";

export const Main: React.FC = () => {
    const router = useRouter()
    router.push(`/brest${window.location.search}`)

    return(
        <div></div>
    )
}


