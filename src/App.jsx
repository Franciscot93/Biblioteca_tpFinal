import {  useEffect, useState } from 'react';
import './App.css';
import Formulario from './componentes/Formulario';
import TablaLibros from './componentes/TablaLibros';
import Nav from './componentes/Nav';
import Footer from './componentes/Footer';

const libros=[
  {nombre:'C# Fundamentals'},
  {nombre:'ReactJS Advanced'},
  {nombre:'Software Model Design'},
  {nombre:'Clean Code'},
  {nombre:'Clean Architecture'},
  {nombre:'Patterns of Enterprise Application Architecture'}
  
]
const socios=[
  {nombre:'Agustin Suresh'},
  {nombre:'Felipe Pessoa'},
  {nombre:'Carmen Rush'},
  {nombre:'Francisco Torres'},
  {nombre:'Julian Alvarez'},
  {nombre:'Cristiano Ronaldo'}
  
]


function App() {
  const [listaDeLibros,setListaDeLibros]=useState(libros)
 const [listaDeSocios,setListaDeSocios]=useState(JSON.parse(localStorage.getItem('socios'))||socios)
 const [registros,setRegistros]=useState(JSON.parse(localStorage.getItem('registros'))||[])
 const [registroParaEditar,setRegistroParaEditar]=useState({})

 const eliminarRegistro=(id)=>{
  const registrosActualizados=registros.filter(registro=> registro.id!==id)
  setRegistros(registrosActualizados)
 }
 useEffect(()=>{
  localStorage.setItem('registros', JSON.stringify(registros))
},[registros])

useEffect(()=>{
  localStorage.setItem('socios', JSON.stringify(listaDeSocios))
},[listaDeSocios])

  return (
    <div>
      <Nav registros={registros} listaDeSocios={listaDeSocios}/>
    <div className="App" id='Contenedor'>
      <Formulario listaDeLibros={listaDeLibros} setRegistroParaEditar={setRegistroParaEditar} listaDeSocios={listaDeSocios} setListaDeSocios={setListaDeSocios} setRegistros={setRegistros} registros={registros} registroParaEditar={registroParaEditar}/>
      <TablaLibros registros={registros} setRegistroParaEditar={setRegistroParaEditar}  eliminarRegistro={eliminarRegistro}/>
    </div>
    
    <Footer/>
    </div>
  );
}

export default App;
