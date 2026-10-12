import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useLenis() {
  useEffect(() => {
    // Enable Lenis smooth scroll unless user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Ensure initial load and browser refresh ALWAYS start at top (scroll position 0)
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      ScrollTrigger.clearScrollMemory('manual');
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.35,
      touchMultiplier: 1.2,
      syncTouch: false
    });

    window.lenis = lenis;
    lenis.scrollTo(0, { immediate: true });

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Feed Lenis frame updates via GSAP ticker for frame-perfect sync
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      window.lenis = null;
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);
}
