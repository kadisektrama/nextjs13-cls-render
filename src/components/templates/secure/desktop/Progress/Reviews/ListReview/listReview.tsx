// Core
import React from "react";

// UI
import List from "@mui/material/List";

// Tools
import { ReviewInterface } from "./ReviewInterface/reviewInterface";
import { useAppSelector } from "@/redux/hooks/hooks";

export const ListReview: React.FC = () => {
    const state = useAppSelector(state => state)

    return (
        <List sx={{ width: '100%' }}>
            {(state.review.reviews.map((item: any) => (
                <ReviewInterface key={item.id} relatedReview={item} index={item.id} />
            )))}
        </List>
    )
}