import React from "react";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { ModalWindow } from "./ModalWindow/modalWindow";
import { Photo } from "./Photo/photo";

export const Room: React.FC<any> = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    return (
        <>
            <Accordion key={props.index}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Спальня {props.index + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <Photo {...props} />
                        <Divider />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>Спальные места</div>
                            <Button variant="text" sx={{ textDecoration: 'underline', color: 'black' }} onClick={() => handleOpen()}>Редактировать</Button>
                        </div>
                    </Stack>
                </AccordionDetails>
            </Accordion>

            <ModalWindow {...props} open={open} handleClose={handleClose} />
        </>
    )
}