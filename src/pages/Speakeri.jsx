// src/pages/Speakeri.jsx
// Transformat din #speakeri din index.html (Lab 2)
// + logica de randare din app.js (Lab 4)
import { useState } from 'react';
// ---- Datele speakerilor ----
// În Lab 4 erau const speakeri = [...] în app.js
// Le mutăm mai aproape de componenta care le folosește
const dateSpeakeri = [
    {
        id: 1, nume: 'Ana Popescu', titlu: 'Senior Frontend Engineer',
        companie: 'Google', sesiune: 'React la Scară Mare',
        tip: 'Talk', data: '15 sept.', ora: '10:00', sala: 'Sala A',
        poza: 'https://i.pravatar.cc/300?img=1'
    },
    {
        id: 2, nume: 'Ion Ionescu', titlu: 'DevOps Lead',
        companie: 'Microsoft', sesiune: 'CI/CD cu GitHub Actions',
        tip: 'Workshop', data: '15 sept.', ora: '14:00', sala: 'Sala B',
        poza: 'https://i.pravatar.cc/300?img=3'
    },
    {
        id: 3, nume: 'Maria Constantin', titlu: 'AI Researcher',
        companie: 'DeepMind', sesiune: 'AI în Dezvoltarea Web',
        tip: 'Talk', data: '16 sept.', ora: '11:00', sala: 'Sala A',
        poza: 'https://i.pravatar.cc/300?img=5'
    },
    {
        id: 4, nume: 'Radu Marin', titlu: 'Node.js Contributor',
        companie: 'Freelancer', sesiune: 'Node.js în Producție',
        tip: 'Talk', data: '15 sept.', ora: '14:00', sala: 'Sala A',
        poza: 'https://i.pravatar.cc/300?img=8'
    },
    {
        id: 5, nume: 'Elena Popa', titlu: 'Cloud Architect',
        companie: 'AWS', sesiune: 'Docker pentru Dezvoltatori',
        tip: 'Workshop', data: '15 sept.', ora: '14:00', sala: 'Sala B',
        poza: 'https://i.pravatar.cc/300?img=9'
    },
    {
        id: 6, nume: 'Mihai Dumitru', titlu: 'Security Engineer',
        companie: 'Cloudflare', sesiune: 'Securitate Web în 2026',
        tip: 'Talk', data: '16 sept.', ora: '14:00', sala: 'Sala A',
        poza: 'https://i.pravatar.cc/300?img=12'
    },
];// ---- Componenta CardSpeaker ----
// În Lab 4 era: function creeazaCardSpeaker(speaker) { return `...` }
// Acum: o componentă React care primește speaker ca prop
function CardSpeaker({ speaker }) {
    const culoareTip = speaker.tip === "Workshop"
        ? 'var(--culoare-secundara)'
        : 'var(--teal, #1A6B6B)';
    // Hover gestionat cu useState - alternativ: CSS :hover în index.css
    const [hover, setHover] = useState(false);
    return (
        <article
            style={{
                background: 'var(--fundal-card)',
                borderRadius: 'var(--raza-colturi)',
                overflow: 'hidden',
                boxShadow: hover
                    ? 'var(--umbra-hover)'
                    : 'var(--umbra-card)',
                transform: hover ? "translateY(-4px)" : "none", transition: 'box-shadow var(--tranzitie), transform var(--tranzitie)',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <figure style={{ margin: 0 }}>
                <img
                    src={speaker.poza}
                    alt={`Fotografie ${speaker.nume}, ${speaker.titlu}`}
                    style={{ width: "100%", height: 200, objectFit: "cover" }}
                    loading='lazy'
                />
                <figcaption style={{
                    padding: '4px 1rem', fontSize: '.75rem',
                    background: '#f8f9fa', color: 'var(--text-secundar)',
                }}>
                    {speaker.companie}
                </figcaption>
            </figure>
            <div style={{ padding: "1rem" }}>
                <span style={{
                    background: culoareTip, color: "white",
                    padding: "2px 8px", borderRadius: 4,
                    fontSize: ".75rem", fontWeight: 700,
                }}>
                    {speaker.tip}
                </span>
                <h3 style={{
                    margin: ".5rem 0 .25rem",
                    color: "var(--culoare-primara)"
                }}>
                    {speaker.nume}
                </h3>
                <p style={{
                    fontSize: ".875rem",
                    color: "var(--text-secundar)", margin: "0 0 .5rem"
                }}>
                    {speaker.titlu}
                </p>
                <p style={{
                    color: "var(--culoare-accent)",
                    fontWeight: 600, margin: "0 0 .5rem"
                }}>
                    {speaker.sesiune}
                </p>
                <p style={{
                    fontSize: ".875rem",
                    color: "var(--text-secundar)"
                }}>
                    {speaker.data} • {speaker.ora} • {speaker.sala}
                </p>
            </div>
        </article>
    );
}
// ---- Componenta principală Speakeri ----
// În Lab 4 era: randeazaSpeakeri() cu innerHTML
// Acum: componentă React cu state și .map()
export default function Speakeri() {
    const [speakeri] = useState(dateSpeakeri);
    const [cauta, setCauta] = useState('');
    const [filtraTip, setFiltraTip] = useState('Toți');
    // Filtrare în memorie - React re-randează automat la schimbare
    const speakeriFiltrati = speakeri.filter(s => {
        const potrivireNume =
            s.nume.toLowerCase().includes(cauta.toLowerCase());
        const potrivireTip =
            filtraTip === 'Toți' || s.tip === filtraTip;
        return potrivireNume && potrivireTip;
    });
    return (
        <main style={{ padding: 'var(--spatiu-sectiune) 0' }}>
            <div className='container'>
                <h1 style={{
                    color: "var(--culoare-primara)",
                    textAlign: "center", marginBottom: ".5rem"
                }}>
                    Speakeri Confirmați
                </h1>
                <p style={{
                    textAlign: "center",
                    color: "var(--text-secundar)", marginBottom: "2rem"
                }}>
                    Experți din industria web internațională
                </p>
                {/* Bara de filtrare */}
                <div style={{
                    display: "flex", gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap", marginBottom: "2rem"
                }}>
                    <input
                        type='text'
                        placeholder='Caută după nume...'
                        value={cauta}
                        onChange={e => setCauta(e.target.value)}
                        style={{
                            padding: "10px 14px",
                            border: "1px solid #ced4da",
                            borderRadius: 8, fontSize: "1rem",
                            fontFamily: "inherit", minWidth: 240,
                        }}
                    />
                    {['Toți', 'Talk', 'Workshop'].map(tip => (
                        <button
                            key={tip}
                            onClick={() => setFiltraTip(tip)}
                            style={{
                                padding: "10px 20px", borderRadius: 8,
                                cursor: "pointer", border: "2px solid",
                                borderColor: filtraTip === tip
                                    ? 'var(--culoare-primara)' : '#ced4da',
                                background: filtraTip === tip
                                    ? 'var(--culoare-primara)' : 'white',
                                color: filtraTip === tip ? "white" : "var(--text-principal)",
                                fontWeight: filtraTip === tip ? 700 : 400,
                                transition: 'all .2s',
                            }}
                        >
                            {tip}
                        </button>
                    ))}
                </div>
                {/* Contor rezultate */}
                <p style={{
                    textAlign: "center",
                    color: "var(--text-secundar)",
                    marginBottom: "1.5rem", fontSize: ".875rem"
                }}>
                    {speakeriFiltrati.length} speakeri
                    {cauta && ` pentru "${cauta}"`}
                    {filtraTip !== 'Toți' && ` (${filtraTip})`}
                </p>
                {/* Grid speakeri - .map() în loc de innerHTML */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "2rem",
                }}>
                    {speakeriFiltrati.map(s => (
                        // key={s.id} - obligatoriu la .map() în React
                        <CardSpeaker key={s.id} speaker={s} />
                    ))}
                </div>
                {speakeriFiltrati.length === 0 && (
                    <p style={{
                        textAlign: "center",
                        color: "var(--text-secundar)", padding: "3rem 0"
                    }}>
                        Niciun speaker găsit. Încearcă altă căutare.
                    </p>
                )}
            </div>
        </main>
    );
}