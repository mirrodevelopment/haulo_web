import React from 'react';
import { servicesList } from '../../data/aboutProjects';

export function ServicesList() {
  return (
    <section className="services-section">
      <div className="services-header">
        <span className="mono-tag">[ 08 / CAPABILITIES ]</span>
        <h2 className="section-title">WHAT WE DO</h2>
      </div>

      <div className="services-list-container">
        {servicesList.map((service) => (
          <div key={service.num} className="service-row">
            <span className="service-num">{service.num}</span>
            <span className="service-title">{service.title}</span>
            <span className="service-arrow">↗</span>
          </div>
        ))}
      </div>
    </section>
  );
}
