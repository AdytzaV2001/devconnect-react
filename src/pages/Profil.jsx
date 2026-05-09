// src/pages/Profil.jsx
// Pagina noua - nu exista in devconnect-static
// Posibila datorita AuthContext
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext.jsx';
const WORKSHOPURI_DICT = {
    1: { titlu: 'React Avansat', data: '15 sept.', ora: '10:00' },
    2: { titlu: 'CI/CD cu GitHub Actions', data: '15 sept.', ora: '14:00' },
    3: { titlu: 'AI pentru Dezvoltatori', data: '16 sept.', ora: '11:00' },
};
const CULORI_ROL = {
    admin: '#1B3A6B', speaker: '#C8520A', participant: '#2A7A2A'
};
export default function Profil() {
    const { user, logout, esteAdmin } = useAuth();
    const navigate = useNavigate();
    const idInscrieri = JSON.parse(
        localStorage.getItem('devconnect_inscrieri') || '[]'
    );
    const workshopuriMele = idInscrieri
        .map(id => WORKSHOPURI_DICT[id]).filter(Boolean);
    function handleLogout() { logout(); navigate('/'); }
    return (
        <main style={{
            padding: '4rem 0',
            background: 'var(--fundal-pagina)',
            minHeight: 'calc(100vh - 64px)'
        }}>
            <div className='container' style={{ maxWidth: 640 }}>
                {/* Card profil */}
                <div style={{
                    background: 'white', borderRadius: 12,
                    padding: '2rem', boxShadow: 'var(--umbra-card)',
                    marginBottom: '2rem',
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center',
                        gap: '1.5rem', marginBottom: '1.5rem'
                    }}>
                        {/* Avatar din initiala numelui */}
                        <div style={{
                            width: 64, height: 64, borderRadius: '50%',
                            background: 'var(--culoare-primara)', color: 'white',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.75rem', fontWeight: 700,
                        }}>
                            {user.nume.charAt(0)}
                        </div>
                        <div>
                            <h1 style={{
                                fontSize: '1.5rem', margin: 0,

                                color: 'var(--culoare-primara)'
                            }}>{user.nume}</h1>
                            <p style={{
                                margin: '4px 0 0',
                                color: 'var(--text-secundar)'
                            }}>{user.email}</p>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex', gap: '1rem',
                        alignItems: 'center', flexWrap: 'wrap'
                    }}>
                        <span style={{
                            background: CULORI_ROL[user.rol] || '#6c757d',
                            color: 'white', padding: '4px 14px', borderRadius: 20,
                            fontSize: '.875rem', fontWeight: 700,
                            textTransform: 'uppercase',
                        }}>{user.rol}</span>
                        <button onClick={handleLogout} style={{
                            background: '#dc3545', color: 'white',
                            padding: '8px 20px', border: 'none',
                            borderRadius: 8, fontWeight: 600, cursor: 'pointer',
                        }}>Deconectare</button>
                    </div>
                    {/* Banner special pentru admin */}
                    {esteAdmin && (
                        <div style={{
                            background: '#fff3cd', border: '1px solid #ffc107',
                            borderRadius: 8, padding: '1rem', marginTop: '1rem',
                            fontSize: '.875rem',
                        }}>
                            Ai acces complet ca administrator DevConnect.
                        </div>
                    )}
                </div>
                {/* Workshopuri inscrise */}
                <div style={{
                    background: 'white', borderRadius: 12,
                    padding: '2rem', boxShadow: 'var(--umbra-card)',
                }}>
                    <h2 style={{
                        color: 'var(--culoare-primara)',
                        marginBottom: '1.5rem', fontSize: '1.25rem'
                    }}>
                        Workshopurile mele ({workshopuriMele.length})
                    </h2>
                    {workshopuriMele.length === 0 ? (
                        <p style={{ color: 'var(--text-secundar)' }}>
                            Nu esti inscris la niciun workshop.{' '}
                            <Link to='/workshops' style={{
                                color: 'var(--culoare-accent)', fontWeight: 700

                            }}>
                                Exploreaza workshopurile
                            </Link>
                        </p>
                    ) : (
                        workshopuriMele.map((w, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', padding: '.75rem 0',
                                borderBottom: i < workshopuriMele.length - 1
                                    ? '1px solid #f0f0f0' : 'none',
                            }}>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 600 }}>
                                        {w.titlu}
                                    </p>
                                    <p style={{
                                        margin: '2px 0 0',
                                        fontSize: '.875rem',
                                        color: 'var(--text-secundar)'
                                    }}>
                                        {w.data} • {w.ora}
                                    </p>
                                </div>
                                <span style={{
                                    background: '#d4edda', color: '#155724',
                                    padding: '2px 12px', borderRadius: 20,
                                    fontSize: '.75rem', fontWeight: 700,
                                }}>Confirmat</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}