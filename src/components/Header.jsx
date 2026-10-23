import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import hauloLogoText from "../assets/HAULO-LOGO-TEXT.png";

export function Header({ isDark = false, activeSection = "service" }) {
  const headerRef = useRef(null);

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

  const getNavLinkClass = (sectionKey) => {
    // Only SERVICE is active across all sections because the entire showcase is the service page
    const isActive = sectionKey === 'service';
    const baseClass = "headerNavLink font-mono text-[11px] sm:text-xs md:text-[13px] tracking-[0.06em] font-semibold transition-all duration-300 py-1.5 px-1 cursor-pointer select-none";

    if (isActive) {
      return `${baseClass} ${isDark ? 'text-white opacity-100 font-bold' : 'text-black opacity-100 font-bold'}`;
    }
    return `${baseClass} ${isDark ? 'text-white/60 hover:text-white hover:opacity-100' : 'text-black/60 hover:text-black hover:opacity-100'}`;
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 h-16 sm:h-20 px-6 sm:px-10 md:px-11 flex items-center justify-between z-[100] pointer-events-none pt-[env(safe-area-inset-top,0)] transition-colors duration-300"
    >
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.__hauloScrollTo?.('top');
        }}
        className="flex items-center transition-transform duration-200 pointer-events-auto hover:opacity-85 cursor-pointer"
        aria-label="HAULO Home"
      >
        <img
          src={hauloLogoText}
          alt="HAULO"
          className="h-[20px] sm:h-[22px] md:h-[24px] w-auto object-contain transition-all duration-300"
          style={{
            filter: isDark ? 'brightness(0) invert(1)' : 'none'
          }}
        />
      </a>

      <nav className="flex items-center gap-1.5 sm:gap-3 md:gap-5 pointer-events-auto">
        <a
          href="#service"
          onClick={(e) => {
            e.preventDefault();
            window.__hauloScrollTo?.('service');
          }}
          className={getNavLinkClass('service')}
          style={{ fontWeight: 600 }}
        >
          [ SERVICE ]
        </a>
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            window.__hauloScrollTo?.('work');
          }}
          className={getNavLinkClass('work')}
          style={{ fontWeight: 600 }}
        >
          [ WORK ]
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            window.__hauloScrollTo?.('contact');
          }}
          className={getNavLinkClass('contact')}
          style={{ fontWeight: 600 }}
        >
          [ CONTACT ]
        </a>
      </nav>
    </header>
  );
}

export default Header;
