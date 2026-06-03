# 🚀 Jeremy Canarte - Frontend Developer Portfolio

A modern, fast, and scalable personal portfolio web application designed and developed for **Jeremy Canarte**. This project serves as a masterclass in modern frontend development, demonstrating advanced animation techniques, elite-tier UX patterns, robust state management, and strict attention to performance, SEO, and accessibility.

---

## ✨ Elite-Tier Features

- **Progressive Web App (PWA):** Fully installable on desktop and mobile devices with offline caching via `vite-plugin-pwa` and Service Workers.
- **Fluid Smooth Scrolling:** Uses `@studio-freight/lenis` for an inertia-based, buttery-smooth scrolling experience that feels incredibly premium.
- **Custom Magnetic Interactions:** Features a custom animated cursor with `mix-blend-mode: difference` and a `<MagneticWrapper>` component that physically pulls navigation items and buttons toward the user's cursor.
- **Dark/Light Mode & i18n:** Built-in contexts (`ThemeProvider`, `LanguageProvider`) that allow users to instantly toggle the entire interface between English and Spanish, and Light and Dark themes.
- **High-Performance Lazy Loading:** Critical sections like the Hero load instantly, while heavy components (`PortfolioSection`, `ContactSection`) are code-split and loaded asynchronously via `React.lazy()` and `<Suspense>`.
- **Advanced SEO & Analytics:** Dynamically injects metadata, OpenGraph tags, and structured data via `react-helmet-async`. Includes a dynamic `robots.txt` y `sitemap.xml` para una perfecta indexación en buscadores. Integrado con **Vercel Analytics** (`@vercel/analytics`).
- **Real Backend Integration (EmailJS):** A fully functional contact form powered by `react-hook-form`, validated by `Zod`, and connected to EmailJS to send real-time emails without a traditional backend server.
- **Immersive Animations & Preloader:** Includes a custom premium Preloader and utilizes Framer Motion (`LazyMotion`) to create interactive 3D tilt effects, floating particles, and layout transitions while maintaining a minimal bundle size.
- **Robust Testing:** Unit and integration testing configured with **Vitest** and React Testing Library to ensure component reliability.

---

## 💻 Technologies & Tools

- **Core:** React (v19) and TypeScript for rigorous type safety.
- **Build Tool:** Vite.
- **Styling:** Tailwind CSS configured globally with custom glassmorphism effects and dynamic theme variables.
- **Animation Engine:** Framer Motion (`framer-motion`) for complex spring physics, scroll-linked animations, and layout transitions.
- **Forms & Validation:** `react-hook-form` + `@hookform/resolvers/zod` + `@emailjs/browser`.
- **UX Enhancements:** `@studio-freight/lenis` (Scroll), Lucide React (Icons).
- **Testing:** Vitest, Testing Library, jsdom.

---

## 🚀 Installation & Local Execution

To run this portfolio locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jeruwu/portfolio-jeremy.git
   cd portfolio-jeremy
   ```

2. **Install project dependencies:**
   Make sure you have Node.js and npm installed.
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your EmailJS and Google Analytics keys based on `.env.example`:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_GA_MEASUREMENT_ID=your_ga_id
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

5. **Run Tests:**
   ```bash
   npm run test
   ```

---

## 🚀 Despliegue en Netlify

El proyecto está optimizado y listo para ser desplegado en **Netlify**. Sigue estos pasos:

1. **Configuración Básica en Netlify:**
   - Conecta tu repositorio de GitHub a Netlify.
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

2. **Variables de Entorno:**
   Asegúrate de agregar todas tus variables de entorno (las mismas del archivo `.env`) en la configuración de Netlify (Site settings > Environment variables):
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

3. **Enrutamiento del lado del cliente (Opcional):**
   Aunque el portafolio utiliza anclas, si en el futuro agregas rutas de React Router, puedes crear un archivo `_redirects` en la carpeta `public/` con el siguiente contenido para evitar errores 404:
   ```
   /*    /index.html   200
   ```

---

_Designed & built with precision by Jeremy Canarte._
