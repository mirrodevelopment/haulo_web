import React from 'react';
import './GlassSwitch.css';

export function SwitchItem({ label, url, onRedirect, className = '' }) {
  const handleClick = () => {
    if (onRedirect) {
      onRedirect(url);
    } else if (url) {
      window.location.href = url;
    }
  };

  return (
    <div
      className={`glass-switch ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="switch-track">
        {/* Crisp white text */}
        <span className="switch-label">{label}</span>

        {/* Underlying magma orange radial glow */}
        <div className="magma-glow" />

        {/* Frosted glass thumb */}
        <div className="glass-thumb">
          {/* Debossed 3x5 dot matrix */}
          <div className="dot-matrix">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>

          {/* Concave circular lens */}
          <div className="concave-lens" />
        </div>
      </div>
    </div>
  );
}

export default function GlassSwitchGroup({ onRedirect, className = '' }) {
  return (
    <div className={`switch-container ${className}`}>
      <SwitchItem
        label="VIEW SERVICES"
        url="/services"
        className="hero-glass-switch"
        onRedirect={onRedirect}
      />
      <SwitchItem
        label="START A PROJECT"
        url="/start-a-project"
        className="hero-glass-switch"
        onRedirect={onRedirect}
      />
    </div>
  );
}
