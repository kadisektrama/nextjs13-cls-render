import * as React from 'react';

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Divider } from "@mui/material";
import Stack from "@mui/material/Stack";

import { useRouter } from 'next/navigation';

import { createChatChannel } from "@/api/extranet";
import { dateForViewFormat } from "@/utils/Helpers/Date/date";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses";

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

export const ModalWindow: React.FC<any> = (props) => {
    let router = useRouter();

    const handleSubmitMessage = () => {
        createChatChannel(props.row, props.row.startDate, props.row.endDate)
            .then((res) => router.push(`/host/inbox/${res.id}`))
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
                            <div style={{ fontSize: '15px', color: "#6b6b6b" }}>Гость</div>
                            <Typography sx={{ fontWeight: 700 }} variant="h5" component="h2" gutterBottom>{props.row.user?.user_profile?.first_name}</Typography>
                            <div>
                                <div>На kvartiranasutki c {props.row.createdAt && dateForViewFormat(props.row?.createdAt)}</div>
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
                                    <div style={{ color: "#6b6b6b" }}>{+props.row.details?.guests.adults + getNoun(+props.row.details?.guests.adults, ' взрослый', ' взрослых', ' взрослых')}</div>
                                    <div style={{ color: "#6b6b6b" }}>{+props.row.details?.guests.children + getNoun(+props.row.details?.guests.children, ' ребенок', ' ребенка', ' детей')}</div>
                                    <div style={{ color: "#6b6b6b" }}>{+props.row.details?.guests.infants + getNoun(+props.row.details?.guests.infants, ' младенец', ' младенца', ' младенцев')}</div>
                                    <div style={{ color: "#6b6b6b" }}>{+props.row.details?.guests.pets + getNoun(+props.row.details?.guests.pets, ' животное', ' животных', ' животных')}</div>
                                </div>
                                <Divider />
                                <div>
                                    <div>Прибытие</div>
                                    <div style={{ color: "#6b6b6b" }}>{props.row.startDate && dateForViewFormat(props.row?.startDate)}</div>
                                </div>
                                <Divider />
                                <div>
                                    <div>Выезд</div>
                                    <div style={{ color: "#6b6b6b" }}>{props.row.endDate && dateForViewFormat(props.row?.endDate)}</div>
                                </div>
                                <Divider />
                                <div>
                                    <div>Дата бронирования</div>
                                    <div style={{ color: "#6b6b6b" }}>{props.row.createdAt && dateForViewFormat(props.row?.createdAt.substring(0, 10))}</div>
                                </div>
                                {props.row.item?.reservation_code
                                    ? (
                                        <>
                                            <Divider />
                                            <div>
                                                <div>Код бронирования</div>
                                                <div style={{ color: "#6b6b6b" }}>{props.row.item.reservation_code}</div>
                                            </div>
                                        </>
                                    ) : ''
                                }
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Button variant="outlined" sx={{ width: '200px' }} onClick={handleSubmitMessage}>Написать сообщение</Button>
                                    <Button variant="outlined" sx={{ position: 'relative', width: '200px' }} disabled={!((props.row.status === BookingStatuses.confirmed || props.row.status === BookingStatuses.finished) && Boolean(props.row.user?.phones[0]))}>
                                        Позвонить
                                        <a href={`tel:${props.row.user?.phones[0]?.phone}`} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}></a>
                                    </Button>
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