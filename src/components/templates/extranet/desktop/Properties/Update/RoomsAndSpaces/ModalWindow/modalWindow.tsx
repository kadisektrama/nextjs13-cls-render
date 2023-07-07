import * as React from 'react';

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 880,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
};

export const ModalWindow: React.FC<any> = (props) => {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <Box sx={style}>
                    <IconButton
                        sx={{ m: 1 }}
                        color="inherit"
                        onClick={props.handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Stack
                        spacing={2}
                    >
                        <Box sx={{ paddingLeft: '40px', paddingRight: '40px', fontSize: '14px' }}>
                            <Stack
                                spacing={1}
                            >
                                <Typography sx={{ fontWeight: 700 }} variant="h6" component="h5" gutterBottom>Какие помещения могут использовать гости?</Typography>
                                <div>Опишите все помещения, доступные гостям, в том числе общие</div>
                                <Stack
                                    spacing={2}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>Спальня</div>
                                        <div>
                                            <IconButton aria-label="fingerprint" onClick={() => {
                                                props.propertyActions.setSummaryNumberOfBedrooms(Number(props.property.roomsAndSpaces.summary.number_of_bedrooms) - 1)

                                                let bedroomsInfo = props.property.roomsAndSpaces.bedrooms_info;
                                                bedroomsInfo.pop();

                                                props.propertyActions.setBedroomsInfo(bedroomsInfo);
                                            }}>
                                                <RemoveRoundedIcon />
                                            </IconButton>
                                            {props.property.roomsAndSpaces.summary.number_of_bedrooms}
                                            <IconButton aria-label="fingerprint" onClick={() => {
                                                props.propertyActions.setSummaryNumberOfBedrooms(Number(props.property.roomsAndSpaces.summary.number_of_bedrooms) + 1)

                                                let bedroomsInfo = props.property.roomsAndSpaces.bedrooms_info;
                                                bedroomsInfo.push({
                                                    beds: [],
                                                    photo_path: null,
                                                })

                                                props.propertyActions.setBedroomsInfo(bedroomsInfo);
                                            }}>
                                                <AddRoundedIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>Ванная</div>
                                        <div>
                                            <IconButton aria-label="fingerprint" onClick={() => {props.propertyActions.setSummaryNumberOfBathrooms(Number(props.property.roomsAndSpaces.summary.number_of_bathrooms) - 1)}}>
                                                <RemoveRoundedIcon />
                                            </IconButton>
                                            {props.property.roomsAndSpaces.summary.number_of_bathrooms}
                                            <IconButton aria-label="fingerprint" onClick={() => {props.propertyActions.setSummaryNumberOfBathrooms(Number(props.property.roomsAndSpaces.summary.number_of_bathrooms) + 1)}}>
                                                <AddRoundedIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}