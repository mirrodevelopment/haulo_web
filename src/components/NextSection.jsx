import React from 'react';
import { Link } from 'react-router-dom';
import { SPACE_ITEMS } from '../data/projects';

// Calibrated bounding boxes for the 3D-rendered right-hand screen bezel
const BUTTON_COORDS = [
  null, // 00: intro ring (no screen bezel on ring; uses intro side card)
  { left: '75.8%', top: '56.5%', width: '14.8%', height: '12.0%' }, // 01 Theory of Bloom
  { left: '75.8%', top: '56.5%', width: '14.8%', height: '12.0%' }, // 02 Stakor
  { left: '75.8%', top: '58.5%', width: '14.8%', height: '12.0%' }, // 03 AWKN
  { left: '77.8%', top: '54.5%', width: '17.5%', height: '12.9%' }, // 04 Truly Bare
];

/**
 * NextSection - 3D Continuous Space Conveyor World
 * Renders the 5 space mech rings along the 3D spline conveyor trajectory.
 * Eliminates discrete page jumps and enables seamless continuous 3D scrolling.
 */
export function NextSection({
  stageRef,
  ringRefs,
  cylinderRefs,
  badgeRefs,
  onRingMouseEnter,
  onRingMouseLeave,
  // Backwards compatibility props
  space0Ref,
  space1Ref,
  space2Ref,
  space3Ref,
  space4Ref,
}) {
  return (
    <div className="portfolio-world space-portfolio-world" ref={stageRef}>
      <div className="portfolio-ring-track space-portfolio-track">
        {SPACE_ITEMS.map((item, index) => {
          const isIntro = !!item.isIntro;
          return (
            <div
              key={item.id}
              className={`project-ring-track-item space-ring-item ${isIntro ? 'space-ring-item--intro' : ''}`}
              ref={(el) => {
                if (ringRefs && ringRefs.current) ringRefs.current[index] = el;
                // Wire back to legacy refs if provided
                if (index === 0 && space0Ref) { if (typeof space0Ref === 'function') space0Ref(el); else space0Ref.current = el; }
                if (index === 1 && space1Ref) { if (typeof space1Ref === 'function') space1Ref(el); else space1Ref.current = el; }
                if (index === 2 && space2Ref) { if (typeof space2Ref === 'function') space2Ref(el); else space2Ref.current = el; }
                if (index === 3 && space3Ref) { if (typeof space3Ref === 'function') space3Ref(el); else space3Ref.current = el; }
                if (index === 4 && space4Ref) { if (typeof space4Ref === 'function') space4Ref(el); else space4Ref.current = el; }
              }}
              onMouseEnter={() => onRingMouseEnter && onRingMouseEnter(index)}
              onMouseLeave={() => onRingMouseLeave && onRingMouseLeave(index)}
            >
              {/* 3D Cylindrical Solid Body (Rotates in 3D perspective) */}
              <div
                className="ring-cylinder space-ring-cylinder"
                ref={(el) => {
                  if (cylinderRefs && cylinderRefs.current) cylinderRefs.current[index] = el;
                }}
              >
                {isIntro ? (
                  <div className="space-intro-split">
                    <div className="space-intro-mech-box">
                      <img
                        className="space-intro-mech-img"
                        src={item.image}
                        alt="HAULO Space Mech Ring"
                        draggable={false}
                      />
                    </div>
                    <div className="next-portfolio-box next-portfolio-box--featured">
                      <div className="statement-header-line">
                        <span className="statement-label">+ PORTFOLIO</span>
                      </div>
                      <h2 className="next-statement-title">
                        BROWSE OUR<br />PORTFOLIO
                      </h2>
                      <p className="next-statement-desc">
                        Explore how we turn ideas into intelligent systems that inspire, engage, and create real impact.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={`space-ring-showcase-box space-ring-showcase-box--${item.id}`}>
                      <div className="space-ring-media-wrapper">
                        <img
                          src={item.image}
                          alt={`HAULO Space Project ${item.num} - ${item.title}`}
                          className="space-ring-showcase-img"
                          draggable={false}
                        />
                        {/* Interactive HUD Button over the 3D-rendered 'VIEW PROJECT' screen */}
                        {BUTTON_COORDS[index] && (
                          item.href && item.href.startsWith('http') ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="space-ring-btn-view-project"
                              style={{
                                left: BUTTON_COORDS[index].left,
                                top: BUTTON_COORDS[index].top,
                                width: BUTTON_COORDS[index].width,
                                height: BUTTON_COORDS[index].height,
                              }}
                              aria-label={`View Project: ${item.title}`}
                              title={`View Project: ${item.title}`}
                            >
                              <span className="space-ring-btn-glare" aria-hidden="true" />
                              <span className="sr-only">View Project: {item.title}</span>
                            </a>
                          ) : (
                            <Link
                              to={item.href && item.href !== '#' ? item.href : '/work'}
                              className="space-ring-btn-view-project"
                              style={{
                                left: BUTTON_COORDS[index].left,
                                top: BUTTON_COORDS[index].top,
                                width: BUTTON_COORDS[index].width,
                                height: BUTTON_COORDS[index].height,
                              }}
                              aria-label={`View Project: ${item.title}`}
                              title={`View Project: ${item.title}`}
                            >
                              <span className="space-ring-btn-glare" aria-hidden="true" />
                              <span className="sr-only">View Project: {item.title}</span>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* Floating Circular HUD 'VIEW PROJECT' Badge (Anchored in front space) */}
              <Link
                className="ring-view-case-badge"
                ref={(el) => {
                  if (badgeRefs && badgeRefs.current) badgeRefs.current[index] = el;
                }}
                to="/work"
                aria-label={`View Project: ${item.title}`}
              >
                <div className="badge-inner">
                  <span className="badge-text-line">VIEW</span>
                  <span className="badge-text-line">PROJECT ↗</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Backwards-compatible named exports
export function NextSectionLeft({ cardRef }) {
  return (
    <div className="next-space-box" ref={cardRef}>
      <img
        className="next-space-box__img"
        src="/space_img/0-space-portfolio.png"
        alt="HAULO Space Mech Ring"
        draggable={false}
      />
    </div>
  );
}

export function NextSectionRight({ cardRef }) {
  return (
    <div className="next-portfolio-box next-portfolio-box--featured" ref={cardRef}>
      <div className="statement-header-line">
        <span className="statement-label">+ PORTFOLIO</span>
      </div>
      <h2 className="next-statement-title">
        BROWSE OUR<br />PORTFOLIO
      </h2>
      <p className="next-statement-desc">
        Explore how we turn ideas into intelligent systems that inspire, engage, and create real impact.
      </p>
    </div>
  );
}

export default NextSection;
