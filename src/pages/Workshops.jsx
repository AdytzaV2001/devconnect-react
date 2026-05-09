// src/pages/Workshops.jsx
// Logica de inscriere din Lab 4 (app.js) migrata in React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // ← adaugă linia asta

const WORKSHOPURI = [
    {
        id: 1, titlu: 'React Avansat: Hooks si Performance',
        speaker: 'Ana Popescu', durata: '3 ore', nivel: 'Avansat',
        locuri: 30, locuriLibere: 8,
        data: '15 sept.', ora: '10:00 - 13:00', sala: 'Sala A',
        descriere: 'Patterns avansate React, optimizare re-randari, Suspense.'
    },
    {
        id: 2, titlu: 'CI/CD cu GitHub Actions',
        speaker: 'Ion Ionescu', durata: '4 ore', nivel: 'Intermediar',
        locuri: 25, locuriLibere: 0,
        data: '15 sept.', ora: '14:00 - 18:00', sala: 'Sala B',
        descriere: 'De la zero la deployment automat cu teste si Docker.'
    },
    {
        id: 3, titlu: 'AI pentru Dezvoltatori Web',
        speaker: 'Maria Constantin', durata: '2 ore', nivel: 'Incepator',
        locuri: 40, locuriLibere: 22,
        data: '16 sept.', ora: '11:00 - 13:00', sala: 'Sala A',
        descriere: 'API-uri AI (OpenAI, Gemini) in aplicatii web reale.'
    },
];
const CULORI_NIVEL = {
    Incepator: '#2A7A2A', Intermediar: '#C8520A', Avansat: '#1B3A6B'
};
export default function Workshops() {
    const { esteAutentificat } = useAuth();
    const navigate = useNavigate();

    // In Lab 4: inscrierile → localStorage direct
    // In React: state sincronizat cu localStorage prin useEffect
    const [inscrieri, setInscrieri] = useState(() => {
        try {
            const s = localStorage.getItem('devconnect_inscrieri');
            return new Set(JSON.parse(s || '[]'));
        } catch { return new Set(); }
    });
    const [loadingId, setLoadingId] = useState(null);
    // Sincronizam cu localStorage la fiecare schimbare a inscrieri
    // In Lab 4: apelai localStorage.setItem manual dupa fiecare actiune
    useEffect(() => {
        localStorage.setItem('devconnect_inscrieri',
            JSON.stringify([...inscrieri]));
    }, [inscrieri]);
    async function handleInscriere(workshop) {
        if (!esteAutentificat) { navigate('/login'); return; }
        setLoadingId(workshop.id);
        await new Promise(r => setTimeout(r, 300));
        setInscrieri(prev => {
            const nou = new Set(prev);
            if (nou.has(workshop.id)) nou.delete(workshop.id);
            else nou.add(workshop.id);
            return nou;
        });
        setLoadingId(null);
    }
    return (
        <main style={{ padding: 'var(--spatiu-sectiune) 0' }}>
            <div className='container'>
                <h1 style={{
                    color: 'var(--culoare-primara)',
                    textAlign: 'center', marginBottom: '.5rem'
                }}>Workshopuri DevConnect 2026</h1>
                <p style={{
                    textAlign: 'center', color: 'var(--text-secundar)',
                    marginBottom: '2rem'
                }}>Sesiuni practice in grupe mici - locuri limitate</p>
                {/* Banner pentru utilizatori neautentificati */}
                {!esteAutentificat && (
                    <div style={{
                        background: '#fff3cd', border: '1px solid #ffc107',
                        borderRadius: 8, padding: '1rem', marginBottom: '2rem',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
                    }}>
                        <span>Autentifica-te pentru a te inscrie la workshopuri.</span>
                        <button onClick={() => navigate('/login')} style={{

                            background: 'var(--culoare-accent)', color: 'white',
                            padding: '8px 20px', border: 'none',
                            borderRadius: 6, cursor: 'pointer', fontWeight: 600,
                        }}>Autentificare</button>
                    </div>
                )}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {WORKSHOPURI.map(w => {
                        const complet = w.locuriLibere === 0;
                        const inscris = inscrieri.has(w.id);
                        const inLoading = loadingId === w.id;
                        const procent = Math.round(
                            ((w.locuri - w.locuriLibere) / w.locuri) * 100);
                        return (
                            <article key={w.id} style={{
                                background: 'white', borderRadius: 8,
                                padding: '1.5rem', boxShadow: 'var(--umbra-card)',
                            }}>
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    marginBottom: '.75rem'
                                }}>
                                    <span style={{
                                        background: CULORI_NIVEL[w.nivel] || '#6c757d',
                                        color: 'white', padding: '2px 10px',
                                        borderRadius: 4, fontSize: '.75rem', fontWeight: 700,
                                    }}>{w.nivel}</span>
                                    <span style={{
                                        fontSize: '.875rem',
                                        color: 'var(--text-secundar)'
                                    }}>{w.durata}</span>
                                </div>
                                <h3 style={{
                                    marginBottom: '.25rem',
                                    fontSize: '1rem'
                                }}>{w.titlu}</h3>
                                <p style={{
                                    fontSize: '.875rem',
                                    color: 'var(--text-secundar)',
                                    marginBottom: '.5rem'
                                }}>cu {w.speaker}</p>
                                <p style={{
                                    fontSize: '.875rem',
                                    marginBottom: '.75rem'
                                }}>{w.descriere}</p>
                                <p style={{
                                    fontSize: '.875rem',
                                    color: 'var(--text-secundar)',
                                    marginBottom: '.75rem'
                                }}>
                                    {w.data} • {w.ora} • {w.sala}
                                </p>
                                <div style={{
                                    height: 6, background: '#eee',
                                    borderRadius: 3, marginBottom: '.5rem'
                                }}>
                                    <div style={{

                                        width: `${procent}%`, height: '100%',
                                        background: 'var(--culoare-accent)',
                                        borderRadius: 3
                                    }} />
                                </div>
                                <p style={{ fontSize: '.875rem', marginBottom: '1rem' }}>
                                    {inscris
                                        ? 'Inscris - click pentru dezinscriere'
                                        : complet ? 'Complet'
                                            : `${w.locuriLibere}/${w.locuri} locuri disponibile`}
                                </p>
                                <button
                                    onClick={() => handleInscriere(w)}
                                    disabled={inLoading || (complet && !inscris)}
                                    style={{
                                        width: '100%', padding: '10px',
                                        border: 'none', borderRadius: 8, fontWeight: 700,
                                        cursor: (inLoading || (complet && !inscris))
                                            ? 'default' : 'pointer',
                                        background: inLoading ? '#6c757d'
                                            : inscris ? '#28a745'
                                                : complet ? '#adb5bd'
                                                    : 'var(--culoare-accent)',
                                        color: 'white', transition: 'background .2s',
                                    }}
                                >
                                    {inLoading ? 'Se proceseaza...'
                                        : inscris ? 'Inscris ✓ - Dezinscrie'
                                            : complet ? 'Complet'
                                                : 'Inscrie-te'}
                                </button>
                            </article>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}