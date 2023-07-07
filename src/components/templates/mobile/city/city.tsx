import { useSearchParams , useParams, usePathname, useRouter } from "next/navigation";
import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { addDays } from "date-fns";
import './city.css';

import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks'
import { setIsResetPassword, setIsRecoveryPassword, setIsMailMessageWasSent, setIsAccessToRedirect } from '@/redux/slices/internalSystem';
import { Header } from "./Header/header";
import { Ads } from "./Ads/ads"
import { fetchProperties } from '@/redux/thunk/property';
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { ModalWindowPhoneConfirmation } from "./ModalWindowPhoneConfirmation/modalWindowPhoneConfirmation";
import { DateFilter } from "./DateFilter/dateFilter";
import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { Menu } from "../Menu/menu"
import { TUrlParams } from "@/types/other";

export const City: React.FC = () => {
    const state = useAppSelector((state) => state)
	const dispatch = useAppDispatch()
    const [windowScreen, setWindowScreen] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<any>(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const { city } = useParams();

    useEffect(() => {
        let urlRequestParams: TUrlParams = {
			...Object.fromEntries(searchParams.entries() || []),
			status: 1
		}
        Object.keys(urlRequestParams).forEach(k => urlRequestParams[k] === 0 && delete urlRequestParams[k])

        dispatch(fetchProperties(urlRequestParams))
            .then(
                () => {
                    setIsLoaded(true);
                },
                () => {
                    setError('404');
                    throw new Error('404 Page Not Found');
                }
            )
    }, [])

    useEffect(() => {
        if (state.internalSystem.isAccessToRedirect) {
            dispatch(setIsAccessToRedirect(false))
        }
    }, [])

	const closeAlertPasswordReset = () => {
		dispatch(setIsResetPassword(false))
	}

	const closeAlertPasswordRecovery = () => {
		dispatch(setIsRecoveryPassword(false))
	}

	const closeAlertMailMessageWasSent = () => {
		dispatch(setIsMailMessageWasSent(false))
	}

    if (error) {
        throw new Error('404 Page Not Found');
    }

    return (
        <>
            {windowScreen === '' && (
                <>
                    {isLoaded ? (
                        <>
                            <Header />
                            <div style={{ height: '20px', width: '100%', backgroundColor: 'green' }}></div>
                            <div style={{ marginTop: "60px", paddingBottom: '56px' }}>

                                <div style={{ height: `${document.documentElement.clientHeight * 0.7}px` }}>
                                    <div style={{ padding: '40px 20px 20px', textAlign: 'center' }}>
                                        <h1 style={{ marginBottom: '10px', fontSize: '22px' }}>Квартиры на сутки в Бресте</h1>
                                        <div style={{ marginBottom: '40px' }}>{state.property.properties ? `${state.property.properties.meta.total} ${getNoun(state.property.properties.meta.total, 'предложение', 'предложения', 'предложений')}` : ''}</div>

                                        <Box
                                            //xs={true}
                                            sx={{
                                                borderRadius: 1,
                                                border: 1,
                                                borderColor: "#d5d5d5",
                                                fontSize: '22px',
                                                padding: '12px'
                                            }}
                                            style={{ width: '100%', marginBottom: '2px', cursor: 'pointer' }}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="caption" color="text.secondary" style={{ fontSize: '20px' }}>
                                                    Брест
                                                </Typography>
                                                <LocationOnIcon sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                                            </div>
                                        </Box>

                                        <div style={{ display: 'flex', textAlign: 'initial' }}>
                                            <Box
                                                //xs={true}
                                                sx={{
                                                    borderRadius: 1,
                                                    border: 1,
                                                    borderColor: "#d5d5d5",
                                                    fontSize: '16px',
                                                    mb: 1,
                                                    padding: '8px'
                                                }}
                                                style={{ width: 'calc(50% - 2px)', marginRight: '2px', cursor: 'pointer' }}
                                                onClick={() => {
                                                    const urlParams = {
                                                        ...Object.fromEntries(searchParams || []),
                                                        start_date: dateForRequestFormat(new Date()),
                                                        end_date: dateForRequestFormat(addDays(new Date(), 1)),
                                                    }

                                                    router.push(`${pathname}?${new URLSearchParams(urlParams).toString()}`) 

                                                    setWindowScreen('dateFilter')
                                                }}
                                            >
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Заезд
                                                    </Typography>
                                                    <div>
                                                        Сегодня
                                                    </div>
                                                </div>
                                            </Box>

                                            <Box
                                                //xs="true"
                                                sx={{
                                                    borderRadius: 1,
                                                    border: 1,
                                                    borderColor: "#d5d5d5",
                                                    fontSize: '16px',
                                                    mb: 1,
                                                    padding: '8px'
                                                }}
                                                style={{ width: 'calc(50% - 2px)', marginLeft: '2px', cursor: 'pointer' }}
                                                onClick={() => setWindowScreen('dateFilter')}
                                            >
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Отъезд
                                                    </Typography>
                                                    <div>
                                                        Завтра
                                                    </div>
                                                </div>
                                            </Box>
                                        </div>

                                        <div style={{ marginTop: '10px' }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ width: '100%', position: 'relative' }}
                                                size="large"
                                            >
                                                <div>Смотреть цены</div>
                                                <Link style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} className={'Link'} href={`${city}/search?${new URLSearchParams({start_date: dateForRequestFormat(new Date()), end_date: dateForRequestFormat(addDays(new Date(), 1))})}`}></Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {state.property.properties ? (
                                    <Ads />                                    
                                ) : (
                                    <SimpleLoader />
                                )}
                            </div>

                            <Snackbar open={state.internalSystem.isRecoveryPassword} autoHideDuration={6000} onClose={closeAlertPasswordRecovery} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                <Alert onClose={closeAlertPasswordRecovery} severity="success" sx={{ width: '100%' }}>
                                    {'Ссылка для восстановления пароля была отправлена на вашу электронную почту.'}
                                </Alert>
                            </Snackbar>

                            <Snackbar open={state.internalSystem.isResetPassword} autoHideDuration={6000} onClose={closeAlertPasswordReset} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                <Alert onClose={closeAlertPasswordReset} severity="success" sx={{ width: '100%' }}>
                                    {'Новый пароль сохранен.'}
                                </Alert>
                            </Snackbar>

                            <Snackbar open={state.internalSystem.isMailMessageWasSent} autoHideDuration={6000} onClose={closeAlertMailMessageWasSent} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                <Alert onClose={closeAlertMailMessageWasSent} severity="success" sx={{ width: '100%' }}>
                                    {'На вашу почту адрес почты отправлено письмо. Перейдите по ссылке в письме для подтверждения своего e-mail'}
                                </Alert>
                            </Snackbar>

                            <ModalWindowPhoneConfirmation />
                        </>
                    ) : <SimpleLoader />}
                </>
            )}

            {windowScreen === 'dateFilter' && (
                <DateFilter setWindowScreen={(value: any) => setWindowScreen(value)} />
            )}
            <Menu />
        </>
    )
}


