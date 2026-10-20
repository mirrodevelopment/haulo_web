import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { Header } from "./components/Header";
import { LeftRail } from "./components/LeftRail";
import { RightRail } from "./components/RightRail";
import CinematicShowcase from "./components/CinematicShowcase";

function AppContent() {
  const leftRailRef = useRef(null);
  const rightRailRef = useRef(null);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("service");

  // Initialize Lenis smooth scroll synced with GSAP ScrollTrigger
  useLenis();

  useEffect(() => {
    const updateThemeAndProgress = (progress, scrollY) => {
      // Total timeline duration = 13.6s:
      // - 0s to 4.85s (0% to ~35.6%): Scene 0 Intro, Scene 1 Services Hero, Scene 2-5 3D Orbit (WHITE background) -> Light (isDark = false)
      // - 4.85s to 13.6s (~35.6% to 100%): Scene 6 Beyond, Scene 7 Projects, Scene 8 Gallery, Scene 9 Final (BLACK background) -> Dark (isDark = true)
      const t = progress * 13.6;
      const dark = t >= 4.85;

      setIsDark((prev) => (prev !== dark ? dark : prev));
      setActiveSection("service");

      rightRailRef.current?.updateProgress?.(progress);
      leftRailRef.current?.updateProgress?.(progress);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      updateThemeAndProgress(progress, scrollY);
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (window.__lenis) {
      window.__lenis.on("scroll", ({ progress, scroll }) => {
        updateThemeAndProgress(progress, scroll);
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header isDark={isDark} activeSection={activeSection} />
      <LeftRail ref={leftRailRef} isDark={isDark} />
      <RightRail ref={rightRailRef} isDark={isDark} />
      <main>
        {/* Main Single-Stage Continuous Cinematic Reel Showcase (900vh height + 100dvh sticky stage) */}
        <CinematicShowcase />
      </main>
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
