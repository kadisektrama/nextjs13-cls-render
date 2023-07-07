// Core
import React, { useState } from 'react';

// UI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import { Progress } from "antd";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Tools
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { Cards } from "./Cards/cards";
import { useAppSelector } from '@/redux/hooks/hooks';
import { TScorePerCategory } from "@/types/IProperty";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '1032px',
    height: 'calc(100% - 100px)',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
};

export const ModalWindowReviews: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const [open, setOpen] = useState(false);

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <Box sx={style}>
                    <div style={{ zIndex: 1, position: 'sticky', top: '0px', left: '0px', backgroundColor: 'white' }}>
                        <IconButton
                            sx={{ m: 1 }}
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <Box sx={{ p: 3, pt: 0 }}>
                        <div style={{ display: 'flex', fontSize: '20px', fontWeight: 600, paddingBottom: '16px', position: 'sticky', top: '60px', left: '16px', backgroundColor: 'white'  }}>
                            <StarRateIcon /><span style={{ marginLeft: '10px' }}>{Math.floor(+state.property.property.moderatedReviews.data.scoreAvg * 10) / 10} &middot; {state.property.property.moderatedReviews.data.scoreCount} {getNoun(state.property.property.moderatedReviews.data.scoreCount, 'отзыв', 'отзыва', 'отзывов')}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', alignItems: 'start', gap: '10%' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: '15%', gridRowGap: '12px', position: 'sticky', top: '110px', left: '24px', backgroundColor: 'white' }}>
                                {state.property.property.moderatedReviews.data.scorePerCategory.map((category: TScorePerCategory) => (
                                    <Tooltip title={category.name} key={category.name}>
                                        <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'space-between', justifyItems: 'end', gridTemplateColumns: '110px 1fr' }}>
                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{category.name}</span><div style={{ display: 'flex', flexDirection: 'row', width: '180px', alignItems: 'center' }}><Progress percent={Math.floor(+category.scoreAvg * 100) / 100 * 10} size="small" showInfo={false} strokeColor="black" /><span style={{ marginLeft: '16px' }}>{(Math.floor(+category.scoreAvg * 10) / 10).toFixed(1)}</span></div>
                                        </div>
                                    </Tooltip>
                                ))}
                            </div>

                            <Cards />
                        </div>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}