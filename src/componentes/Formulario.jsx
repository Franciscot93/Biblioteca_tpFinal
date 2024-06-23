import React, {  useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';


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
        
        setRegistro(prev => ({ ...prev, socio: e.target.value.trim()}))
        validar.socio(e.target.value.trim())
        localStorage.setItem('socios',JSON.stringify(listaDeSocios))
        
       
      }
      e.target.value=""
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
   
    setCamposValidos(prev => ({ ...prev, fechaDevolucion: valorDelCampo.length>0 && Date(valorDelCampo) &&  new Date(valorDelCampo)> new Date() }));
  }
};

  const cargarRegistro=(e)=>{
    e.preventDefault()
    console.log(camposValidos)
    if(camposValidos.libro&& camposValidos.socio&&camposValidos.telefono&&camposValidos.direccion&&camposValidos.fechaDevolucion && Object.keys(registroParaEditar).length=== 0){
      registro.id=generarId()
      console.log('aqui',Object.keys(registroParaEditar).length)
      setRegistros(prev =>[...prev,registro])
      setRegistro({
        id:"",       
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
    if( Object.keys(registroParaEditar).length> 0 && camposValidos.libro&& camposValidos.socio&&camposValidos.telefono&&camposValidos.direccion&&camposValidos.fechaDevolucion ){
      console.log('en edicion', registro)
      
      const registrosEditados=registros.map(reg=> reg.id ===registro.id ? registro : reg)
      setRegistros(registrosEditados)

      setRegistro({
       id:"",
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
       setRegistroParaEditar({})
  }
       
    
    
  }
  
  useEffect(()=>{
  localStorage.setItem('registros',JSON.stringify(registros))
},[registros])


useEffect(()=>{
  if(Object.keys(registroParaEditar).length> 0){
    console.log('si')
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




  const generarId = () => {
    const date = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);

    return date + random;
  };


 
  return (
    <form onSubmit={(e)=>cargarRegistro(e)} id='FormularioBiblioteca' component={Card} >
      <h3 className='titulo'>Presta un libro</h3>
      <div className='itemFormulario'>
      <div className='itemError'>{camposValidos.libro===false ?'❌':null}<div className='textoError'>{camposValidos.libro===false ?'Debe seleccionar un libro':null}</div></div>
      <FormControl sx={{ marginBottom: 2,marginX:1, minWidth: 230, maxWidth: 230 }}  size="small">
      <InputLabel  id="demo-select-medium-label">Libro</InputLabel>
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
      </div>
      <div className='itemFormulario'>
      <div className='itemError'>{camposValidos.socio===false ?'❌':null}<div className='textoError'>{camposValidos.socio===false ?'Debe seleccionar un socio':null}</div></div>
      <FormControl sx={{ marginBottom: 2,marginX:1, minWidth: 230, maxWidth: 230 }} size="small">
        
      <InputLabel  id="demo-select-small-label">Socio</InputLabel>
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
      <TextField sx={{ marginBottom: 2,marginX:1, minWidth: 230, maxWidth: 230 }}
          label="Nombre y Apellido"
          
          size="small"
          name='nuevoSocio'
          onBlur={(e)=>buscaSocio(e)}
          
          
        />
        </div>
        <div className='itemFormulario'>
        <div className='itemError'>{camposValidos.telefono===false ?'❌':null}<div className='textoError'>{camposValidos.telefono===false ?'ingrese un telefono':null}</div></div>

        <TextField sx={{ marginBottom: 2,marginX:1, minWidth: 230, maxWidth: 230 }}
          label='Telefono'
          onBlur={(e)=>validar.telefono(e.target.value)}
          placeholder="Teléfono"
          size="small"
          name="telefono"
          value={registro.telefono}
          onChange={(e)=>{handleChange(e)}}
          
        />

      </div>
      <div className='itemFormulario'>
      <div className='itemError'>{camposValidos.direccion===false ?'❌':null}<div className='textoError'>{camposValidos.direccion===false ?'Ingrese una dirección':null}</div></div>

      <TextField sx={{ marginBottom: 2,marginX:1, minWidth: 230, maxWidth: 230 }}
          label='Dirección'
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
      </div>
      <div className='itemFormulario'>
      <div className='itemError'>{camposValidos.fechaDevolucion===false?'❌ ':null}<div className='textoError'>{camposValidos.fechaDevolucion===false ?'Seleccione una fecha valida':null}</div></div>

      <TextField sx={{ marginBottom: 2,marginX:1, minWidth: 230, maxWidth: 230 }}
          label={registro.fechaDevolucion.length>0 ?'Fecha de devolución':null}        
          value={registro.fechaDevolucion}        
          size="small"
          name="fechaDevolucion"
          type='date'    
          onChange={(e)=>{handleChange(e);validar.fechaDevolucion(e.target.value)}}
        />
      </div>
      
      <Stack direction="row"> 
      
      <Button type='submit'  variant="contained" sx={{m:1,paddingY:1,bgcolor:`${registro.id?'#059669':'#06B6D4'}`}} fullWidth={true} endIcon={registro.id?<AutoFixHighIcon/>:<AddIcon/>}>
        {registro.id ?'Aceptar':'Agregar'}
      </Button>
      
    </Stack>


      


    
        

        


        
    </form>
  );
}