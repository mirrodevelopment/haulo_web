import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Initial page-load header entrance animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        {
          autoAlpha: 0,
          y: -14
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }
  }, []);

  // In this work-page application, [ WORK ] is the active page
  const isWork = true;
  const isService = false;
  const isContact = false;

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 h-16 sm:h-20 px-6 sm:px-10 md:px-11 flex items-center justify-between z-50 pointer-events-none pt-[env(safe-area-inset-top,0)] transition-colors duration-300"
    >
      <Link
        to="/"
        className="flex items-center transition-transform duration-200 pointer-events-auto hover:opacity-85 cursor-pointer"
        aria-label="HAULO Home"
      >
        <img
          src="/HAULO-LOGO.png"
          alt="HAULO"
          className="h-[18px] sm:h-[20px] md:h-[22px] w-auto object-contain transition-all duration-300"
        />
      </Link>

      <nav className="flex items-center gap-1.5 sm:gap-3 md:gap-5 pointer-events-auto">
        <Link
          to="/service"
          className={`font-mono text-[11px] sm:text-xs md:text-[13px] tracking-[0.14em] font-semibold transition-all duration-300 py-1.5 px-1 cursor-pointer select-none ${
            isService ? 'text-black opacity-100 font-bold' : 'text-black/60 hover:text-black hover:opacity-100'
          }`}
        >
          [ SERVICE ]
        </Link>
        <Link
          to="/work"
          className={`font-mono text-[11px] sm:text-xs md:text-[13px] tracking-[0.14em] font-semibold transition-all duration-300 py-1.5 px-1 cursor-pointer select-none ${
            isWork ? 'text-black opacity-100 font-bold' : 'text-black/60 hover:text-black hover:opacity-100'
          }`}
        >
          [ WORK ]
        </Link>
        <Link
          to="/contact"
          className={`font-mono text-[11px] sm:text-xs md:text-[13px] tracking-[0.14em] font-semibold transition-all duration-300 py-1.5 px-1 cursor-pointer select-none ${
            isContact ? 'text-black opacity-100 font-bold' : 'text-black/60 hover:text-black hover:opacity-100'
          }`}
        >
          [ CONTACT ]
        </Link>
      </nav>
    </header>
  );
}
