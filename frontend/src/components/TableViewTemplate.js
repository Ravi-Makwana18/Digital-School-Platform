import React, { useState } from 'react'
import { StyledTableCell, StyledTableRow } from './styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material';

const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    return (
        <>
            <TableContainer sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow sx={{ backgroundColor: '#F8F9FA' }}>
                            {columns.map((column, index) => (
                                <StyledTableCell
                                    key={index}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: 600, color: '#495057', padding: '12px 16px' }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ '&:hover': { backgroundColor: '#F0F3F6' } }}> 
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell key={index} align={column.align} sx={{ color: '#343A40', padding: '10px 16px' }}>
                                                    {
                                                        column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value
                                                    }
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 5));
                    setPage(0);
                }}
                sx={{
                    marginTop: '16px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                    color: '#495057',
                    '& .MuiSelect-select': {
                        fontSize: '0.9rem',
                    },
                    '& .MuiTablePagination-toolbar': {
                        justifyContent: 'flex-end',
                        paddingRight: '16px',
                    },
                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                        marginBottom: 0,
                        fontSize: '0.9rem',
                    },
                }}
            />
        </>
    )
}

export default TableViewTemplate