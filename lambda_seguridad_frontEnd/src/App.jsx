import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './components/auth/Auth';
import { GlobalProvider } from './context/GlobalContext';

export const App = () => {
  return (
    <div className="App">
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Auth/>}/>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}