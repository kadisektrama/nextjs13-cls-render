import { useState } from 'react'

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Input } from 'antd';

/**
 *
 * @param menuItems
 * @param menuItemValue
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const InputDropDown = ({ menuItems, menuItemValue, ...props }) => {
    const [value, setValue] = useState('')

    return (
        <TextField {...props}>
            <Input value={value} onChange={e => {console.log(e.target.value); setValue(e.target.value)}} style={{ width: props.style.width - 32 + 'px', margin: '6px 16px 6px 16px' }}></Input>

            {menuItems.filter(option => option[menuItemValue].includes(value)).map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option[menuItemValue]}
                </MenuItem>
            ))}
        </TextField>
    )
}