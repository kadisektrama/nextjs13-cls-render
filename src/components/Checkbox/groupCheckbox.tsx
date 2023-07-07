import React from 'react'
import { useSearchParams } from 'next/navigation'

import { Checkbox } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type TMapStateToProps = {
    initData: any,
    data: any,
    filter_name?: string,
    field_name?: string,
    content_style?: {},
    setData: (value: any) => void
}

type TSearchParams = {
    [key: string]: any
}

export const GroupCheckbox = ({ initData, data, setData, filter_name, content_style }: TMapStateToProps) => {
    const [showAmenities, setShowAmenities] = React.useState(false);
    return (
        <>
            <div id="content" style={content_style && content_style}>
                {
                    initData
                        .filter((i: any) => filter_name ? (showAmenities ? true : i[filter_name] === true) : true)
                        .map((i: any) => {                       
                            return (
                                <div key={i.id}>
                                    <Checkbox 
                                        sx={{ padding: "3px", fontSize: "13px" }} 
                                        checked={!!data?.split(',').find((id: any) => +id === i.id)}
                                        onChange={(e) => {                                       
                                            e.target.checked 
                                                ? setData(data ? data.split(',').concat(i.id).toString() : `${i.id}`)
                                                : setData(data.split(',').filter((a: any) => +a !== i.id).toString()) 
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
                            : <div style={{ textDecoration: "none",fontSize: "14px", display: "flex", alignItems: "center", color: "#0071c2", cursor: 'pointer' }} onClick={() => setShowAmenities(prev => !prev)}>Показать все {initData.length} фильтров<ExpandMoreIcon sx={{ fontSize: 14 }} /></div>
                    )
                }    
        </>
    )
}