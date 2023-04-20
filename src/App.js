import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/ProfilePage';

const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction ? 'http://localhost:80/contactos' : '/contactos/';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/contactos' index element={<UsersPage baseUrl={BASE_URL} title='List de contactos' />} />
          <Route path='/contactos/profile/:username' element={<ProfilePage baseUrl={BASE_URL} title='Perfil' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;