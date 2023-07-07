import Link from "next/link"
import { format } from "date-fns"

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

export const CardReview = ({item}: any) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ cursor: 'pointer' }}>
            <Link href={`/host/progress/reviews/${item.id}`}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="subtitle2">
                            Отзыв
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {format(new Date(item.created_at), 'dd-MM-yyyy')}<br/>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 20px', }}>
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.public_comment}</div>
                                <div>{item.score}</div>
                            </div>
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}