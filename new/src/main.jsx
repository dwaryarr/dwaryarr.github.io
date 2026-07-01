import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { I18nProvider } from './i18n/I18nProvider';
import { ThemeProvider } from './hooks/useTheme';
import './styles/index.css';

// Decode the GitHub Pages SPA redirect trick (see public/404.html).
// When a deep link 404s, 404.html rewrites the URL into a query string;
// this restores the original path before React Router takes over.
(function decodeSpaRedirect() {
  if (window.location.search[1] === '/') {
    const decoded = window.location.search
      .slice(1)
      .split('&')
      .map((s) => s.replace(/~and~/g, '&'))
      .join('?');
    window.history.replaceState(null, null, window.location.pathname.slice(0, -1) + decoded + window.location.hash);
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
