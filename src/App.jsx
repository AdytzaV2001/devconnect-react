// src/App.jsx - actualizat cu AuthProvider si ProtectedRoute
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Speakeri from './pages/Speakeri.jsx';
import Workshops from './pages/Workshops.jsx';
import Login from './pages/Login.jsx';
import Profil from './pages/Profil.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/speakeri' element={<Speakeri />} />
          <Route path='/workshops' element={<Workshops />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profil' element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          } />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}