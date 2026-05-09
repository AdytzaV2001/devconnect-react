// src/api/index.js
// Același client HTTP din Lab 6 (js/api.js), exportat ca modul ES6
// Codul este IDENTIC: timeout 8s, retry 2x, erori clare per status
// Diferența: export în loc de window.apiFetch = apiFetch
// ============================================================
// CONFIGURARE
// ============================================================
const ApiConfig = {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    timeout: 8000,
    maxRetry: 2,
    defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};
let _accessToken = null;
export const setAccessToken = t => { _accessToken = t; };
export const clearAccessToken = () => { _accessToken = null; };
// ============================================================
// LOADING STATE GLOBAL
// ============================================================
let _cereriActive = 0;
function _incepCerere() {
    _cereriActive++;
    document.body.classList.add('api-loading');
}
function _terminaCerere() {
    _cereriActive = Math.max(0, _cereriActive - 1);
    if (_cereriActive === 0) document.body.classList.remove('api-loading');
}
// ============================================================
// PROCESAREA RĂSPUNSULUI
// ============================================================
async function _proceseazaRaspuns(raspuns) {
    const contentType = raspuns.headers.get('content-type') || '';
    const esteJson = contentType.includes('application/json');
    let body;
    try {
        body = esteJson ? await raspuns.json() : await raspuns.text();
    } catch { body = null; }
    if (raspuns.ok) return body;
    const mesajeStatus = {
        400: 'Date invalide trimise la server.',
        401: 'Nu ești autentificat. Te rugăm să te autentifici.',
        403: 'Nu ai permisiunea pentru această acțiune.',
        404: 'Resursa cerută nu a fost găsită.',
        409: 'Conflict: resursa există deja.',
        422: 'Datele nu au trecut validarea serverului.',
        429: 'Prea multe cereri. Așteaptă puțin.',
        500: 'Eroare internă de server. Încearcă mai târziu.',
        503: 'Serverul este temporar indisponibil.',
    };
    const mesajServer = body?.message || body?.eroare || body?.error;
    const mesajFinal = mesajServer
        || mesajeStatus[raspuns.status]
        || `Eroare necunoscută (${raspuns.status})`;
    const eroare = new Error(mesajFinal);
    eroare.status = raspuns.status;
    eroare.body = body;
    throw eroare;
}// ============================================================
// WRAPPER-UL PRINCIPAL - apiFetch()
// ============================================================
export async function apiFetch(cale, optiuni = {}, retry = ApiConfig.maxRetry) {
    const url = `${ApiConfig.baseUrl}${cale}`;
    const headers = { ...ApiConfig.defaultHeaders, ...optiuni.headers };
    if (_accessToken) headers["Authorization"] = `Bearer ${_accessToken}`;
    const controller = new AbortController();
    const timerId = setTimeout(
        () => controller.abort(), ApiConfig.timeout
    );
    _incepCerere();
    console.log(`[API] ${optiuni.method || "GET"} ${url}`);
    try {
        const raspuns = await fetch(url, {
            method: 'GET',
            ...optiuni,
            headers,
            signal: controller.signal,
        });
        clearTimeout(timerId);
        return await _proceseazaRaspuns(raspuns);
    } catch (eroare) {
        clearTimeout(timerId);
        if (eroare.name === "AbortError") {
            throw new Error(`Cererea a depășit ${ApiConfig.timeout / 1000}s. Verifică conexiunea.`, { cause: eroare });
        }
        // Eroare de rețea → retry automat
        if (!eroare.status && retry > 0) {
            console.warn(
                `[API] Rețea indisponibilă. Reîncercare
 ${ApiConfig.maxRetry - retry + 1}/${ApiConfig.maxRetry}...`
            );
            await new Promise(r => setTimeout(r, 1000));
            return apiFetch(cale, optiuni, retry - 1);
        }
        console.error(`[API] Eroare: ${eroare.message}`);
        throw eroare;
    } finally {
        _terminaCerere();
    }
}
// Metode shorthand - identice cu api.get/post/put din Lab 6
export const api = {
    get: (cale, opts) => apiFetch(cale, { ...opts, method: "GET" }),
    post: (cale, body) => apiFetch(cale,
        { method: "POST", body: JSON.stringify(body) }),
    put: (cale, body) => apiFetch(cale,
        { method: "PUT", body: JSON.stringify(body) }),
    patch: (cale, body) => apiFetch(cale,
        { method: "PATCH", body: JSON.stringify(body) }),
    delete: (cale) => apiFetch(cale, { method: "DELETE" }),
    setAccessToken,
    clearAccessToken,
};
