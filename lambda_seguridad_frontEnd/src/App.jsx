import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './lambda_components/Login';

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