// UI
import Typography from "@mui/material/Typography";

export const ThankYouPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 3 }}>Спасибо за ваш отзыв!</Typography>
            <div>Ваши отзывы помогают хозяину меняться к лучшему, а гостям - понимать, чего ожидать.</div>
        </div>
    )
}