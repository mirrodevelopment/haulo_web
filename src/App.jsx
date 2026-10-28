import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { HeroExperience } from './components/HeroExperience';
import { ContactPage } from './pages/ContactPage';
import { CustomCursor } from './components/CustomCursor';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const heroRef = useRef(null);

  // Single global Lenis smooth scroll instance
  useLenis();

  return (
    <>
      <ScrollToTop />
      <CustomCursor />

      <div className="app-container">
        <Routes>
          <Route path="/" element={<HeroExperience ref={heroRef} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HeroExperience ref={heroRef} />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
