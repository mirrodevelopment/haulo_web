import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutSupporting() {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  const text = "HAULO designs, builds, and evolves digital products, software systems, and intelligent applications — bringing technology, design, and intelligence together from the first idea to the final system.";
  const words = text.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wordsRef.current.length > 0) {
        gsap.to(wordsRef.current, {
          color: '#050505',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.6
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToWords = (el) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  return (
    <section className="about-supporting-section" ref={containerRef}>
      <div className="about-supporting-container">
        <div className="supporting-mono-tag">[ 02 / POSITIONING STATEMENT ]</div>
        <p className="supporting-text">
          {words.map((word, idx) => (
            <span
              key={idx}
              ref={addToWords}
              className="supporting-word"
              style={{ color: 'rgba(5, 5, 5, 0.18)' }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
