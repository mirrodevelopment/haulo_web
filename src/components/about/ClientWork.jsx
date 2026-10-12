import React from 'react';
import { clientProjects } from '../../data/aboutProjects';

export function ClientWork() {
  return (
    <section className="client-work-section">
      <div className="client-work-header">
        <span className="mono-tag">[ 09 / ENTERPRISE & CLIENT SYSTEMS ]</span>
        <h2 className="section-title">CLIENT WORK</h2>
      </div>

      <div className="client-projects-grid">
        {clientProjects.map((proj) => {
          const isErp = proj.id === 'rytham-erp';
          return (
            <div
              key={proj.id}
              className={`client-project-card ${isErp ? 'client-erp-card' : ''}`}
            >
              <div className="client-img-wrapper">
                <img src={proj.image} alt={proj.title} className="client-img" loading="lazy" />
                <div className="client-badge">{proj.num}</div>
              </div>
              <div className="client-info">
                <span className="client-category">{proj.category}</span>
                <h3 className="client-title">{proj.title}</h3>
                <p className="client-copy">{proj.shortCopy}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
