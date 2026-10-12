import React, { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WorkProjectItem = forwardRef(function WorkProjectItem({ project, index, column }, ref) {
  const colClass = column || (index % 2 === 0 ? 'left' : 'right');
  const containerRef = useRef(null);
  const rigidRef = useRef(null);

  useEffect(() => {
    const itemEl = containerRef.current;
    const rigidEl = rigidRef.current;
    if (!itemEl || !rigidEl) return;

    const isLeft = colClass === 'left';
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      gsap.fromTo(
        rigidEl,
        {
          rotateY: isLeft ? 18 : -18,
          rotateX: isLeft ? 3 : -3,
          rotateZ: isLeft ? -1.5 : 1.5,
          z: -25,
        },
        {
          rotateY: 0,
          rotateX: 0,
          rotateZ: 0,
          z: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: itemEl,
            start: 'top 92%',
            end: 'top 32%',
            scrub: 0.8,
          },
        }
      );
    });

    mm.add('(max-width: 768px)', () => {
      gsap.set(rigidEl, {
        rotateY: 0,
        rotateX: 0,
        rotateZ: 0,
        z: 0,
        clearProps: 'transform',
      });
    });

    return () => mm.revert();
  }, [colClass]);

  return (
    <div
      className={`work-card-track-item work-card-${colClass}`}
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      data-project-id={project.id}
      data-index={index}
    >
      <div className="work-card-hover">
        <div className="work-card-rigid" ref={rigidRef}>
          <div className="work-card-shell">
            {/* The Authentic Frosted Holographic Glass Card Frame (exact user asset) */}
            <img
              src="/textures/card_frame_frosted.png"
              alt=""
              className="card-frosted-frame-img"
              aria-hidden="true"
            />

            {/* Inset Image positioned precisely inside the window cutout */}
            <div className="card-image-container">
              <img
                src={project.media}
                alt={project.title}
                className="card-project-img"
                loading="lazy"
              />
              <div className="card-image-glaze" />
            </div>

            {/* Lower Editorial Content overlaying the holographic frosted glass body */}
            <div className="card-content-lower">
              <h3 className="card-project-title">
                {project.title}
              </h3>

              <p className="card-project-desc">
                {project.desc}
              </p>

              <div className="card-bottom-row">
                <div className="card-footer-glyph" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
                    <rect x="7" y="1" width="3" height="3" />
                    <rect x="6" y="4" width="5" height="4" />
                    <rect x="4" y="5" width="2" height="3" />
                    <rect x="11" y="6" width="2" height="3" />
                    <rect x="5" y="8" width="3" height="4" />
                    <rect x="8" y="9" width="3" height="5" />
                    <rect x="3" y="11" width="3" height="2" />
                    <rect x="11" y="13" width="3" height="2" />
                  </svg>
                </div>

                <div className="card-footer-specs">
                  {project.specs.slice(0, 2).map((spec) => (
                    <React.Fragment key={spec}>
                      <span className="card-spec-dot">•</span>
                      <span className="card-spec-pill">{spec}</span>
                    </React.Fragment>
                  ))}
                  <span className="card-spec-dot">•</span>
                </div>

                <a
                  href={project.href}
                  target={project.href && project.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="card-footer-arrow"
                  aria-label={`View Case: ${project.title}`}
                >
                  <span className="card-arrow-circle">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

WorkProjectItem.displayName = 'WorkProjectItem';
