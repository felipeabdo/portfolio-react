import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import '../assets/styles/components/social-navbar.scss';

const SocialNavbar = () => {
  return (
    <div id="right-container">
      <aside id="right">
        <ul>
          <li className="sn-box">
            <a href="https://www.facebook.com/felipe.abdo" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </li>
          <li className="sn-box">
            <a href="https://twitter.com/felipeabdo" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li className="sn-box">
            <a href="https://www.linkedin.com/in/felipeabdo/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </li>
          <li className="sn-box">
            <a href="https://github.com/felipeabdo" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
          <li className="sn-box uppercase">
            © {new Date().getFullYear()} Felipe Barroso Abdo.
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SocialNavbar;