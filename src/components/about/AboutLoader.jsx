import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function AboutLoader({ onComplete }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const knobRef = useRef(null);
  const numberRef = useRef(null);

  useLayoutEffect(() => {
    // Lock scroll during loading
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const container = containerRef.current;
    const track = trackRef.current;
    const knob = knobRef.current;
    const numberEl = numberRef.current;

    if (!container || !track || !knob || !numberEl) return;

    gsap.set(knob, { yPercent: -50, top: '50%' });
    const setKnobX = gsap.quickSetter(knob, 'x', 'px');

    function calculateMaxTravel() {
      if (!track || !knob) return 0;
      const trackRect = track.getBoundingClientRect();
      const knobRect = knob.getBoundingClientRect();
      const knobStyles = window.getComputedStyle(knob);
      const padLeft = parseFloat(knobStyles.left) || 6;
      const padRight = padLeft;
      const travel = trackRect.width - knobRect.width - (padLeft + padRight);
      return Math.max(0, travel);
    }

    const progressObj = { value: 0 };
    let lastInt = 0;

    const handleResize = () => {
      const max = calculateMaxTravel();
      const posX = (progressObj.value / 100) * max;
      setKnobX(Math.max(0, Math.min(max, posX)));
    };
    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Smooth fade-out of the loading screen
          gsap.to(container, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            delay: 0.12,
            onComplete: () => {
              document.documentElement.style.overflow = '';
              document.body.style.overflow = '';
              if (onComplete) onComplete();
            }
          });
        }
      });

      // Snappy, premium 0% -> 100% loading progression
      tl.to(progressObj, {
        keyframes: [
          { value: 22, duration: 0.32, ease: 'power1.in' },
          { value: 58, duration: 0.42, ease: 'power1.out' },
          { value: 86, duration: 0.35, ease: 'power2.inOut' },
          { value: 100, duration: 0.28, ease: 'power2.out' }
        ],
        onUpdate: () => {
          const currentInt = Math.round(progressObj.value);
          if (currentInt !== lastInt) {
            lastInt = currentInt;
            numberEl.textContent = `${currentInt}%`;
          }
          const max = calculateMaxTravel();
          const posX = (progressObj.value / 100) * max;
          setKnobX(Math.max(0, Math.min(max, posX)));
        }
      });
    }, container);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      className="splash-container"
      ref={containerRef}
      role="progressbar"
      aria-label="Loading HAULO About"
      style={{ zIndex: 999999 }}
    >
      <div className="splash-center-stage">
        <div className="splash-loading-row">
          <h2 className="splash-loading-label">LOADING</h2>

          <div className="splash-progress-track" ref={trackRef}>
            <div className="splash-progress-knob" ref={knobRef} />
          </div>

          <div className="splash-progress-number" ref={numberRef}>
            0%
          </div>
        </div>
      </div>
    </div>
  );
}
