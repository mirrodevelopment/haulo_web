import React from 'react';

/**
 * LastSection Component
 * Displays the futuristic Contact Page with Robotic Cyber Frog
 * Asset: /last-section/last-section.png
 */
export function LastSection() {
  return (
    <section
      id="last-section"
      className="relative w-full min-h-screen bg-[#eaf0f6] flex flex-col items-center justify-center overflow-hidden select-none"
      aria-label="Section 5: HAULO Futuristic Contact Page"
    >
      <div className="relative w-full h-screen flex items-center justify-center">
        <img
          src="/last-section/last-section.png"
          alt="HAULO Futuristic Contact Page with Robotic Frog"
          className="w-full h-full object-cover object-center pointer-events-none select-none block"
        />
      </div>
    </section>
  );
}

export default LastSection;
