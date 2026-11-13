import React, { useState } from 'react';
import './MagmaButton.css';

export function MagmaButton({
  label = "VIEW SERVICES",
  onClick,
  width = 385,
  theme = "orange",
  className = ""
}) {
  const [isSwitched, setIsSwitched] = useState(false);

  const slideDistance = width - 205; // Exact distance to glide across the track

  const handleToggle = () => {
    const nextState = !isSwitched;
    setIsSwitched(nextState);

    if (nextState && onClick) {
      setTimeout(() => {
        onClick();
      }, 400);
    }
  };

  const themeClass =
    theme === "blue"
      ? "magma-theme-blue"
      : theme === "green"
      ? "magma-theme-green"
      : theme === "purple"
      ? "magma-theme-purple"
      : "";

  return (
    <div
      className={`magma-btn-wrapper thumb-left ${themeClass} ${isSwitched ? "is-switched" : ""} ${className}`}
      style={{ width: `${width}px` }}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      aria-checked={isSwitched}
    >
      {/* Recessed Dark Track */}
      <div className="magma-track-bezel">
        <div className="magma-track-cavity">
          <span
            className="magma-label"
            style={{
              transform: isSwitched ? `translateX(-${slideDistance}px)` : 'translateX(0px)'
            }}
          >
            {label}
          </span>
          <div
            className="magma-ambient-glow"
            style={{
              transform: isSwitched ? `translateX(${slideDistance}px)` : 'translateX(0px)'
            }}
          />
          <div
            className="magma-solid-core"
            style={{
              transform: isSwitched ? `translateX(${slideDistance}px)` : 'translateX(0px)'
            }}
          />
        </div>
      </div>

      {/* Overhanging Frosted Acrylic Glass Thumb */}
      <div
        className="magma-glass-thumb"
        style={{
          transform: isSwitched
            ? `translateY(-50%) translateX(${slideDistance}px)`
            : 'translateY(-50%) translateX(0px)'
        }}
      >
        {/* Optical internal surface reflection layer */}
        <div className="glass-internal-tint" />

        {/* Diagonal Striated Concave Lens (Left) */}
        <div className="glass-concave-lens" />

        {/* 3x5 Tactile Debossed Dot Matrix (Right) */}
        <div className="glass-dot-matrix">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="grip-dot" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MagmaButtonGroup({ onServicesClick, onProjectClick, className = "" }) {
  return (
    <div className={`magma-stage ${className}`}>
      <MagmaButton
        label="VIEW SERVICES"
        width={385}
        theme="blue"
        className="hero-magma-btn"
        onClick={onServicesClick}
      />
      <MagmaButton
        label="START A PROJECT"
        width={425}
        theme="green"
        className="hero-magma-btn"
        onClick={onProjectClick}
      />
    </div>
  );
}

