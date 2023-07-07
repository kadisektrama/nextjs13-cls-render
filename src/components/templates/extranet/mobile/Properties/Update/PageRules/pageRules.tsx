import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Link from "next/link";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import 'antd/dist/reset.css';
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TuneIcon from "@mui/icons-material/Tune";

import {
    createPropertyRules,
    updatePropertyRules,
} from "@/api/extranet";
import { PropertyRules } from "@/components/Property/PropertyRules/propertyRules";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";
import lodash from "lodash";
import { fetchPropertyExtranet } from '@/redux/thunk/property';
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

export const PageRules = () => {
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
        <AccountHeader
            name={
                <Typography component="h1" variant="h5">
                    Правила
                </Typography>
            }
            startElement={
                <IconButton>
                    <Link href={`/host/properties/${id}/update`}><ArrowBackIosNewIcon fontSize="small" sx={{ color: '#000000' }} /></Link>
                </IconButton>
            }
            endElement={
                <IconButton>
                    <TuneIcon fontSize="small" />
                </IconButton>
            }
        >
            <Box sx={{ margin: 2, mt: -4 }}>
                {isLoaded && (
                    <PropertyRules />
                )}
            </Box>
        </AccountHeader>
    );
};