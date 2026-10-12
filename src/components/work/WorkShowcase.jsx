import React from 'react';
import { WORK_PROJECTS } from '../../data/workProjects';
import { WorkProjectItem } from './WorkProjectItem';

export function WorkShowcase() {
  const leftProjects = WORK_PROJECTS.filter((_, idx) => idx % 2 === 0);
  const rightProjects = WORK_PROJECTS.filter((_, idx) => idx % 2 === 1);

  return (
    <section className="work-showcase-container" aria-label="Selected Projects">
      <div className="work-showcase-columns">
        {/* Left Column: Projects 0, 2, 4 (tilted facing right/inward) */}
        <div className="work-column work-column-left">
          {leftProjects.map((project, idx) => (
            <WorkProjectItem
              key={project.id}
              project={project}
              index={idx * 2}
              column="left"
            />
          ))}
        </div>

        {/* Right Column: Projects 1, 3 (staggered lower, tilted facing left/inward) */}
        <div className="work-column work-column-right">
          {rightProjects.map((project, idx) => (
            <WorkProjectItem
              key={project.id}
              project={project}
              index={idx * 2 + 1}
              column="right"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
