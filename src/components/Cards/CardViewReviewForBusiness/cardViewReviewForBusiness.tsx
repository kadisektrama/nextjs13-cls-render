// Core
import { format } from "date-fns";

// UI
import { Avatar } from "@mui/material";
import { IReview } from "@/types/IReview";

export const CardViewReviewForBusiness: React.FC<{moderatedReview: IReview}> = (props) => {

    return (
        <div style={{ marginRight: '17%', marginBottom: '40px' }}>
            <div style={{ display: 'flex', marginBottom: '16px', alignItems: 'center' }}>
                <Avatar alt={'Аватар'} src={props.moderatedReview.is_anonymous ? '' : props.moderatedReview.user?.photo?.url}>{props.moderatedReview.is_anonymous ? '' : props.moderatedReview.user?.first_name[0]}</Avatar>
                <div style={{ marginLeft: '12px' }}>
                    <div>{props.moderatedReview.is_anonymous ? 'Аноним' : props.moderatedReview.user?.first_name}</div>
                    <div>{props.moderatedReview.created_at ? format(new Date(props.moderatedReview.created_at), 'dd-MM-yyyy') : format(new Date(), 'dd-MM-yyyy')}</div>
                </div>
            </div>
            <div>{props.moderatedReview.public_comment}</div>
        </div>
    )
}