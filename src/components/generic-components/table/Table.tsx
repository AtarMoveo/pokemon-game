import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination, CircularProgress
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { BasicPokemon } from '../../../data/types/pokemon';
import { tableStyles } from './styles';

interface Column {
  id: string
  label: string
  minWidth?: number
  maxWidth?: number
  align?: 'right' | 'left' | 'center'
}

interface GenericTableProps {
  columns: Column[]
  rows: BasicPokemon[]
  setPage: Dispatch<SetStateAction<number>>
  setRowsPerPage: Dispatch<SetStateAction<number>>
  loading: boolean
  totalRows: number
  rowsPerPage: number
  page: number
}

const GenericTable = ({
  columns, rows, setPage, setRowsPerPage, loading, totalRows, rowsPerPage, page
}: GenericTableProps) => {

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const renderTableCell = (column: Column, value: any) => {
    if (column.id === 'image') {
      return (
        <img
          src={value}
          alt={column.label}
          style={tableStyles.imageCell}
        />
      )
    }
    return typeof value === 'object' ? JSON.stringify(value) : value
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={tableStyles.headRow}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={tableStyles.headCell}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ maxWidth: column.maxWidth }}
                      sx={{
                        ...tableStyles.bodyCell,
                        padding: column.id === 'image' ? '0.5rem 1rem' : (
                          ['name', 'id', 'description'].includes(column.id)
                            ? '1rem 2.5rem 1rem 0'
                            : '1rem 1rem 1rem 0'
                        ),
                      }}
                    >
                      {renderTableCell(column, (row as any)[column.id])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={tableStyles.pagination}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} items`}
      />
    </Paper>
  )
}

export default GenericTable