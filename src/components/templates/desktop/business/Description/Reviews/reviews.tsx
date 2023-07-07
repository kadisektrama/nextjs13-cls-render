import React from 'react'

// UI
import { Stack, Tooltip } from "@mui/material";
import { Progress } from 'antd';

// Tools
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { Cards } from "./Cards/cards";
import { useAppSelector } from '@/redux/hooks/hooks';
import { TScorePerCategory } from "@/types/IProperty";

export const Reviews = () => {
    const moderatedReviews = useAppSelector(state => state.property.property.moderatedReviews)

    return (
        <Stack spacing={3}>
            <div style={{ display: 'flex', fontSize: '20px', fontWeight: 600 }}>
                <div style={{ color: 'white', backgroundColor: '#14a800', fontWeight: 600, width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5.5px', marginLeft: '10px', }}>{Math.floor(+moderatedReviews.data.scoreAvg * 10) / 10}</div>
                <span style={{ marginLeft: '10px' }}>{moderatedReviews.data.scoreCount} {getNoun(moderatedReviews.data.scoreCount, 'отзыв', 'отзыва', 'отзывов')}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '10%', gridRowGap: '12px' }}>
                {moderatedReviews.data.scorePerCategory.map((category: TScorePerCategory) => (
                    <Tooltip title={category.name} key={category.name}>
                        <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'space-between', justifyItems: 'end', gridTemplateColumns: '1fr 190px' }}>
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{category.name}</span><div style={{ display: 'flex', flexDirection: 'row', width: '180px', alignItems: 'center' }}><Progress percent={Math.floor(+category.scoreAvg * 100) / 100 * 10} size="small" showInfo={false} strokeColor="black" /><span style={{ marginLeft: '16px' }}>{(Math.floor(+category.scoreAvg * 10) / 10).toFixed(1)}</span></div>
                        </div>
                    </Tooltip>
                ))}
            </div>

            <Cards moderatedReviews={moderatedReviews} />
        </Stack>
    )
}