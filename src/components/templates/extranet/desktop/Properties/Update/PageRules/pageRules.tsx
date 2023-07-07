import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Link from "next/link";
import lodash from 'lodash';

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Anchor } from 'antd';
import 'antd/dist/reset.css';

import { createPropertyRules, updatePropertyRules } from "@/api/extranet";
import { fetchPropertyExtranet } from '@/redux/thunk/property';
import { PropertyStatusesViewAdmin } from "@/utils/Constants/Enums/PropertyStatuses";
import { PropertyRules } from "@/components/Property/PropertyRules/propertyRules";
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

export const PageRules: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [error, setError] = useState<any>(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rulesIsExist, setRulesIsExist] = useState(false);
    let { id } = useParams();
    //let location = useLocation()

    useEffect(() => {
        if (!(state.property.property.id)) {
            Promise.all([dispatch(fetchPropertyExtranet(id))])
                .then(
                    (res) => {
                        setRulesIsExist(!!res[0].payload.rules)
                        setIsLoaded(true);
                    },
                    () => {
                        setError('404');
                        throw new Error('404 Page Not Found');
                    }
                )
        } else {
            setRulesIsExist(!lodash.isEmpty(lodash.omit(state.property.property.rules, ['damage_deposit_amount', 'down_payment_amount'])))
            setIsLoaded(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isLoaded) {
            rulesIsExist ? updatePropertyRules(id, state.property.property.rules) : createPropertyRules(id, state.property.property.rules)
            setRulesIsExist(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.property.property.rules])

    if (error) {
        throw new Error('404 Page Not Found');
    }

    return (
        <Container maxWidth="lg">
            {isLoaded && (
                <>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div><Typography variant="h6" gutterBottom>{state.property.property.name}</Typography></div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div style={{ paddingRight: '40px' }}>{'Статус "' + PropertyStatusesViewAdmin[state.property.property.status] + '"'}</div>
                            <div style={{ paddingRight: '40px' }}>{'МБ "' + (state.property.property.instant_booking_available ? 'Да' : 'Нет') + '"'}</div>
                            <div>
                                <Link href={`/${state.property.property.region.slug}/${state.property.property.id}`}>
                                    <Button variant="outlined" sx={{ borderColor: 'black', color: 'black' }}>Посмотреть объявление</Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '30%' }}>
                            <div style={{ position: 'sticky', top: '2px', height: '300px', display: 'inline-block', paddingTop: '48px' }}>
                                <Link href={`/host/properties/${id}/update`}>
                                    <Button variant="contained" sx={{ color: 'black', paddingLeft: 0, marginBottom: '0.5rem' }}><KeyboardArrowLeftIcon />Правила размещения</Button>
                                </Link>
                                <Anchor>
                                     <Anchor.Link href={`#date`} title={'Длительность'} />
                                     <Anchor.Link href={`#amenities`} title={'Удобства'} />
                                     <Anchor.Link href={`#additional_rules`} title={'Дополнительные правила'} />
                                </Anchor>
                            </div>
                        </div>

                        <PropertyRules />
                    </div>
                </>
            )}
        </Container>
    );
};