import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.25,
      infinite: false,
      autoResize: true
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    window.__lenis = lenis;

    return () => {
      window.__lenis = null;
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);
}
