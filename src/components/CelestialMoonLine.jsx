import React from "react";

/**
 * CelestialMoonLine
 * Cinematic deep-space celestial moon atmosphere and razor-sharp crescent rim line,
 * matching the cosmic horizon in the featured e-commerce showcase.
 */
export const CelestialMoonLine = () => {
  return (
    <div className="projectsMoonContainer" aria-hidden="true">
      {/* Soft celestial cyan-indigo nebula atmospheric halo */}
      <div className="projectsMoonNebulaGlow" />

      {/* Primary Top-Right Celestial Moon Sphere & Glowing Crescent Line */}
      <div className="projectsMoonPrimary">
        <svg
          viewBox="0 0 900 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="projectsMoonSvg"
        >
          <defs>
            {/* Deep celestial body shading */}
            <radialGradient id="moonBodyShade" cx="65%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#08142a" stopOpacity="0.75" />
              <stop offset="45%" stopColor="#030814" stopOpacity="0.88" />
              <stop offset="78%" stopColor="#010307" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.98" />
            </radialGradient>

            {/* Glowing moon atmosphere crescent line gradient */}
            <linearGradient id="moonAtmosphereLineGrad" x1="15%" y1="75%" x2="70%" y2="15%">
              <stop offset="0%" stopColor="transparent" stopOpacity="0" />
              <stop offset="15%" stopColor="#1e3a8a" stopOpacity="0.45" />
              <stop offset="42%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#93c5fd" stopOpacity="0.95" />
              <stop offset="92%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.9" />
            </linearGradient>

            {/* Wide atmospheric haze glow */}
            <linearGradient id="moonWideHazeGrad" x1="20%" y1="80%" x2="75%" y2="15%">
              <stop offset="0%" stopColor="transparent" stopOpacity="0" />
              <stop offset="35%" stopColor="rgba(30, 58, 138, 0.25)" />
              <stop offset="70%" stopColor="rgba(56, 189, 248, 0.45)" />
              <stop offset="100%" stopColor="rgba(147, 197, 253, 0.2)" />
            </linearGradient>

            {/* Bloom filter for high-tech cosmic glow */}
            <filter id="moonLineGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur1" />
              <feGaussianBlur stdDeviation="14" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dark celestial sphere body silhouette */}
          <circle cx="500" cy="400" r="370" fill="url(#moonBodyShade)" />

          {/* Diffuse outer atmospheric scatter rim */}
          <path
            d="M 175 580 A 375 375 0 0 1 650 135"
            stroke="url(#moonWideHazeGrad)"
            strokeWidth="24"
            fill="none"
            filter="url(#moonLineGlowFilter)"
            opacity="0.65"
          />

          {/* Mid atmospheric glow line */}
          <path
            d="M 180 575 A 372 372 0 0 1 645 140"
            stroke="rgba(56, 189, 248, 0.7)"
            strokeWidth="5"
            fill="none"
            filter="url(#moonLineGlowFilter)"
          />

          {/* Razor-sharp glowing celestial moon crescent rim line */}
          <path
            d="M 185 570 A 370 370 0 0 1 640 145"
            stroke="url(#moonAtmosphereLineGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Pure white specular core arc */}
          <path
            d="M 280 470 A 370 370 0 0 1 580 170"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* Secondary Bottom-Left Sweeping Planetary Horizon Arc Line */}
      <div className="projectsMoonSecondary">
        <svg
          viewBox="0 0 900 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="projectsMoonSvg"
        >
          <defs>
            <linearGradient id="horizonLineGrad" x1="20%" y1="20%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#93c5fd" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="90%" stopColor="#1e3a8a" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="horizonBodyShade" cx="30%" cy="70%" r="65%">
              <stop offset="0%" stopColor="#050c1c" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#01040a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Dark planetary silhouette */}
          <circle cx="350" cy="550" r="420" fill="url(#horizonBodyShade)" />

          {/* Diffuse glow halo */}
          <path
            d="M 680 340 A 422 422 0 0 0 140 850"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="16"
            fill="none"
            filter="url(#moonLineGlowFilter)"
            opacity="0.5"
          />

          {/* Razor-sharp horizon rim arc line */}
          <path
            d="M 675 345 A 420 420 0 0 0 145 845"
            stroke="url(#horizonLineGrad)"
            strokeWidth="2.0"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

export default CelestialMoonLine;

