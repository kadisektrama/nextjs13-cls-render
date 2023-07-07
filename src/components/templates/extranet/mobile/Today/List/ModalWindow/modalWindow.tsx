import { BottomSheet } from "react-spring-bottom-sheet";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";

import { createChatChannel } from "@/api/extranet";
import { dateForViewFormat, differenceDateFromNowHour } from "@/utils/Helpers/Date/date";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses";
import { ApprovalDialogWindow } from "../ApprovalDialogWindow/approvalDialogWindow";

export const ModalWindow: React.FC<any> = (props) => {
    const [openApprovalDialogWindow, setOpenApprovalDialogWindow] = useState(false);
    let router = useRouter();

    const handleSubmitMessage = () => {
        createChatChannel(props.item, props.item.start_date, props.item.end_date)
            .then((res: any) => router.push(`/host/inbox/${res.id}`))
    };

    return (
        <>
            <BottomSheet
                open={props.open}
                onDismiss={() => props.handleClose()}
                blocking={false}
                snapPoints={({maxHeight }) => [
                    maxHeight - 80,
                ]}
            >
                {props.open && (
                    <Box sx={{ paddingBottom: '60px' }}>
                        <Stack spacing={2}>
                            {/*<Box sx={{ fontSize: '14px', paddingLeft: '20px', paddingRight: '20px' }}>
                            <Stack
                                spacing={2}
                            >
                                <Typography sx={{ fontWeight: 700 }} variant="h5" component="h1" gutterBottom>Детали бронирования</Typography>
                                <Divider />
                                <div>
                                    <div style={{ fontSize: '18px', color: 'black' }}>{arrayStatus[props.item.status]} &#183; Ольга Ярская</div>
                                    <div>{props.item.property.name}</div>
                                    <div>{props.item.start_date.date.substring(0, 10) + ' - ' + props.item.end_date.date.substring(0, 10) + '.(' + diffDates(props.item.start_date.date, props.item.end_date.date) + ' ночи)'}</div>
                                    <div>{props.item.guests + 'гостей '}<>&#183;</>{' ' + diffDates(props.item.end_date.date, props.item.start_date.date) * props.item.property.price + '' + props.item.property.currency.iso_code}</div>
                                </div>
                            </Stack>
                        </Box>
                        <Divider sx={{ borderBottomWidth: 'thick' }} />*/}
                            <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                <Typography sx={{ fontWeight: 700 }} variant="h5" component="h2" gutterBottom>О госте {props.item.user?.user_profile.first_name}</Typography>
                                <div>
                                    <div>На kvartiranasutki c {dateForViewFormat(props.item.created_at)}</div>
                                </div>
                            </Box>
                            <Divider sx={{ borderBottomWidth: 'thick' }} />
                            <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                <Stack
                                    spacing={2}
                                >
                                    <Typography sx={{ fontWeight: 700 }} variant="h5" component="h2" gutterBottom>Сведения о бронировании</Typography>
                                    <div>
                                        <div>Гости</div>
                                        <div style={{ color: "#6b6b6b" }}>{+props.item.details?.guests.adults + getNoun(+props.item.details?.guests.adults, ' взрослый', ' взрослых', ' взрослых')}</div>
                                        <div style={{ color: "#6b6b6b" }}>{+props.item.details?.guests.children + getNoun(+props.item.details?.guests.children, ' ребенок', ' ребенка', ' детей')}</div>
                                        <div style={{ color: "#6b6b6b" }}>{+props.item.details?.guests.infants + getNoun(+props.item.details?.guests.infants, ' младенец', ' младенца', ' младенцев')}</div>
                                        <div style={{ color: "#6b6b6b" }}>{+props.item.details?.guests.pets + getNoun(+props.item.details?.guests.pets, ' животное', ' животных', ' животных')}</div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <div>Прибытие</div>
                                        <div style={{ color: "#6b6b6b" }}>{dateForViewFormat(props.item.start_date)}</div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <div>Выезд</div>
                                        <div style={{ color: "#6b6b6b" }}>{dateForViewFormat(props.item.end_date)}</div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <div>Дата бронирования</div>
                                        <div style={{ color: "#6b6b6b" }}>{dateForViewFormat(props.item.created_at)}</div>
                                    </div>
                                    {props.item?.reservation_code
                                        ? (
                                            <>
                                                <Divider />
                                                <div>
                                                    <div>Код бронирования</div>
                                                    <div style={{ color: "#6b6b6b" }}>{props.item.reservation_code}</div>
                                                </div>
                                            </>
                                        ) : ''
                                    }
                                    <Divider />
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <div style={{ flex: 1 }}>
                                            <Button variant="outlined" sx={{ width: '100%',  height: '100%', fontSize: '11px' }} onClick={handleSubmitMessage}>Написать сообщение</Button>
                                        </div>
                                        <div style={{ width: '10px' }}></div>
                                        <div style={{ flex: 1 }}>
                                            <Button variant="outlined" sx={{ position: 'relative', width: '100%', height: '100%', fontSize: '11px' }} disabled={!((props.item.status === BookingStatuses.confirmed || props.item.status === BookingStatuses.finished) && Boolean(props.item.user?.phones[0]))}>
                                                Позвонить
                                                <a href={`tel:${props.item.user?.phones[0]?.phone}`} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}></a>
                                            </Button>
                                        </div>
                                        {props.item.status === BookingStatuses.confirmed && (
                                            <>
                                                <div style={{ width: '10px' }}></div>
                                                <div style={{ flex: 1 }}>
                                                    <Button
                                                        sx={{ width: '100%', height: '100%', fontSize: '11px' }}
                                                        disabled={!(differenceDateFromNowHour(props.item.start_date) > 0 && differenceDateFromNowHour(props.item.start_date) <= 48)}
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => {setOpenApprovalDialogWindow(true)}}
                                                    >
                                                        Отметить незаезд
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <br/>
                                </Stack>
                            </Box>
                            {/*<Divider sx={{ borderBottomWidth: 'thick' }} />
                        <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
                            <Stack
                                spacing={1}
                            >
                                <Typography sx={{ fontWeight: 700 }} variant="h5" component="h2" gutterBottom>Уплачено гостем</Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Стоимость проживания за {diffDates(props.item.start_date.date, props.item.end_date.date)} ночи</div>
                                    <div>{diffDates(props.item.start_date.date, props.item.end_date.date) * props.item.property.price + '' + props.item.property.currency.iso_code}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Итого</div>
                                    <div>{diffDates(props.item.start_date.date, props.item.end_date.date) * props.item.property.price + '' + props.item.property.currency.iso_code}</div>
                                </div>
                            </Stack>
                        </Box>
                        <Divider sx={{ borderBottomWidth: 'thick' }} />
                        <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
                            <Stack
                                spacing={1}
                            >
                                <Typography sx={{ fontWeight: 700 }} variant="h5" component="h2" gutterBottom>Выплата хозяину</Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Стоимость проживания за {diffDates(props.item.start_date.date, props.item.end_date.date)} ночи</div>
                                    <div>{diffDates(props.item.start_date.date, props.item.end_date.date) * props.item.property.price + '' + props.item.property.currency.iso_code}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Итого</div>
                                    <div>{diffDates(props.item.start_date.date, props.item.end_date.date) * props.item.property.price + '' + props.item.property.currency.iso_code}</div>
                                </div>
                            </Stack>
                        </Box>*/}
                        </Stack>
                    </Box>
                )}
            </BottomSheet>

            <ApprovalDialogWindow id={props.item.id} open={openApprovalDialogWindow} handleClose={() => {setOpenApprovalDialogWindow(false)}} modalWindowClose={() => props.handleClose()} />
        </>
    )
}