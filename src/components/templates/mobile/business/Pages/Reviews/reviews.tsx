// UI
import StarRateIcon from "@mui/icons-material/StarRate";
import { Stack, Tooltip, Paper } from "@mui/material";
import { Progress } from "antd";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppSelector } from "@/redux/hooks/hooks";

// Tools
import { Cards } from "./Cards/cards";
import { getNoun } from "@/utils/Helpers/Translator/translator";


export const Reviews: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)

    window.scrollTo(0, 0)

    return (
        <>
            <Paper
                style={{
                    position: 'fixed',
                    top: 0,
                    height: '60px',
                    width: '100%',
                    padding: "0 5%",
                    backgroundColor: 'white',
                    zIndex: 999,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 0
                }}
                elevation={3}
            >
                <IconButton onClick={() => props.setScreen('')}>
                    <ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} />
                </IconButton>
            </Paper>
            <div style={{ marginTop: "60px", paddingBottom: "80px", zIndex: 2 }}>
                <Stack spacing={3} sx={{ padding: '24px 32px 24px 32px' }}>
                    <div style={{ display: 'flex', fontSize: '20px', fontWeight: 600 }}>
                        <StarRateIcon /><span style={{ marginLeft: '10px' }}>{Math.floor(+state.property.property.moderatedReviews.data.scoreAvg * 10) / 10} &middot; {state.property.property.moderatedReviews.data.scoreCount} {getNoun(state.property.property.moderatedReviews.data.scoreCount, 'отзыв', 'отзыва', 'отзывов')}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: '15%', gridRowGap: '12px' }}>
                        {state.property.property.moderatedReviews.data.scorePerCategory.map((category, index) => (
                            <Tooltip title={category.name} key={index}>
                                <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'space-between', justifyItems: 'end', gridTemplateColumns: '110px 1fr' }}>
                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{category.name}</span><div style={{ display: 'flex', flexDirection: 'row', width: '180px', alignItems: 'center' }}><Progress percent={Math.floor(+category.scoreAvg * 100) / 100 * 10} size="small" showInfo={false} strokeColor="black" /><span style={{ marginLeft: '16px' }}>{(Math.floor(+category.scoreAvg * 10) / 10).toFixed(1)}</span></div>
                                </div>
                            </Tooltip>
                        ))}
                    </div>

                    <Cards />
                </Stack>
            </div>
        </>
    )
}