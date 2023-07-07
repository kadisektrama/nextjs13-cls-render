import { memo } from 'react'
import lodash, { property } from "lodash";
import { useSearchParams } from "next/navigation";

import { Typography, Box, Stack, Tooltip, ClickAwayListener } from "@mui/material";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { diffDates } from "@/utils/Helpers/Date/date";

// Icons
import children from "../../../../../../public/icons/children.png"
import noChildren from "../../../../../../public/icons/no-children.png"
import pets from "../../../../../../public/icons/pets.png"
import noPets from "../../../../../../public/icons/no-pets.png"
import party from "../../../../../../public/icons/party.png"
import noParty from "../../../../../../public/icons/no-party.png"
import docs from "../../../../../../public/icons/docs.png"
import noDocs from "../../../../../../public/icons/no-docs.png"
import smoking from "../../../../../../public/icons/smoking.png"
import noSmoking from "../../../../../../public/icons/no-smoking.png"
import React from "react";
import { useAppSelector } from '@/redux/hooks/hooks';

const IconText = ({src, text}: any) => <div style={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}><img style={{ height: '36px' }} src={src} alt='pets' />{text}</div>

export const Rules: React.FC = () => {
    const searchParams = useSearchParams()
    const [isOpenTooltip, setIsOpenTooltip] = React.useState(false);
    const { rules, currency, price } = useAppSelector(state => state.property.property)

    const handleTooltipClose = () => {
        setIsOpenTooltip(false);
    };

    const handleTooltipOpen = () => {
        setIsOpenTooltip(true);
    };


    return (
        <Stack spacing={3} sx={{ p: 3 }}>
            <Typography component="div" variant="h6" gutterBottom>Правила размещения</Typography>
            <div style={{ display: 'flex', columnGap: '100px' }}>
                <div>
                    <div>Заезд</div>
                    <div>после {rules.check_in_time}</div>
                </div>
                <div>
                    <div>Отъезд</div>
                    <div>до {rules.check_out_time}</div>
                </div>
            </div>

            <Stack spacing={1}>
                {!lodash.isNil(rules.pets_allowed) && (rules.pets_allowed === true
                    ? <IconText src={pets} text={'можно с питомцами'} />
                    : <IconText src={noPets} text={'нельзя с питомцами'} />)}
                {!lodash.isNil(rules.smoking_allowed) && (rules.smoking_allowed === true
                    ? <IconText src={smoking} text={'можно курить'} />
                    : <IconText src={noSmoking} text={'курение запрещено'} />)}
                {!lodash.isNil(rules.events_allowed) && (rules.events_allowed === true
                    ? <IconText src={party} text={'разрешены мероприятия и вечеринки'} />
                    : <IconText src={noParty} text={'запрещены мероприятия и вечеринки'} />)}
                {!lodash.isNil(rules.with_rental_agreement) && (rules.with_rental_agreement === true
                    ? <IconText src={docs} text={'владелец предоставляет отчетные документы о проживании'} />
                    : <IconText src={noDocs} text={'владелец не предоставляет отчетные документы о проживании'} />)}
                {!lodash.isNil(rules.suitable_for_children) && (rules.suitable_for_children === true
                    ? <IconText src={children} text={'можно с детьми'} />
                    : <IconText src={noChildren} text={'нельзя с детьми'} />)}
            </Stack>

            {(searchParams.get('start_date') && searchParams.get('end_date') !== searchParams.get('start_date')) && (
                <>
                    {rules.down_payment_amount > 0 && (
                        <Typography variant="body1" sx={{ backgroundColor: '#e8f9e5', padding: '4px 8px 4px 8px', borderRadius: '4px',  borderLeft: '3px solid #14a800' }}>
                            {`${lodash.round(rules.down_payment_amount * price?.total_cost / 100, 0)} ${currency}`} предоплата напрямую хозяину (до заселения)
                        </Typography>
                    )}

                    <div>
                        {rules.damage_deposit_amount > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: '6px', backgroundColor: '#e8f9e5', padding: '4px 8px 4px 8px', borderRadius: '4px', borderLeft: '3px solid #14a800' }}>
                                {`${rules.damage_deposit_amount * diffDates(searchParams.get('start_date'), searchParams.get('end_date'))} ${currency}   страховой депозит (возвращается при отъезде)`}
                                <ClickAwayListener onClickAway={handleTooltipClose}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={handleTooltipClose}
                                            open={isOpenTooltip}
                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener
                                            title="Залог за сохранность имущества. Хозяин моржет взять его при заселение и вернуть при отъезде, если ничего не испорчено."
                                        >
                                            <QuestionCircleOutlined onClick={handleTooltipOpen} />
                                        </Tooltip>
                                    </div>
                                </ClickAwayListener>
                            </div>
                        )}
                    </div>
                </>
            )}

            {rules.additional_rules && (
                <Box>
                    <Typography component="div" variant={"p" as "inherit"} style={{ fontWeight: 500 }}>Дополнительная информация</Typography>
                    <div>{rules.additional_rules}</div>
                </Box>
            )}
        </Stack>
    )
}