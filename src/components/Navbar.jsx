// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const linkActiv = ({ isActive }) => ({
    color: isActive ? 'var(--culoare-accent)' : 'white',
    fontWeight: isActive ? 700 : 500,
    textDecoration: 'none',
    transition: 'color .2s',
});

export default function Navbar() {
    const { user, logout, esteAutentificat } = useAuth();
    const navigate = useNavigate();

    function handleLogout() { logout(); navigate('/'); }

    return (
        <header style={{
            background: 'var(--culoare-primara)', position: 'sticky',
            top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,.2)',
        }}>
            <div className='container' style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', paddingBlock: '1rem',
            }}>
                <NavLink to='/' style={{ textDecoration: 'none' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        <span style={{ color: 'var(--culoare-accent)' }}>Dev</span>
                        <span style={{ color: 'white' }}>Connect</span>
                        <small style={{ color: 'rgba(255,255,255,.7)', fontSize: '.75rem', fontWeight: 400 }}> 2026</small>
                    </span>
                </NavLink>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <nav>
                        <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
                            <li><NavLink to='/speakeri' style={linkActiv}>Speakeri</NavLink></li>
                            <li><NavLink to='/workshops' style={linkActiv}>Workshops</NavLink></li>
                        </ul>
                    </nav>

                    {esteAutentificat ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <NavLink to='/profil' style={{
                                color: 'rgba(255,255,255,.9)',
                                textDecoration: 'none', fontSize: '.875rem',
                            }}>
                                Salut, {user.nume.split(' ')[0]}!
                            </NavLink>
                            <button onClick={handleLogout} style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,.5)',
                                color: 'white', padding: '6px 16px',
                                borderRadius: 6, fontSize: '.875rem', cursor: 'pointer',
                            }}>Iesire</button>
                        </div>
                    ) : (
                        <NavLink to='/login' style={{
                            background: 'var(--culoare-accent)', color: 'white',
                            padding: '8px 20px', borderRadius: 6, fontWeight: 600,
                            textDecoration: 'none', fontSize: '.875rem',
                        }}>Autentificare</NavLink>
                    )}
                </div>
            </div>
        </header>
    );
}