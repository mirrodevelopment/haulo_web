import React from 'react';
import { experimentsList } from '../../data/aboutProjects';

export function ExperimentsSection() {
  return (
    <section className="experiments-section">
      <div className="experiments-container">
        <div className="experiments-header">
          <span className="mono-tag">[ 16 / LAB & RESEARCH ]</span>
          <h2 className="section-title">MORE WORK / EXPERIMENTS</h2>
        </div>

        <div className="experiments-grid">
          {experimentsList.map((exp) => (
            <div key={exp.num} className="experiment-card">
              <div className="experiment-num">{exp.num}</div>
              <h3 className="experiment-title">{exp.title}</h3>
              <div className="experiment-tags">
                {exp.tags.map((t, i) => (
                  <span key={i} className="exp-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
