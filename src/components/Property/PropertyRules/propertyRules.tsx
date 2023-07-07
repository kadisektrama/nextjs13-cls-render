import React from "react";

import { Stack, IconButton, Box, Divider, Typography } from "@mui/material"
import { Select } from 'antd';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from "@mui/material/TextField";

import { useAppSelector } from "@/redux/hooks/hooks";
import { 
    setRulesAdditionalRules, 
    setRulesCheckInTime,
    setRulesCheckOutTime,
    setRulesDamageDepositAmount,
    setRulesDamageDepositCurrency,
    setRulesDownPaymentAmount,
    setRulesEventsAllowed,
    setRulesMinStayDays, 
    setRulesPetsAllowed,
    setRulesSmokingAllowed,
    setRulesSuitableForChildren,
    setRulesSuitableForInfants,
    setRulesWithRentalAgreement,
} from "@/redux/slices/property";

export const PropertyRules: React.FC = () => {
    const state = useAppSelector(state => state)

    return (
        <Stack
            spacing={2}
            sx={{ p: 2 }}
        >
            <div id={'date'}>
                <h3>Правила размещения</h3>
                <div style={{ fontSize: '18px', fontWeight: '600', paddingBottom: '8px' }}>Заезд / отъезд</div>
                <div>В какое время происходит заселение и выселение?</div>
                <div className="grid-label-field">
                    <div>Bремя заезда</div>
                    <Select
                        defaultValue={state.property.property.rules?.check_in_time || '14:00'}
                        style={{ width: 244 }}
                        options={
                            Array.from(Array(25).keys()).map(key => {
                                let result
                                if (key === 0) result = { value: null, label: 'выберите время' }
                                else result = { value: `${key}:00`,label: `c ${key}:00` }
                                return result
                            })
                        }
                        onChange={(value) => setRulesCheckInTime(value)}
                    />
                    <div>Bремя отъезда</div>
                    <Select
                        defaultValue={state.property.property.rules?.check_out_time || '12:00'}
                        style={{ width: 244 }}
                        options={
                            Array.from(Array(25).keys()).map(key => {
                                let result
                                if (key === 0) result = { value: null, label: 'выберите время' }
                                else result = { value: `${key}:00`,label: `до ${key}:00` }
                                return result
                            })
                        }
                        onChange={(value) => setRulesCheckOutTime(value)}
                    />
                    <div>Минимальный срок проживания</div>
                    <Select
                        defaultValue={state.property.property.rules?.min_stay_days || 1}
                        style={{ width: 244, zIndex: 100 }}
                        options={
                            Array.from({length: 30}, (_, i) => i + 1).map(key => {
                                let result
                                if (key === 1) result = { value: key, label: '1 сутки (рекомендуется)' }
                                else result = { value: key, label: `${key} суток` }
                                return result
                            })
                        }
                        onChange={(value) => setRulesMinStayDays(value)}
                    />
                </div>
            </div>
            <Divider />
            <div id={'amenities'} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>Можно с питомцами</div>
                <div style={{ marginLeft: '20px' }}>
                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.pets_allowed === false ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', backgroundColor: state.property.property.rules?.pets_allowed === false ? 'black' : 'white', color: state.property.property.rules?.pets_allowed === false ? 'white' : 'black' }}
                        onClick={() => setRulesPetsAllowed(false)}
                        aria-label="fingerprint"
                    >
                        <ClearIcon />
                    </IconButton>

                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.pets_allowed === true ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', marginRight: '20px', marginLeft: '20px', backgroundColor: state.property.property.rules?.pets_allowed === true ? 'black' : 'white', color: state.property.property.rules?.pets_allowed === true ? 'white' : 'black' }}
                        onClick={() => setRulesPetsAllowed(true)}
                        aria-label="fingerprint"
                    >
                        <CheckIcon />
                    </IconButton>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>Можно курить</div>
                <div style={{ marginLeft: '20px' }}>
                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.smoking_allowed === false ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', backgroundColor: state.property.property.rules?.smoking_allowed === false ? 'black' : 'white', color: state.property.property.rules?.smoking_allowed === false ? 'white' : 'black' }}
                        onClick={() => setRulesSmokingAllowed(false)}
                        aria-label="fingerprint"
                    >
                        <ClearIcon />
                    </IconButton>

                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.smoking_allowed === true ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', marginRight: '20px', marginLeft: '20px', backgroundColor: state.property.property.rules?.smoking_allowed === true ? 'black' : 'white', color: state.property.property.rules?.smoking_allowed === true ? 'white' : 'black' }}
                        onClick={() => setRulesSmokingAllowed(true)}
                        aria-label="fingerprint"
                    >
                        <CheckIcon />
                    </IconButton>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>Разрешены мероприятия и вечеринки</div>
                <div style={{ marginLeft: '20px' }}>
                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.events_allowed === false ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', backgroundColor: state.property.property.rules?.events_allowed === false ? 'black' : 'white', color: state.property.property.rules?.events_allowed === false ? 'white' : 'black' }}
                        onClick={() => setRulesEventsAllowed(false)}
                        aria-label="fingerprint"
                    >
                        <ClearIcon />
                    </IconButton>

                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.events_allowed === true ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', marginRight: '20px', marginLeft: '20px', backgroundColor: state.property.property.rules?.events_allowed === true ? 'black' : 'white', color: state.property.property.rules?.events_allowed === true ? 'white' : 'black' }}
                        onClick={() => setRulesEventsAllowed(true)}
                        aria-label="fingerprint"
                    >
                        <CheckIcon />
                    </IconButton>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>Владелец предоставляет отчетные документы о проживании</div>
                <div style={{ marginLeft: '20px' }}>
                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.with_rental_agreement === false ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', backgroundColor: state.property.property.rules?.with_rental_agreement === false ? 'black' : 'white', color: state.property.property.rules?.with_rental_agreement === false ? 'white' : 'black' }}
                        onClick={() => setRulesWithRentalAgreement(false)}
                        aria-label="fingerprint"
                    >
                        <ClearIcon />
                    </IconButton>

                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.with_rental_agreement === true ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', marginRight: '20px', marginLeft: '20px', backgroundColor: state.property.property.rules?.with_rental_agreement === true ? 'black' : 'white', color: state.property.property.rules?.with_rental_agreement === true ? 'white' : 'black' }}
                        onClick={() => setRulesWithRentalAgreement(true)}
                        aria-label="fingerprint"
                    >
                        <CheckIcon />
                    </IconButton>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                    <div>Можно с детьми</div>
                    <Typography variant="body2" color="text.secondary">
                        Если жилье небезопасно для детей, укажите, что не сможете их разместить. При необходимости гости свяжутся с вами и уточнят ситуацию.
                    </Typography>
                </div>
                <div style={{ marginLeft: '20px' }}>
                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.suitable_for_children === false ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', backgroundColor: state.property.property.rules?.suitable_for_children === false ? 'black' : 'white', color: state.property.property.rules?.suitable_for_children === false ? 'white' : 'black' }}
                        onClick={() => setRulesSuitableForChildren(false)}
                        aria-label="fingerprint"
                    >
                        <ClearIcon />
                    </IconButton>

                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.suitable_for_children === true ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', marginRight: '20px', marginLeft: '20px', backgroundColor: state.property.property.rules?.suitable_for_children === true ? 'black' : 'white', color: state.property.property.rules?.suitable_for_children === true ? 'white' : 'black' }}
                        onClick={() => setRulesSuitableForChildren(true)}
                        aria-label="fingerprint"
                    >
                        <CheckIcon />
                    </IconButton>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                    <div>Можно с младенцами</div>
                    <Typography variant="body2" color="text.secondary">
                        Если жилье небезопасно для младенцев, укажите, что не сможете их разместить. У гостей будет возможность связаться с вами и уточнить ситуацию.
                    </Typography>
                </div>
                <div style={{ marginLeft: '20px' }}>
                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.suitable_for_infants === false ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', backgroundColor: state.property.property.rules?.suitable_for_infants === false ? 'black' : 'white', color: state.property.property.rules?.suitable_for_infants === false ? 'white' : 'black' }}
                        onClick={() => setRulesSuitableForInfants(false)}
                        aria-label="fingerprint"
                    >
                        <ClearIcon />
                    </IconButton>

                    <IconButton
                        style={{ backgroundColor: state.property.property.rules?.suitable_for_infants === true ? 'black' : 'white' }}
                        sx={{ border: '1px solid black', marginRight: '20px', marginLeft: '20px', backgroundColor: state.property.property.rules?.suitable_for_infants === true ? 'black' : 'white', color: state.property.property.rules?.suitable_for_infants === true ? 'white' : 'black' }}
                        onClick={() => setRulesSuitableForInfants(true)}
                        aria-label="fingerprint"
                    >
                        <CheckIcon />
                    </IconButton>
                </div>
            </div>
            <Divider />
            <div id={'additional_rules'}>
                <div style={{ fontSize: '18px', fontWeight: '600', paddingBottom: '8px' }}>Дополнительная информация</div>
                <div style={{ marginBottom: '8px' }}>Вы можете указать любые требования безопасности, правила для общих помещений и местные нормы поведения.</div>
                <TextField
                    label={false}
                    rows={4}
                    defaultValue={state.property.property.rules?.additional_rules}
                    onBlur={e => setRulesAdditionalRules(e.target.value)}
                    sx={{
                        '& legend': { display: 'none' },
                        '& fieldset': { top: 0 },
                        width: "100%"
                    }}
                />
            </div>
        </Stack>
    );
}