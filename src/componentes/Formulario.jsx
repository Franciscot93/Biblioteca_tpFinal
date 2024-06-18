import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';



export default function Formulario() {
const socios=localStorage.getItem('socios')
 const [listaDeLibros,setListaDeLibros]=useState([])
 const [listaDeSocios,setListaDeSocios]=useState([])
  
 useEffect(()=>{
  const librosStorage=JSON.parse(localStorage.getItem('libros'))
  const sociosStorage=JSON.parse(localStorage.getItem('socios'))
  if( librosStorage.length>0){
    setListaDeLibros(librosStorage)
  }
  if(sociosStorage.length>0){
    setListaDeSocios(sociosStorage)
  }
  
 },[socios])
  const [registro, setRegistro] = useState({
    
    libro: "",
    socio: "",
    telefono: "",
    direccion: "",
    fechaDevolucion:""
  })
  const buscaSocio=(e)=>{
    const nombreSocioNuevo= (e.target.value.trim()).toUpperCase()
    
    
    const socio=listaDeSocios.filter(socio=> socio.nombre.toLocaleUpperCase().includes(nombreSocioNuevo))
    if (socio.length>0){
      setRegistro({...registro,socio:socio[0].nombre})
      
    }else{
      setListaDeSocios([...listaDeSocios,{nombre:e.target.value.trim()}])
      console.log(listaDeSocios)
      localStorage.setItem('socios',JSON.stringify(listaDeSocios))
      registro.socio=e.target.value.trim()
     
    }
   
  }

  const handleChange = (event) => {
    const { name, value, } = event.target;

    setRegistro({ ...registro, [name]: value });
  };





  const cargarRegistro=(e)=>{
    e.preventDefault()  
    registro.id=generarId()
    
    const registrosStorage= JSON.parse(localStorage.getItem('registros'))
    registrosStorage.push(registro)
    localStorage.setItem('registros',JSON.stringify(registrosStorage))
    
    

   setRegistro({
    libro: "",
    socio: "",
    telefono: "",
    direccion: "",
    fechaDevolucion:""
   })
   
  }
  const generarId = () => {
    const date = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);

    return date + random;
  };

 
  return (
    <form onSubmit={(e)=>cargarRegistro(e)} id='FormularioBiblioteca' component={Card} >
      <h3 className='titulo'>Registre un nuevo evento</h3>
      <div className='itemFormulario'>
      <FormControl sx={{ m: 1, minWidth: 230, maxWidth: 230 }} size="small">
      <InputLabel  id="demo-select-small-label">Libros</InputLabel>
      <Select
        labelId="demo-select-small-label"
        
        value={registro.libro}
        label="Libros"
        onChange={(e)=>{handleChange(e)}}
        name='libro'
      >
        <MenuItem value="">
          <em>Seleccione un libro...</em>
        </MenuItem>
        {
            listaDeLibros.length>0?(listaDeLibros.map((libro,index)=>{return <MenuItem  key={index} value={libro.nombre}>{libro.nombre}</MenuItem>})):null
        }
      </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 230, maxWidth: 230 }} size="small">
      <InputLabel  id="demo-select-small-label">Socios</InputLabel>
      <Select
        labelId="demo-select-small-label"
        
        value={registro.socio}
        label="Socios"
        onChange={(e)=>{handleChange(e)}}
        name='socio'
      >
        <MenuItem value="">
          <em>Seleccione un socio...</em>
        </MenuItem>
        {
            listaDeSocios.length>0?(listaDeSocios.map((socio,index)=>{return <MenuItem  key={index} value={socio.nombre}>{socio.nombre}</MenuItem>})):null
        }
      </Select>


      
    </FormControl>
      
      </div>
      <div className='itemFormulario'>
      <TextField sx={{ m: 1, minWidth: 230, maxWidth: 230 }}
          label="Nuevo socio"
          placeholder='Nuevo socio'
          size="small"
          name='nuevoSocio'
          onBlur={(e)=>buscaSocio(e)}
          
          
        />
        <TextField sx={{ m: 1, minWidth: 230, maxWidth: 230 }}
          label="Telefono"
          
          placeholder="Ingrese su telefono"
          size="small"
          name="telefono"
          value={registro.telefono}
          onChange={(e)=>{handleChange(e)}}
          
        />

      </div>
      <div className='itemFormulario'>
      <TextField sx={{ m: 1, minWidth: 230, maxWidth: 230 }}
          label="Direccion"
          id="outlined-size-small"
          placeholder="Direccion"
          size="small"
          name="direccion"
          type='text'
          fullWidth={true}
          value={registro.direccion}
          onChange={(e)=>{handleChange(e)}}
          
        />
      
      <TextField sx={{ m: 1, minWidth: 230, maxWidth: 230 }}
          label={registro.fechaDevolucion.length>0?'Fecha de devolución':null}        
          value={registro.fechaDevolucion}        
          size="small"
          name="fechaDevolucion"
          type='date'
          
          onChange={(e)=>handleChange(e)}
        />
      </div>
      
      <Stack direction="row">
      
      <Button type='submit' variant="contained" sx={{m:1}} fullWidth={true} endIcon={<SendIcon />}>
        Registrar
      </Button>
    </Stack>


      


    
        

        


        
    </form>
  );
}