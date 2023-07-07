// UI
import Button from "@mui/material/Button";

// Tools
import { CardViewReviewForBusiness as Card } from "@/components/Cards/CardViewReviewForBusiness/cardViewReviewForBusiness";
import { getNoun } from "@/utils/Helpers/Translator/translator";

export const Cards: React.FC<any> = ({ moderatedReviews, ...props }) => {
    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '10px', gridRowGap: '10px' }}>
                {moderatedReviews.data.reviews.slice(0, 4).map((category: any, index: any) => (
                    <Card moderatedReview={category} key={index} />
                ))}
            </div>

            {moderatedReviews.data.reviews.length > 4 && (
                <div>
                    <Button
                        variant="outlined"
                        sx={{ color: 'black', borderColor: 'black' }}
                        onClick={() => props.setOpenWindowReviews(true)}
                    >
                        {`Показать ${moderatedReviews.data.reviews.length} ${getNoun(moderatedReviews.data.reviews.length, 'отзыв', 'отзыва', 'отзывов')}`}
                    </Button>
                </div>
            )}
        </>
    )
}