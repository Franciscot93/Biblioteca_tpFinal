import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  
  
  const TablaLibros = () => {
    const [registros,setRegistros]=useState([])
    const registrosStorage= JSON.parse(localStorage.getItem('registros'))
  useEffect(()=>{
    
    if (registrosStorage.length>0){
      setRegistros(registrosStorage)
      
    }
  },[])
  return (
    <TableContainer component={Card}>
        <h3 className='titulo'>Alquileres registrados</h3>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Libro</StyledTableCell>
            <StyledTableCell align="center">Socio</StyledTableCell>
            <StyledTableCell align="center">Teléfono</StyledTableCell>
            <StyledTableCell align="center">Dirección</StyledTableCell>
            <StyledTableCell align="center">F.De Devolución</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registros?.length>0 ?registros.map((registro) => (
            <StyledTableRow key={registro.id}>
              <StyledTableCell component="th" scope="row">
                {registro.libro}
              </StyledTableCell>
              <StyledTableCell align="right">{registro.socio}</StyledTableCell>
              <StyledTableCell align="right">{registro.telefono}</StyledTableCell>
              <StyledTableCell align="right">{registro.direccion}</StyledTableCell>
              <StyledTableCell align="right">{registro.fechaDevolucion}</StyledTableCell>
              <StyledTableCell align="right"><EditIcon onClick={(e)=>{console.log(e.target)}}/></StyledTableCell>
              <StyledTableCell align="right"><Button variant="outlined" startIcon={<DeleteIcon  />}></Button></StyledTableCell>
            </StyledTableRow>
          )):null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablaLibros