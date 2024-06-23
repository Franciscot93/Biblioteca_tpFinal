import React, {  useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';



export default function Formulario({listaDeLibros,setRegistroParaEditar,listaDeSocios,setListaDeSocios,setRegistros,registros,registroParaEditar}) {

  const [registro, setRegistro] = useState({
    id:"",
    libro: "",
    socio: "",
    telefono: "",
    direccion: "",
    fechaDevolucion:""
  })
 
 const [camposValidos,setCamposValidos]=useState({
  
  libro: null,
  socio: null,
  telefono: null,
  direccion: null,
  fechaDevolucion:null
 })
 
  

  const buscaSocio=(e)=>{
    const nombreSocioNuevo= (e.target.value.trim()).toUpperCase()
    
    if(e.target.value.trim().length>0){

      const socio=listaDeSocios.filter(socio=> socio.nombre.toLocaleUpperCase().includes(nombreSocioNuevo))
      if (socio.length>0){
        setRegistro({...registro,socio:socio[0].nombre})
        
      }else{
        setListaDeSocios([...listaDeSocios,{nombre:e.target.value.trim()}])
        
        localStorage.setItem('socios',JSON.stringify(listaDeSocios))
        registro.socio=e.target.value.trim()
        e.target.value=""
       
      }
    }
   
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setRegistro({ ...registro, [name]: value });
  };



const validar = {
  libro: (valorDelCampo) => {
    setCamposValidos(prev => ({ ...prev, libro: valorDelCampo.trim().length > 0 }));
  },
  socio: (valorDelCampo) => {
    setCamposValidos(prev => ({ ...prev, socio: valorDelCampo.length > 0 }));
  },
  telefono: (valorDelCampo) => {
    setCamposValidos(prev => ({ ...prev, telefono: valorDelCampo.length > 0 && !isNaN(valorDelCampo) }));
  },
  direccion: (valorDelCampo) => {
    setCamposValidos(prev => ({ ...prev, direccion: valorDelCampo.length > 0 }));
  },
  fechaDevolucion: (valorDelCampo) => {
    const fecha = new Date(valorDelCampo);
    setCamposValidos(prev => ({ ...prev, fechaDevolucion: valorDelCampo.length>0 && Date(valorDelCampo) &&  new Date(valorDelCampo)> new Date() }));
  }
};

  const cargarRegistro=(e)=>{
    e.preventDefault()

    if(camposValidos.libro&& camposValidos.socio&&camposValidos.telefono&&camposValidos.direccion&&camposValidos.fechaDevolucion && registro.id===""){
      registro.id=generarId()

      setRegistros([...registros,registro])
      setRegistro({
       libro: "",
       socio: "",
       telefono: "",
       direccion: "",
       fechaDevolucion:""
      })
   
      setCamposValidos({
       libro: null,
       socio: null,
       telefono: null,
       direccion: null,
       fechaDevolucion:null
      })
    }
    if(registro.id!=="" ){
      const{libro,socio,telefono,direccion,fechaDevolucion}=registro
      console.log(camposValidos)
    }
    
    
    
    
    
    
    
  }
  
  useEffect(()=>{
  localStorage.setItem('registros',JSON.stringify(registros))
},[registros])


useEffect(()=>{
  if(Object.keys(registroParaEditar).length> 0){
    const{id,libro,socio,telefono,direccion,fechaDevolucion}=registroParaEditar
    setRegistro({id,libro,socio,telefono,direccion,fechaDevolucion})
 
  }
  
},[registroParaEditar])

useEffect(() => {
  if (registro.id !== "") {
    validar.libro(registro.libro);
    validar.socio(registro.socio);
    validar.telefono(registro.telefono);
    validar.direccion(registro.direccion);
    validar.fechaDevolucion(registro.fechaDevolucion);
  }
}, [registro])

console.log(camposValidos)


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
      <InputLabel  id="demo-select-medium-label">{camposValidos.libro!==false ?'Libros':'Libro ❌ '}</InputLabel>
      <Select
        labelId="demo-select-medium-label"
        onBlur={(e)=>validar.libro(e.target.value)}
        value={ registro.libro}
        label='Libros'
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
      <InputLabel  id="demo-select-small-label">{camposValidos.socio!==false ?'Socio':'Socio ❌'}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        onBlur={(e)=>validar.socio(e.target.value)}
        value={registro.socio}
        label="Socios"
        onChange={(e)=>{handleChange(e);validar.socio(e.target.value)}}
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
          label={camposValidos.telefono!==false ?'Telefono':'Ingrese un telefóno ❌'}
          onBlur={(e)=>validar.telefono(e.target.value)}
          placeholder="Teléfono"
          size="small"
          name="telefono"
          value={registro.telefono}
          onChange={(e)=>{handleChange(e)}}
          
        />

      </div>
      <div className='itemFormulario'>
      <TextField sx={{ m: 1, minWidth: 230, maxWidth: 230 }}
          label={camposValidos.direccion!==false ?'Direccion':'Ingrese una dirección ❌'}
          id="outlined-size-small"
          placeholder="Direccion"
          size="small"
          name="direccion"
          type='text'
          fullWidth={true}
          onBlur={(e)=>validar.direccion(e.target.value)}
          value={registro.direccion}
          onChange={(e)=>{handleChange(e)}}
         
          
        />
      
      <TextField sx={{ m: 1, minWidth: 230, maxWidth: 230 }}
          label={registro.fechaDevolucion.length>0 ?'Fecha de devolución':camposValidos.fechaDevolucion===false?'❌':null}        
          value={registro.fechaDevolucion}        
          size="small"
          name="fechaDevolucion"
          type='date'    
          onChange={(e)=>{handleChange(e);validar.fechaDevolucion(e.target.value)}}
        />
      </div>
      
      <Stack direction="row">
      
      <Button type='submit'  variant="contained" sx={{m:1}} fullWidth={true} endIcon={<SendIcon />}>
        {registro.id ?'Editar':'Agregar'}
      </Button>
      
    </Stack>


      


    
        

        


        
    </form>
  );
}