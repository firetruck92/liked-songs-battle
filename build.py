"""Собирает index.html (сайт для GitHub Pages) и dist/claude-artifact.html
(версия для Claude-артефакта без обложек и плеера). Запуск: python build.py"""
import pathlib
root = pathlib.Path(__file__).parent
src = root / 'src'
t = (src / 'template.html').read_text(encoding='utf-8')
core = (src / 'core.js').read_text(encoding='utf-8')
i18n = (src / 'i18n.js').read_text(encoding='utf-8')

def build(mode):
    return t.replace('__MODE__', mode).replace('__I18N__', i18n).replace('__CORE__', core)

(root / 'index.html').write_text(build('local'), encoding='utf-8')
(root / 'dist').mkdir(exist_ok=True)
(root / 'dist' / 'claude-artifact.html').write_text(build('artifact'), encoding='utf-8')
print('ok: index.html, dist/claude-artifact.html')
