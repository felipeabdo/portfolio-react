import React from 'react';
import '../assets/styles/pages/about.scss';

const About = () => {
  return (
    <div id="about-content">
      <div id="about-title">
        <h1>Felipe Barroso Abdo</h1>
        <p>Web Designer / Web Developer</p>
      </div>
      <div className="separator"></div>
      <div className="text-title uppercase"><strong>Sobre mim</strong></div>

      <p className="text-p">
        Seja bem-vinda (o)! Deixa eu me apresentar! Estudei Propaganda e Marketing no UniCEUB e atuei na área por alguns anos, mas senti a necessidade de uma mudança de carreira. Hoje curso a faculdade de Análise e Desenvolvimento de Sistemas no
        <a href="https://www.iesb.br/" target="_blank" rel="noopener noreferrer"> IESB</a>.
        <a href="https://www.iesb.br/" target="_blank" rel="noopener noreferrer">
          <img src={require('../assets/images/iesb.png')} className="text-icons" alt="IESB logo" />
        </a>
      </p>

      <p className="text-p">
        Se você está aqui, pode perceber que a mudança já começou. Cursei o Bootcamp da
        <a href="https://www.lewagon.com/pt-BR" target="_blank" rel="noopener noreferrer"> Le Wagon</a>.
        <a href="https://www.lewagon.com/pt-BR" target="_blank" rel="noopener noreferrer">
          <img src={require('../assets/images/wagon-mini.png')} className="text-icons" alt="Le Wagon logo" />
        </a>
        , me capacitando a encontrar soluções em desenvolvimento Fullstack com Ruby e Rails. Também participei do
        <a href="https://newrizon.global/bootcamp-new-rizon/" target="_blank" rel="noopener noreferrer"> Orion Bootcamp</a>.
        <a href="https://newrizon.global/bootcamp-new-rizon/" target="_blank" rel="noopener noreferrer">
          <img src={require('../assets/images/orion.png')} className="text-icons" alt="Orion Bootcamp logo" />
        </a>
        da New Rizon, sendo selecionado entre 50 pessoas de mais de 3000 candidatos, me capacitando a trabalhar com Angular e Typescript.
      </p>

      <p className="text-p">
        Recentemente participei de um projeto chamado Rubi nos Trilhos, a convite da Le Wagon, num grupo formado por ex-alunos e que foi apresentado na
        <a href="https://www.tropicalonrails.com/" target="_blank" rel="noopener noreferrer"> Tropical Ruby</a>.
        <a href="https://www.tropicalonrails.com/" target="_blank" rel="noopener noreferrer">
          <img src={require('../assets/images/tropical1.png')} className="text-icons" alt="Tropical on Rails logo" />🌴
        </a>
        (agora chamada de Tropical on Rails, a maior conferência de Ruby da América Latina).
      </p>

      <p className="text-p">
        Meu background como designer me capacita a buscar soluções criativas, entregando interfaces elegantes e funcionais. Sou também músico por formação e essa vivência de palco me possibilitou adquirir habilidades de comunicação, trabalho em equipe, lidar com pressão e disposição a ouvir e aprender, que são soft-skills importantíssimas para o mercado.
      </p>

      <p className="text-p">
        Estou sempre buscando me atualizar com as mais novas tecnologias e tendências de mercado para executar trabalhos modernos e expandir o leque de possibilidades, sempre visando a satisfação do cliente, da equipe à qual eu pertença e buscando sempre contribuir. O sucesso é sempre importante para todas as partes!
      </p>

      <p className="text-p">
        Sinta-se à vontade para explorar e entender como posso te ajudar! No que for preciso, entre em contato. Conte comigo!
      </p>

      <img src={require('../assets/images/signature.png')} className="signature" alt="Assinatura" />
    </div>
  );
};

export default About;