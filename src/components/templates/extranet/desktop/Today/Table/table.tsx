import PropTypes from 'prop-types';
import React, { useEffect } from "react";

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Button } from "@mui/material";

import { ModalWindow } from "./ModalWindow/modalWindow";
import { ApprovalDialogWindow } from "./ApprovalDialogWindow/approvalDialogWindow";
import { dateForViewFormat, differenceDateFromNowHour } from "@/utils/Helpers/Date/date";
import { getNoun } from "@/utils/Helpers/Translator/translator";
import { SimpleLoader } from "@/components/Loader/simpleLoader";
import { BookingStatusesViewAdmin, BookingStatuses } from "@/utils/Constants/Enums/BookingStatuses";
import { useAppSelector } from '@/redux/hooks/hooks';
import { IBooking } from "@/types/IBooking"

function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: any, orderBy: any) {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array: any, comparator: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
}

const headCells = [
    {
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: 'Статус',
    },
    {
        id: 'guests',
        numeric: false,
        disablePadding: false,
        label: 'Гости',
    },
    {
        id: 'startDate',
        numeric: true,
        disablePadding: false,
        label: 'Прибытие',
    },
    {
        id: 'endDate',
        numeric: true,
        disablePadding: false,
        label: 'Выезд',
    },
    {
        id: 'createdAt',
        numeric: true,
        disablePadding: false,
        label: 'Забронировано',
    },
    {
        id: 'property',
        numeric: false,
        disablePadding: false,
        label: 'Объявления',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Выплата',
    },
    {
        id: 'zxc',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

const EnhancedTableHead: React.FC<any> = ({ order, orderBy, onRequestSort }: any) => {
    const createSortHandler = (property: any) => (event: any) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTable: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const [order, setOrder] = React.useState('asc');
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState<any>([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(40);
    const [rows, setRows] = React.useState<any>([])
    const [open, setOpen] = React.useState(false);
    const [row, setRow] = React.useState<any[]>([]);
    const [openApprovalDialogWindow, setOpenApprovalDialogWindow] = React.useState(false);

    useEffect(() => {
        function createData(id: any, status: any, details: any, startDate: any, endDate: any, createdAt: any, property: any, price: any, currency: any, user: any, item: any) {
            return {
                id,
                status,
                details,
                startDate,
                endDate,
                createdAt,
                property,
                price,
                currency,
                user,
                item,
            };
        }
        
        state.booking.bookings.map((item: IBooking) => {
            rows.push(createData(item.id, item.status, item.details, item.start_date, item.end_date, item.created_at, item.property, item.property.price, item.property.currency, item.user, item))

            return true;
        })
        setIsLoaded(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOpen = (row: any) => {
        setRow(row);
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n: any) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: any, name: any) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: any[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <>
            <Box sx={{ width: '100%' }}>
                {isLoaded ? (
                    <>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row: any, index: any) => {
                                            const isItemSelected = isSelected(row.name);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, row.name)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={index}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {BookingStatusesViewAdmin[row.status as unknown as keyof typeof BookingStatusesViewAdmin]}
                                                    </TableCell>
                                                    <TableCell>{+row.details?.guests.adults + +row.details?.guests.children}&nbsp;{getNoun(+row.details?.guests.adults + +row.details?.guests.children, 'взрослый', 'взрослых', 'взрослых')}</TableCell>
                                                    <TableCell align="right">{dateForViewFormat(row.startDate)}</TableCell>
                                                    <TableCell align="right">{dateForViewFormat(row.endDate)}</TableCell>
                                                    <TableCell align="right">{dateForViewFormat(row.createdAt)}</TableCell>
                                                    <TableCell align="left">{row.property.name}</TableCell>
                                                    <TableCell align="right">{row.item.cost + '' + row.currency}</TableCell>
                                                    <TableCell align="right">
                                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                            <Button variant="outlined" sx={{ width: '100%' }} onClick={() => handleOpen(row)}>Подробнее</Button>
                                                            {row.status === BookingStatuses.confirmed && (
                                                                <Button
                                                                    sx={{ marginTop: '4px' }}
                                                                    disabled={!(differenceDateFromNowHour(row.startDate) > 0 && differenceDateFromNowHour(row.startDate) <= 48)}
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => {setRow(row); setOpenApprovalDialogWindow(true)}}
                                                                >
                                                                    Отметить незаезд
                                                                </Button>
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[20, 40, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                ) : (
                    <SimpleLoader />
                )}
            </Box>

            <ApprovalDialogWindow row={row} open={openApprovalDialogWindow} handleClose={() => setOpenApprovalDialogWindow(false)} setRows={(value: any) => setRows(value)} />
            <ModalWindow open={open} row={row} handleClose={handleClose} />
        </>
    );
}

export default EnhancedTable