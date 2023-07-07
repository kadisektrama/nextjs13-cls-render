import { createTheme } from '@mui/material';
//import { createTheme } from "@material-ui/core/styles";

export const themeDateRangePicker = createTheme({
    overrides: {
        margin: 'none',
        padding: 'none',
        MuiPaper: {
            elevation1: {
                boxShadow: 'none',
            }
        },
        MuiTypography: {
            root: {
                marginBottom: 'none',
            }
        },
        MuiButtonBase: {
            root: {
                color: 'none',
                border: 'none',
                margin: 'none',
                outline: 'none',
                padding: 'none',
                alignItems: 'none',
                //backgroundColor: 'none',
                borderRadius: 'none',
                position: 'none',
            }
        },
        MuiPickersDay: {
            root: {
                alignItems: 'center',
            }
        },
        MuiIconButton: {
            root: {
                padding: 'none',
            },
            sizeSmall: {
                padding: 'none',
            }
        }
    },

    typography: {
        color: '#070205',
    },
    tr: {
        backgroundColor: "#f1f1f1",
        '&:hover': {
            backgroundColor: "#f00",
        },
    },
    palette: {
        primary: {
            main: '#14a800',
        },
        secondary: {
            light: '#0066ff',
            main: '#ffffff',
            contrastText: '#ffcc00',
        },
        success: {
            main: '#3c8224',
        },
        actions: {
            hover: '#3c8224',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
})

export const themeContent = createTheme({
    typography: {
        color: '#070205',
    },
    tr: {
        backgroundColor: "#f1f1f1",
        '&:hover': {
            backgroundColor: "#f00",
        },
    },
    palette: {
        primary: {
            main: '#14a800',
        },
        secondary: {
            light: '#0066ff',
            main: '#ffffff',
            contrastText: '#ffcc00',
        },
        success: {
            main: '#3c8224',
        },
        actions: {
            hover: '#3c8224',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
})

export const themeFooter = createTheme({
    palette: {
        primary: {
            main: '#f1f2f4',
        },
        success: {
            main: '#3c8224',
        },
        actions: {
            hover: '#3c8224',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
})

export const themeHeader = createTheme({
    typography: {
        color: '#070205',
    },
    link: {
        background: "#3c8224",
        '&:hover': {
            background: "#3c8224",
        },
    },
    palette: {
        primary: {
            main: '#ffffff',
            contrastText: '#070205',
        },
        success: {
            main: '#3c8224',
        },
        actions: {
            hover: '#3c8224',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
})