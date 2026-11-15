/* ---------- Auth (PKCE) ---------- */
async function login() {
  const inp = document.getElementById('cid'); const cid = ((inp && inp.value) || (LS.get('cid', '') || DEFAULT_CLIENT_ID) || '').trim();
  if (!cid) { document.getElementById('msg').textContent = 'Вставь Client ID'; return; }
  LS.set('cid', cid);
  const verifier = randStr(64), state = randStr(16);
  LS.set('verifier', verifier); LS.set('state', state);
  const p = new URLSearchParams({
    response_type: 'code', client_id: cid, scope: SCOPES, state,
    code_challenge_method: 'S256', code_challenge: await challenge(verifier), redirect_uri: REDIRECT_URI
  });
  location.href = 'https://accounts.spotify.com/authorize?' + p;
}
async function handleCallback() {
  const q = new URLSearchParams(location.search);
  if (!q.has('code') && !q.has('error')) return null;
  history.replaceState(null, '', REDIRECT_URI);
  if (q.get('error')) return 'Spotify вернул ошибку: ' + q.get('error');
  if (q.get('state') !== LS.get('state')) return 'Проверка state не прошла, попробуй войти ещё раз.';
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code: q.get('code'), redirect_uri: REDIRECT_URI,
      client_id: LS.get('cid', '') || DEFAULT_CLIENT_ID, code_verifier: LS.get('verifier') })
  });
  const j = await r.json();
  if (!r.ok) return 'Ошибка получения токена: ' + (j.error_description || j.error);
  saveTok(j); LS.del('verifier'); LS.del('state');
  return null;
}
function saveTok(j) {
  const old = LS.get('tok', {}) || {};
  LS.set('tok', { access: j.access_token, refresh: j.refresh_token || old.refresh, exp: Date.now() + (j.expires_in - 60) * 1000 });
}
async function token() {
  const t = LS.get('tok', null);
  if (!t) throw new Error('NOAUTH');
  if (Date.now() < t.exp) return t.access;
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: t.refresh, client_id: LS.get('cid', '') || DEFAULT_CLIENT_ID })
  });
  const j = await r.json();
  if (!r.ok) { LS.del('tok'); throw new Error('NOAUTH'); }
  saveTok(j); return j.access_token;
}
async function api(url) {
  for (let tries = 0; tries < 6; tries++) {
    const r = await fetch(url, { headers: { Authorization: 'Bearer ' + await token() } });
    if (r.status === 429) { await sleep((+r.headers.get('Retry-After') || 2) * 1000); continue; }
    if (r.status === 401) { const t = LS.get('tok'); if (t) { t.exp = 0; LS.set('tok', t); } continue; }
    if (!r.ok) throw new Error('Spotify API: ошибка ' + r.status);
    return r.json();
  }
  throw new Error('Spotify не отвечает, попробуй позже');
}
