import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/base/Button';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    // ['&@media (max-width: 960px)']: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     flexWrap: 'wrap',
    //     width: '100%',
    //   },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '&:@media (max-width: 960px)': {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '100%',
      },
   
  }));
  

const RegistroSocio = ({registro,setRegistroParaEditar,eliminarRegistro}) => {
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
    <StyledTableRow key={id} >
    <StyledTableCell component="th" scope="row">
      {libro}
    </StyledTableCell>
    <StyledTableCell align="left">{socio}</StyledTableCell>
    <StyledTableCell align="left">{telefono}</StyledTableCell>
    <StyledTableCell align="left">{direccion}</StyledTableCell>
    <StyledTableCell align="left">{fechaDevolucion}</StyledTableCell>
    <StyledTableCell align="left"><Button><EditIcon  onClick={eligeEditar}/></Button></StyledTableCell>
    <StyledTableCell align="left"><Button><DeleteIcon  onClick={eligeEliminar}  /></Button></StyledTableCell>
  </StyledTableRow>
  )
}

export default RegistroSocio