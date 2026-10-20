import React, { useRef, useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { LeftRail } from './components/LeftRail';
import { RightRail } from './components/RightRail';
import RibbonCarousel from './components/RibbonCarousel';
import SecondSection from './components/SecondSection';
import ThirdSection from './components/ThirdSection';
import FourthSection from './components/FourthSection';
import LastSection from './components/LastSection';
import JumpingFrog from './components/JumpingFrog';

function MainLayout() {
  const [activePodIndex, setActivePodIndex] = React.useState(0);
  const leftRailRef = useRef(null);
  const rightRailRef = useRef(null);
  const counterRef = useRef(null);

  const activePodRef = useRef(activePodIndex);
  activePodRef.current = activePodIndex;

  const isProgrammaticRef = useRef(false);
  const programmaticTimerRef = useRef(null);

  const handleSelectPod = useCallback((idx) => {
    setActivePodIndex(idx);
    isProgrammaticRef.current = true;
    if (programmaticTimerRef.current) {
      clearTimeout(programmaticTimerRef.current);
    }
    programmaticTimerRef.current = setTimeout(() => {
      isProgrammaticRef.current = false;
    }, 850);

    const s2 = document.getElementById('case-study-dock');
    if (s2) {
      const s2Top = s2.offsetTop;
      window.scrollTo({
        top: s2Top + idx * window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleProgress = useCallback((progress) => {
    if (leftRailRef.current) {
      leftRailRef.current.updateProgress(progress);
    }
    if (counterRef.current) {
      const idx = Math.min(6, Math.max(1, Math.floor(progress * 6) + 1));
      counterRef.current.textContent = `(0${idx}/06)`;
    }
  }, []);

  // Scroll-by-scroll pod leaping controller
  useEffect(() => {
    let isThrottled = false;
    let touchStartY = 0;

    const onWheel = (e) => {
      const s2 = document.getElementById('case-study-dock');
      if (!s2) return;
      const s2Top = s2.offsetTop;
      const scrollY = window.scrollY;

      // Inside Section 2 zone: intercept scroll gestures to jump box by box
      if (scrollY >= s2Top - 80) {
        if (Math.abs(e.deltaY) > 18) {
          if (!isThrottled) {
            const current = activePodRef.current;
            if (e.deltaY > 0) {
              // Scroll down -> jump to next pod (01 -> 02 -> 03 -> 04)
              if (current < 3) {
                isThrottled = true;
                const next = current + 1;
                handleSelectPod(next);
                setTimeout(() => {
                  isThrottled = false;
                }, 800);
                e.preventDefault();
              } else {
                // At Pod 04: allow scroll down into Section 3
                const s3 = document.getElementById('third-section');
                if (s3 && scrollY < s3.offsetTop) {
                  isThrottled = true;
                  s3.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    isThrottled = false;
                  }, 800);
                  e.preventDefault();
                }
              }
            } else {
              // Scroll up -> jump to previous pod (04 -> 03 -> 02 -> 01)
              if (current > 0) {
                isThrottled = true;
                const prev = current - 1;
                handleSelectPod(prev);
                setTimeout(() => {
                  isThrottled = false;
                }, 800);
                e.preventDefault();
              } else {
                // At 01 Brief scrolling up -> return to Section 1 hero
                isThrottled = true;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                  isThrottled = false;
                }, 800);
                e.preventDefault();
              }
            }
          }
        }
      }
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const s2 = document.getElementById('case-study-dock');
      if (!s2) return;
      const s2Top = s2.offsetTop;
      const scrollY = window.scrollY;

      if (scrollY >= s2Top - 80) {
        const currentY = e.touches[0].clientY;
        const diff = touchStartY - currentY;
        if (Math.abs(diff) > 35) {
          if (!isThrottled) {
            const current = activePodRef.current;
            if (diff > 0) {
              if (current < 3) {
                isThrottled = true;
                handleSelectPod(current + 1);
                setTimeout(() => {
                  isThrottled = false;
                }, 800);
                e.preventDefault();
              } else {
                const s3 = document.getElementById('third-section');
                if (s3 && scrollY < s3.offsetTop) {
                  isThrottled = true;
                  s3.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    isThrottled = false;
                  }, 800);
                  e.preventDefault();
                }
              }
            } else {
              if (current > 0) {
                isThrottled = true;
                handleSelectPod(current - 1);
                setTimeout(() => {
                  isThrottled = false;
                }, 800);
                e.preventDefault();
              } else {
                isThrottled = true;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                  isThrottled = false;
                }, 800);
                e.preventDefault();
              }
            }
            touchStartY = currentY;
          }
        }
      }
    };

    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const scrollPct = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      if (rightRailRef.current) {
        rightRailRef.current.updateProgress(scrollPct);
      }
    };

    const onScroll = () => {
      updateScrollProgress();

      if (isProgrammaticRef.current) return;
      const s2 = document.getElementById('case-study-dock');
      if (!s2) return;
      const s2Top = s2.offsetTop;
      const scrollY = window.scrollY;

      if (scrollY >= s2Top - 50) {
        const stepProgress = (scrollY - s2Top) / window.innerHeight;
        const stepIdx = Math.min(3, Math.max(0, Math.round(stepProgress)));
        setActivePodIndex((prev) => (prev !== stepIdx ? stepIdx : prev));
      }
    };

    // Initialize right rail percentage on mount
    updateScrollProgress();

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleSelectPod]);

  useEffect(() => {
    if (window.location.hash === '#second') {
      setTimeout(() => {
        document.getElementById('case-study-dock')?.scrollIntoView({ behavior: 'instant' });
      }, 300);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white select-none">
      {/* Global Navigation Header */}
      <Header />

      {/* Global Sticky HUD Nav Rails (single unified rail system across both sections) */}
      <LeftRail ref={leftRailRef} />
      <RightRail ref={rightRailRef} />

      {/* ======================================================== */}
      {/* SECTION 1: Selected Work 3D Ribbon Carousel Hero         */}
      {/* ======================================================== */}
      <section className="relative w-full h-screen overflow-hidden bg-white" aria-label="Selected Work Carousel">
        {/* Studio Lighting Background Layers */}
        <div
          className="absolute inset-0 bg-white z-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[130vw] h-[70vh] bg-white" />
        </div>

        {/* Hero Headline Section (responsive stacking on mobile/tablet) */}
        <div
          className="absolute inset-0 pointer-events-none z-30"
          aria-label="Selected Work Header"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between px-4 sm:px-8 md:px-14 lg:px-20 pt-16 sm:pt-20 md:pt-24 lg:pt-28 gap-1.5 md:gap-0">
            <div className="flex flex-col">
              <span
                ref={counterRef}
                className="font-mono text-xs sm:text-sm font-semibold tracking-[0.16em] text-[#888d96] mb-1 sm:mb-1.5 uppercase"
              >
                (01/06)
              </span>
              <h1 className="font-display text-sm sm:text-lg md:text-xl lg:text-[25px] uppercase tracking-wider text-[#08090b] font-medium leading-tight">
                SELECTED WORK
              </h1>
            </div>

            <div className="text-left md:text-right max-w-xs sm:max-w-sm md:max-w-md">
              <p className="font-mono text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-widest text-[#555a64] uppercase leading-relaxed">
                A CURATED STREAM OF DIGITAL WORLDS,<br className="hidden sm:inline" />
                BRANDS, INTERFACES AND INTELLIGENT SYSTEMS.
              </p>
            </div>
          </div>
        </div>

        {/* Cyber Frog Takeoff Anchor in Section 1 (positioned on the left side) */}
        <div
          id="frog-anchor-section1"
          className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[4vw] lg:left-[5.5vw] bottom-5 sm:bottom-6 md:bottom-4 w-[52vw] max-w-[230px] sm:w-52 md:w-48 lg:w-[230px] z-20 pointer-events-none opacity-0 flex flex-col items-center justify-end"
          aria-hidden="true"
        >
          <img
            src="/second-section/work-second-frog.png"
            alt="Frog Mech Anchor"
            className="w-full h-auto max-h-36 sm:max-h-40 md:max-h-36 lg:max-h-44 object-contain"
          />
        </div>

        {/* 3D WebGL Ribbon Carousel */}
        <RibbonCarousel onProgress={handleProgress} />
      </section>

      {/* ======================================================== */}
      {/* TRANSITION GAP: Generous breathing room between sections */}
      {/* ======================================================== */}
      <div className="w-full h-[28vh] sm:h-[36vh] pointer-events-none" aria-hidden="true" />

      {/* ======================================================== */}
      {/* SECTION 2: Robotic Cyber Gantry & Docked Case Study     */}
      {/* ======================================================== */}
      <SecondSection
        activePodIndex={activePodIndex}
        onSelectPod={handleSelectPod}
      />

      {/* ======================================================== */}
      {/* SECTION 3: Sci-Fi Corridor Gallery                       */}
      {/* ======================================================== */}
      {/* <ThirdSection /> */}

      {/* ======================================================== */}
      {/* SECTION 4: Cybernetic Cockpit Command View               */}
      {/* ======================================================== */}
      {/* <FourthSection /> */}

      {/* ======================================================== */}
      {/* SECTION 5: HAULO Futuristic Contact Page                 */}
      {/* ======================================================== */}
      {/* <LastSection /> */}

      {/* ======================================================== */}
      {/* Dynamic Animated Jumping Frog Mech                        */}
      {/* Smoothly leaps between sections and across pods on click  */}
      {/* ======================================================== */}
      <JumpingFrog
        activePodIndex={activePodIndex}
        onSelectPod={handleSelectPod}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
