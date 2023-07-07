// UI
import { Divider, List } from "@mui/material";

// Tools
import { Card } from "./Card/card";
import { useAppSelector } from "@/redux/hooks/hooks";

export function Cards() {
    const state = useAppSelector(state => state)
    
    return (
        <List>
            <Divider component="li" />

            {state.review.reviews.map((review: any) => (
                <Card key={review.id} relatedReview={review} />
            ))}
        </List>
    )
}
