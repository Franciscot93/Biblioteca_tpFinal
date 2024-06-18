import './App.css';
import Formulario from './componentes/Formulario';
import TablaLibros from './componentes/TablaLibros';

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
const registros=[]
localStorage.setItem('libros',JSON.stringify(libros))
localStorage.setItem('socios',JSON.stringify(socios))
localStorage.setItem('registros',JSON.stringify(registros))
function App() {
  return (
    <div>
      <h2 className='titulo'>Biblioteca</h2>
    <div className="App" id='Contenedor'>
      <Formulario/>
      <TablaLibros/>
    </div>
    </div>
  );
}

export default App;
