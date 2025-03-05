// src/setFavicon.js
const setFavicon = () => {
  const faviconLight = '/favicon-no-back.ico'; // Caminho para o favicon claro
  const faviconDark = '/favicon-no-back-d.ico'; // Caminho para o favicon escuro

  const updateFavicon = () => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = prefersDarkScheme ? faviconDark : faviconLight;
    }
  };

  // Atualiza o favicon ao carregar a página
  updateFavicon();

  // Atualiza o favicon quando o tema do sistema muda
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
};

export default setFavicon;