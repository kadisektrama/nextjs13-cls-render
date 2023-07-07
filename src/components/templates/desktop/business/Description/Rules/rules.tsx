'use client'

import { memo } from 'react';
import { useSearchParams } from "next/navigation";
import lodash from 'lodash';
import React from "react";

import { Typography, Box, Stack, Tooltip } from "@mui/material";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { diffDates } from "@/utils/Helpers/Date/date";
import { useAppSelector } from '@/redux/hooks/hooks';

// Icons
import children from "../../../../../../../public/icons/children.png"
import noChildren from "../../../../../../../public/icons/no-children.png"
import pets from "../../../../../../../public/icons/pets.png"
import noPets from "../../../../../../../public/icons/no-pets.png"
import party from "../../../../../../../public/icons/party.png"
import noParty from "../../../../../../../public/icons/no-party.png"
import docs from "../../../../../../../public/icons/docs.png"
import noDocs from "../../../../../../../public/icons/no-docs.png"
import smoking from "../../../../../../../public/icons/smoking.png"
import noSmoking from "../../../../../../../public/icons/no-smoking.png"

const IconText: React.FC<{src: any, text: string}> = ({src, text}) => <div style={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}><img style={{ height: '36px' }} src={src} alt='pets' />{text}</div>

export const Rules = () => {
    const searchParams = useSearchParams()
    const state = useAppSelector(state => state.property.property)
    
    return (
        <Stack spacing={3}>
            <Typography component="div" variant="h6" gutterBottom>Правила размещения</Typography>
            <div style={{ display: 'flex', columnGap: '75px' }}>
                <div>
                    <div>Заезд</div>
                    <div>после {state.rules.check_in_time || '12:00'}</div>
                </div>
                <div>
                    <div>Отъезд</div>
                    <div>до {state.rules.check_out_time || '14:00'}</div>
                </div>
                <div>
                    <div>Минимальный срок проживания</div>
                    <div>от {state.rules.min_stay_days || 1} суток</div>
                </div>
            </div>

            <Stack spacing={1}>
                {!lodash.isNil(state.rules.pets_allowed) && (state.rules.pets_allowed === true
                    ? <IconText src={pets} text={'можно с питомцами'} />
                    : <IconText src={noPets} text={'нельзя с питомцами'} />)}
                {!lodash.isNil(state.rules.smoking_allowed) && (state.rules.smoking_allowed === true
                    ? <IconText src={smoking} text={'можно курить'} />
                    : <IconText src={noSmoking} text={'курение запрещено'} />)}
                {!lodash.isNil(state.rules.events_allowed) && (state.rules.events_allowed === true
                    ? <IconText src={party} text={'разрешены мероприятия и вечеринки'} />
                    : <IconText src={noParty} text={'запрещены мероприятия и вечеринки'} />)}
                {!lodash.isNil(state.rules.with_rental_agreement) && (state.rules.with_rental_agreement === true
                    ? <IconText src={docs} text={'владелец предоставляет отчетные документы о проживании'} />
                    : <IconText src={noDocs} text={'владелец не предоставляет отчетные документы о проживании'} />)}
                {!lodash.isNil(state.rules.suitable_for_children) && (state.rules.suitable_for_children === true
                    ? <IconText src={children} text={'можно с детьми'} />
                    : <IconText src={noChildren} text={'нельзя с детьми'} />)}
            </Stack>
            {(searchParams.get('start_date') && searchParams.get('end_date') !== searchParams.get('start_date')) && (
                <>
                    {state.rules.down_payment_amount > 0 && (
                        <Typography variant="body1" sx={{ backgroundColor: '#e8f9e5', padding: '4px 8px 4px 8px', borderRadius: '4px',  borderLeft: '3px solid #14a800' }}>
                            {`${lodash.round(state.rules.down_payment_amount * state.price?.total_cost / 100, 0)} ${state.currency}`} предоплата напрямую хозяину (до заселения)
                        </Typography>
                    )}

                    <div style={{ borderRadius: '4px' }}>
                        {state.rules.damage_deposit_amount > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: '6px', backgroundColor: '#e8f9e5', padding: '4px 8px 4px 8px', borderRadius: '4px', borderLeft: '3px solid #14a800' }}>
                                {`${state.rules.damage_deposit_amount * diffDates(searchParams.get('start_date'), searchParams.get('end_date'))} ${state.currency}   страховой депозит (возвращается при отъезде)`}
                                <Tooltip title="Залог за сохранность имущества. Хозяин моржет взять его при заселение и вернуть при отъезде, если ничего не испорчено.">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </>
            )}

            {state.rules.additional_rules && (
                <Box>
                    <Typography component="div" variant="inherit" style={{ fontWeight: 500 }}>Дополнительная информация</Typography>
                    <div>{state.rules.additional_rules}</div>
                </Box>
            )}
        </Stack>
    )
}