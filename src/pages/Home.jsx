// src/pages/Home.jsx
// Transformat din #hero și #despre din index.html (Lab 2)
import { Link } from 'react-router-dom';
// Datele statisticilor - erau hardcodate în HTML în Lab 2
// Acum le definim ca array și le randăm cu .map()
const statistici = [
    { numar: '500+', label: 'Participanți' },
    { numar: '20+', label: 'Speakeri' },
    { numar: '2', label: 'Zile' },
    { numar: '15', label: 'Workshopuri' },
];
export default function Home() {
    return (
        <main>
            {/* ===== HERO ===== */}
            <section style={{
                background: 'linear-gradient(135deg, var(--culoare-primara) 0%, var(--culoare-secundara) 100%)',
                color: 'white',
                padding: 'var(--spatiu-sectiune) 0',
                textAlign: 'center',
            }}>
                <div className='container'>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 800, marginBottom: "1rem"
                    }}>
                        DevConnect 2026
                    </h1>
                    <p style={{
                        fontSize: '1.25rem', opacity: .9,
                        maxWidth: 600, margin: '0 auto 1rem'
                    }}>
                        Conferința anuală pentru dezvoltatori web
                    </p>
                    <p style={{ opacity: .8, marginBottom: "2rem" }}>
                        15-16 septembrie 2026 | București, România
                    </p>
                    {/* Butoane - Link în loc de <a href="#..."> */}
                    <div style={{
                        display: 'flex', gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap', marginBottom: '3rem'
                    }}>
                        <Link to='/workshops' style={{
                            background: 'var(--culoare-accent)',
                            color: 'white', padding: '14px 32px',
                            borderRadius: 8, fontWeight: 700,
                            textDecoration: 'none',
                        }}>
                            Înregistrează-te Acum
                        </Link>
                        <Link to='/speakeri' style={{
                            border: '2px solid rgba(255,255,255,.6)',
                            color: 'white', padding: '14px 32px',
                            borderRadius: 8, fontWeight: 600,
                            textDecoration: 'none',
                        }}>
                            Cunoaște Speakerii
                        </Link>
                    </div>
                    {/* Statistici - generate cu .map() */}
                    <div style={{
                        display: 'flex', justifyContent: 'center',
                        gap: '4rem', flexWrap: 'wrap'
                    }}>
                        {statistici.map(s => (
                            <div key={s.label} style={{ textAlign: "center" }}>
                                <div style={{
                                    fontSize: '2.5rem', fontWeight: 800,
                                    color: 'var(--culoare-accent)', lineHeight: 1
                                }}>
                                    {s.numar}
                                </div>
                                <div style={{
                                    fontSize: '.875rem', opacity: .8,
                                    textTransform: 'uppercase',
                                    letterSpacing: '.05em', marginTop: 4
                                }}>
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ===== DESPRE ===== */}
            <section style={{
                padding: 'var(--spatiu-sectiune) 0', background: 'white'
            }}>
                <div className='container' style={{ maxWidth: 720 }}>
                    <h2 style={{
                        color: 'var(--culoare-primara)',
                        textAlign: 'center', marginBottom: '1.5rem'
                    }}>
                        Despre Conferință
                    </h2>
                    <p style={{
                        color: 'var(--text-secundar)',
                        lineHeight: 1.8, textAlign: 'center',
                        marginBottom: '1rem'
                    }}>
                        DevConnect reunește anual peste 500 de profesioniști
                        pentru două zile de prezentări, workshopuri și networking.
                    </p>
                    <div style={{ textAlign: "center" }}>
                        <Link to='/speakeri' style={{
                            color: 'var(--culoare-accent)',
                            fontWeight: 700, fontSize: '1.1rem'
                        }}>
                            Cunoaște speakerii confirmați →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
