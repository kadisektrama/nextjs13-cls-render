import 'react-spring-bottom-sheet/dist/style.css';
import React from "react";

import Paper from "@mui/material/Paper";

import logo from "../../../../../../public/logo/logo.png"
import { useScrollDirection } from "@/utils/Helpers/CustomHooks/scrollDirection"
import Image from 'next/image'

export function Header() {
    const scrollDirection = useScrollDirection()

    return (
        <Paper
            style={{
                position: 'fixed',
                height: '60px',
                width: '100%',
                padding: "0 5%",
                backgroundColor: 'white',
                zIndex: 999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
                top: scrollDirection === 'down' ? '-60px' : '0px',
                transitionProperty: 'all',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '500ms',
            }}
            elevation={3}
        >
            <Image height={18} src={logo} alt='logo' />
        </Paper>
    )
}
