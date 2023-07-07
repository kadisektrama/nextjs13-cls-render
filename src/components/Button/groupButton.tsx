import * as React from 'react'
import { useSearchParams } from 'next/navigation'

import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type TMapStateToProps = {
    value: number,
    setValue: (value: any) => void
}

export const GroupButton = ({ value, setValue }: TMapStateToProps) => {
    return (
        <div style={{ border: '1px solid', width: 'max-content', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '2px', marginTop: '8px' }}>
            <IconButton disabled={value === 0} onClick={() => setValue(value - 1)} aria-label="cart"><RemoveIcon /></IconButton>       
                {value || 0}
            <IconButton onClick={() => setValue(value + 1)} aria-label="cart"><AddIcon /></IconButton>
        </div>
    )
}