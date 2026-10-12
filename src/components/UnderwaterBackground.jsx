import React, { forwardRef } from 'react';

export const UnderwaterBackground = forwardRef(({ bgGridRef, causticsRef, currentsRef }, ref) => {
  return (
    <div className="underwater-environment" ref={ref}>
      {/* 1. Subtle ambient tonal variation underneath grid */}
      <div className="ambient-tonal-layer" />

      {/* 2. Soft, ultra-subtle luminous washes */}
      <div className="water-currents-wrapper" ref={currentsRef}>
        <div className="ambient-light-a water-current-a" />
        <div className="ambient-light-b water-current-b" />
      </div>

      {/* 3. Subtle pearlescent light caustics */}
      <div className="water-caustics-wrapper" ref={causticsRef}>
        <div className="water-caustic-rays" />
      </div>

      {/* 4. Dense, uniform, visually stable micro-square/dot grid */}
      <div className="bg-grid" ref={bgGridRef} />

      {/* 5. Extremely subtle edge tone (corners remain bright) */}
      <div className="subtle-vignette" />
    </div>
  );
});

UnderwaterBackground.displayName = 'UnderwaterBackground';
