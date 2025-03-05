import React from 'react';
import '../assets/styles/pages/contact.scss';

const Contact = () => {
  return (
    <div id="contact-content">
      <div id="contact-title">
        <h1>Contato</h1>
        <p>DIGA OI!</p>
      </div>
      <div className="separator"></div>
      <div className="text-title uppercase"><strong>Onde me encontrar</strong></div>
      <div id="cards">
        <div className="card">
          <i className="fa-solid fa-map-location-dot"></i>
          <h5>Endereço</h5>
          <a href="https://goo.gl/maps/uGtJAg4DYmCHAGeu6" target="_blank" rel="noopener noreferrer">
            <p>
              <img src={require('../assets/images/bsb.png')} className="text-icons" alt="Brasília" />
              Brasília - DF
            </p>
          </a>
        </div>

        <div className="card">
          <i className="fa-solid fa-mobile-screen-button"></i>
          <h5>Telefone</h5>
          <a href="https://contate.me/felipeabdo" target="_blank" rel="noopener noreferrer">
            <p>
              <i className="fa-brands fa-whatsapp" style={{ color: '#16c539', marginRight: '5px' }}></i>
              (61) 98629-6622
            </p>
          </a>
        </div>

        <div className="card">
          <i className="fa-regular fa-envelope"></i>
          <h5>E-mail</h5>
          <a href="mailto:felipe.abdo.ti@gmail.com" target="_blank" rel="noopener noreferrer">
            <p>
              <img src={require('../assets/images/gmail.png')} className="text-icons" alt="Gmail" />
              felipe.abdo.ti@gmail.com
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;