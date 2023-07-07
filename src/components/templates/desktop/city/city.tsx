'use client';

import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks'
import React, { useState } from 'react'
import { fetchProperties, fetchPropertiesForMap } from '@/redux/thunk/property';
import { fetchAmenities } from '@/redux/thunk/amenity';
import { fetchPropertyTypes } from '@/redux/thunk/propertyType';
import { useParams, useSearchParams } from 'next/navigation';
import { setIsResetPassword, setIsRecoveryPassword, setIsMailMessageWasSent } from '@/redux/slices/internalSystem';
import { Snackbar } from "@material-ui/core";
import { Alert, Container } from "@mui/material";

import { CityWithoutMap } from "@/components/templates/desktop/city/CityWithoutMap/cityWithoutMap";
import { CityWithMap } from "@/components/templates/desktop/city/CityWithMap/cityWithMap";
import { ModalWindowPhoneConfirmation } from "@/components/templates/desktop/city/ModalWindowPhoneConfirmation/modalWindowPhoneConfirmation"

type TUrlParams = {
	[key: string]: any
}

export const City: React.FC = () => {
	const state = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const { city } = useParams();
	const [isLoaded, setIsLoaded] = useState(false);

	React.useEffect(() => {
		let urlRequestParams: TUrlParams = {
			...Object.fromEntries(searchParams.entries() || []),
			status: 1
		}
		
		Object.keys(urlRequestParams).forEach((k: string) => urlRequestParams[k] === 0 && delete urlRequestParams[k])
		
		const fetchData = async () => {
			await dispatch(fetchProperties(urlRequestParams))
			await dispatch(fetchPropertiesForMap(urlRequestParams))	
			setIsLoaded(true)
		}
		fetchData()

	}, [searchParams])

	React.useEffect(() => {
		dispatch(fetchPropertyTypes())
		dispatch(fetchAmenities(''))
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

	return (
		<div>
			{state.internalSystem.isCityWithMap ? (
				<div>
					<CityWithMap isLoaded={isLoaded} />
				</div>
			) : (
				<Container maxWidth="lg">
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<br />
					</div>
					<CityWithoutMap isLoaded={isLoaded} />
					<br />
				</Container>
			)} 

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
					{`На вашу почту ${state.user.user?.email} отправлено письмо. Перейдите по ссылке в письме для подтверждения своего e-mail`}
				</Alert>
			</Snackbar>
			
			<ModalWindowPhoneConfirmation />
		</div>
	)
}
