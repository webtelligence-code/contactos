import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<UsersPage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;