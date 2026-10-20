import React from 'react';

/**
 * ThirdSection Component
 * Displays the futuristic cybernetic sci-fi corridor gallery environment
 * Asset: /third-section/third-imagr.jpeg
 */
export function ThirdSection() {
  return (
    <section
      id="third-section"
      className="relative w-full min-h-screen bg-[#08090b] flex flex-col items-center justify-center overflow-hidden select-none"
      aria-label="Section 3: Futuristic Sci-Fi Corridor"
    >
      {/* Immersive Sci-Fi Corridor Image Stage */}
      <div className="relative w-full h-screen flex items-center justify-center">
        <img
          src="/third-section/third-imagr.jpeg"
          alt="HAULO Futuristic Sci-Fi Corridor Gallery"
          className="w-full h-full object-cover object-center pointer-events-none select-none block"
        />

        {/* Cinematic Vignette Overlay to blend seamlessly with dark surrounding environments */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>
    </section>
  );
}

export default ThirdSection;
