// src/main.jsx - punctul de intrare al aplicației React
// Echivalentul lui index.html din Lab 2
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
 <App />
 </React.StrictMode>
);
// src/App.jsx - routerul aplicației
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Speakeri from './pages/Speakeri.jsx';
// Placeholder pentru paginile din Lab 8
const PaginaInCurind = ({ titlu }) => (
 <main style={{ padding: "5rem", textAlign: "center" }}>
 <h2 style={{ color: "var(--culoare-primara)" }}>{titlu}</h2>
 <p style={{ color: "var(--text-secundar)" }}>
 Această pagină va fi construită în Laboratorul 8.
 </p>
 </main>
);
export default function App() {
 return (<BrowserRouter>
 {/* Navbar apare pe toate paginile */}
 <Navbar/>
 <Routes>
 <Route path='/' element={<Home />} />
 <Route path='/speakeri' element={<Speakeri />} />
 <Route path='/workshops'
 element={<PaginaInCurind titlu='Workshopuri' />} />
 <Route path='/login'
 element={<PaginaInCurind titlu='Autentificare' />} />
 <Route path='*' element={<Navigate to='/' replace />} />
 </Routes>
 </BrowserRouter>);
}
