// import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './componentes_seguridad/Login';
import { NavBar } from './componentes_seguridad/NavBar_components/NavBar';//eliminar

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exect path='/' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}