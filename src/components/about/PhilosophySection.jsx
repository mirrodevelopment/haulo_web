import React from 'react';

export function PhilosophySection() {
  return (
    <section className="philosophy-section">
      <div className="philosophy-container">
        <div className="philosophy-split">
          <div className="philosophy-left">
            <span className="mono-tag">[ 14 / PHILOSOPHY ]</span>
            <h2 className="philosophy-headline">
              BUILT WHOLE,<br />NOT IN FRAGMENTS.
            </h2>
          </div>

          <div className="philosophy-right">
            <p className="philosophy-copy">
              Most digital products are assembled across separate teams. HAULO brings technology, design, and intelligence together — one team accountable for the whole outcome, not just one piece.
            </p>

            <div className="philosophy-visual-box">
              <div className="fragment-shape fragment-1" />
              <div className="fragment-shape fragment-2" />
              <div className="fragment-shape fragment-3" />
              <div className="fragment-center-core" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
