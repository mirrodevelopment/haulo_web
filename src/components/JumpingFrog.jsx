import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * JumpingFrog Component
 *
 * Smoothly animates the cyber frog mech:
 * 1. Inter-Section Leap: Scroll-based 3D parabolic vault from Section 1 takeoff
 *    pad to Section 2 docked gantry pods.
 * 2. Inter-Pod Hopping: When activePodIndex changes (via pod click or frog click),
 *    the frog vaults with realistic spring physics across pods 01 -> 02 -> 03 -> 04 -> 01:
 *    - Anticipation crouch & launch
 *    - Direction-aware facing (turns left/right to face destination)
 *    - Aerodynamic rotational tilt in mid-flight
 *    - Dynamic parabolic apex elevation arc
 *    - Neon kinetic thruster glow
 *    - Touchdown impact squash & spring rebound
 */
export function JumpingFrog({ activePodIndex = 0, onSelectPod }) {
  const frogRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // References for cross-frame state
  const activePodRef = useRef(activePodIndex);
  activePodRef.current = activePodIndex;

  const onSelectPodRef = useRef(onSelectPod);
  onSelectPodRef.current = onSelectPod;

  // Inter-pod hop state
  const hopStateRef = useRef({
    isHopping: false,
    fromPod: 0,
    toPod: 0,
    startTime: 0,
    duration: 650,
    lastFacingDir: 1 // 1 for facing right, -1 for facing left
  });

  const currentPhysPodRef = useRef(activePodIndex);

  // Trigger hop when activePodIndex changes
  useEffect(() => {
    if (activePodIndex !== currentPhysPodRef.current) {
      const fromIdx = currentPhysPodRef.current;
      const toIdx = activePodIndex;

      const duration = 750;
      const dir = toIdx >= fromIdx ? 1 : -1;

      hopStateRef.current = {
        isHopping: true,
        fromPod: fromIdx,
        toPod: toIdx,
        startTime: performance.now(),
        duration,
        lastFacingDir: dir
      };
    }
  }, [activePodIndex]);

  useEffect(() => {
    let animId;
    const s2Init = document.getElementById('case-study-dock');
    const maxScrollInit = s2Init ? s2Init.offsetTop : window.innerHeight;
    const initialP = maxScrollInit > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScrollInit)) : 0;
    let smoothedProgress = initialP;
    let targetProgress = initialP;

    const onScroll = () => {
      const s2 = document.getElementById('case-study-dock');
      const maxScroll = s2 ? s2.offsetTop : window.innerHeight;
      if (maxScroll > 0) {
        targetProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      }
    };

    // Main animation physics render loop
    const render = (now) => {
      // 1. Smooth scroll progress interpolation (0 = Section 1, 1 = Section 2 docked)
      const diff = targetProgress - smoothedProgress;
      if (Math.abs(diff) < 0.008) {
        smoothedProgress = targetProgress;
      } else {
        smoothedProgress += diff * 0.32;
      }

      const p = smoothedProgress;
      const frog = frogRef.current;

      const el1 = document.getElementById('frog-anchor-section1');
      const r1 = el1 ? el1.getBoundingClientRect() : null;

      const podRects = [];
      for (let i = 0; i < 4; i++) {
        const podEl =
          document.getElementById(`frog-landing-pod-${i}`) ||
          (i === 0 ? document.getElementById('frog-landing-pod-target') : null);
        if (podEl) {
          const r = podEl.getBoundingClientRect();
          if (r.width > 0) {
            podRects[i] = r;
          }
        }
      }

      const hasRequiredAnchors = p < 0.94 ? (frog && r1) : (frog && (podRects[activePodRef.current] || podRects[0]));

      if (hasRequiredAnchors) {
        setIsReady(true);
        const hop = hopStateRef.current;
        const rTarget = podRects[activePodRef.current] || podRects[0] || r1;

        let screenX = 0;
        let screenY = 0;
        let currWidth = r1 ? r1.width : (podRects[0] ? podRects[0].width : 220);
        let rot = 0;
        let scaleX = 1;
        let scaleY = 1;
        let glowAlpha = 0;
        let hopArc = 0;

        if (p < 0.94 && r1) {
          // ==============================================================
          // 1. INTER-SECTION VAULT: Leaping between Section 1 & Section 2
          // ==============================================================
          const easeX = p * p * (3 - 2 * p);

          // Parabolic jump arc between sections
          const sectionJumpApex = Math.min(340, Math.max(180, window.innerHeight * 0.34));
          const arc = sectionJumpApex * 4 * p * (1 - p);

          screenX = r1.left + (rTarget.left - r1.left) * easeX;
          screenY = r1.top + (rTarget.top - r1.top) * p - arc;
          currWidth = r1.width + (rTarget.width - r1.width) * p;

          // Aerodynamic tilt & squash/stretch for inter-section vault
          if (p < 0.12) {
            const cp = p / 0.12;
            scaleX = 1 + 0.14 * Math.sin(cp * Math.PI);
            scaleY = 1 - 0.14 * Math.sin(cp * Math.PI);
            rot = -3 * Math.sin(cp * Math.PI);
            glowAlpha = 0;
          } else if (p < 0.45) {
            const lp = (p - 0.12) / 0.33;
            scaleX = 0.92;
            scaleY = 1.16;
            rot = -20 * (1 - lp * 0.4);
            glowAlpha = lp;
          } else if (p < 0.75) {
            const ap = (p - 0.45) / 0.3;
            scaleX = 1.03;
            scaleY = 1.03;
            rot = -10 + 26 * ap;
            glowAlpha = 1;
          } else if (p < 0.92) {
            const dp = (p - 0.75) / 0.17;
            scaleX = 0.95;
            scaleY = 1.1;
            rot = 16 * (1 - dp);
            glowAlpha = 1 - dp;
          } else {
            const ip = (p - 0.92) / 0.08;
            scaleX = 1 + 0.15 * Math.sin(ip * Math.PI);
            scaleY = 1 - 0.15 * Math.sin(ip * Math.PI);
            rot = 0;
            glowAlpha = 0;
          }
        } else {
          // ==============================================================
          // 2. DOCKED IN SECTION 2: Inter-Pod Hop across conduits
          // ==============================================================
          if (hop.isHopping) {
            const elapsed = (now - hop.startTime) / hop.duration;
            if (elapsed >= 1) {
              hop.isHopping = false;
              currentPhysPodRef.current = hop.toPod;
              const rFinal = podRects[hop.toPod] || podRects[0];
              screenX = rFinal.left;
              screenY = rFinal.top;
              currWidth = rFinal.width;
              rot = 0;
              scaleX = 1;
              scaleY = 1;
              glowAlpha = 0;
            } else {
              const t = Math.max(0, Math.min(1, elapsed));
              const rFrom = podRects[hop.fromPod] || podRects[0];
              const rTo = podRects[hop.toPod] || podRects[0];

              // Infinitely differentiable cosine ease for perfectly fluid travel
              const easeX = 0.5 * (1 - Math.cos(Math.PI * t));

              // True sinusoidal parabolic vault arc (zero jerk at takeoff and landing)
              const distPx = Math.abs(rTo.left - rFrom.left);
              const hopApex = Math.min(160, Math.max(90, distPx * 0.30));
              hopArc = hopApex * Math.sin(Math.PI * t);

              screenX = rFrom.left + (rTo.left - rFrom.left) * easeX;
              screenY = rFrom.top + (rTo.top - rFrom.top) * t - hopArc;
              currWidth = rFrom.width + (rTo.width - rFrom.width) * t;

              // Continuous aerodynamic pitch: tilts up on climb, levels at apex, points down on descent
              const dir = hop.lastFacingDir;
              rot = dir * (-16 * Math.sin(2 * Math.PI * t));

              // Continuous biomechanical stretch & touchdown cushion
              if (t < 0.82) {
                const stretch = Math.sin(Math.PI * (t / 0.82));
                scaleY = 1 + 0.12 * stretch;
                scaleX = 1 - 0.08 * stretch;
              } else {
                const cushion = Math.sin(Math.PI * ((t - 0.82) / 0.18));
                scaleY = 1 - 0.10 * cushion;
                scaleX = 1 + 0.08 * cushion;
              }

              // Smooth thruster neon flare rising to apex and dissolving before touchdown
              glowAlpha = Math.sin(Math.PI * t);
            }
          } else {
            // Resting peacefully on current pod
            const restingPod = currentPhysPodRef.current !== undefined ? currentPhysPodRef.current : activePodRef.current;
            const rCurrent = podRects[restingPod] || podRects[0];
            screenX = rCurrent.left;
            screenY = rCurrent.top;
            currWidth = rCurrent.width;
            rot = 0;
            scaleX = 1;
            scaleY = 1;
            glowAlpha = 0;
          }
        }

        // Hide/fade frog if user scrolls down into Section 3 corridor
        const s3 = document.getElementById('third-section');
        let frogOpacity = 1;
        if (s3) {
          const s3Rect = s3.getBoundingClientRect();
          if (s3Rect.top < window.innerHeight) {
            frogOpacity = Math.max(0, Math.min(1, s3Rect.top / (window.innerHeight * 0.5)));
          }
        }
        frog.style.opacity = `${frogOpacity}`;
        frog.style.pointerEvents = frogOpacity < 0.1 ? 'none' : 'auto';

        // Apply hardware-accelerated 3D transforms
        frog.style.transform = `translate3d(${screenX}px, ${screenY}px, 0px) rotate(${rot}deg) scale(${scaleX}, ${scaleY})`;
        frog.style.width = `${currWidth}px`;

        // Mid-air shadow projection & kinetic neon glow
        const shadowY = 14 + (hopArc || 0) * 0.14;
        const shadowBlur = 22 + (hopArc || 0) * 0.2;
        const shadowOpacity = 0.28;
        frog.style.filter = `drop-shadow(0 ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})) ${
          glowAlpha > 0.05
            ? `drop-shadow(0 0 ${24 * glowAlpha}px rgba(138, 201, 0, ${0.85 * glowAlpha}))`
            : ''
        }`;

        // Cross-fade images between backside posture (S1) and perched posture (S2)
        const frog1 = frog.querySelector('.frog-front-backside');
        const frog2 = frog.querySelector('.frog-landing-pod');
        if (frog1 && frog2) {
          if (p < 0.36) {
            frog1.style.opacity = '1';
            frog2.style.opacity = '0';
          } else if (p > 0.64) {
            frog1.style.opacity = '0';
            frog2.style.opacity = '1';
          } else {
            const blend = (p - 0.36) / 0.28;
            frog1.style.opacity = `${1 - blend}`;
            frog2.style.opacity = `${blend}`;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Click handler:
  // - In Section 1: scrolls down to Section 2
  // - In Section 2: leaps to the next pod 01 -> 02 -> 03 -> 04 -> 01
  const handleClick = useCallback(() => {
    const s2 = document.getElementById('case-study-dock');
    if (!s2) return;
    const isAtBottom = window.scrollY > s2.offsetTop * 0.45;

    if (!isAtBottom) {
      s2.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (onSelectPodRef.current) {
        const nextPod = ((currentPhysPodRef.current ?? 0) + 1) % 4;
        onSelectPodRef.current(nextPod);
      }
    }
  }, []);

  return (
    <div
      ref={frogRef}
      onClick={handleClick}
      className={`fixed top-0 left-0 z-40 cursor-pointer select-none transition-opacity duration-200 ${
        isReady ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        width: 0,
        visibility: isReady ? 'visible' : 'hidden',
        willChange: 'transform, width, filter',
        transformOrigin: '50% 85%'
      }}
      title="Click frog to leap to next pod"
      aria-label="Interactive Jumping Cyber Frog Mech"
    >
      <div className="relative w-full h-auto">
        {/* Posture 1: Cyber Frog in Section 1 */}
        <img
          src="/second-section/work-second-frog.png"
          alt="Cyber Frog (Takeoff)"
          className="frog-front-backside w-full h-auto object-contain transition-opacity duration-75 block"
        />

        {/* Posture 2: Front 3/4 Cyber Frog perched in Section 2 */}
        <img
          src="/second-section/work-second-frog.png"
          alt="Cyber Frog (Perched)"
          className="frog-landing-pod absolute inset-0 w-full h-auto object-contain transition-opacity duration-75 pointer-events-none opacity-0"
        />
      </div>
    </div>
  );
}

export default JumpingFrog;

