function newTournament(ids) {
  const n = ids.length;
  let p = 1; while (p * 2 <= n) p *= 2;
  const sh = shuffle(ids), meta = {};
  const byId = Object.fromEntries(tracks.map(t => [t.id, t]));
  ids.forEach(id => meta[id] = byId[id]);
  const t = { n, p, cur: [], next: [], i: 0, stage: n, playIn: false, elim: [], done: 0, total: n - 1, hist: [], meta, winner: null };
  if (n === p) t.cur = sh;
  else { const k = n - p; t.cur = sh.slice(0, 2 * k); t.next = sh.slice(2 * k); t.playIn = true; }
  return t;
}
function save() {
  if (!LS.set('tournament', T)) { T.hist = T.hist.slice(-2); LS.set('tournament', T); }
}
function snapshot() { const { hist, meta, ...rest } = T; return JSON.stringify(rest); }
function pick(side) {
  if (!T || T.winner) return;
  if (side < 0) side = Math.random() < .5 ? 0 : 1;
  const a = T.cur[T.i], b = T.cur[T.i + 1];
  T.hist.push(snapshot()); if (T.hist.length > 10) T.hist.shift();
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
  const s = JSON.parse(T.hist.pop());
  T = { ...s, hist: T.hist, meta: T.meta };
  save(); render();
}
function stageName() {
  if (T.playIn) return `Отборочный раунд (до ${T.p})`;
  const s = T.stage;
  return s === 2 ? 'Финал' : s === 4 ? 'Полуфинал' : s === 8 ? 'Четвертьфинал' : `1/${s / 2} финала`;
}
function ranking() {
  const r = [{ id: T.winner, label: '🏆 Победитель' }];
  const el = T.elim.slice().sort((x, y) => (x.playIn - y.playIn) || (x.stage - y.stage));
  for (const e of el) r.push({ id: e.id, label: e.playIn ? 'отбор' : e.stage === 2 ? '2 место' : `топ-${e.stage}` });
  return r;
}
const tr = id => (T && T.meta[id]) || { id, n: '(трек не найден)', a: '', al: '', img: '', big: '' };

