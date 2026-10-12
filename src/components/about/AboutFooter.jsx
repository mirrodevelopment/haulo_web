import React from 'react';
import { Link } from 'react-router-dom';

export function AboutFooter() {
  return (
    <footer className="about-footer">
      <div className="about-footer-container">
        <div className="about-footer-top">
          <div className="footer-brand-col">
            <img src="/HAULO-LOGO.png" alt="HAULO" className="footer-logo-img" />
            <p className="footer-tagline">
              DESIGNING INTERACTIVE DIGITAL EXPERIENCES<br />
              WHERE CREATIVITY MEETS TECHNOLOGY
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-nav-title">DIRECTORY</span>
            <nav className="footer-links-grid">
              <Link to="/work" className="footer-link">Work</Link>
              <Link to="/#services" className="footer-link">Services</Link>
              <Link to="/#products" className="footer-link">Products</Link>
              <Link to="/#ailab" className="footer-link">AI Lab</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/#journal" className="footer-link">Journal</Link>
              <Link to="/#careers" className="footer-link">Careers</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="about-footer-bottom">
          <span className="footer-copy">© 2026 HAULO ARCHITECTURE & CREATIVE TECHNOLOGY</span>
          <span className="footer-meta">ALL RIGHTS RESERVED • LAT 12.9716° N, LON 77.5946° E</span>
        </div>
      </div>
    </footer>
  );
}
