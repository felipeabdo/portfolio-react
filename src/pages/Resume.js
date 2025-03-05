import React from 'react';
import '../assets/styles/pages/resume.scss';

const Resume = () => {
  return (
    <div id="resume-content">
      <div id="resume-title">
        <h1>Currículo</h1>
        <p>CURRICULUM VITAE</p>
      </div>
      <div className="separator"></div>
      <div className="text-title uppercase"><strong>Experiência Profissional</strong></div>
      <div className="timeline">
        <div className="linha"></div>

        <div className="time-box esq">
          <div className="linha-hor"></div>
          <div className="quadradinho"></div>
          <h6>UNICEUB – Departamento Financeiro</h6>
          <p>Cadastramento de bolsa de estudos e auxílio em atividades financeiras. Registro de informações das bolsas concedidas e suporte em pagamentos e reconciliação de contas, com organização, atenção aos detalhes e eficiência.</p>
        </div>

        <div className="time-box dir">
          <div className="linha-hor"></div>
          <div className="quadradinho"></div>
          <h6>SERPRO</h6>
          <p>Responsável por realizar a digitação de documentos, bem como a manutenção de sistemas internos. Apoio em atividades administrativas, contribuindo para o bom funcionamento do departamento.</p>
        </div>

        <div className="time-box esq">
          <div className="linha-hor"></div>
          <div className="quadradinho"></div>
          <h6>Zoológico de Brasília</h6>
          <p>Criação de peças gráficas, como folders, mapas e informativos internos. Uso de habilidades em design para transmitir informações de forma clara e atrativa aprendendo mais sobre comunicação visual no contexto local.</p>
        </div>

        <div className="time-box dir">
          <div className="linha-hor"></div>
          <div className="quadradinho"></div>
          <h6>Ministério da Defesa</h6>
          <p>Responsável pela criação de peças gráficas, incluindo informativos para o público interno e externo, como no Projeto Rondon e ajudando na criação de peças para os Jogos Mundiais Militares de 2011.</p>
        </div>

        <div className="time-box esq">
          <div className="linha-hor"></div>
          <div className="quadradinho"></div>
          <h6>Freelancer</h6>
          <p>Destaque para a atuação no Estúdio VOCE (RJ), onde realizei a criação de peças gráficas. Criação das peças gráficas para o DVD da ex-The Voice + Cássia Portugal, desde o material promocional até a arte do disco.</p>
        </div>

        <div className="time-box dir">
          <div className="linha-hor"></div>
          <div className="quadradinho"></div>
          <h6>Estudio À LA CARTE</h6>
          <p>Gerenciamento da agência com mais 3 sócios e criação de design, direção de arte e redação. Desenvolvimento de identidades visuais, layouts e anúncios impressos e digitais, focado em resultados eficazes.</p>
        </div>

        <div className="time-box esq">
          <div className="linha-hor"></div>
          <div className="quadradinho"></div>
          <h6>IDECACE – Centros Olímpicos</h6>
          <p>Professor de Oficinas de Comunicação para jovens explicando sobre como funciona a comunicação de fato e criando experiências práticas construindo rádio e jornal locais. Incentivo à prática da profissão.</p>
        </div>

        <div className="time-box dir">
          <div className="linha-hor"></div>
          <div className="quadradinho"></div>
          <h6>VIZU Comunicação</h6>
          <p>Criação de design, direção de arte e redação. Desenvolvimento de identidades visuais, layouts e anúncios impressos e digitais, focado em resultados eficazes.</p>
        </div>

        <div className="time-box esq">
          <div className="linha-hor"></div>
          <div className="quadradinho"></div>
          <h6>Desenvolvedor Fullstack Freelancer</h6>
          <p>Desenvolvimento nas stacks Ruby, Rails, HTML, CSS, SCSS, Bootstrap e JavaScript. Criação de aplicações web robustas e escaláveis, desde a concepção do backend até o desenvolvimento de interfaces interativas e responsivas.</p>
        </div>
      </div>
    </div>
  );
};

export default Resume;