import React from 'react';

export function WorkHero() {
  return (
    <section className="work-hero" aria-label="HAULO Experiences Introduction">
      {/* Soft glowing ambient bubble in upper left matching reference */}
      <div className="work-ambient-bubble" aria-hidden="true" />

      <div className="work-hero-wrapper">
        {/* Giant Centered Title in single line matching Noomo Experiences reference */}
        <h1 className="work-hero-title">
          HAULO EXPERIENCES
        </h1>

        {/* Signature Frosted Capsule Container (.blur-parent) */}
        <div className="work-pill-parent">
          <div className="work-pill-back" />
          <div className="work-pill-points" />
          <div className="work-pill-top-halftone" />
          <div className="work-pill-content">
            <h2 className="work-pill-statement">
              CRAFTING INTERACTIVE AND IMMERSIVE DIGITAL EXPERIENCES TO CREATE AND INCREASE<br className="work-statement-break" />ENGAGEMENT FOR BRANDS, PRODUCTS AND SERVICES ACROSS MULTIPLE CHANNELS.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
