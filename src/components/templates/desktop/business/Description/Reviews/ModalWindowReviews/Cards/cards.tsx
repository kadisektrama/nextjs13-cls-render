// Tools
import { CardViewReviewForBusiness as Card } from "@/components/Cards/CardViewReviewForBusiness/cardViewReviewForBusiness";
import { useAppSelector } from "@/redux/hooks/hooks";

export const Cards: React.FC = () => {
    const state = useAppSelector(state => state)

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: '10px', gridRowGap: '10px', overflowY: 'scroll' }}>
            {state.property.property.moderatedReviews.data.reviews.map((category: any, index: any) => (
                <Card moderatedReview={category} key={index} />
            ))}
        </div>
    )
}