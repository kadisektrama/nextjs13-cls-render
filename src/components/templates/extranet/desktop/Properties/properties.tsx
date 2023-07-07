import Link from "next/link";
import React, { useEffect, useState } from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Add } from "@mui/icons-material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CheckCircleFilled } from '@ant-design/icons';
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { fetchPropertiesExtranet } from '@/redux/thunk/property';
import { updatePropertyStatus } from "@/api/extranet";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { PropertyStatusesViewAdmin, PropertyStatuses } from "@/utils/Constants/Enums/PropertyStatuses";
import { ModalWindowPropertyCreatingThankful } from "@/components/Modals/ModalWindowPropertyCreatingThankful/modalWindowPropertyCreatingThankful"
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { TableCellBaseProps } from "@material-ui/core";

export const Properties: React.FC = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = anchorEl?.id;

    useEffect(() => {
        dispatch(fetchPropertiesExtranet())
            .then(
                () => setIsLoaded(true),
                (error: any) => {
                    setError(error);
                    setIsLoaded(true);
                }
            )
    }, [])

    const handleClickMenuIconButton = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenuIconButton = () => {
        setAnchorEl(null);
    };

    const handleChangePropertyStatus = async (id: any) => {
        await updatePropertyStatus(id, 0)
        await dispatch(fetchPropertiesExtranet())
        handleCloseMenuIconButton()

    };

    return(
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" component="h1" className="MuiTypography-captain">
                    {(isLoaded && state.property.properties) ? state.property.properties.filter((item: any) => item.status === PropertyStatuses.inactive || item.status === PropertyStatuses.active).length : 0} {getNoun((isLoaded && state.property.properties ? state.property.properties.filter((item: any) => item.status === PropertyStatuses.inactive || item.status === PropertyStatuses.active).length : 5), 'объявление', 'объявления', 'объявлений')}
                </Typography>
                <Link href="/host/properties/create">
                    <Button variant="outlined" startIcon={<Add />}>
                        Создать объявление
                    </Button>
                </Link>
            </Box>
            <Box>
                {isLoaded ? (
                    <>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={'medium'}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Объявление</TableCell>
                                        <TableCell align="left">Статус</TableCell>
                                        <TableCell align="left">Мгновенное бронирование</TableCell>
                                        <TableCell align="right">Спальни</TableCell>
                                        <TableCell align="right">Кровати</TableCell>
                                        <TableCell align="right">Ванные</TableCell>
                                        <TableCell align="left">Местоположение</TableCell>
                                        <TableCell align="left">Последнее изменение</TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...state.property.properties]
                                        .sort((a: any, b: any) => new Date(b.updated_at) as unknown as number - (new Date(a.updated_at) as unknown as number))
                                        .sort((a: any, b: any) => b.status - a.status)
                                        .map((property: any) => (
                                        <TableRow
                                            key={property.id}
                                            sx={{ '&:last-child td, &:last-child th, &:last-child a': { border: 0 } }}
                                        >
                                            {/* @ts-ignore */}
                                            <TableCell component={Link as unknown as React.ElementType<TableCellBaseProps>} href={`${property.id}/update`} scope="row" sx={{ display: 'flex', alignItems: 'center', columnGap: '16px', fontWeight: 500, '&:hover': { color: 'inherit' } }}>
                                                <Avatar
                                                    sx={{
                                                        width: 63,
                                                        height: 45
                                                    }}
                                                    src={`${property.photos[0].url}?width=480`}
                                                    variant="rounded"
                                                />
                                                {property.name}
                                            </TableCell>
                                            <TableCell align="left">{PropertyStatusesViewAdmin[property.status as unknown as keyof typeof PropertyStatusesViewAdmin]}</TableCell>
                                            <TableCell align="left"><CheckCircleFilled style={{ color: property.instant_booking_available === 0 ? 'grey' : 'green', marginRight: '8px' }} />{property.instant_booking_available === 0 ? 'Выключено' : 'Включено'}</TableCell>
                                            <TableCell align="right">{property.rooms_and_spaces.summary.number_of_bedrooms}</TableCell>
                                            <TableCell align="right">{property.rooms_and_spaces.summary.number_of_beds}</TableCell>
                                            <TableCell align="right">{property.rooms_and_spaces.summary.number_of_bathrooms}</TableCell>
                                            <TableCell align="left">{property.address}, <br />{`${property.region.parent.parent.name}, ${property.region.name}`}</TableCell>
                                            <TableCell align="left">{(new Date(property.updated_at)).toLocaleDateString("ru", { month: 'short', day: 'numeric' })}</TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    aria-label="more"
                                                    id={`long-button-${property.id}`}
                                                    style={{ padding: '4px' }}
                                                    aria-controls={`long-button-${property.id}` === open ? 'long-menu' : undefined}
                                                    aria-expanded={`long-button-${property.id}` === open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClickMenuIconButton}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    id="long-menu"
                                                    anchorEl={anchorEl}
                                                    open={`long-button-${property.id}` === open}
                                                    onClose={handleCloseMenuIconButton}
                                                >
                                                    <MenuItem key={'search on website'} onClick={handleCloseMenuIconButton}>
                                                        <Link style={{ color: 'black' }} href={`/${property.region.slug}/${property.id}`}>Посмотреть на сайте</Link>
                                                    </MenuItem>
                                                    <MenuItem disabled={property.status !== PropertyStatuses.active} key={'search on website'} onClick={() => handleChangePropertyStatus(property.id)}>
                                                        Снять с публикации
                                                    </MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <SimpleLoader />
                )}
            </Box>

            <ModalWindowPropertyCreatingThankful />
        </>
    )
}
