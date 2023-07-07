import * as React from 'react';

import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export const TriggersTooltips: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item>
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="Позволяет забронировать без подтверждения хозяина"
                            >
                                <div onClick={handleTooltipOpen}>Мгновенное бронирование</div>
                            </Tooltip>
                        </div>
                    </ClickAwayListener>
                </Grid>
            </Grid>
        </div>
    );
}
