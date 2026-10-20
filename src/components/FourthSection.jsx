import React from 'react';

/**
 * FourthSection Component
 * Displays the futuristic cybernetic cockpit frame image (4th-img-exact.png / 4th-img.jpeg)
 */
export function FourthSection() {
  return (
    <section
      id="fourth-section"
      className="relative w-full min-h-screen bg-[#08090b] flex flex-col items-center justify-center overflow-hidden select-none"
      aria-label="Section 4: Cybernetic Cockpit"
    >
      <div className="relative w-full h-screen flex items-center justify-center">
        <img
          src="/4th-section/4th-img-exact.png"
          alt="HAULO Cybernetic Cockpit Command"
          className="w-full h-full object-cover object-center pointer-events-none select-none block"
        />

        {/* Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>
    </section>
  );
}

export default FourthSection;
