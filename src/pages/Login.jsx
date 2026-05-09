// src/pages/Login.jsx
// Formularul din Lab 4 (app.js) rescris in React
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
export default function Login() {
    const { login, esteAutentificat } = useAuth();
    const navigate = useNavigate();
    // In Lab 4: citea din DOM cu document.getElementById
    // In React: stocam in state - input-urile sunt 'controlled'
    const [form, setForm] = useState({ email: '', parola: '' });
    const [eroare, setEroare] = useState('');
    const [loading, setLoading] = useState(false);
    // Daca deja autentificat → arata link la profil
    if (esteAutentificat) {
        return (
            <main style={{ padding: '4rem', textAlign: 'center' }}>
                Esti deja autentificat.{' '}
                <Link to='/profil'
                    style={{ color: 'var(--culoare-accent)', fontWeight: 700 }}>
                    Mergi la profilul tau
                </Link>
            </main>
        );
    }
    // Un singur handler pentru toate campurile formularului
    // In Lab 4: fiecare camp had propriul getElementById

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setEroare('');
    };
    // Validare - aceeasi logica ca in Lab 4
    function valideaza() {
        if (!form.email.includes('@'))
            return 'Adresa de email nu este valida.';
        if (form.parola.length < 6)
            return 'Parola trebuie sa aiba cel putin 6 caractere.';
        return '';
    }
    async function handleSubmit(e) {
        e.preventDefault(); // identic cu Lab 4!
        const eroareValidare = valideaza();
        if (eroareValidare) { setEroare(eroareValidare); return; }
        setLoading(true);
        try {
            await login(form.email, form.parola);
            navigate('/profil');
        } catch (err) {
            setEroare(err.message);
        } finally {
            setLoading(false);
        }
    }
    const inputSt = {
        width: '100%', padding: '10px 14px',
        border: '1px solid #ced4da', borderRadius: 8,
        fontSize: '1rem', fontFamily: 'inherit', marginBottom: '1rem',
    };
    return (
        <main style={{
            padding: '4rem 0',
            background: 'var(--fundal-pagina)'
        }}>
            <div style={{ maxWidth: 420, margin: '0 auto', padding: '0 1rem' }}>
                <div style={{
                    background: 'white', borderRadius: 12,
                    padding: '2rem', boxShadow: 'var(--umbra-card)',
                }}>
                    <h1 style={{
                        color: 'var(--culoare-primara)',
                        marginBottom: '.5rem', textAlign: 'center'
                    }}>
                        Autentificare DevConnect
                    </h1>
                    {/* Conturile demo */}

                    <div style={{
                        background: '#f8f9fa', borderRadius: 8,
                        padding: '.75rem', marginBottom: '1.5rem',
                        fontSize: '.8rem', color: 'var(--text-secundar)',
                    }}>
                        <strong>Conturi demo:</strong><br />
                        admin@devconnect.ro / admin2026 (admin)<br />
                        ana@devconnect.ro / parola123 (speaker)<br />
                        ion@devconnect.ro / parola123 (participant)
                    </div>
                    {/* Mesaj eroare */}
                    {eroare && (
                        <div style={{
                            background: '#f8d7da', color: '#721c24',
                            border: '1px solid #f5c6cb', borderRadius: 8,
                            padding: '.75rem', marginBottom: '1rem',
                            fontSize: '.875rem',
                        }}>{eroare}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='email'
                            style={{
                                display: 'block', fontWeight: 500,
                                marginBottom: 6
                            }}>
                            Email
                        </label>
                        <input
                            id='email' name='email' type='email'
                            value={form.email} onChange={handleChange}
                            style={inputSt} required autoComplete='email'
                            placeholder='admin@devconnect.ro'
                        />
                        <label htmlFor='parola'
                            style={{
                                display: 'block', fontWeight: 500,
                                marginBottom: 6
                            }}>
                            Parola
                        </label>
                        <input
                            id='parola' name='parola' type='password'
                            value={form.parola} onChange={handleChange}
                            style={inputSt} required
                            autoComplete='current-password'
                        />
                        <button type='submit' disabled={loading} style={{
                            width: '100%', padding: '12px',
                            background: loading
                                ? '#6c757d' : 'var(--culoare-accent)',
                            color: 'white', border: 'none', borderRadius: 8,
                            fontWeight: 700, fontSize: '1rem',
                            cursor: loading ? 'default' : 'pointer',
                        }}>

                            {loading ? 'Se verifica...' : 'Autentificare'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}