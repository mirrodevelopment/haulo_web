import React from 'react';

export function WorkFooter() {
  return (
    <footer className="work-footer" aria-label="Contact and Social Footer">
      <div className="work-footer-wrapper">
        {/* Innovation Heading */}
        <div className="work-footer-heading-box">
          <span className="work-footer-tag">NEXT HORIZON</span>
          <h4 className="work-footer-title">
            LET'S CREATE THE NEXT EXPERIENCE.
          </h4>
          <p className="work-footer-subtitle">
            HAVE AN IDEA? LET'S TURN IT INTO AN IMMERSIVE DIGITAL REALITY.
          </p>
        </div>

        {/* Signature 4-Corner Bracket Interactive Circular CTA */}
        <div className="work-cta-container">
          <a
            href="mailto:hello@haulo.design"
            className="work-cta-link"
            aria-label="Send Message to HAULO"
          >
            <div className="work-cta-brackets-wrapper">
              <span className="work-bracket b-tl">[</span>
              <span className="work-bracket b-tr">]</span>
              <span className="work-bracket b-bl">[</span>
              <span className="work-bracket b-br">]</span>

              {/* Concentric Double Circle */}
              <div className="work-cta-circle-outer">
                <div className="work-cta-circle-inner">
                  <p className="work-cta-text">
                    SEND<br />MESSAGE ↗
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Massive Low-Profile Social Links */}
        <div className="work-socials-row">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="work-social-link"
          >
            LINKEDIN
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="work-social-link"
          >
            INSTAGRAM
          </a>
          <a
            href="mailto:hello@haulo.design"
            className="work-social-link"
          >
            HELLO@HAULO.DESIGN
          </a>
        </div>

        {/* Bottom Technical Metadata */}
        <div className="work-footer-bottom">
          <p className="work-copyright">© HAULO 2026 // ALL RIGHTS RESERVED</p>
          <div className="work-status-badge">
            <span className="work-status-dot" />
            <span className="work-status-text">SYSTEM OPERATIONAL // VER. 2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
