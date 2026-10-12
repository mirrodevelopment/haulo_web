import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function HeroButtons({ onViewWork, onExplore }) {
  return (
    <div className="hero-buttons">

      {/* VIEW WORK */}
      <button className="tech-btn blue-btn" type="button" onClick={onViewWork}>
        {/* Purposeful Four-Side Corner Technical SVG Frame */}
        <svg className="tech-btn-frame" viewBox="-2 -2 204 48" fill="none" preserveAspectRatio="none" aria-hidden="true">
          {/* Solid capsule fill */}
          <polygon points="11,1 183,1 194,12 194,31 181,43 11,43 1,33 1,11" fill="rgba(255, 255, 255, 0.98)" />

          {/* Top-left chamfer with notch */}
          <line x1="1" y1="11" x2="4" y2="8" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="7" y1="5" x2="11" y2="1" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="1" x2="183" y2="1" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />

          {/* Top-right chamfer and right edge */}
          <line x1="183" y1="1" x2="194" y2="12" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="194" y1="12" x2="194" y2="31" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bottom-right chamfer and bottom edge */}
          <line x1="194" y1="31" x2="181" y2="43" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="181" y1="43" x2="25" y2="43" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bottom-left border notch, bottom-left chamfer and left vertical edge */}
          <line x1="19" y1="43" x2="11" y2="43" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="43" x2="1" y2="33" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="1" y1="33" x2="1" y2="11" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />

          {/* Top-right floating reticle dot */}
          <circle cx="197" cy="1.5" r="1.3" fill="#111111" />

          {/* Bottom-right cyan technical accent wedge */}
          <polygon points="168,43 181,43 194,30 194,24 180.5,36.5 168,36.5" fill="#20aef3" className="btn-corner-accent" />

          {/* Icon compartment divider ticks & hairline */}
          <line x1="44" y1="1" x2="44" y2="4" stroke="#111111" strokeWidth="1.2" />
          <line x1="44" y1="40" x2="44" y2="43" stroke="#111111" strokeWidth="1.2" />
          <line x1="44" y1="7" x2="44" y2="37" stroke="rgba(0, 0, 0, 0.12)" strokeWidth="1" />
        </svg>

        <span className="btn-icon" aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={2.4} color="#20aef3" />
        </span>

        <span className="btn-text">
          VIEW WORK
        </span>
      </button>


      {/* EXPLORE CAPABILITIES */}
      <button className="tech-btn pink-btn" type="button" onClick={onExplore}>
        {/* Purposeful Four-Side Corner Technical SVG Frame */}
        <svg className="tech-btn-frame" viewBox="-2 -2 237 48" fill="none" preserveAspectRatio="none" aria-hidden="true">
          {/* Solid capsule fill */}
          <polygon points="11,1 216,1 227,12 227,31 214,43 11,43 1,33 1,11" fill="rgba(255, 255, 255, 0.98)" />

          {/* Top-left chamfer with notch */}
          <line x1="1" y1="11" x2="4" y2="8" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="7" y1="5" x2="11" y2="1" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="1" x2="216" y2="1" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />

          {/* Top-right chamfer and right edge */}
          <line x1="216" y1="1" x2="227" y2="12" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="227" y1="12" x2="227" y2="31" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bottom-right chamfer and bottom edge */}
          <line x1="227" y1="31" x2="214" y2="43" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="214" y1="43" x2="25" y2="43" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bottom-left border notch, bottom-left chamfer and left vertical edge */}
          <line x1="19" y1="43" x2="11" y2="43" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="43" x2="1" y2="33" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="1" y1="33" x2="1" y2="11" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />

          {/* Top-right floating reticle dot */}
          <circle cx="230" cy="1.5" r="1.3" fill="#111111" />

          {/* Bottom-right magenta technical accent wedge */}
          <polygon points="201,43 214,43 227,30 227,24 213.5,36.5 201,36.5" fill="#d64cff" className="btn-corner-accent" />

          {/* Icon compartment divider ticks & hairline */}
          <line x1="44" y1="1" x2="44" y2="4" stroke="#111111" strokeWidth="1.2" />
          <line x1="44" y1="40" x2="44" y2="43" stroke="#111111" strokeWidth="1.2" />
          <line x1="44" y1="7" x2="44" y2="37" stroke="rgba(0, 0, 0, 0.12)" strokeWidth="1" />
        </svg>

        <span className="btn-icon grid-icon" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="#d64cff" aria-hidden="true">
            <circle cx="2.5" cy="2.5" r="1.3" />
            <circle cx="7.5" cy="2.5" r="1.3" />
            <circle cx="12.5" cy="2.5" r="1.3" />
            <circle cx="2.5" cy="7.5" r="1.3" />
            <circle cx="7.5" cy="7.5" r="1.3" />
            <circle cx="12.5" cy="7.5" r="1.3" />
            <circle cx="2.5" cy="12.5" r="1.3" />
            <circle cx="7.5" cy="12.5" r="1.3" />
            <circle cx="12.5" cy="12.5" r="1.3" />
          </svg>
        </span>

        <span className="btn-text">
          EXPLORE CAPABILITIES
        </span>
      </button>

    </div>
  );
}
