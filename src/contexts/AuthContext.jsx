import { createContext, useContext, useState } from 'react';

const CONTURI_DEMO = [
    { id: 1, email: 'admin@devconnect.ro', parola: 'admin2026', nume: 'Admin DevConnect', rol: 'admin' },
    { id: 2, email: 'ana@devconnect.ro', parola: 'parola123', nume: 'Ana Popescu', rol: 'speaker' },
    { id: 3, email: 'ion@devconnect.ro', parola: 'parola123', nume: 'Ion Ionescu', rol: 'participant' },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const s = localStorage.getItem('devconnect_user');
            return s ? JSON.parse(s) : null;
        } catch { return null; }
    });
    const [loading, setLoading] = useState(false);

    async function login(email, parola) {
        setLoading(true);
        await new Promise(r => setTimeout(r, 300));
        const utilizator = CONTURI_DEMO.find(u => u.email === email && u.parola === parola);
        if (!utilizator) { setLoading(false); throw new Error('Email sau parola incorecta.'); }
        const { ...userCurat } = utilizator;
        setUser(userCurat);
        localStorage.setItem('devconnect_user', JSON.stringify(userCurat));
        setLoading(false);
        return userCurat;
    }

    function logout() {
        setUser(null);
        localStorage.removeItem('devconnect_user');
        localStorage.removeItem('devconnect_inscrieri');
    }

    return (
        <AuthContext.Provider value={{
            user, loading, login, logout,
            esteAutentificat: !!user,
            esteAdmin: user?.rol === 'admin',
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth() folosit in afara <AuthProvider>');
    return ctx;
}