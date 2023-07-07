import * as React from 'react'
import { Checkbox } from "@mui/material";

type TMapStateToProps = {
    value: boolean,
    name: string,
    setValue: (value: any) => void,
}

export const CustomCheckbox = ({ value, setValue, name }: TMapStateToProps) => {
    return (
        <div><Checkbox sx={{ padding: "3px", fontSize: "13px" }} checked={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.checked)}/><span style={{ fontSize: "13px" }}>{name}</span></div>
    )
}