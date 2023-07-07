import * as React from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import { Checkbox } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type TMapStateToProps = {
    data: any,
    field_name: string,
    filter_name?: string,
    content_style?: {},
}

type TSearchParams = {
    [key: string]: any
}

export const GroupCheckbox = ({ data, field_name, filter_name, content_style }: TMapStateToProps) => {
    const [showAmenities, setShowAmenities] = React.useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <div id="content" style={content_style && content_style}>
                {
                    data
                        .filter((i: any) => filter_name ? (showAmenities ? true : i[filter_name] === true) : true)
                        .map((i: any) => {
                            const data = searchParams.get(field_name) as string;

                            return (
                                <div key={i.id}>
                                    <Checkbox 
                                        sx={{ padding: "3px", fontSize: "13px" }} 
                                        checked={!!data?.split(',').find((id) => +id === i.id)}
                                        onChange={(e) => 
                                            {     
                                                const search = searchParams.toString() ? Object.fromEntries(searchParams.entries() || []) : {}
                                                const params = e.target.checked 
                                                    ? new URLSearchParams({...search, page: '1', [field_name]: data ? data.split(',').concat(i.id).toString() : `${i.id}`}).toString()
                                                    : new URLSearchParams({...search, page: '1',[field_name]: data.split(',').filter((a: any) => +a !== i.id) + ''}).toString()                        
                                                
                                                router.push(`${pathname}?${params}`, {scroll: false})                                                                          
                                            }
                                        }
                                    />
                                    <span style={{ fontSize: "13px" }}>{i.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    filter_name && (
                        showAmenities 
                            ? <div style={{ textDecoration: "none",fontSize: "14px", display: "flex", alignItems: "center", color: "#0071c2", cursor: 'pointer' }} onClick={() => setShowAmenities(prev => !prev)}>Скрыть<ExpandLessIcon sx={{ fontSize: 14 }} /></div> 
                            : <div style={{ textDecoration: "none",fontSize: "14px", display: "flex", alignItems: "center", color: "#0071c2", cursor: 'pointer' }} onClick={() => setShowAmenities(prev => !prev)}>Показать все {data.length} фильтров<ExpandMoreIcon sx={{ fontSize: 14 }} /></div>
                    )
                }    
        </>
    )
}