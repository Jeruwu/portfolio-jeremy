# 🌐 Jeremy Canarte - High-Performance Web Portfolio

A modern, fast, and scalable personal portfolio website designed and developed for Jeremy Canarte[cite: 32]. This web application is tailored to showcase end-to-end web solutions, highlighting custom corporate websites, high-converting landing pages, and automated booking systems[cite: 32].

This project serves as a masterclass in modern frontend development, demonstrating advanced animation techniques, robust state management, and strict attention to accessibility.

## ✨ Key Features

* **Native Bilingual Support:** Features a custom, type-safe translation dictionary (`i18n.ts`) that allows users to instantly toggle the entire interface between English and Spanish[cite: 31, 32].
* **Immersive 3D Animations:** Utilizes Framer Motion to create interactive 3D tilt effects (`rotateX`, `rotateY`) and floating particles within the service cards[cite: 39].
* **Accessibility & Reduced Motion:** Implements strict accessibility standards by using the `useReducedMotion` hook and global CSS media queries to safely disable heavy animations for users who prefer reduced motion[cite: 33, 35, 36].
* **Interactive Project Gallery:** Showcases featured projects (such as EcoGlow, Ápice, and Mantra) using CSS-driven duotone color washes, hover filters, and a custom simulated browser chrome component[cite: 32, 38].
* **Smart Contact Flow:** Integrates a custom `useScrollToContact` hook that smoothly navigates the user to the contact section and triggers a glowing pulse animation around the contact form[cite: 31, 35].
* **Premium UI Textures:** Enhances the visual depth of the site using an embedded SVG fractal noise overlay and a seamless background video loop in the Hero section[cite: 33, 36].

## 🛠️ Technologies & Tools

* **Core Framework:** React (v18) and TypeScript for rigorous type safety across translation helpers and component props[cite: 31, 32, 34].
* **Styling:** Tailwind CSS configured globally with the 'Almarai' font family and custom glassmorphism effects[cite: 33, 35].
* **Animation Engine:** Framer Motion (`framer-motion`) for complex spring physics, scroll-linked animations, and layout transitions[cite: 35, 36, 37, 38, 39].
* **Iconography:** Lucide React icons (e.g., `Globe`, `Mail`, `ArrowRight`, `MousePointerClick`)[cite: 35, 36, 38, 39].

## 🚀 Installation & Local Execution

To run this portfolio locally on your machine, follow these steps:

1. **Clone the repository:**
   
        git clone https://github.com/Jeruwu/portfolio-jeremy.git
        cd portfolio-jeremy

2. **Install project dependencies:**
   Make sure you have Node.js and npm installed.
   
        npm install

3. **Start the local development server:**
   
        npm run dev

   Open your browser and navigate to the local host address provided in your terminal (typically `http://localhost:5173`).

## 📁 Project Structure

The application is highly modular, split into distinct feature sections:

* `src/App.tsx`: The main orchestration component that manages the global language state and scroll triggers[cite: 31].
* `src/i18n.ts`: A centralized, type-safe dictionary containing all English and Spanish copy, as well as the portfolio project data[cite: 32].
* `src/components/HeroSection.tsx`: The landing view featuring a background video, sliding navigation underline effects, and the primary call-to-action[cite: 36, 37].
* `src/components/ServicesSection.tsx`: A grid of interactive service cards with mouse-tracking 3D tilt and floating particles[cite: 39].
* `src/components/PortfolioSection.tsx`: The project gallery featuring custom browser UI mockups and CSS-driven image reveal animations[cite: 38].
* `src/components/ContactSection.tsx`: A robust contact form with client-side validation, simulated loading/success states, and animated social links[cite: 35].
* `src/index.css`: The global stylesheet defining the noise textures, smooth scrolling behaviors, and reduced-motion fallback rules[cite: 33].

---
*Designed & built with precision.*[cite: 35]