import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { SEGMENTS, ANGLE_STEP } from '../data/projects';

export const ProjectRing = forwardRef(({ project, badgeRef, cylinderRef, onMouseEnter, onMouseLeave }, ref) => {
  return (
    <div
      className="project-ring-track-item"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 3D Cylindrical Solid Body (Both shells + rims rotate together) */}
      <div className="ring-cylinder" ref={cylinderRef}>

        {/* 2. TOP PHYSICAL RIM (Hairline glass edge) */}
        <div className="rim-shell top-rim-shell">
          {Array.from({ length: SEGMENTS }).map((_, i) => {
            const segAngle = i * ANGLE_STEP;
            return (
              <div
                key={`top-rim-${i}`}
                className={`rim-segment top-rim-segment-${i}`}
                style={{
                  transform: `rotateY(${segAngle}deg) translateZ(var(--ring-mid-radius, 339px)) translateY(calc(-0.5 * var(--ring-height, 180px))) rotateX(90deg)`
                }}
              >
                <div className="top-rim-facet" />
              </div>
            );
          })}
        </div>

        {/* 3. BOTTOM PHYSICAL RIM (Hairline glass edge) */}
        <div className="rim-shell bottom-rim-shell">
          {Array.from({ length: SEGMENTS }).map((_, i) => {
            const segAngle = i * ANGLE_STEP;
            return (
              <div
                key={`bottom-rim-${i}`}
                className={`rim-segment bottom-rim-segment-${i}`}
                style={{
                  transform: `rotateY(${segAngle}deg) translateZ(var(--ring-mid-radius, 339px)) translateY(calc(0.5 * var(--ring-height, 180px))) rotateX(90deg)`
                }}
              >
                <div className="bottom-rim-facet" />
              </div>
            );
          })}
        </div>

        {/* 4. OUTER CYLINDRICAL SHELL (Frosted acrylic surface + ink-printed typography) */}
        <div className="outer-cylinder-shell">
          {Array.from({ length: SEGMENTS }).map((_, i) => {
            const segAngle = i * ANGLE_STEP;
            return (
              <div
                key={`outer-${i}`}
                className={`ring-segment segment-${i}`}
                style={{
                  transform: `rotateY(${segAngle}deg) translateZ(var(--ring-radius, 340px))`
                }}
              >
                <div className="segment-inner">
                  {/* Subtle fake refraction sheen */}
                  <div className="glass-refraction-sheen" />

                  {/* 360-degree continuous panoramic editorial strip */}
                  <div
                    className="continuous-strip"
                    style={{
                      transform: `translateX(calc(-${i} * var(--segment-width, 89px)))`
                    }}
                  >
                    {/* Primary Giant Title & HAULO display mark */}
                    <div className="strip-region region-title-primary">
                      <span className="strip-title-text">{project.title}</span>
                      <span className="strip-divider">|</span>
                      <span className="strip-title-tag">HAULO</span>
                      <span className="strip-divider">|</span>
                    </div>

                    {/* Editorial Bulleted Specs */}
                    <div className="strip-region region-bullets">
                      <svg className="pixel-runner-icon" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <rect x="7" y="1" width="3" height="3" />
                        <rect x="6" y="4" width="5" height="4" />
                        <rect x="4" y="5" width="2" height="3" />
                        <rect x="11" y="6" width="2" height="3" />
                        <rect x="5" y="8" width="3" height="4" />
                        <rect x="8" y="9" width="3" height="5" />
                        <rect x="3" y="11" width="3" height="2" />
                        <rect x="11" y="13" width="3" height="2" />
                      </svg>
                      <div className="bullet-column">
                        <div className="bullet-row">
                          <span className="bullet-dot">•</span>
                          <span className="bullet-text">{project.discipline || ''}</span>
                        </div>
                        <div className="bullet-row">
                          <span className="bullet-dot">•</span>
                          <span className="bullet-text">{project.specs?.[0] || ''}</span>
                        </div>
                        <div className="bullet-row">
                          <span className="bullet-dot">•</span>
                          <span className="bullet-text">{project.specs?.[1] || ''}</span>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Title Repeated Facet */}
                    <div className="strip-region region-title-secondary">
                      <span className="strip-title-text">{project.title}</span>
                      <span className="strip-divider">|</span>
                    </div>

                    {/* Technical Meta Description Column */}
                    <div className="strip-region region-desc-editorial">
                      <p className="editorial-desc-text">{project.desc}</p>
                      <div className="editorial-coord-tag">
                        <span>[{project.num || '01'} / 04]</span>
                        <span>HAULO // {project.year || '2026'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Circular HUD 'VIEW PROJECT' Badge (Anchored in front space) */}
      <Link
        className="ring-view-case-badge"
        ref={badgeRef}
        to="/work"
        aria-label={`View Project: ${project.title}`}
      >
        <div className="badge-inner">
          <span className="badge-text-line">VIEW</span>
          <span className="badge-text-line">PROJECT ↗</span>
        </div>
      </Link>
    </div>
  );
});

ProjectRing.displayName = 'ProjectRing';
