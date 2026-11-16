var byId = {};
function indexTracks() { byId = {}; (tracks || []).forEach(t => { byId[t.id] = t; }); }

function newTournament(ids) {
  const n = ids.length;
  let p = 1; while (p * 2 <= n) p *= 2;
  const sh = shuffle(ids);
  const t = { n, p, cur: [], next: [], i: 0, stage: n, playIn: false, elim: [], done: 0, total: n - 1, hist: [], winner: null };
  if (n === p) t.cur = sh;
  else { const k = n - p; t.cur = sh.slice(0, 2 * k); t.next = sh.slice(2 * k); t.playIn = true; }
  return t;
}

// Прогресс сохраняется после каждого выбора. Если браузеру не хватает места,
// сначала урезаем историю отмен, а если и это не помогло — честно предупреждаем.
let saveFailed = false;
function save() {
  let ok = LS.set('tournament', T);
  if (!ok) { T.hist = T.hist.slice(-3); ok = LS.set('tournament', T); }
  saveFailed = !ok;
}

// История отмен хранит только то, что меняет один выбор (а не копию всего турнира).
function pick(side) {
  if (!T || T.winner) return;
  if (side < 0) side = Math.random() < .5 ? 0 : 1;
  const a = T.cur[T.i], b = T.cur[T.i + 1];
  const h = { i: T.i, nl: T.next.length, st: T.stage, pi: T.playIn };
  if (T.i + 2 >= T.cur.length) { h.c = T.cur.slice(); h.x = T.next.slice(); } // раунд закончится — запоминаем его состав
  T.hist.push(h); if (T.hist.length > 50) T.hist.shift();
  const w = side ? b : a, l = side ? a : b;
  T.next.push(w);
  T.elim.push({ id: l, stage: T.stage, playIn: T.playIn });
  T.i += 2; T.done++;
  if (T.i >= T.cur.length) {
    if (T.next.length === 1) T.winner = T.next[0];
    else { T.cur = shuffle(T.next); T.next = []; T.i = 0; T.stage = T.cur.length; T.playIn = false; }
  }
  save(); render();
}
function undo() {
  if (!T || !T.hist.length) return;
  const h = T.hist.pop();
  T.elim.pop(); T.done--; T.winner = null;
  if (h.c) { T.cur = h.c; T.next = h.x; } else T.next.length = h.nl;
  T.i = h.i; T.stage = h.st; T.playIn = h.pi;
  save(); render();
}
function stageName() {
  if (T.playIn) return L('playIn', T.p);
  const s = T.stage;
  return s === 2 ? L('final') : s === 4 ? L('semi') : s === 8 ? L('quarter') : L('roundOf', s);
}
function ranking() {
  const r = [{ id: T.winner, label: L('lWinner'), code: 'w' }];
  const el = T.elim.slice().sort((x, y) => (x.playIn - y.playIn) || (x.stage - y.stage));
  for (const e of el) r.push({ id: e.id, label: e.playIn ? L('lQual') : e.stage === 2 ? L('l2') : L('lTop', e.stage), code: e.playIn ? 'q' : String(e.stage) });
  return r;
}
const tr = id => byId[id] || (T && T.meta && T.meta[id]) || { id, n: L('notFound'), a: '', al: '', img: '', thumb: '' };
