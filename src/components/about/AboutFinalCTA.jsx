import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AboutFinalCTA() {
  const navigate = useNavigate();

  const handleStartProject = () => {
    navigate('/contact');
  };

  return (
    <section className="about-final-cta-section">
      <div className="about-final-cta-container">
        <span className="mono-tag">[ 18 / ENGAGEMENT ]</span>
        <h2 className="final-cta-headline">
          HAVE AN IDEA?<br />LET'S BUILD IT PROPERLY.
        </h2>
        <p className="final-cta-subcopy">
          Tell us what you're working on — we'll help define what it actually needs.
        </p>

        <div className="final-cta-btn-wrapper">
          <button
            type="button"
            className="about-action-btn"
            onClick={handleStartProject}
            aria-label="Start a project with HAULO"
          >
            START A PROJECT →
          </button>
        </div>
      </div>
    </section>
  );
}
