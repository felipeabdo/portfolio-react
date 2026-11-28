import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

const profilePhoto = require('../assets/images/profile-instagram.jpg');

const navigation = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Tecnologias', href: '#tecnologias' },
  { label: 'Trajetória', href: '#trajetoria' },
  { label: 'Contato', href: '#contato' },
];

const projects = [
  {
    id: 'bsp',
    number: '01',
    category: 'Plataforma digital · Cultura',
    title: 'Bloco Santo Pecado',
    description:
      'Uma plataforma digital para um bloco cultural de Brasília. O projeto reúne presença institucional, organização de eventos e ferramentas próprias para a comunidade do bloco.',
    highlights: [
      'Área de integrantes com cadastro, autenticação e gestão de perfis',
      'Agenda de eventos, RSVP e check-in com QR Code assinado por HMAC',
      'Painel administrativo e Music Studio com editor de partitura e sampler',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'PostgreSQL', 'Drizzle ORM'],
    artEyebrow: 'PLATAFORMA CULTURAL',
    artTitle: 'Cultura que se organiza.',
    artSubtitle: 'Comunidade · Eventos · Música',
    artSymbol: '✳',
    theme: 'bsp',
    previewUrl: 'bsp-site-delta.vercel.app',
    previewImage: 'https://bsp-site-delta.vercel.app/brand/photos/home-hero-complete-960.webp',
    liveUrl: 'https://bsp-site-delta.vercel.app/',
    repoUrl: 'https://github.com/felipeabdo/bsp-site',
  },
  {
    id: 'divertin',
    number: '02',
    category: 'Website institucional · Saúde',
    title: 'Clínica Divertin',
    description:
      'Website institucional para uma clínica especializada no desenvolvimento infantil, com foco em apresentar os serviços com clareza e facilitar o contato das famílias.',
    highlights: [
      'Conteúdo institucional e apresentação das especialidades',
      'Canais de contato e fluxo de envio de e-mails com Nodemailer',
      'Upload de arquivos com Vercel Blob e integrações Google',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Nodemailer', 'Vercel Blob'],
    artEyebrow: 'PRESENÇA DIGITAL',
    artTitle: 'Cuidado em cada detalhe.',
    artSubtitle: 'Informação · Acolhimento · Contato',
    artSymbol: '✦',
    theme: 'divertin',
    previewUrl: 'clinicadivertin.com.br',
    previewImage: 'https://www.clinicadivertin.com.br/bg-hero.webp',
    previewLogo: 'https://www.clinicadivertin.com.br/logo%20(1).webp',
    liveUrl: 'https://www.clinicadivertin.com.br/',
    repoUrl: 'https://github.com/felipeabdo/site-divertin',
  },
  {
    id: 'casamento',
    number: '03',
    category: 'Aplicação web · Projeto autoral',
    title: 'Jéssica & Felipe',
    description:
      'Uma experiência digital personalizada para o casamento, pensada para reunir informações, interações e ferramentas de organização em um só lugar.',
    highlights: [
      'Páginas dinâmicas, RSVP, lista de presentes e painel de transparência',
      'Gestão de convidados, galeria, mensagens e área administrativa',
      'Integrações com Firebase, Cloudinary e Gemini API',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Express', 'Firebase', 'Cloudinary', 'Gemini API'],
    artEyebrow: 'EXPERIÊNCIA PERSONALIZADA',
    artTitle: 'Um dia, muitas histórias.',
    artSubtitle: 'Convidados · Memórias · Organização',
    artSymbol: '∞',
    theme: 'casamento',
    previewUrl: 'jesselipe.com.br',
    previewImage: 'https://i.imgur.com/rzJAEba.jpeg',
    liveUrl: 'https://jesselipe.com.br/',
    repoUrl: 'https://github.com/felipeabdo/casamento',
  },
  {
    id: 'pokedex',
    number: '04',
    category: 'Aplicação web · Consumo de API',
    title: 'Pokédex — Explorador Pokémon',
    description:
      'Um projeto de estudos que evoluiu para uma experiência completa de exploração do universo Pokémon. Desenvolvido com HTML, CSS e JavaScript puro, consumindo dados da PokéAPI.',
    highlights: [
      'Catálogo paginado, busca por nome ou número e filtros combináveis por geração e tipos',
      'Favoritos no navegador e fichas com atributos, habilidades, vantagens por tipo e evoluções',
      'Galeria de artes e sprites, choros, movimentos detalhados e registros de jogos e encontros',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'PokéAPI REST', 'Fetch API', 'localStorage'],
    theme: 'pokedex',
    previewImage: 'https://js-developer-pokedex-rouge.vercel.app/assets/img/pokeball.svg',
    previewUrl: 'js-developer-pokedex-rouge.vercel.app',
    liveUrl: 'https://js-developer-pokedex-rouge.vercel.app/',
    repoUrl: 'https://github.com/felipeabdo/js-developer-pokedex',
  },
];

const skillGroups = [
  {
    title: 'Interfaces e front-end',
    description: 'Da estrutura visual à experiência responsiva.',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Sass / SCSS'],
  },
  {
    title: 'Aplicações e dados',
    description: 'Integração de serviços, lógica e persistência.',
    items: ['Node.js', 'Express', 'PostgreSQL', 'Drizzle ORM', 'Firebase / Firestore', 'APIs REST', 'Nodemailer', 'Vercel Blob'],
  },
  {
    title: 'Ferramentas e repertório',
    description: 'Fluxo de trabalho e tecnologias exploradas anteriormente.',
    items: ['Git', 'GitHub', 'Vercel', 'Figma', 'Ruby on Rails', 'Angular'],
  },
];

const education = [
  {
    type: 'Graduação · Em andamento',
    title: 'Análise e Desenvolvimento de Sistemas',
    institution: 'IESB',
    detail: 'Penúltimo período',
  },
  {
    type: 'Estudos anteriores',
    title: 'Propaganda e Marketing',
    institution: 'UniCEUB',
    detail: 'Base em comunicação, criação e estratégia',
  },
];

const courses = [
  {
    title: 'Bootcamp de desenvolvimento Full Stack',
    institution: 'Le Wagon',
    detail: 'Formação prática com Ruby on Rails e desenvolvimento de aplicações web.',
  },
  {
    title: 'Orion Bootcamp',
    institution: 'New Rizon',
    detail: 'Trilha de Angular e TypeScript. Selecionado para uma turma de 50 participantes entre mais de 3.000 candidatos.',
  },
];

function SectionHeading({ eyebrow, title, note }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {note ? <p className="section-note">{note}</p> : null}
    </div>
  );
}

function supportsHoverPreview() {
  return typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function ProjectLivePreview({ project, previewRef, onOpenPreview }) {
  const address = project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div
      className={`project-preview project-preview--${project.theme}`}
      ref={previewRef}
      onMouseEnter={() => {
        if (supportsHoverPreview()) onOpenPreview(project, previewRef.current, false);
      }}
      aria-label={`Prévia interativa de ${project.title}`}
    >
      <div className="preview-browser-bar">
        <div className="preview-browser-dots"><i /><i /><i /></div>
        <span className="preview-browser-address">{address}</span>
        <span className="preview-browser-status">LIVE</span>
        <button
          className="preview-browser-expand"
          type="button"
          onClick={() => onOpenPreview(project, previewRef.current, true)}
          aria-label={`Expandir ${project.title}`}
        >
          Expandir <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className={`project-preview-poster project-preview-poster--${project.theme}`}>
        {project.previewImage ? (
          <img src={project.previewImage} alt="" loading="lazy" decoding="async" />
        ) : null}
        <div className="project-preview-poster__copy">
          <span>PROJETO INTERATIVO</span>
          <strong>{project.title}</strong>
          <small className="project-preview-desktop-hint">Passe o mouse para experimentar</small>
          <small className="project-preview-touch-hint">Toque para abrir em tela cheia</small>
        </div>
        <button
          className="project-preview-mobile-trigger"
          type="button"
          onClick={() => onOpenPreview(project, previewRef.current, true)}
          aria-label={`Abrir ${project.title} em tela cheia`}
        >
          Experimentar projeto <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpenPreview }) {
  const previewRef = useRef(null);

  return (
    <article className={`project-card project-card--${project.theme}`}>
      <ProjectLivePreview
        project={project}
        previewRef={previewRef}
        onOpenPreview={onOpenPreview}
      />

      <div className="project-content">
        <div className="project-overline">
          <span>{project.category}</span>
          <span className="project-number">{project.number} / 04</span>
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
          <button
            className="text-link text-link--primary"
            type="button"
            onClick={() => onOpenPreview(project, previewRef.current, true)}
          >
            Acessar projeto <span aria-hidden="true">↗</span>
          </button>
          <a className="text-link" href={project.repoUrl} target="_blank" rel="noreferrer">
            Código no GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectPreviewWindow({ preview, onDismiss }) {
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [closing, setClosing] = useState(false);
  const windowRef = useRef(null);
  const finishedRef = useRef(false);
  const alignPageRef = useRef(null);
  const alignedPageRef = useRef(false);
  const address = preview.project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const viewportWidth = Math.max(window.innerWidth, 1);
  const viewportHeight = Math.max(document.documentElement.clientHeight || window.innerHeight, 1);
  const scale = Math.min(preview.origin.width / viewportWidth, 1);
  const clipHeight = Math.min(viewportHeight, preview.origin.height / scale);
  const windowStyle = {
    '--preview-origin-transform': `translate3d(${preview.origin.left}px, ${preview.origin.top}px, 0) scale(${scale})`,
    '--preview-close-origin-transform': `translate3d(${preview.origin.left}px, ${alignedPageRef.current ? preview.targetTop : preview.origin.top}px, 0) scale(${scale})`,
    '--preview-scale-x': expanded ? 1 : scale,
    '--preview-scale-y': expanded ? 1 : scale,
    '--preview-origin-width': `${preview.origin.width}px`,
    '--preview-clip-height': `${clipHeight}px`,
    '--preview-toolbar-height': '58px',
  };
  const locked = expanded;

  const closeWindow = useCallback(() => {
    if (closing) return;
    if (!expanded) {
      onDismiss();
      return;
    }
    setClosing(true);
    setExpanded(false);
  }, [closing, expanded, onDismiss]);

  const finishClose = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    if (!preview.expand) return undefined;
    let firstFrame = 0;
    let secondFrame = 0;
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setExpanded(true));
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [preview.expand]);

  useLayoutEffect(() => {
    if (!locked) return undefined;

    const root = document.documentElement;
    const body = document.body;
    const initialScrollY = Number.isFinite(preview.scrollY) ? preview.scrollY : window.scrollY;
    const targetScrollY = Number.isFinite(preview.targetScrollY) ? preview.targetScrollY : initialScrollY;
    const scrollX = window.scrollX;
    let restoreScrollY = initialScrollY;
    const previousScrollBehavior = root.style.getPropertyValue('scroll-behavior');
    const previousScrollBehaviorPriority = root.style.getPropertyPriority('scroll-behavior');
    const previous = {
      rootOverflow: root.style.getPropertyValue('overflow'),
      rootOverflowPriority: root.style.getPropertyPriority('overflow'),
      rootOverscroll: root.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.getPropertyValue('overflow'),
      bodyOverflowPriority: body.style.getPropertyPriority('overflow'),
      bodyOverscroll: body.style.overscrollBehavior,
    };

    root.style.setProperty('overflow', 'hidden', 'important');
    root.style.overscrollBehavior = 'none';
    body.style.position = 'fixed';
    body.style.top = `-${initialScrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.setProperty('overflow', 'hidden', 'important');
    body.style.overscrollBehavior = 'none';

    alignedPageRef.current = false;
    alignPageRef.current = () => {
      if (alignedPageRef.current) return;
      body.style.top = `-${targetScrollY}px`;
      restoreScrollY = targetScrollY;
      alignedPageRef.current = true;
    };

    return () => {
      alignPageRef.current = null;
      root.style.setProperty('scroll-behavior', 'auto', 'important');
      if (previous.rootOverflow) {
        root.style.setProperty('overflow', previous.rootOverflow, previous.rootOverflowPriority);
      } else {
        root.style.removeProperty('overflow');
      }
      root.style.overscrollBehavior = previous.rootOverscroll;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      if (previous.bodyOverflow) {
        body.style.setProperty('overflow', previous.bodyOverflow, previous.bodyOverflowPriority);
      } else {
        body.style.removeProperty('overflow');
      }
      body.style.overscrollBehavior = previous.bodyOverscroll;
      window.scrollTo(scrollX, restoreScrollY);
      if (previousScrollBehavior) {
        root.style.setProperty('scroll-behavior', previousScrollBehavior, previousScrollBehaviorPriority);
      } else {
        root.style.removeProperty('scroll-behavior');
      }
    };
  }, [locked, preview.scrollY, preview.targetScrollY]);

  useEffect(() => {
    if (!locked) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeWindow();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [locked, closeWindow]);

  useEffect(() => {
    if (expanded || closing) return undefined;

    const inside = (rect, x, y) => rect
      && x >= rect.left
      && x <= rect.right
      && y >= rect.top
      && y <= rect.bottom;

    const handlePointerMove = (event) => {
      const cardRect = preview.card && preview.card.getBoundingClientRect();
      const windowRect = windowRef.current && windowRef.current.getBoundingClientRect();
      if (inside(cardRect, event.clientX, event.clientY)) return;
      if (inside(windowRect, event.clientX, event.clientY)) return;
      closeWindow();
    };

    const handleScroll = () => closeWindow();

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [expanded, closing, preview.card, closeWindow]);

  useEffect(() => {
    if (!closing) return undefined;
    const timer = window.setTimeout(finishClose, 620);
    return () => window.clearTimeout(timer);
  }, [closing, finishClose]);

  return createPortal(
    <div
      ref={windowRef}
      data-preview-fluid-fix="true"
      className={`project-preview-window${expanded ? ' is-expanded' : ''}${closing ? ' is-closing' : ''}`}
      style={windowStyle}
      role={expanded ? 'dialog' : undefined}
      aria-modal={expanded ? 'true' : undefined}
      aria-label={`Projeto ${preview.project.title}`}
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
        if (closing) finishClose();
        else if (expanded) alignPageRef.current?.();
      }}
    >
      <div className="project-preview-window__bar">
        <div className="preview-browser-dots"><i /><i /><i /></div>
        <span className="project-preview-window__address">https://{address}</span>
        <span className="project-preview-window__status">{expanded ? 'SITE AO VIVO' : 'LIVE'}</span>
        <div className="project-preview-window__actions">
          {expanded ? (
            <a href={preview.project.liveUrl} target="_blank" rel="noreferrer">Nova aba ↗</a>
          ) : (
            <button type="button" onClick={() => setExpanded(true)}>Expandir ↗</button>
          )}
          {expanded ? (
            <button className="project-preview-window__close" type="button" onClick={closeWindow} aria-label="Fechar projeto">
              Fechar <span aria-hidden="true">×</span>
            </button>
          ) : null}
        </div>
      </div>

      <div className={`project-preview-window__stage${loaded ? ' is-loaded' : ''}`}>
        <div className="project-preview-window__poster" aria-hidden="true">
          {preview.project.previewImage ? <img src={preview.project.previewImage} alt="" /> : null}
          <div>
            <span>ABRINDO EXPERIÊNCIA</span>
            <strong>{preview.project.title}</strong>
          </div>
        </div>
        <iframe
          className="project-preview-window__frame"
          src={preview.project.liveUrl}
          title={`Projeto ${preview.project.title}`}
          loading="eager"
          scrolling="auto"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; fullscreen"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>,
    document.body
  );
}
function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const openPreview = useCallback((project, element, expand = false) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY;
    const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const targetScrollY = Math.min(maxScrollY, Math.max(0, scrollY + rect.top));
    const nextPreview = {
      project,
      origin: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
      card: element.closest('.project-card'),
      scrollY,
      targetScrollY,
      targetTop: rect.top + scrollY - targetScrollY,
      expand,
    };

    setPreview((current) => {
      if (current && current.project.id === project.id) {
        return { ...current, expand: current.expand || expand };
      }
      return nextPreview;
    });
  }, []);

  const dismissPreview = useCallback(() => setPreview(null), []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-site">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Felipe Barroso Abdo — início">
            <span className="brand-mark">FB<span>.</span></span>
            <span className="brand-name">FELIPE BARROSO ABDO</span>
          </a>

          <button
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>

          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegação principal">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
            <a className="nav-contact" href="#contato" onClick={closeMenu}>Vamos conversar <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-grid page-shell">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow"><span className="status-dot" /> DESENVOLVEDOR WEB <span className="eyebrow-divider">/</span> BRASÍLIA, DF</p>
              <h1>Ideias bem pensadas.<br /><em>Experiências digitais</em><br />que fazem sentido.</h1>
              <p className="hero-lede">
                Sou Felipe, desenvolvedor web em formação. Uno tecnologia, comunicação e olhar visual para criar aplicações e experiências digitais úteis, claras e bem construídas.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projetos">Explorar projetos <span aria-hidden="true">↓</span></a>
                <a className="button button-quiet" href="https://www.linkedin.com/in/felipeabdo/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              </div>
              <div className="hero-facts">
                <div><span>FORMAÇÃO</span><strong>ADS · IESB</strong><small>Penúltimo período</small></div>
                <div><span>FOCO ATUAL</span><strong>React · Next.js</strong><small>TypeScript · aplicações web</small></div>
              </div>
            </div>

            <div className="hero-portrait-wrap">
              <div className="portrait-orbit portrait-orbit--one" />
              <div className="portrait-orbit portrait-orbit--two" />
              <div className="portrait-frame">
                <img src={profilePhoto} alt="Retrato de Felipe Barroso Abdo" />
                <div className="portrait-caption"><span>FELIPE BARROSO ABDO</span><span>DEV / 2026</span></div>
              </div>
              <div className="portrait-note"><span className="note-glyph">✳</span><span>Comunicação<br />encontra código.</span></div>
              <div className="floating-code"><span className="code-dots">● ● ●</span><code>const <b>idea</b> = build();</code></div>
            </div>
          </div>
          <div className="hero-bottom page-shell">
            <span>PORTFÓLIO 2026</span>
            <span>DESENVOLVIMENTO COM INTENÇÃO</span>
            <a href="#sobre">ROLE PARA CONHECER <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="about-section section-pad" id="sobre">
          <div className="page-shell">
            <SectionHeading eyebrow="01 / SOBRE MIM" title={<>Tecnologia com repertório.<br /><em>Desenvolvimento com contexto.</em></>} note="Uma trajetória que conecta comunicação, criatividade e construção de produtos digitais." />
            <div className="about-grid">
              <div className="about-lead">
                <p className="about-lead-text">Minha trajetória profissional começou na comunicação e na criação. Hoje, levo essa bagagem para o desenvolvimento web.</p>
                <div className="about-accent-line" />
              </div>
              <div className="about-copy">
                <p>Antes de direcionar minha carreira para tecnologia, trabalhei com comunicação, marketing, design, direção de arte e redação. Essa experiência me ensinou a olhar para identidade, mensagem, objetivos e, principalmente, para as pessoas que estão do outro lado de uma interface.</p>
                <p>Atualmente, estou no penúltimo período de Análise e Desenvolvimento de Sistemas no IESB. Tenho aprofundado meus conhecimentos em desenvolvimento web e transformado aprendizado em prática por meio de projetos publicados, aplicações próprias e soluções construídas para necessidades reais.</p>
                <p>Gosto de acompanhar o processo de ponta a ponta: entender o problema, estruturar a solução, desenvolver a interface, integrar funcionalidades e cuidar dos detalhes que tornam um produto mais fácil de usar. A música também faz parte da minha trajetória e mantém vivo meu lado criativo e colaborativo.</p>
                <div className="about-principle"><span>“</span><p>Não vejo design e código como etapas isoladas. Uma boa solução precisa ser útil, clara e bem executada.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="projects-section section-pad" id="projetos">
          <div className="page-shell">
            <SectionHeading eyebrow="02 / TRABALHOS SELECIONADOS" title={<>Projetos que saíram<br /><em>da ideia para a prática.</em></>} note="Aplicações e sites publicados, com diferentes contextos, desafios e escolhas técnicas." />
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenPreview={openPreview}
                />
              ))}
            </div>
            <div className="github-more">
              <span>Quer ver outros experimentos e acompanhar minha evolução?</span>
              <a className="text-link text-link--primary" href="https://github.com/felipeabdo" target="_blank" rel="noreferrer">Explore meu GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="skills-section section-pad" id="tecnologias">
          <div className="page-shell">
            <SectionHeading eyebrow="03 / TECNOLOGIAS" title={<>Ferramentas para<br /><em>construir boas soluções.</em></>} note="Tecnologias presentes nos projetos e na minha formação. Aprofundamento contínuo, com foco em aplicações web." />
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <article className="skill-group" key={group.title}>
                  <div className="skill-group-number">0{index + 1}</div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
            <p className="skills-footnote">Também tive contato com Ruby on Rails e Angular em formações e projetos anteriores.</p>
          </div>
        </section>

        <section className="trajectory-section section-pad" id="trajetoria">
          <div className="page-shell">
            <SectionHeading eyebrow="04 / FORMAÇÃO E TRAJETÓRIA" title={<>Aprender, experimentar<br /><em>e seguir construindo.</em></>} note="Minha formação combina tecnologia, comunicação e experiências colaborativas." />
            <div className="trajectory-grid">
              <div className="trajectory-column">
                <h3 className="column-title">Formação acadêmica</h3>
                {education.map((item) => (
                  <article className="education-item" key={item.title}>
                    <span className="item-type">{item.type}</span>
                    <h4>{item.title}</h4>
                    <strong>{item.institution}</strong>
                    <p>{item.detail}</p>
                  </article>
                ))}
                <div className="previous-career">
                  <span className="item-type">REPERTÓRIO PROFISSIONAL</span>
                  <h4>Comunicação e criação</h4>
                  <p>Experiência anterior com design, direção de arte, redação, identidades visuais e oficinas de comunicação. Uma bagagem que hoje fortalece meu olhar para conteúdo, interface e experiência.</p>
                </div>
              </div>

              <div className="trajectory-column">
                <h3 className="column-title">Bootcamps e experiências</h3>
                {courses.map((course) => (
                  <article className="course-item" key={course.title}>
                    <div className="course-marker" />
                    <div><span className="item-type">{course.institution}</span><h4>{course.title}</h4><p>{course.detail}</p></div>
                  </article>
                ))}
                <article className="course-item course-item--last">
                  <div className="course-marker" />
                  <div>
                    <span className="item-type">PROJETO COLABORATIVO</span>
                    <h4>Rubi nos Trilhos</h4>
                    <p>Projeto desenvolvido com um grupo de ex-alunos da Le Wagon, a convite da comunidade, e apresentado na conferência Tropical Ruby.</p>
                    <a className="text-link" href="https://www.tropicalonrails.com/" target="_blank" rel="noreferrer">Tropical on Rails <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contato">
          <div className="page-shell contact-shell">
            <p className="eyebrow">05 / CONTATO</p>
            <h2>Boas ideias começam<br /><em>com uma conversa.</em></h2>
            <p className="contact-intro">Estou aberto a oportunidades em desenvolvimento web, novas conexões e projetos em que tecnologia e boas ideias caminhem juntas.</p>
            <div className="contact-actions">
              <a className="button button-primary" href="mailto:felipe.abdo.ti@gmail.com">Enviar um e-mail <span aria-hidden="true">↗</span></a>
              <a className="button button-outline" href="https://www.linkedin.com/in/felipeabdo/" target="_blank" rel="noreferrer">Conectar no LinkedIn <span aria-hidden="true">↗</span></a>
            </div>
            <div className="contact-details">
              <a href="mailto:felipe.abdo.ti@gmail.com">felipe.abdo.ti@gmail.com</a>
              <a href="https://github.com/felipeabdo" target="_blank" rel="noreferrer">github.com/felipeabdo</a>
              <span>Brasília · DF · Brasil</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <a className="brand footer-brand" href="#inicio"><span className="brand-mark">FB<span>.</span></span><span className="brand-name">FELIPE BARROSO ABDO</span></a>
          <span>Feito com intenção, código e curiosidade.</span>
          <span>© {new Date().getFullYear()} · Todos os direitos reservados</span>
        </div>
      </footer>
      {preview ? (
        <ProjectPreviewWindow
          key={preview.project.id}
          preview={preview}
          onDismiss={dismissPreview}
        />
      ) : null}

    </div>
  );
}

export default Home;
