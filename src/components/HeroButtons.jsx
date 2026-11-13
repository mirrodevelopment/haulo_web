import React from 'react';
import { LayoutGrid, Rocket } from 'lucide-react';
import './HeroButtons.css';

export function HeroButtons({ onViewWork, onExplore }) {
  const handleViewWork = (e) => {
    if (onViewWork) {
      onViewWork(e);
    } else {
      window.__hauloScrollTo?.('work');
    }
  };

  const handleExplore = (e) => {
    if (onExplore) {
      onExplore(e);
    } else {
      window.__hauloScrollTo?.('contact');
    }
  };

  return (
    <div className="hero-buttons">

      {/* START A PROJECT (Primary Button) */}
      <button className="tech-btn primary-btn start-project-btn pink-btn" type="button" onClick={handleExplore}>
        {/* Purposeful Four-Side Corner Technical SVG Frame */}
        <svg className="tech-btn-frame" viewBox="-2 -2 232 48" fill="none" preserveAspectRatio="none" aria-hidden="true">
          {/* Solid capsule fill (#0F172A) */}
          <polygon className="btn-bg-polygon" points="11,1 216,1 227,12 227,31 214,43 11,43 1,33 1,11" fill="#0F172A" />

          {/* Top-left chamfer with notch */}
          <line x1="1" y1="11" x2="4" y2="8" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="7" y1="5" x2="11" y2="1" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="1" x2="216" y2="1" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Top-right chamfer and right edge */}
          <line x1="216" y1="1" x2="227" y2="12" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="227" y1="12" x2="227" y2="31" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bottom-right chamfer and bottom edge */}
          <line x1="227" y1="31" x2="214" y2="43" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="214" y1="43" x2="25" y2="43" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bottom-left border notch, bottom-left chamfer and left vertical edge */}
          <line x1="19" y1="43" x2="11" y2="43" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="43" x2="1" y2="33" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="1" y1="33" x2="1" y2="11" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Top-right floating reticle dot */}
          <circle cx="230" cy="1.5" r="1.3" fill="#00E5FF" />

          {/* Bottom-right vivid cyan technical accent wedge & expanding horizontal line */}
          <g className="btn-corner-accent">
            <polygon points="213.5,43 227,30 227,27 213.5,40" fill="#00E5FF" />
            <rect x="201" y="40" width="13.5" height="3" fill="#00E5FF" className="btn-accent-bar" />
          </g>

          {/* Icon compartment divider ticks & hairline */}
          <line x1="50" y1="1" x2="50" y2="4" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.2" />
          <line x1="50" y1="40" x2="50" y2="43" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.2" />
          <line x1="50" y1="7" x2="50" y2="37" stroke="#00E5FF" strokeWidth="1" className="btn-divider-line" pathLength="100" />
        </svg>

        <span className="btn-icon" aria-hidden="true">
          <Rocket size={16} strokeWidth={2.2} color="currentColor" />
        </span>

        <span className="btn-text">
          START A PROJECT
        </span>
      </button>


      {/* VIEW SERVICES (Secondary Button) */}
      <button className="tech-btn secondary-btn view-services-btn blue-btn" type="button" onClick={handleViewWork}>
        {/* Purposeful Four-Side Corner Technical SVG Frame */}
        <svg className="tech-btn-frame" viewBox="-2 -2 204 48" fill="none" preserveAspectRatio="none" aria-hidden="true">
          {/* Solid capsule fill (#FFFFFF) */}
          <polygon className="btn-bg-polygon" points="11,1 183,1 194,12 194,31 181,43 11,43 1,33 1,11" fill="#FFFFFF" />

          {/* Top-left chamfer with notch */}
          <line x1="1" y1="11" x2="4" y2="8" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="7" y1="5" x2="11" y2="1" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="1" x2="183" y2="1" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />

          {/* Top-right chamfer and right edge */}
          <line x1="183" y1="1" x2="194" y2="12" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="194" y1="12" x2="194" y2="31" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bottom-right chamfer and bottom edge */}
          <line x1="194" y1="31" x2="181" y2="43" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="181" y1="43" x2="25" y2="43" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bottom-left border notch, bottom-left chamfer and left vertical edge */}
          <line x1="19" y1="43" x2="11" y2="43" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="43" x2="1" y2="33" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="1" y1="33" x2="1" y2="11" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />

          {/* Top-right floating reticle dot */}
          <circle cx="197" cy="1.5" r="1.3" fill="#CBD5E1" />

          {/* Bottom-right cyan technical accent wedge & expanding horizontal line */}
          <g className="btn-corner-accent">
            <polygon points="180.5,43 194,30 194,27 180.5,40" fill="#0284C7" />
            <rect x="168" y="40" width="13.5" height="3" fill="#0284C7" className="btn-accent-bar" />
          </g>

          {/* Icon compartment divider ticks & hairline */}
          <line x1="50" y1="1" x2="50" y2="4" stroke="#CBD5E1" strokeWidth="1.2" />
          <line x1="50" y1="40" x2="50" y2="43" stroke="#CBD5E1" strokeWidth="1.2" />
          <line x1="50" y1="7" x2="50" y2="37" stroke="#0284C7" strokeWidth="1" className="btn-divider-line" pathLength="100" />
        </svg>

        <span className="btn-icon" aria-hidden="true">
          <LayoutGrid size={16} strokeWidth={2.2} color="currentColor" />
        </span>

        <span className="btn-text">
          VIEW SERVICES
        </span>
      </button>

    </div>
  );
}

export default HeroButtons;

