// UI
import Button from "@mui/material/Button"

// Tools
import { CardViewReviewForBusiness as Card } from "@/components/Cards/CardViewReviewForBusiness/cardViewReviewForBusiness";
import { getNoun } from "@/utils/Helpers/Translator/translator"
import { useAppSelector } from "@/redux/hooks/hooks";

export const Cards: React.FC<any> = (props) => {
    const property = useAppSelector(state => state.property.property)

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: '10px' }}>
            {property.moderatedReviews.data.reviews.slice(0, 3).map((category, index) => (
                <Card moderatedReview={category} key={index} />
            ))}

            {property.moderatedReviews.data.reviews.length > 3 && (
                <div>
                    <Button variant="outlined" sx={{ color: 'black', borderColor: 'black' }} onClick={() => {props.setScreen('reviews')}}>
                        {`Показать ${property.moderatedReviews.data.reviews.length} ${getNoun(property.moderatedReviews.data.reviews.length, 'отзыв', 'отзыва', 'отзывов')}`}
                    </Button>
                </div>
            )}
        </div>
    )
}