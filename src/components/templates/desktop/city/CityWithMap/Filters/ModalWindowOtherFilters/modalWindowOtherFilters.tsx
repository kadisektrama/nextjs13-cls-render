import * as React from 'react'

import { Box, Modal, Button, Typography, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { GroupButton as CustomGroupButton } from "@/components/Button/groupButton"
import { CustomCheckbox } from "@/components/Checkbox/checkbox"
import { GroupCheckbox as CustomGroupCheckbox } from "@/components/Checkbox/groupCheckbox"

import { useAppSelector } from '@/redux/hooks/hooks';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '90%',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
};

export const ModalWindowOtherFilters: React.FC<any> = (props) => {
    const { amenities } = useAppSelector(state => state.amenity)

    const handleClose = () => {
        props.handleClose('')
    }

    return (
        <>
            <Modal
                open={props.isOpen}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <div id="header" style={{ position: 'absolute', top: '0px', left: '0px', height: '64px', right: '0px', overflow: 'hidden', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'solid 1px #EBEBEB', padding: '16px' }}>
                        <div>
                            <IconButton onClick={handleClose} aria-label="cart"><CloseIcon /></IconButton>       
                        </div>
                        <div><b>Фильтры</b></div>
                        <div style={{ width: '41.5px' }} />
                    </div> 

                    <Stack id="content" style={{ position: 'absolute', top: '64px', bottom: '80px', left: '0px', right: '0px', overflow: 'auto', padding: '24px' }} spacing={2}>
                        <Typography variant="h6" gutterBottom>Удобства</Typography>
                        <CustomGroupCheckbox content_style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} filter_name={'is_popular'} setData={(value) => props.setAmenities(value)} data={props.amenities} initData={amenities} field_name={'filter[amenity]'} />  
                        
                        <Typography variant="h6" gutterBottom>Спальные места</Typography>
                        <CustomGroupButton value={props.numberOfBeds} setValue={(value) => props.setNumberOfBeds(value)} />

                        <Typography variant="h6" gutterBottom>Отдельные комнаты</Typography>   
                        <CustomGroupButton value={props.numberOfBedrooms} setValue={(value) => props.setNumberOfBedrooms(value)} />

                        <Typography variant="h6" gutterBottom>Правила размещения</Typography>
                        <div>
                            <CustomCheckbox value={props.petsAllowed} setValue={(value) => props.setPetsAllowed(value)} name={'Можно с питомцами'} />
                            <CustomCheckbox value={props.smokingAllowed} setValue={(value) => props.setSmokingAllowed(value)} name={'Можно курить'} />
                            <CustomCheckbox value={props.eventsAllowed} setValue={(value) => props.setEventsAllowed(value)} name={'Разрешены мероприятия и вечеринки'} />
                            <CustomCheckbox value={props.withRentalAgreement} setValue={(value) => props.setWithRentalAgreement(value)} name={'Владелец предоставляет отчетные документы о проживании'} />
                        </div>
                    </Stack> 

                    <div id="footer" style={{ position: 'absolute', bottom: '0px', height: '80px', left: '0px', right: '0px', overflow: 'hidden', display: 'flex', padding: '16px', justifyContent: 'space-between', alignItems: 'center', borderTop: 'solid 1px #EBEBEB' }}>
                        <Button variant="text" onClick={() => props.clean()} style={{ textDecoration: 'underline' }}>Очистить всё</Button>
                        <Button variant="contained" onClick={() => props.search()}>Показать</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}