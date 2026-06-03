import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyMotion, domAnimation } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import './index.css';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

// Initialize GA4 if Measurement ID is provided
const TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (TRACKING_ID) {
  ReactGA.initialize(TRACKING_ID);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <ThemeProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ThemeProvider>
      </LazyMotion>
    </HelmetProvider>
  </StrictMode>,
);
