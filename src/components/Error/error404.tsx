import { Link } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 700,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Error404() {
    return (
        <>
            <Container>
                <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '200px' }} variant="h3" paragraph color="primary">
                        404
                    </Typography>

                    <Typography sx={{ marginBottom: '20px' }}>
                        СТРАНИЦА НЕ НАЙДЕНА
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', marginBottom: '50px' }}>
                        Страница, которую вы ищите не найдена. Возможно обьявление было удалено или вы ввели некорректный URL страницы.
                    </Typography>

                    <Button href="/" size="large" variant="contained" component={Link}>
                        Перейти на главную страницу сайта
                    </Button>
                </StyledContent>
            </Container>
        </>
    );
}
