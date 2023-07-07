'use client'

import React from 'react'
import { ThemeProvider as ThemeProviderMui } from "@mui/material/styles";
import { themeContent } from './themes';

const theme = themeContent

type TMapStateToProps = {
    children: React.ReactNode,
}

export const ThemeProviderContent: React.FC<TMapStateToProps> = ({ children }) => {
    
    return (
        <ThemeProviderMui theme={theme}>
            {children}
        </ThemeProviderMui>
    )
}