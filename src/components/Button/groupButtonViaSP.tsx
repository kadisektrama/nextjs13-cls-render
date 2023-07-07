import * as React from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type TMapStateToProps = {
    field_name: string
}

export const GroupButton = ({ field_name }: TMapStateToProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div style={{ border: '1px solid', width: 'max-content', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '2px', marginTop: '8px' }}>
            <IconButton 
                disabled={(searchParams?.get(field_name) || '0') === '0'} 
                onClick={() => {
                    const search = searchParams.toString() ? Object.fromEntries(searchParams.entries() || []) : {}                        
                    router.push(`${pathname}?${new URLSearchParams({...search, page: '1', [field_name]: parseInt(searchParams.get(field_name) || '0') - 1 + ''}).toString()}`, {scroll: false})                    
                }} 
                aria-label="cart"
            >
                <RemoveIcon />
            </IconButton>       
                {searchParams?.get(field_name) || 0}
            <IconButton 
                onClick={() => {
                    const search = searchParams.toString() ? Object.fromEntries(searchParams.entries() || []) : {}                        
                    router.push(`${pathname}?${new URLSearchParams({...search, page: '1', [field_name]: parseInt(searchParams.get(field_name) || '0') + 1 + ''}).toString()}`, {scroll: false}) 
                }} 
                aria-label="cart"
            >
                <AddIcon />
            </IconButton>
        </div>
    )
}