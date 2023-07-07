// UI
import StarRateIcon from "@mui/icons-material/StarRate";
import { Stack, Tooltip } from "@mui/material";
import { Progress } from 'antd';

// Tools
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { Cards } from "./Cards/cards";
import React from "react";
import { useAppSelector } from "@/redux/hooks/hooks";

export const Reviews: React.FC<any> = (props) => {
    const property = useAppSelector(state => state.property.property)

    return (
        <Stack spacing={3} sx={{ padding: '24px 32px 24px 32px' }}>
            <div style={{ display: 'flex', fontSize: '20px', fontWeight: 600 }}>
                <div style={{ color: 'white', backgroundColor: '#14a800', fontWeight: 600, width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5.5px', marginLeft: '10px', }}>{Math.floor(+property.moderatedReviews.data.scoreAvg * 10) / 10}</div>
                <span style={{ marginLeft: '10px' }}>{property.moderatedReviews.data.scoreCount} {getNoun(property.moderatedReviews.data.scoreCount, 'отзыв', 'отзыва', 'отзывов')}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: '15%', gridRowGap: '12px' }}>
                {property.moderatedReviews.data.scorePerCategory.map((category, index) => (
                    <Tooltip title={category.name} key={index}>
                        <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'space-between', justifyItems: 'end', gridTemplateColumns: '110px 1fr' }}>
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{category.name}</span><div style={{ display: 'flex', flexDirection: 'row', width: '180px', alignItems: 'center' }}><Progress percent={Math.floor(+category.scoreAvg * 100) / 100 * 10} size="small" showInfo={false} strokeColor="black" /><span style={{ marginLeft: '16px' }}>{(Math.floor(+category.scoreAvg * 10) / 10).toFixed(1)}</span></div>
                        </div>
                    </Tooltip>
                ))}
            </div>

            <Cards {...props} />
        </Stack>
    )
}