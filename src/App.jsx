import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { Header } from "./components/Header";
import { LeftRail } from "./components/LeftRail";
import { RightRail } from "./components/RightRail";
import CinematicShowcase from "./components/CinematicShowcase";
import CustomCursor from "./components/CustomCursor";

function AppContent() {
  const leftRailRef = useRef(null);
  const rightRailRef = useRef(null);
  const introPassedRef = useRef(false);
  const [isDark, setIsDark] = useState(false);
  const [showChrome, setShowChrome] = useState(false);
  const [activeSection, setActiveSection] = useState("service");

  // Initialize Lenis smooth scroll synced with GSAP ScrollTrigger
  useLenis();

  useEffect(() => {
    const updateThemeAndProgress = (progress, scrollY) => {
      // Total timeline duration = 14.2s:
      // - 0s to 5.45s: Scene 0 Intro, Scene 1 Services Hero, Scene 2-5 3D Orbit & Card 3 (WHITE background) -> Light (isDark = false)
      // - 5.45s to 14.2s: Scene 6 Beyond, Scene 7 Projects, Scene 8 Gallery, Scene 9 Final (BLACK background) -> Dark (isDark = true)
      const t = progress * 14.2;
      const dark = t >= 6.60 || t < 0.18;

      setIsDark((prev) => (prev !== dark ? dark : prev));
      setActiveSection("service");

      // Header, LeftRail, and RightRail are NOT visible on the initial "HAULO SERVICE" intro screen
      // They smoothly fade in only when moving into the main showcase (t >= 0.40)
      if (t >= 0.40) {
        introPassedRef.current = true;
      }
      const visible = introPassedRef.current || t >= 0.40;
      setShowChrome((prev) => (prev !== visible ? visible : prev));

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
    const handleLenisScroll = ({ progress, scroll }) => {
      updateThemeAndProgress(progress, scroll);
    };

    if (window.__lenis) {
      window.__lenis.on("scroll", handleLenisScroll);
    }

    window.__onTimelineProgress = (progress) => {
      updateThemeAndProgress(progress);
    };

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (window.__lenis) {
        window.__lenis.off("scroll", handleLenisScroll);
      }
      delete window.__onTimelineProgress;
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <div
        className={`transition-opacity duration-700 ease-out ${
          showChrome ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Header isDark={isDark} activeSection={activeSection} />
        <LeftRail ref={leftRailRef} isDark={isDark} />
        <RightRail ref={rightRailRef} isDark={isDark} />
      </div>
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
