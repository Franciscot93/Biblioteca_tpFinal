import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card'

import RegistroSocio from './RegistroSocio';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    
    
  }));
  
  
  
  
  const TablaLibros = ({registros,setRegistroParaEditar,eliminarRegistro}) => {
    
  return (
    <TableContainer component={Card}>
        <h3 className='titulo'>Alquileres registrados</h3>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Libro</StyledTableCell>
            <StyledTableCell align="left">Socio</StyledTableCell>
            <StyledTableCell align="left">Teléfono</StyledTableCell>
            <StyledTableCell align="left">Dirección</StyledTableCell>
            <StyledTableCell align="left">F.De Devolución</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {registros.map((registro)=>{       
            
       return (
        <RegistroSocio key={registro.id} registro={registro} setRegistroParaEditar={setRegistroParaEditar} eliminarRegistro={eliminarRegistro}/>
       )
     })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablaLibros