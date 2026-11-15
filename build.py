"""Собирает index.html (полная версия для GitHub Pages / локального запуска)
и dist/claude-artifact.html (урезанная версия для Claude-артефакта).
Запуск: python build.py"""
import json, pathlib
root = pathlib.Path(__file__).parent
src = root / 'src'
t = (src / 'template.html').read_text(encoding='utf-8')
auth = (src / 'auth.js').read_text(encoding='utf-8')
core = (src / 'core.js').read_text(encoding='utf-8')

def build(mode, fullsrc):
    s = t.replace('__MODE__', mode).replace('__CORE__', core)
    s = s.replace('__AUTH__', auth if mode == 'local' else
                  '// вход через Spotify недоступен в артефакте\nasync function login(){} async function api(){ throw new Error("NOAUTH"); }')
    return s.replace('__FULLSRC__', json.dumps(fullsrc, ensure_ascii=False).replace('</', '<\\/'))

full = build('local', '')
(root / 'index.html').write_text(full, encoding='utf-8')
(root / 'dist').mkdir(exist_ok=True)
(root / 'dist' / 'claude-artifact.html').write_text(build('artifact', full), encoding='utf-8')
print('ok: index.html, dist/claude-artifact.html')
