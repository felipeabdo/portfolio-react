#!/usr/bin/env bash
set -euo pipefail

REPO="$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "Erro: execute este script de dentro do repositório portfolio-react."
  exit 1
}
cd "$REPO"

HOME_FILE="src/pages/Home.js"
STYLE_FILE="src/assets/styles/portfolio-2026.scss"

for file in "$HOME_FILE" "$STYLE_FILE"; do
  if [ ! -f "$file" ]; then
    echo "Arquivo esperado não encontrado: $file"
    exit 1
  fi
  if ! git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
    echo "O arquivo não está rastreado pelo Git: $file"
    exit 1
  fi
done

# Não sobrescreve edições pré-existentes justamente nos dois arquivos-alvo.
if ! git diff --quiet -- "$HOME_FILE" "$STYLE_FILE" || \
   ! git diff --cached --quiet -- "$HOME_FILE" "$STYLE_FILE"; then
  echo "Há alterações locais em um dos arquivos que seriam modificados."
  echo "Salve/commite essas alterações ou faça backup antes de continuar."
  exit 1
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="$HOME/portfolio-previews-backup-$STAMP"
mkdir -p "$BACKUP"
cp --parents "$HOME_FILE" "$STYLE_FILE" "$BACKUP/"

echo "Backup dos dois arquivos-alvo: $BACKUP"

python3 - <<'PY'
from pathlib import Path

home_path = Path("src/pages/Home.js")
style_path = Path("src/assets/styles/portfolio-2026.scss")
home = home_path.read_text(encoding="utf-8")
styles = style_path.read_text(encoding="utf-8")

if "project-preview--bsp" in home or ".project-preview {" in styles:
    raise SystemExit("Parece que os previews já foram aplicados. Nenhum arquivo foi alterado.")


def replace_once(source: str, old: str, new: str, label: str) -> str:
    count = source.count(old)
    if count != 1:
        raise SystemExit(f"Não foi possível localizar exatamente uma ocorrência de {label} (encontradas: {count}). Nada foi gravado.")
    return source.replace(old, new, 1)

# Dados visuais usados exclusivamente dentro dos cards de projetos.
home = replace_once(
    home,
    "    theme: 'bsp',\n    liveUrl:",
    "    theme: 'bsp',\n"
    "    previewUrl: 'bsp-site-delta.vercel.app',\n"
    "    previewImage: 'https://bsp-site-delta.vercel.app/brand/photos/home-hero-complete-960.webp',\n"
    "    liveUrl:",
    "configuração do preview BSP",
)
home = replace_once(
    home,
    "    theme: 'divertin',\n    liveUrl:",
    "    theme: 'divertin',\n"
    "    previewUrl: 'clinicadivertin.com.br',\n"
    "    previewImage: 'https://www.clinicadivertin.com.br/bg-hero.webp',\n"
    "    previewLogo: 'https://www.clinicadivertin.com.br/logo%20(1).webp',\n"
    "    liveUrl:",
    "configuração do preview Divertin",
)
home = replace_once(
    home,
    "    theme: 'casamento',\n    repoUrl:",
    "    theme: 'casamento',\n"
    "    previewUrl: 'jesselipe.com.br',\n"
    "    previewImage: 'https://i.imgur.com/rzJAEba.jpeg',\n"
    "    liveUrl: 'https://jesselipe.com.br/',\n"
    "    repoUrl:",
    "configuração do preview Casamento",
)

start_marker = "function ProjectCard({ project }) {"
end_marker = "function Home() {"
if home.count(start_marker) != 1 or home.count(end_marker) != 1:
    raise SystemExit("Não foi possível identificar com segurança o componente ProjectCard. Nada foi gravado.")
start = home.index(start_marker)
end = home.index(end_marker, start)

new_component = r'''function ProjectCard({ project }) {
  return (
    <article className={`project-card project-card--${project.theme}`}>
      <div
        className={`project-preview project-preview--${project.theme}`}
        role="img"
        aria-label={`Prévia visual do site ${project.previewUrl}`}
      >
        <div className="preview-browser-bar" aria-hidden="true">
          <div className="preview-browser-dots"><i /><i /><i /></div>
          <span className="preview-browser-address">{project.previewUrl}</span>
          <span className="preview-browser-status">LIVE</span>
        </div>

        <div className={`preview-stage preview-stage--${project.theme}`}>
          <img
            className="preview-image"
            src={project.previewImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />

          {project.id === 'bsp' ? (
            <>
              <div className="preview-bsp-copy">
                <span className="preview-bsp-eyebrow">EU CURTO BLOCO DE RUA!</span>
                <strong className="preview-bsp-name">Bloco <em>Santo Pecado</em></strong>
                <span className="preview-bsp-meta">BRASÍLIA · SAMBA-REGGAE · DESDE 2013</span>
                <div className="preview-mini-actions">
                  <span>EVENTOS</span><span>OFICINA BSP</span>
                </div>
              </div>
              <div className="preview-bsp-seal" aria-hidden="true"><span>✳</span><small>BSB<br />2013</small></div>
            </>
          ) : null}

          {project.id === 'divertin' ? (
            <div className="preview-divertin-copy">
              <img className="preview-divertin-logo" src={project.previewLogo} alt="" />
              <span className="preview-divertin-specialty">TERAPIA INFANTIL</span>
              <strong>Diversa em cuidado,<br />única em conexão.</strong>
              <small>Comunicação · Linguagem · Desenvolvimento</small>
            </div>
          ) : null}

          {project.id === 'casamento' ? (
            <>
              <div className="preview-wedding-brand">
                <span className="preview-wedding-monogram">JF</span>
                <small>JÉSSICA &amp; FELIPE</small>
              </div>
              <div className="preview-wedding-copy">
                <span>COM ALEGRIA, CONVIDAMOS</span>
                <strong>Jéssica <i>&amp;</i> Felipe</strong>
                <small>SAVE THE DATE · 02.08.2026</small>
              </div>
              <div className="preview-wedding-footer">NOSSA HISTÓRIA, AGORA CELEBRADA COM VOCÊ</div>
            </>
          ) : null}
        </div>

        {project.id === 'bsp' ? (
          <div className="preview-bsp-marquee" aria-hidden="true">
            <span>EU CURTO BLOCO DE RUA ✳ TOMATE ✳ É O TCHAN ✳ HARMONIA DO SAMBA ✳ ARA KETU ✳ MOLEJO ✳ SAULO ✳&nbsp;&nbsp;&nbsp;</span>
          </div>
        ) : null}
      </div>

      <div className="project-content">
        <div className="project-overline">
          <span>{project.category}</span>
          <span className="project-number">{project.number} / 03</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <ul className="project-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <div className="project-stack" aria-label={`Tecnologias utilizadas em ${project.title}`}>
          {project.stack.map((item) => <span key={item}>{item}</span>)}
        </div>

        <div className="project-actions">
          {project.liveUrl ? (
            <a className="text-link text-link--primary" href={project.liveUrl} target="_blank" rel="noreferrer">
              Acessar projeto <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          <a className="text-link" href={project.repoUrl} target="_blank" rel="noreferrer">
            Código no GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

'''
home = home[:start] + new_component + home[end:]

# Regras visuais novas, restritas aos três previews da seção de projetos.
font_import = "@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,500;1,600&display=swap');"
font_import_new = "@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Parisienne&family=Playfair+Display:ital,wght@1,500;1,600&display=swap');"
styles = replace_once(styles, font_import, font_import_new, "importação tipográfica existente")

project_content_marker = ".project-content { padding: 25px 27px 26px; }"
preview_styles = r'''
/* Previews dos sites reais: toda esta camada pertence exclusivamente aos cards de projetos. */
.project-preview { position: relative; min-height: 235px; display: flex; flex-direction: column; overflow: hidden; background: #101a15; }
.preview-browser-bar { position: relative; z-index: 3; min-height: 31px; display: flex; align-items: center; gap: 11px; padding: 0 12px; border-bottom: 1px solid rgba(255,255,255,.09); background: rgba(9,15,12,.96); color: #aab7ae; }
.preview-browser-dots { display: flex; flex-shrink: 0; gap: 4px; }
.preview-browser-dots i { width: 6px; height: 6px; display: block; border-radius: 50%; background: #ef7f78; }
.preview-browser-dots i:nth-child(2) { background: #e8bd62; }
.preview-browser-dots i:nth-child(3) { background: #79bd83; }
.preview-browser-address { min-width: 0; overflow: hidden; padding: 5px 10px; border: 1px solid rgba(255,255,255,.08); border-radius: 3px; background: rgba(255,255,255,.045); color: #aebbb2; font: 8px/1 var(--mono); text-overflow: ellipsis; white-space: nowrap; }
.preview-browser-status { margin-left: auto; color: #b9d78b; font: 8px/1 var(--mono); letter-spacing: .1em; }
.preview-stage { position: relative; isolation: isolate; flex: 1; min-height: 203px; overflow: hidden; }
.preview-image { position: absolute; z-index: -2; inset: 0; width: 100%; height: 100%; display: block; object-fit: cover; }

/* BSP: a fotografia real da banda, o contraste azul/laranja e a faixa de artistas. */
.preview-stage--bsp { background: #0a3d5c; color: #fff; }
.preview-stage--bsp .preview-image { right: 0; left: auto; width: 57%; object-position: center 43%; }
.preview-stage--bsp::after { position: absolute; z-index: -1; inset: 0; background: linear-gradient(90deg, #0a3d5c 0%, #0a3d5c 38%, rgba(10,61,92,.94) 48%, rgba(10,61,92,.2) 77%, rgba(10,61,92,.08) 100%); content: ''; }
.preview-bsp-copy { position: absolute; inset: 0 auto 0 0; width: 69%; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 17px 5.2%; }
.preview-bsp-eyebrow { padding: 5px 8px; border: 1px solid rgba(189,224,235,.75); border-radius: 30px; color: #e3f4f8; font: 7px/1 var(--mono); letter-spacing: .12em; }
.preview-bsp-name { display: grid; margin-top: 12px; color: #fff; font-size: clamp(20px, 2.6vw, 34px); font-weight: 800; line-height: .98; letter-spacing: -.07em; }
.preview-bsp-name em { color: #ff984f; font-style: normal; }
.preview-bsp-meta { margin-top: 9px; color: rgba(244,248,245,.75); font: 7px/1.4 var(--mono); letter-spacing: .08em; }
.preview-mini-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 13px; }
.preview-mini-actions span { padding: 6px 8px; border: 1px solid rgba(255,255,255,.45); border-radius: 2px; color: #fff; font: 7px/1 var(--mono); letter-spacing: .04em; }
.preview-mini-actions span:first-child { border-color: #ff984f; background: #ff984f; color: #153f55; }
.preview-bsp-seal { position: absolute; right: 12px; bottom: 12px; width: 42px; height: 42px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,.78); border-radius: 50%; background: rgba(8,40,58,.38); color: #fff; text-align: center; transform: rotate(9deg); }
.preview-bsp-seal span { color: #ff984f; font-size: 16px; line-height: .9; }
.preview-bsp-seal small { margin-top: 3px; font: 6px/1.05 var(--mono); letter-spacing: .06em; }
.preview-bsp-marquee { position: relative; z-index: 2; height: 21px; flex: 0 0 21px; overflow: hidden; background: #ff8c42; color: #0b3c56; }
.preview-bsp-marquee span { width: max-content; display: block; padding-top: 6px; font: 700 7px/1 var(--mono); letter-spacing: .12em; white-space: nowrap; animation: preview-marquee-scroll 21s linear infinite; }
@keyframes preview-marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-34%); } }

/* Divertin: o hero lilás, a imagem acolhedora e a assinatura visual da clínica. */
.preview-stage--divertin { background: #7651ae; color: #fff; }
.preview-stage--divertin .preview-image { object-position: 69% center; }
.preview-stage--divertin::after { position: absolute; z-index: -1; inset: 0; background: linear-gradient(90deg, rgba(91,57,147,.99) 0%, rgba(105,68,161,.94) 42%, rgba(105,68,161,.43) 72%, rgba(105,68,161,.08) 100%); content: ''; }
.preview-divertin-copy { position: absolute; inset: 0 auto 0 0; width: 78%; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 14px 6%; }
.preview-divertin-logo { width: 70px; height: 33px; display: block; margin-bottom: 3px; object-fit: contain; object-position: left center; }
.preview-divertin-specialty { color: rgba(255,255,255,.8); font: 7px/1.3 var(--mono); letter-spacing: .18em; }
.preview-divertin-copy strong { margin-top: 8px; color: #fff; font-size: clamp(18px, 2.5vw, 31px); font-weight: 800; line-height: 1.06; letter-spacing: -.065em; text-shadow: 0 2px 16px rgba(44,25,81,.16); }
.preview-divertin-copy small { max-width: 230px; margin-top: 9px; color: rgba(255,255,255,.84); font-size: 7px; line-height: 1.5; }

/* Casamento: a fotografia real em tela cheia e o tratamento editorial do convite. */
.preview-stage--casamento { min-height: 380px; background: #a36e4d; color: #fff; }
.preview-stage--casamento .preview-image { object-position: center 43%; filter: saturate(.9); }
.preview-stage--casamento::after { position: absolute; z-index: -1; inset: 0; background: linear-gradient(180deg, rgba(24,17,12,.34) 0%, rgba(24,17,12,.05) 42%, rgba(24,17,12,.48) 100%); content: ''; }
.preview-wedding-brand { position: absolute; top: 15px; left: 17px; display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,.94); text-shadow: 0 1px 8px rgba(0,0,0,.2); }
.preview-wedding-monogram { width: 27px; height: 27px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.82); border-radius: 50%; font: italic 12px/1 var(--serif); }
.preview-wedding-brand small { font: 7px/1 var(--mono); letter-spacing: .16em; }
.preview-wedding-copy { position: absolute; top: 50%; right: 12px; left: 12px; display: grid; justify-items: center; text-align: center; transform: translateY(-47%); text-shadow: 0 2px 18px rgba(0,0,0,.34); }
.preview-wedding-copy > span { color: rgba(255,255,255,.89); font: 7px/1.4 var(--mono); letter-spacing: .2em; }
.preview-wedding-copy strong { margin: 7px 0 4px; color: #fff; font: italic 500 clamp(36px, 4.8vw, 61px)/1.05 'Parisienne', var(--serif); letter-spacing: -.025em; }
.preview-wedding-copy strong i { padding: 0 3px; font: italic 500 .7em/1 var(--serif); }
.preview-wedding-copy small { color: #fff; font: 8px/1.5 var(--mono); letter-spacing: .17em; }
.preview-wedding-footer { position: absolute; right: 10px; bottom: 13px; left: 10px; color: rgba(255,255,255,.88); font: 6px/1 var(--mono); letter-spacing: .16em; text-align: center; }
.project-card--casamento .project-preview { min-height: 410px; }

@media (prefers-reduced-motion: reduce) {
  .preview-bsp-marquee span { animation: none; }
}
'''
styles = replace_once(styles, project_content_marker, preview_styles + "\n" + project_content_marker, "ponto de inserção dos estilos dos previews")

# No mobile, a prévia do card horizontal de casamento volta a uma altura compacta.
mobile_marker = "  .project-card--casamento .project-art { min-height: 225px; }"
styles = replace_once(
    styles,
    mobile_marker,
    mobile_marker + "\n  .project-card--casamento .project-preview { min-height: 250px; }\n  .preview-stage--casamento { min-height: 0; }",
    "ajuste responsivo do card de casamento",
)

# Grava apenas depois de todas as substituições terem sido validadas.
home_path.write_text(home, encoding="utf-8")
style_path.write_text(styles, encoding="utf-8")
print("Previews aplicados somente em:")
print(f" - {home_path}")
print(f" - {style_path}")
PY

# Valida whitespace e confirma que só os dois arquivos solicitados foram tocados.
git diff --check -- src/pages/Home.js src/assets/styles/portfolio-2026.scss

echo
echo "========== ALTERAÇÕES APLICADAS =========="
git status --short -- src/pages/Home.js src/assets/styles/portfolio-2026.scss
git diff --stat -- src/pages/Home.js src/assets/styles/portfolio-2026.scss

echo
echo "========== BACKUP =========="
echo "$BACKUP"
