import React, { useState } from 'react';

const profilePhoto = require('../assets/images/profile2.jpg');

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

function ProjectCard({ project }) {
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

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

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
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
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
    </div>
  );
}

export default Home;
