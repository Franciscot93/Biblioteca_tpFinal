import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';


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
  

const RegistroSocio = ({registro,eliminarRegistro,setRegistroParaEditar}) => {
    const {id,libro,socio,telefono,direccion,fechaDevolucion}=registro
    
    const eligeEliminar=()=>{
        const confirmar= window.confirm('Deseas eliminar este registro?')
        if(confirmar){eliminarRegistro(id)}   
    
    }

    const eligeEditar=()=>{
        const confirmar= window.confirm('Deseas editar este registro?')
        if(confirmar){setRegistroParaEditar(registro)}   
    }

  return (
    <StyledTableRow key={id}>
    <StyledTableCell component="th" scope="row">
      {libro}
    </StyledTableCell>
    <StyledTableCell align="left">{socio}</StyledTableCell>
    <StyledTableCell align="left">{telefono}</StyledTableCell>
    <StyledTableCell align="left">{direccion}</StyledTableCell>
    <StyledTableCell align="left">{fechaDevolucion}</StyledTableCell>
    <StyledTableCell align="left"><EditIcon  onClick={eligeEditar}/></StyledTableCell>
    <StyledTableCell align="left"><DeleteIcon  onClick={eligeEliminar}  /></StyledTableCell>
  </StyledTableRow>
  )
}

export default RegistroSocio