import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBriefcase,
  faCamera,
  faLayerGroup,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/components/navbar.scss';

const Navbar = ({ activePage, setActivePage }) => {
  return (
    <div id="left-container">
      <aside id="left">
        <ul>
          <li className="nav-item no-click no-triangle" id="profile-pic">
            <img src={require('../assets/images/profile2.jpg')} alt="Profile" width={155} />
            <div className="name-profile uppercase">Felipe Barroso Abdo</div>
          </li>
          <li
            className={`nav-item about ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => setActivePage('about')}
          >
            <FontAwesomeIcon icon={faUser} />
            <h4>SOBRE MIM</h4>
            <p>QUEM SOU EU</p>
          </li>
          <li
            className={`nav-item resume ${activePage === 'resume' ? 'active' : ''}`}
            onClick={() => setActivePage('resume')}
          >
            <FontAwesomeIcon icon={faBriefcase} />
            <h4>CURRÍCULO</h4>
            <p>CURRICULUM VITAE</p>
          </li>
          <li
            className={`nav-item portfolio ${activePage === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActivePage('portfolio')}
          >
            <FontAwesomeIcon icon={faCamera} />
            <h4>PORTFÓLIO</h4>
            <p>MEUS TRABALHOS</p>
          </li>
          <li
            className={`nav-item blog ${activePage === 'blog' ? 'active' : ''}`}
            onClick={() => setActivePage('blog')}
          >
            <FontAwesomeIcon icon={faLayerGroup} />
            <h4>SKILLS</h4>
            <p>PARA TE AJUDAR</p>
          </li>
          <li
            className={`nav-item contact ${activePage === 'contact' ? 'active' : ''}`}
            onClick={() => setActivePage('contact')}
          >
            <FontAwesomeIcon icon={faPhone} />
            <h4>CONTATO</h4>
            <p>DIGA OLÁ!</p>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Navbar;