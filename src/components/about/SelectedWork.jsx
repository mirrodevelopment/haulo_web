import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { selectedProjects } from '../../data/aboutProjects';

gsap.registerPlugin(ScrollTrigger);

export function SelectedWork() {
  const sectionRef = useRef(null);
  const awknRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Day-to-Night scroll theme transition ONLY inside AWKN section
      if (awknRef.current) {
        ScrollTrigger.create({
          trigger: awknRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            gsap.to(awknRef.current, { backgroundColor: '#09090b', color: '#ffffff', duration: 0.8 });
          },
          onLeave: () => {
            gsap.to(awknRef.current, { backgroundColor: '#F4F4F6', color: '#050505', duration: 0.8 });
          },
          onEnterBack: () => {
            gsap.to(awknRef.current, { backgroundColor: '#09090b', color: '#ffffff', duration: 0.8 });
          },
          onLeaveBack: () => {
            gsap.to(awknRef.current, { backgroundColor: '#F4F4F6', color: '#050505', duration: 0.8 });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="selected-work-section" ref={sectionRef}>
      <div className="selected-work-header">
        <span className="mono-tag">[ 03 / CASE STUDIES ]</span>
        <h2 className="section-title">SELECTED WORK</h2>
      </div>

      <div className="projects-editorial-list">
        {selectedProjects.map((project) => {
          const isAwkn = project.id === 'awkn';
          return (
            <div
              key={project.id}
              ref={isAwkn ? awknRef : null}
              className={`project-feature-card align-${project.alignment} ${isAwkn ? 'project-awkn-card' : ''}`}
            >
              <div className="project-meta-col">
                <div className="project-num-badge">{project.num}</div>
                <div className="project-category-tag">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-short-copy">{project.shortCopy}</p>

                <div className="project-focus-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="focus-pill">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="project-media-col">
                <div className="project-image-frame">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
