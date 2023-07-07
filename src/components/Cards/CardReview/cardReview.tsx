// Tools
import { First } from "./First/first";
import { Second } from "./Second/second";
import { Third } from "./Third/third";
import { ThankYouPage } from "./ThankYouPage/thankYouPage";

export const CardReview: React.FC<any> = (props) => {
    return (
        <div style={{ paddingRight: '15px', paddingLeft: '15px' }}>
            {props.screen === 'first' && (
                <First {...props} />
            )}

            {props.screen === 'second' && (
                <Second {...props} />
            )}

            {props.screen === 'third' && (
                <Third {...props} />
            )}

            {props.screen === 'thankYouPage' && (
                <ThankYouPage {...props} />
            )}
        </div>
    )
}
