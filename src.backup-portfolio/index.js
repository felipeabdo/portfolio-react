import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './assets/styles/index.scss'; // Importa os estilos globais
import setFavicon from './setFavicon'; // Importe o script

// Defina o favicon com base no tema
setFavicon();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);