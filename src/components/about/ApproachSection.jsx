import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ApproachSection() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (stepsRef.current.length > 0) {
        gsap.fromTo(
          stepsRef.current,
          { autoAlpha: 0.15, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.25,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 50%',
              scrub: 0.5
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToSteps = (el) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  return (
    <section className="approach-section" ref={sectionRef}>
      <div className="approach-container">
        <span className="mono-tag">[ 13 / METHODOLOGY ]</span>
        <h2 className="section-title">ONE TEAM. ONE STANDARD.</h2>

        <div className="approach-steps-wrapper">
          <h3 ref={addToSteps} className="approach-step-line">
            UNDERSTAND BEFORE DESIGNING.
          </h3>
          <h3 ref={addToSteps} className="approach-step-line">
            DESIGN BEFORE BUILDING.
          </h3>
          <h3 ref={addToSteps} className="approach-step-line">
            BUILD BEFORE SCALING.
          </h3>
        </div>

        <p className="approach-body-copy">
          HAULO brings strategy, design, and engineering into the same conversation from start to finish.
        </p>
      </div>
    </section>
  );
}
