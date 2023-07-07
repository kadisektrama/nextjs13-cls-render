import TextField from "@mui/material/TextField";
import { Radio, Select, Space } from "antd";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { DefaultOptionType } from "antd/es/select";

import { useAppSelector } from "@/redux/hooks/hooks";
import { setName, setDescription, setAdType, setRegion, setAddress, setAddressSupplement, setPrice, setRulesDamageDepositAmount, setRulesDownPaymentAmount, setCurrency, 
    setPhone, setGuests, setAdditionalGuests, setCostPerAdditionalGuest, setSummaryBathrooms, setSummaryBedrooms, setSummaryBeds } from "@/redux/slices/property";


const StyledTextField = styled(TextField)(
    () => ({
        "@media (min-width:640px)": {
            width: '360px'
        },
        "@media (max-width:640px)": {

            width: '-webkit-fill-available'
        }
    })
)

export const Common: React.FC = () => {
    const state = useAppSelector(state => state)

    return (
        <>
            <div>
                <TextField
                    id="property[name]"
                    name="property[name]"
                    margin="normal"
                    required
                    defaultValue={state.property.property.name}
                    label="Название"
                    onBlur={(event: any) => {setName(event.target.value)}}
                    style = {{ width: 244 }}
                    autoComplete="property[name]"
                />
            </div>
            <div>
                <StyledTextField
                    id="property[description]"
                    name="property[description]"
                    margin="normal"
                    required
                    multiline
                    rows={5}
                    defaultValue={state.property.property.description}
                    label="Описание"
                    onBlur={(event: any) => {setDescription(event.target.value)}}
                    style = {{ width: 360 }}
                    autoComplete="property[description]"
                />
            </div>
            <div>
                <Select
                    id="property[ad_type]"
                    //name="property[ad_type]"
                    //autoComplete="property[ad_type]"
                    showSearch
                    placeholder="Тип объявления *"
                    optionFilterProp="children"
                    onChange={(value: any) => setAdType(value)}
                    //required
                    defaultValue={state.property.property.ad_type?.id}
                    notFoundContent={'Нет совпадений'}
                    fieldNames={{
                        value: 'id',
                        label: 'name',
                    }}
                    style = {{ width: 244, borderRadius: '4px' }}
                    filterOption={(input: any, option: any) =>
                        (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={state.propertyType.propertyTypes}
                />
            </div>
            <div>
                <Select
                    id="property[region]"
                    //name="property[region]"
                    //autoComplete="property[region]"
                    showSearch
                    placeholder="Регион *"
                    optionFilterProp="children"
                    onChange={(value: any) => setRegion(value)}
                    defaultValue={state.property.property.region?.id || 3}
                    //required
                    disabled
                    notFoundContent={'Нет совпадений'}
                    fieldNames={{
                        value: 'id',
                        label: 'name',
                    }}
                    style = {{ width: 244, borderRadius: '4px' }}
                    filterOption={(input: any, option: any) =>
                        (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={state.region.regions}
                />
            </div>
            <div>
                <TextField
                    id="property[address]"
                    name="property[address]"
                    margin="normal"
                    defaultValue={state.property.property.address}
                    required
                    label="Улица, дом"
                    onBlur={(event: any) => {setAddress(event.target.value)}}
                    style = {{ width: 244 }}
                    autoComplete="property[address]"
                />
            </div>
            <div>
                <TextField
                    id="property[address_supplement]"
                    name="property[address_supplement]"
                    type="number"
                    margin="normal"
                    defaultValue={state.property.property.address_supplement}
                    label="Номер квартиры"
                    onBlur={(event: any) => {setAddressSupplement(event.target.value)}}
                    style = {{ width: 244 }}
                    autoComplete="property[address_supplement]"
                />
            </div>
            <div>
                <TextField
                    id="property[price]"
                    name="property[price]"
                    type="number"
                    margin="normal"
                    required
                    defaultValue={state.property.property.price}
                    label="Цена"
                    onBlur={(event: any) => {setPrice(event.target.value)}}
                    style = {{ width: 244 }}
                    autoComplete="property[price]"
                />
            </div>
            <div>
                <TextField
                    id="property[rules.damage_deposit_amount]"
                    name="property[rules.damage_deposit_amount]"
                    type="number"
                    margin="normal"
                    defaultValue={state.property.property.rules?.damage_deposit_amount}
                    label="Страховой взнос"
                    onBlur={(event: any) => {setRulesDamageDepositAmount(+event.target.value)}}
                    style = {{ width: 244 }}
                    autoComplete="property[rules.damage_deposit_amount]"
                />
            </div>

            <div>
                <div style={{ fontSize: '18px', fontWeight: '600', paddingBottom: '8px' }}>Предоплата</div>
                <div>
                    <Radio.Group onChange={(e: any) => setRulesDownPaymentAmount(e.target.value)} value={state.property.property.rules?.down_payment_amount}>
                        <Space direction="vertical">
                            <Radio value={state.property.property.rules?.down_payment_amount || 1}>Необходимо внести предоплату  до заселения напрямую хозяину</Radio>
                            <Radio value={0}>Заселение без предоплаты</Radio>
                        </Space>
                    </Radio.Group>
                    {state.property.property.rules?.down_payment_amount > 0 && (
                        <div style={{ marginTop: '4px' }}>
                            <div>Размер предоплаты</div>
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                                <TextField
                                    id="property[rules.down_payment_amount]"
                                    name="property[rules.down_payment_amount]"
                                    type="number"
                                    margin="normal"
                                    defaultValue={state.property.property.rules?.down_payment_amount}
                                    label={false}
                                    onBlur={(event: any) => {setRulesDownPaymentAmount(+event.target.value)}}
                                    sx={{
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                        width: "100px"
                                    }}
                                    autoComplete="property[rules.down_payment_amount]"
                                />
                                <span>% от общей стоимости проживания</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <Select
                    id="property[currency]"
                    //name="property[currency]"
                    //autoComplete="property[currency]"
                    placeholder="Валюта *"
                    defaultValue={state.property.property.currency}
                    fieldNames={{
                        value: 'iso_code',
                        label: 'iso_code',
                    }}
                    onChange={(value: any) => setCurrency(value)}
                    style = {{ width: 244, borderRadius: '4px' }}
                    //required
                    options={state.currency.currencies}
                />
            </div>
            <div>
                <Select
                    id="property[phone]"
                    //name="property[phone]"
                    //autoComplete="property[phone]"
                    placeholder="Телефон *"
                    defaultValue={state.property.property.phone?.id}
                    fieldNames={{
                        value: 'id',
                        label: 'phone',
                    }}
                    onChange={(value: any) => setPhone(value)}
                    style = {{ width: 244, borderRadius: '4px' }}
                    //required
                    options={state.property.property.user?.phones as unknown as DefaultOptionType[]}
                />
            </div>
            <div>
                <TextField
                    id="property[guests]"
                    name="property[guests]"
                    defaultValue={state.property.property.guests}
                    type="number"
                    margin="normal"
                    required
                    label="Количество гостей"
                    onBlur={(event: any) => {setGuests(event.target.value)}}
                    style = {{ width: 244 }}
                    autoComplete="property[guests]"
                />
            </div>
            <div>
                <TextField
                    id="property[additional_guests]"
                    name="property[additional_guests]"
                    defaultValue={state.property.property.additional_guests}
                    type="number"
                    margin="normal"
                    required
                    label="Кол-во доп. гостей"
                    onBlur={(event: any) => {setAdditionalGuests(event.target.value)}}
                    style = {{ width: 244 }}
                    autoComplete="property[additional_guests]"
                />
            </div>
            <div>
                <TextField
                    type="number"
                    margin="normal"
                    defaultValue={state.property.property.cost_per_additional_guest}
                    required
                    label="Цена за одного доп. гостя"
                    name="cost_per_additional_guest"
                    id="cost_per_additional_guest"
                    onBlur={(event: any) => {setCostPerAdditionalGuest(event.target.value)}}
                    style = {{ width: 244 }}
                />
                <Typography variant="body2" component="div" color="text.secondary">
                    {"* Цена за одного доп. гостя в сутки"}
                </Typography>
            </div>
            <div>
                <TextField
                    type="number"
                    margin="normal"
                    defaultValue={state.property.property.rooms_and_spaces.summary?.number_of_bedrooms}
                    required
                    label="Количество комнат"
                    name="numberOfBedrooms"
                    id="numberOfBedrooms"
                    onBlur={(event: any) => {
                        setSummaryBedrooms(event.target.value);
                    }}
                    style = {{ width: 244 }}
                />
            </div>
            <div>
                <TextField
                    type="number"
                    margin="normal"
                    defaultValue={state.property.property.rooms_and_spaces.summary?.number_of_beds}
                    required
                    label="Количество кроватей"
                    name="numberOfBeds"
                    id="numberOfBeds"
                    onBlur={(event: any) => {setSummaryBeds(event.target.value)}}
                    style = {{ width: 244 }}
                />
            </div>
            <div>
                <TextField
                    type="number"
                    margin="normal"
                    defaultValue={state.property.property.rooms_and_spaces.summary?.number_of_bathrooms}
                    required
                    label="Количество ванных комнат"
                    name="numberOfBathrooms"
                    id="numberOfBathrooms"
                    onBlur={(event: any) => {setSummaryBeds(event.target.value)}}
                    style = {{ width: 244 }}
                />
            </div>
        </>
    )
}