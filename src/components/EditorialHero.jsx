import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef
} from 'react';
import { gsap } from 'gsap';
import '../styles/hero-section.css';

export const EditorialHero = forwardRef(function EditorialHero(props, ref) {
  const { deferIntro = false } = props;
  const rootRef = useRef(null);
  const decoRef = useRef(null);
  const introTlRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      playIntro() {
        if (!deferIntro && introTlRef.current) introTlRef.current.play(0);
      }
    }),
    [deferIntro]
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const root = rootRef.current;
      const headlineLines = root
        ? root.querySelectorAll('.haulo-hero__line')
        : [];
      const frogEl = root ? root.querySelector('.haulo-hero__frog') : null;

      const tl = gsap.timeline({ paused: true });

      tl.from(headlineLines, {
        autoAlpha: 0,
        yPercent: 60,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08
      }, 0.05);

      tl.from(frogEl, {
        autoAlpha: 0,
        y: 30,
        scale: 0.965,
        transformOrigin: '50% 90%',
        duration: 1,
        ease: 'power3.out'
      }, 0.32);

      if (decoRef.current) {
        tl.from(decoRef.current, {
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power2.out'
        }, 0.65);
      }

      introTlRef.current = tl;

      if (!deferIntro) {
        tl.play(0);
      } else {
        tl.pause(0);
        const targets = [headlineLines, frogEl, decoRef.current].filter(Boolean);
        if (targets.length) {
          gsap.set(targets, { autoAlpha: 1, yPercent: 0, y: 0, scale: 1 });
        }
      }
    }, rootRef);

    return () => {
      introTlRef.current = null;
      ctx.revert();
    };
  }, [deferIntro]);

  return (
    <section
      className="haulo-hero"
      ref={rootRef}
      aria-label="HAULO — digital, physical and intelligent systems"
    >
      {/* LEFT — MAIN HEADLINE */}
      <div className="haulo-hero__copy">
        <h1 className="haulo-hero__headline">
          <span className="haulo-hero__line">WE TURN BOLD IDEAS</span>
          <span className="haulo-hero__line">INTO INTELLIGENT SYSTEMS.</span>
          <span className="haulo-hero__gap" aria-hidden="true" />
          <span className="haulo-hero__line">DESIGNED TO THINK.</span>
          <span className="haulo-hero__line">BUILT TO EVOLVE.</span>
        </h1>
      </div>

      {/* RIGHT — EXISTING MECH FROG ON THE FLOOR */}
      <div className="haulo-hero__frog">
        <div className="haulo-hero__frog-shadow" aria-hidden="true" />
        <img
          className="haulo-hero__frog-img"
          src="/Frog_Img/Frog_Mech_rotated.png"
          alt="HAULO mech frog — digital, physical and intelligent systems"
          draggable={false}
        />
      </div>

      {/* BOTTOM TECHNICAL DECORATION */}
      {/* <div className="haulo-hero__deco" ref={decoRef} aria-hidden="true">
        <span className="haulo-hero__slashes">/////</span>
        <span className="haulo-hero__rule" />
        <span className="haulo-hero__seg haulo-hero__seg--lime" />
        <span className="haulo-hero__seg haulo-hero__seg--purple" />
        <span className="haulo-hero__dots" />
        <span className="haulo-hero__plus" />
      </div> */}
    </section>
  );
});