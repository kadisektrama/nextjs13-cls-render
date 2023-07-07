"use client"

// Core
import React, { useEffect, useState, useMemo } from "react"
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

// UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

// Tools
import { fetchProperty } from "@/redux/thunk/property"
import { fetchPropertyTypes } from "@/redux/thunk/propertyType";
import { getGeoInfo } from "@/api/commonApi";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { Header } from "@/components/templates/desktop/business/Header/header";
import { GalleryPhoto } from "@/components/templates/desktop/business/Gallery/gallery";
import Description from "@/components/templates/desktop/business/Description/description";
import { ModalWindowChecking } from "@/components/templates/desktop/business/ModalWindowChecking/modalWindowChecking";
import { ModalWindowLogin } from "@/components/templates/desktop/business/Book/Auth/ModalWindowLogin/modalWindowLogin";
import { ModalWindowRegistration } from "@/components/templates/desktop/business/Book/Auth/ModalWindowRegistration/modalWindowRegistration";
import { ModalWindowMailChecking } from "@/components/templates/desktop/business/Book/Auth/ModalWindowMailChecking/modalWindowMailChecking";
import { ModalWindowMailLogin } from "@/components/templates/desktop/business/Book/Auth/ModalWindowMailLogin/modalWindowMailLogin";
import { ModalWindowMailRegistration } from "@/components/templates/desktop/business/Book/Auth/ModalWindowMailRegistration/modalWindowMailRegistration";
import { DialogWindowCodeAuthenticationContainer } from "@/components/Modals/DialogWindowCode/dialogWindowCodeAuthenticationContainer";
import { ModalWindowReviews } from "@/components/templates/desktop/business/Description/Reviews/ModalWindowReviews/modalWindowReviews";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { fetchAmenities } from "@/redux/thunk/amenity";
import { fetchCountryRegisters } from "@/redux/thunk/countryRegister";
import { fetchAmenityCategories } from "@/redux/thunk/amenityCategory";
import { fetchPropertyFavourites } from "@/redux/thunk/propertyFavourite";

export const Business: React.FC<any> = (props) => {
    const [error, setError] = useState<boolean | string>(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [countryCallingCode, setCountryCallingCode] = useState('')
    const [phone, setPhone] = useState('')
    const [mail, setMail] = useState('');
    const [verifyCode, setVerifyCode] = useState(false);
    const [geoData, setGeoData] = useState(null);
    const [isDisableButton, setIsDisableButton] = useState(false);
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    //TODO
    const [openWindowReviews, setOpenWindowReviews] = useState(false);
    const [openWindowChecking, setOpenWindowChecking] = useState(false);
    const [openModalWindowLogin, setOpenModalWindowLogin] = useState(false);
    const [openModalWindowRegistration, setOpenModalWindowRegistration] = useState(false);
    const [openDialogWindowCode, setOpenDialogWindowCode] = useState(false);
    const [openWindowMailChecking, setOpenWindowMailChecking] = useState(false);
    const [openWindowMailLogin, setOpenWindowMailLogin] = useState(false);
    const [openWindowMailRegistration, setOpenWindowMailRegistration] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [openAlertReject, setOpenAlertReject] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        Promise.all([
            dispatch(fetchProperty(id)),
            getGeoInfo(),
            dispatch(fetchPropertyTypes()),
            Cookies.get('token') && dispatch(fetchPropertyFavourites()),
            dispatch(fetchAmenities('')),
            dispatch(fetchAmenityCategories()),
            dispatch(fetchCountryRegisters()),
        ])
            .then((res) => {
                setGeoData(res[1]);
                setCountryCallingCode(res[1].country_calling_code);
                setPhone(res[1].country_calling_code)
            })
            .then(
                () => {
                    setIsLoaded(true);
                },
                (error) => {
                    setError('404');
                    throw new Error('404 Page Not Found')
                }
            )
            .catch((e) => console.log(e))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (error) {
        throw new Error('404 Page Not Found');
    }

    const memoizedPhotos = useMemo(() => {
        return state.property.property.photos
    }, [isLoaded])

    const propertyFavourites = useMemo(() => {
        return state.propertyFavourite.propertyFavourites
    }, [state.propertyFavourite.propertyFavourites?.length])

    return(
        <div>
            {isLoaded ? (
                <>
                    <Container maxWidth="lg">
                        <Grid container spacing={3} mt={0}>
                            <Grid item xs={12}>
                                <Header propertyFavourites={propertyFavourites} id={id} name={state.property.property.name} />
                            </Grid>
                            <Grid item xs={12}>
                                <GalleryPhoto photos={memoizedPhotos} name={state.property.property.name} />
                            </Grid>
                            <Grid item>
                                <Description setOpenWindowReviews={(value: any) => setOpenWindowReviews(value)} setOpenWindowChecking={(value: any) => setOpenWindowChecking(value)}/>
                            </Grid>
                        </Grid>
                    </Container>

                    <Snackbar open={openAlertSuccess} autoHideDuration={6000} onClose={() => setOpenAlertSuccess(false)}>
                        <Alert onClose={() => setOpenAlertSuccess(false)} severity="success" sx={{ width: '100%' }}>
                            {state.property.property.instant_booking_available ? 'Забронировано!' : 'Ожидайте пока владелец примет заявку'}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openAlertReject} autoHideDuration={6000} onClose={() => setOpenAlertReject(false)}>
                        <Alert onClose={() => setOpenAlertReject(false)} severity="error" sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>

                    <ModalWindowChecking
                        open={openWindowChecking}
                        handleClose={() => setOpenWindowChecking(false)}
                        phone={phone}
                        countryCallingCode={countryCallingCode}
                        geoData={geoData}
                        setOpenWindowLogin={() => setOpenModalWindowLogin(true)}
                        setOpenWindowRegistration={() => setOpenModalWindowRegistration(true)}
                        setOpenWindowMailChecking={() => setOpenWindowMailChecking(true)}
                        setPhone={(value: any) => setPhone(value)}
                        setCountryCallingCode={(value: any) => setCountryCallingCode(value)}
                        setVerifyCode={(value: any) => setVerifyCode(value)}
                    />
                    <DialogWindowCodeAuthenticationContainer setVerifyCode={(value: any) => setVerifyCode(value)} open={openDialogWindowCode} handleClose={() => {setIsDisableButton(false); setOpenDialogWindowCode(false)}} handleOpenRegistrationWindow={() => setOpenModalWindowRegistration(true)}  phone={phone} countryCallingCode={countryCallingCode} />
                    <ModalWindowLogin open={openModalWindowLogin} handleClose={() => setOpenModalWindowLogin(false)} phone={phone} />
                    <ModalWindowRegistration verifyCode={verifyCode} open={openModalWindowRegistration} handleClose={() => {setIsDisableButton(false); setOpenModalWindowRegistration(false)}}  phone={phone} countryCallingCode={countryCallingCode} />
                    <ModalWindowMailChecking open={openWindowMailChecking} mail={mail} setMail={(value: any) => setMail(value)} handleClose={() => setOpenWindowMailChecking(false)} setOpenWindowMailLogin={(value: any) => setOpenWindowMailLogin(value)} setOpenWindowMailRegistration={(value: any) => setOpenWindowMailRegistration(value)} />
                    <ModalWindowMailLogin open={openWindowMailLogin} handleClose={() => setOpenWindowMailLogin(false)} mail={mail} />
                    <ModalWindowMailRegistration open={openWindowMailRegistration} handleClose={() => setOpenWindowMailRegistration(false)} mail={mail} />
                    {state.property.property.moderatedReviews?.data.scoreCount ? (<ModalWindowReviews open={openWindowReviews} handleClose={() => setOpenWindowReviews(false)} />) : ''}
                </>
            ) : <SimpleLoader />}
        </div>
    )
}