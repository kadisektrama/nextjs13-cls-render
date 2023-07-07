import * as React from 'react';
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Divider } from "@mui/material";
import Stack from "@mui/material/Stack";

import { createChatChannel } from "@/api/secure";
import { dateForViewFormat } from "@/utils/Helpers/Date/date";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 'calc(100% - 100px)',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    overflow: 'auto',
};

export const ModalWindowDetails: React.FC<any> = (props) => {
    const [openPhoneModalWindow, setOpenPhoneModalWindow] = React.useState(false);

    let router = useRouter();

    const handleSubmitMessage = () => {
        createChatChannel(props.row)
            .then((res) => router.push(`/guest/inbox/${res.id}`))
    };

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
                        {/*<Box sx={{ paddingLeft: '40px', paddingRight: '40px', fontSize: '14px' }}>
                            <Stack
                                spacing={2}
                            >
                                <Typography sx={{ fontWeight: 700 }} variant="h5" component="h1" gutterBottom>Детали бронирования</Typography>
                                <Divider />
                                <div>
                                    <div style={{ fontSize: '13px', color: "#6b6b6b" }}>Прошлый гость</div>
                                    <div style={{ fontSize: '22px', color: 'black' }}>{props.row.user?.name}</div>
                                    <div>{props.row.name}</div>
                                    <div>{props.row.startDate + ' - ' + props.row.endDate + '.(' + diffDates(props.row.startDate, props.row.endDate) + ' ночей)'}</div>
                                    <div>{props.row.guests + 'гостей '}<>&#183;</>{' ' + diffDates(props.row.startDate, props.row.endDate) * props.row.price + '' + props.row.currency}</div>
                                </div>
                            </Stack>
                        </Box>
                        <Divider sx={{ borderBottomWidth: 'thick' }} />*/}
                        <Box sx={{ paddingLeft: '40px', paddingRight: '40px' }}>
                            <div style={{ fontSize: '15px', color: "#6b6b6b" }}>Владелец</div>
                            <Typography sx={{ fontWeight: 700 }} variant="h5" component="h2" gutterBottom>{props.property.user.user_profile.first_name}</Typography>
                            <div>
                                <div>На kvartiranasutki c {dateForViewFormat(props.created_at)}</div>
                            </div>
                        </Box>
                        <Divider sx={{ borderBottomWidth: 'thick' }} />
                        <Box sx={{ paddingLeft: '40px', paddingRight: '40px' }}>
                            <Stack
                                spacing={2}
                            >
                                <Typography sx={{ fontWeight: 700 }} variant="h5" component="h2" gutterBottom>Сведения о бронировании</Typography>
                                <div>
                                    <div>Гости</div>
                                    <div style={{ color: "#6b6b6b" }}>{+props.details?.guests.adults + getNoun(+props.details?.guests.adults, ' взрослый', ' взрослых', ' взрослых')}</div>
                                    <div style={{ color: "#6b6b6b" }}>{+props.details?.guests.children + getNoun(+props.details?.guests.children, ' ребенок', ' ребенка', ' детей')}</div>
                                    <div style={{ color: "#6b6b6b" }}>{+props.details?.guests.infants + getNoun(+props.details?.guests.infants, ' младенец', ' младенца', ' младенцев')}</div>
                                    <div style={{ color: "#6b6b6b" }}>{+props.details?.guests.pets + getNoun(+props.details?.guests.pets, ' животное', ' животных', ' животных')}</div>
                                </div>
                                <Divider />
                                <div>
                                    <div>Прибытие</div>
                                    <div style={{ color: "#6b6b6b" }}>{dateForViewFormat(props.start_date)}</div>
                                </div>
                                <Divider />
                                <div>
                                    <div>Выезд</div>
                                    <div style={{ color: "#6b6b6b" }}>{dateForViewFormat(props.end_date)}</div>
                                </div>
                                <Divider />
                                <div>
                                    <div>Дата бронирования</div>
                                    <div style={{ color: "#6b6b6b" }}>{dateForViewFormat(props.created_at)}</div>
                                </div>
                                {props.reservation_code
                                    ? (
                                        <>
                                            <Divider />
                                            <div>
                                                <div>Код бронирования</div>
                                                <div style={{ color: "#6b6b6b" }}>{props.reservation_code}</div>
                                            </div>
                                        </>
                                    ) : ''
                                }
                                <Divider />
                                <div>
                                    <div>Итоговая стоимость</div>
                                    <div style={{ color: "#6b6b6b" }}>{props.cost + ' ' + props.property.currency}</div>
                                </div>
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Button variant="outlined" sx={{ width: '200px' }} onClick={handleSubmitMessage}>Написать сообщение</Button>
                                    <div onClick={(props.status === BookingStatuses.created) ? () => setOpenPhoneModalWindow(true) : () => setOpenPhoneModalWindow(false)}>
                                        <Button
                                            variant="outlined" sx={{ position: 'relative', width: '200px', height: '100%' }}
                                            disabled={!(props.status === BookingStatuses.confirmed || props.status === BookingStatuses.finished)}
                                        >
                                            Позвонить
                                            <a href={`tel:${props.property?.phone}`} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}></a>
                                        </Button>
                                    </div>
                                    <Modal
                                        keepMounted
                                        open={openPhoneModalWindow}
                                        onClose={() => setOpenPhoneModalWindow(false)}
                                        aria-labelledby="keep-mounted-modal-title"
                                        aria-describedby="keep-mounted-modal-description"
                                        sx={{
                                            display: 'flex',
                                            p: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box sx={{
                                            position: 'relative',
                                            width: 400,
                                            bgcolor: 'background.paper',
                                            border: '2px solid #000',
                                            boxShadow: (theme) => theme.shadows[5],
                                            p: 4,
                                        }}>
                                            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                                Номер телефона хозяина будет доступен после подтверждения бронирования (в течение 24 часов).
                                            </Typography>
                                        </Box>
                                    </Modal>
                                </div>
                                <br/>
                            </Stack>
                        </Box>
                        {/*<Divider sx={{ borderBottomWidth: 'thick' }} />
                        <Box sx={{ paddingLeft: '40px', paddingRight: '40px' }}>
                            <Stack
                                spacing={1}
                            >
                                <Typography sx={{ fontWeight: 700 }} variant="h5" component="h2" gutterBottom>Уплачено гостем</Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Стоимость проживания за {diffDates(props.row.startDate, props.row.endDate)} ночи</div>
                                    <div>{diffDates(props.row.startDate, props.row.endDate) * props.row.price + '' + props.row.currency}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Итого</div>
                                    <div>{diffDates(props.row.startDate, props.row.endDate) * props.row.price + '' + props.row.currency}</div>
                                </div>
                            </Stack>
                        </Box>
                        <Divider sx={{ borderBottomWidth: 'thick' }} />
                        <Box sx={{ paddingLeft: '40px', paddingRight: '40px' }}>
                            <Stack
                                spacing={1}
                            >
                                <Typography sx={{ fontWeight: 700 }} variant="h5" component="h2" gutterBottom>Выплата хозяину</Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Стоимость проживания за {diffDates(props.row.startDate, props.row.endDate)} ночи</div>
                                    <div>{diffDates(props.row.startDate, props.row.endDate) * props.row.price + '' + props.row.currency}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Итого</div>
                                    <div>{diffDates(props.row.startDate, props.row.endDate) * props.row.price + '' + props.row.currency}</div>
                                </div>
                            </Stack>
                        </Box>*/}
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}