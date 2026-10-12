import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function AboutHero() {
  const containerRef = useRef(null);
  const headlineLinesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineLinesRef.current.length > 0) {
        gsap.fromTo(
          headlineLinesRef.current,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.09,
            ease: 'power4.out',
            delay: 0.3
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToLines = (el) => {
    if (el && !headlineLinesRef.current.includes(el)) {
      headlineLinesRef.current.push(el);
    }
  };

  return (
    <section className="about-hero-section" ref={containerRef}>
      <div className="about-hero-container">
        {/* Technical Mono Badge */}
        <div className="about-mono-badge">
          <span className="mono-dot" />
          <span>ABOUT HAULO / 01</span>
        </div>

        {/* Refined Editorial Headline Matching Image 1 */}
        <h1 className="about-hero-headline">
          <span className="hero-line-mask">
            <span ref={addToLines} className="hero-line-inner">
              WE THINK, <span className="hero-word-spacer" /> DESIGN,
            </span>
          </span>
          <span className="hero-line-mask">
            <span ref={addToLines} className="hero-line-inner hero-line-offset-1">
              AND BUILD <span className="hero-word-spacer-wide" /> TECHNOLOGY —
            </span>
          </span>
          <span className="hero-line-mask">
            <span ref={addToLines} className="hero-line-inner">
              TOGETHER, <span className="hero-word-spacer" /> NOT IN
            </span>
          </span>
          <span className="hero-line-mask">
            <span ref={addToLines} className="hero-line-inner hero-line-offset-2">
              SEQUENCE.
            </span>
          </span>
        </h1>

        {/* Editorial Subtext (Positioned bottom right like Image 1) */}
        <div className="about-hero-bottom-bar">
          <p className="about-hero-subcopy">
            HAULO designs, builds, and evolves digital products, software systems, and intelligent applications — bringing technology, design, and intelligence together from the first idea to the final system.
          </p>
        </div>
      </div>
    </section>
  );
}
