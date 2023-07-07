import React from 'react';

import { IconButton, Modal, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { PropertyRulesWithCache } from "@/components/Property/PropertyRules/propertyRulesWithCache";

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 'calc(100% - 100px)',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
    m: 1
};

export const ModalWindow: React.FC<any> = (props) => {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                sx={{ zIndex: "10 !important" }}
            >
                <Box sx={style}>
                    <div style={{
                        height: '50px',
                        padding: '0px',
                        margin: '0px',
                        zIndex: 1,
                        position: 'sticky',
                        top: '0px',
                        left: '0px',
                        backgroundColor: 'white',
                    }}>
                        <IconButton
                            sx={{ m: 1, border: '1px solid black' }}
                            color="inherit"
                            size="small"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <PropertyRulesWithCache {...props} />
                </Box>
            </Modal>
        </>
    );
}