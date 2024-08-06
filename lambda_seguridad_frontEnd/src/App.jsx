import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './components/auth/Auth';

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exect path='/' element={<Auth/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}