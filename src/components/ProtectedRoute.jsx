// src/components/ProtectedRoute.jsx
// In Lab 4 nu exista asa ceva - oricine putea accesa orice pagina
// Acum: /profil fara login → redirect automat la /login
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
export default function ProtectedRoute({ children }) {
    const { esteAutentificat, loading } = useAuth();
    // AuthContext inca verifica localStorage (useEffect cu [])
    // Afisam spinner in loc de redirect imediat
    // → evitam "flash" la /login pentru utilizatorii logati
    if (loading) {
        return (
            <div style={{
                display: 'flex', justifyContent: 'center',
                padding: '4rem'
            }}>
                <div className='spinner'></div>
            </div>
        );
    }
    // Neautentificat → redirect la login
    // replace=true: nu poti da "Inapoi" la /profil din /login
    if (!esteAutentificat) {
        return <Navigate to='/login' replace />;
    }
    // Autentificat → afiseaza pagina normala
    return children;
}