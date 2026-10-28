import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export function AboutHeader() {
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, []);

  const isAbout = location.pathname === '/about';
  const isWork = location.pathname === '/work';
  const isContact = location.pathname === '/contact';

  return (
    <header className="about-header" ref={headerRef}>
      <Link to="/" className="header-brand" aria-label="HAULO Home">
        <img src="/HAULO-LOGO.png" alt="HAULO" className="header-logo-img" />
      </Link>
      <nav className="header-nav">
        <Link
          to="/work"
          className={`nav-link ${isWork ? 'nav-link-active' : ''}`}
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 600 }}
        >
          [ WORK ]
        </Link>
        <Link
          to="/about"
          className={`nav-link ${isAbout ? 'nav-link-active' : ''}`}
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 600 }}
        >
          [ ABOUT ]
        </Link>
        <Link
          to="/contact"
          className={`nav-link ${isContact ? 'nav-link-active' : ''}`}
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 600 }}
        >
          [ CONTACT ]
        </Link>
      </nav>
    </header>
  );
}
