import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

describe('App', () => {
  it('renders without crashing and displays the loading fallback or preloader', () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    );
    // Because of the Preloader and Lazy components, we can just assert it mounted
    expect(screen.getAllByText(/JEREMY CANARTE/i).length).toBeGreaterThan(0);
  });
});
