/* ---------- Языки / Languages ---------- */
// plural forms: ru — [1, 2-4, 5+], en — [1, other]
function plu(n, forms) {
  if (LANG === 'en') return n === 1 ? forms[0] : forms[1];
  const a = Math.abs(n) % 100, b = a % 10;
  return a > 10 && a < 20 ? forms[2] : b > 1 && b < 5 ? forms[1] : b === 1 ? forms[0] : forms[2];
}
const I18N = {
  ru: {
    sub: 'Выбери любимый трек из своих лайков',
    yes: 'Да', cancel: 'Отмена',
    copied: 'Скопировано ✓', copyFail: 'Не вышло скопировать', failShort: 'Не вышло',
    tracks: n => `${n} ${plu(n, ['трек', 'трека', 'треков'])}`,
    picks: n => `${n} ${plu(n, ['выбор', 'выбора', 'выборов'])}`,
    // share image
    imgTitle: '🏆 Мой любимый трек',
    imgSub: (n, total) => `победил среди ${I18N.ru.tracks(n)} · ${I18N.ru.picks(total)}`,
    shImgH: 'Поделиться результатом', drawing: 'Рисую…', drawFail: 'Не получилось нарисовать картинку', resultAlt: 'Результат',
    share: 'Поделиться', savePng: 'Сохранить PNG', copyImg: 'Копировать картинку',
    saveHint: 'Сохрани картинку: правый клик или долгое нажатие → «Сохранить изображение».',
    shareTitle: 'Мой любимый трек',
    shareText: who => `Мой любимый трек из лайков Spotify — ${who}`,
    shareFail: 'Не получилось открыть меню «Поделиться» — сохрани PNG.',
    saved: 'Сохранено ✓', saveCancel: 'Сохранение отменено.',
    saveFail: 'Здесь сохранить не вышло — правый клик или долгое нажатие на картинке → «Сохранить изображение».',
    pasteNow: 'Картинка и ссылка в буфере — вставь в любой чат (Ctrl+V).', copyImgBlocked: 'Копирование картинок здесь заблокировано — сохрани PNG.',
    // share link
    shareBtn: '📤 Поделиться', linkCopied: 'Ссылка скопирована ✓', siteLink: 'Ссылка на сайт:', copyLink: 'Копировать',
    shareInvite: 'Пройди свой турнир:',
    friendFav: '🏆 Любимый трек друга', friendTop: 'Его топ', playYours: 'Найти свой любимый трек →',
    friendWon: n => `победил среди ${I18N.ru.tracks(n)}`, badLink: 'Ссылка на результат повреждена — но свой турнир пройти можно.',
    // import
    tabFiles: 'Exportify / CSV', tabText: 'Вставить списком',
    s1: 'Открой Exportify и войди через Spotify', s1sub: 'Откроется окошко рядом, этот сайт останется открытым',
    openExp: 'Открыть Exportify', openAgain: 'Открыть ещё раз',
    s2: 'Нажми Export у «Liked Songs»', s2sub: 'Скачается файл <code>liked.csv</code>. Можно выгрузить и другие плейлисты',
    s3: 'Брось файл сюда', s3sub: 'Перетащи из загрузок или окна браузера — можно прямо на страницу',
    dropT: 'Перетащи liked.csv сюда',
    dropSub: 'или нажми и выбери в папке «Загрузки» — можно несколько .csv / .json (подойдёт и YourLibrary.json из экспорта данных Spotify)',
    fileTracks: n => `${n} тр.`, totalUniq: 'Всего уникальных:', done: 'Готово →',
    textHint: full => `Каждая строка — один трек: <b style="color:var(--fg)">Исполнитель — Название</b>${full ? ' или ссылка на трек в Spotify' : ''}.`,
    pastePh: 'Кино — Группа крови&#10;Radiohead — Creep', loadList: 'Загрузить список',
    limitNote: 'Здесь нет обложек и отрывков: страница работает в изолированной среде, где Spotify заблокирован. На сайте <b>firetruck92.github.io/liked-songs-battle</b> они есть.',
    importH: 'Загрузи свои лайки', importSub: 'Выбери способ — потом начнётся турнир: из каждой пары оставляешь один трек, пока не останется победитель.',
    privacy: 'Файлы читаются прямо в браузере и никуда не отправляются', demo: 'попробовать на демо-списке', back: '← Назад',
    dropOverlay: 'Отпусти файл',
    // menu
    unfinished: 'Незаконченный турнир', unfinishedSub: (n, d, t) => `${I18N.ru.tracks(n)} · сыграно ${d} из ${t}`, cont: 'Продолжить →',
    prevWinner: 'Прошлый победитель', results: 'Результаты', otherList: 'Другой список', reset: 'Сбросить',
    loaded: n => `${plu(n, ['трек загружен', 'трека загружено', 'треков загружено'])}`, dupes: d => ` · склеено дублей: ${d}`,
    optAll: 'Все треки', pcs: n => `${n} шт.`, optRecent: 'Последние', optRecentSub: 'недавно лайкнутые', optRandom: 'Случайные', optRandomSub: 'случайная выборка',
    howMany: 'Сколько треков:', start: 'Начать турнир →',
    controls: 'Управление:', cLeft: 'левый', cRight: 'правый', cRand: 'не могу выбрать', cUndo: 'отменить',
    est: (k, m) => `${I18N.ru.picks(k - 1)} · примерно ${m} мин`,
    restartQ: 'Начать заново? Незаконченный турнир пропадёт.', resetQ: 'Удалить загруженный список и турнир?',
    // battle
    listen: '▶ Слушать в Spotify', thisL: '← Этот', thisR: 'Этот →', pair: (i, n) => `пара ${i} из ${n}`,
    saveWarn: 'Браузеру не хватает места, прогресс сейчас не сохраняется — не закрывай и не перезагружай вкладку, или начни турнир на меньшем числе треков.',
    cantChoose: 'Не могу выбрать — случайно', undo: '↶ Отменить', menu: 'Меню',
    // result
    openSp: '▶ Открыть в Spotify', yourFav: '🏆 Твой любимый трек', wonAmong: n => `победил среди ${I18N.ru.tracks(n)}`,
    table: 'Итоговая таблица', replayLast: '↶ Переиграть последний выбор',
    tableHint: '«топ-8» — трек дошёл до четвертьфинала. Внутри одной группы порядок условный.',
    showAll: n => `Показать все ${n}`, imgBtn: '📸 Картинка', copyTop: 'Скопировать топ', newT: 'Новый турнир',
    // stages & labels
    playIn: p => `Отборочный раунд (до ${p})`, final: 'Финал', semi: 'Полуфинал', quarter: 'Четвертьфинал', roundOf: s => `1/${s / 2} финала`,
    lWinner: '🏆 Победитель', lQual: 'отбор', l2: '2 место', lTop: s => `топ-${s}`, notFound: '(трек не найден)',
    // errors
    eNoRows: 'в файле нет строк с треками', eNoName: h => 'не нашёл колонку с названием трека. Заголовки в файле: ' + h,
    eMin: n => 'нужно хотя бы 2 трека, нашёл ' + n, eNone: 'треков не найдено',
    fixedMsg: 'Мы исправили чтение исполнителей из CSV — загрузи liked.csv ещё раз, пожалуйста.',
    demoA: 'Демо-артист', demoN: 'Песня №', demoAl: 'Демо-альбом', trackSid: 'Трек ',
  },
  en: {
    sub: 'Find your favorite track among your liked songs',
    yes: 'Yes', cancel: 'Cancel',
    copied: 'Copied ✓', copyFail: "Couldn't copy", failShort: 'Failed',
    tracks: n => `${n} ${plu(n, ['track', 'tracks'])}`,
    picks: n => `${n} ${plu(n, ['pick', 'picks'])}`,
    imgTitle: '🏆 My favorite track',
    imgSub: (n, total) => `won among ${I18N.en.tracks(n)} · ${I18N.en.picks(total)}`,
    shImgH: 'Share your result', drawing: 'Drawing…', drawFail: "Couldn't draw the image", resultAlt: 'Result',
    share: 'Share', savePng: 'Save PNG', copyImg: 'Copy image',
    saveHint: 'Save the image: right-click or long-press → “Save image”.',
    shareTitle: 'My favorite track',
    shareText: who => `My favorite song from my Spotify likes — ${who}`,
    shareFail: "Couldn't open the share menu — save the PNG instead.",
    saved: 'Saved ✓', saveCancel: 'Saving cancelled.',
    saveFail: "Couldn't save here — right-click or long-press the image → “Save image”.",
    pasteNow: 'Image and link copied — paste into any chat (Ctrl+V).', copyImgBlocked: 'Copying images is blocked here — save the PNG instead.',
    shareBtn: '📤 Share', linkCopied: 'Link copied ✓', siteLink: 'Site link:', copyLink: 'Copy',
    shareInvite: 'Find yours:',
    friendFav: '🏆 Your friend’s favorite', friendTop: 'Their top', playYours: 'Find your own favorite →',
    friendWon: n => `won among ${I18N.en.tracks(n)}`, badLink: 'This result link is broken — but you can still play your own.',
    tabFiles: 'Exportify / CSV', tabText: 'Paste a list',
    s1: 'Open Exportify and log in with Spotify', s1sub: 'It opens in a small window — this site stays open',
    openExp: 'Open Exportify', openAgain: 'Open again',
    s2: 'Click Export next to “Liked Songs”', s2sub: 'You’ll get <code>liked.csv</code>. You can export other playlists too',
    s3: 'Drop the file here', s3sub: 'Drag it from your Downloads or the browser — anywhere on the page works',
    dropT: 'Drop liked.csv here',
    dropSub: 'or click to pick it from Downloads — several .csv / .json files work too (including YourLibrary.json from your Spotify data export)',
    fileTracks: n => `${n} tr.`, totalUniq: 'Unique total:', done: 'Done →',
    textHint: full => `One track per line: <b style="color:var(--fg)">Artist — Title</b>${full ? ' or a Spotify track link' : ''}.`,
    pastePh: 'Radiohead — Creep&#10;Nirvana — Lithium', loadList: 'Load list',
    limitNote: 'No covers or previews here: this page runs in a sandbox where Spotify is blocked. The site <b>firetruck92.github.io/liked-songs-battle</b> has them.',
    importH: 'Load your liked songs', importSub: 'Pick a way — then the tournament starts: keep one track from each pair until a winner remains.',
    privacy: 'Files are read right in your browser and never uploaded', demo: 'try the demo list', back: '← Back',
    dropOverlay: 'Drop the file',
    unfinished: 'Unfinished tournament', unfinishedSub: (n, d, t) => `${I18N.en.tracks(n)} · ${d} of ${t} played`, cont: 'Continue →',
    prevWinner: 'Last winner', results: 'Results', otherList: 'Other list', reset: 'Reset',
    loaded: n => plu(n, ['track loaded', 'tracks loaded']), dupes: d => ` · duplicates merged: ${d}`,
    optAll: 'All tracks', pcs: n => `${n}`, optRecent: 'Most recent', optRecentSub: 'recently liked', optRandom: 'Random', optRandomSub: 'random sample',
    howMany: 'How many tracks:', start: 'Start tournament →',
    controls: 'Controls:', cLeft: 'left', cRight: 'right', cRand: "can't choose", cUndo: 'undo',
    est: (k, m) => `${I18N.en.picks(k - 1)} · about ${m} min`,
    restartQ: 'Start over? The unfinished tournament will be lost.', resetQ: 'Delete the loaded list and the tournament?',
    listen: '▶ Listen on Spotify', thisL: '← This one', thisR: 'This one →', pair: (i, n) => `pair ${i} of ${n}`,
    saveWarn: 'Your browser is out of storage, progress isn’t being saved — don’t close or reload the tab, or start a tournament with fewer tracks.',
    cantChoose: 'Can’t choose — pick randomly', undo: '↶ Undo', menu: 'Menu',
    openSp: '▶ Open in Spotify', yourFav: '🏆 Your favorite track', wonAmong: n => `won among ${I18N.en.tracks(n)}`,
    table: 'Final standings', replayLast: '↶ Redo last pick',
    tableHint: '“top 8” means the track reached the quarterfinal. Order within a group is arbitrary.',
    showAll: n => `Show all ${n}`, imgBtn: '📸 Image', copyTop: 'Copy top list', newT: 'New tournament',
    playIn: p => `Qualifying round (to ${p})`, final: 'Final', semi: 'Semifinal', quarter: 'Quarterfinal', roundOf: s => `Round of ${s}`,
    lWinner: '🏆 Winner', lQual: 'qualifying', l2: '2nd place', lTop: s => `top ${s}`, notFound: '(track not found)',
    eNoRows: 'the file has no track rows', eNoName: h => "couldn't find the track name column. Headers in the file: " + h,
    eMin: n => 'need at least 2 tracks, found ' + n, eNone: 'no tracks found',
    fixedMsg: 'We fixed how artists are read from CSV — please load liked.csv again.',
    demoA: 'Demo artist', demoN: 'Song #', demoAl: 'Demo album', trackSid: 'Track ',
  }
};
let LANG = (() => { try { const s = JSON.parse(localStorage.getItem('lang')); if (s === 'ru' || s === 'en') return s; } catch {} return /^(ru|uk|be|kk)/i.test(navigator.language || '') ? 'ru' : 'en'; })();
function L(k, ...args) { const v = (I18N[LANG] && I18N[LANG][k] !== undefined) ? I18N[LANG][k] : I18N.ru[k]; return typeof v === 'function' ? v(...args) : v; }
function applyLang() { document.documentElement.lang = LANG; document.body.dataset.drop = L('dropOverlay'); document.title = 'Liked Songs Battle'; }
function setLang(l) { LANG = l; LS.set('lang', l); applyLang(); render(); }
const FLAG = {
  ru: '<svg viewBox="0 0 9 6" aria-hidden="true"><rect width="9" height="2" fill="#fff"/><rect y="2" width="9" height="2" fill="#0039a6"/><rect y="4" width="9" height="2" fill="#d52b1e"/></svg>',
  en: '<svg viewBox="0 0 60 30" aria-hidden="true"><clipPath id="uk-s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="uk-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#uk-s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#uk-t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>'
};
function langSwitch() {
  return `<div class="lang" role="group" aria-label="Language">${['ru', 'en'].map(l =>
    `<button class="${LANG === l ? 'act' : ''}" onclick="setLang('${l}')" aria-pressed="${LANG === l}">${FLAG[l]}<span>${l.toUpperCase()}</span></button>`).join('')}</div>`;
}
