import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SocialNavbar from '../components/SocialNavbar'; // Importe a Navbar da direita
import About from './About';
import Resume from './Resume';
import Portfolio from './Portfolio';
import Blog from './Blog';
import Contact from './Contact';
import '../assets/styles/pages/home.scss';

const Home = () => {
  const [activePage, setActivePage] = useState('about');

  return (
    <div className="content">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <div id="content-container">
        {activePage === 'about' && <About />}
        {activePage === 'resume' && <Resume />}
        {activePage === 'portfolio' && <Portfolio />}
        {activePage === 'blog' && <Blog />}
        {activePage === 'contact' && <Contact />}
      </div>
      <SocialNavbar /> {/* Adicione a Navbar da direita aqui */}
    </div>
  );
};

export default Home;