import React, { useRef, useCallback } from "react";
import hauloIconLogo from "../assets/logo/haulo-icon-logo.png";
import { GalleryStarfieldCanvas } from "./GalleryStarfieldCanvas";

export const BeyondPortalSection = ({
  beyondWorldRef,
  beyondVisibilityRef,
  beyondStarRef,
  beyondTitleRef,
  limitsTitleRef
}) => {
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    containerRef.current.style.setProperty("--bx-tilt", `${(-nx * 5).toFixed(2)}deg`);
    containerRef.current.style.setProperty("--by-tilt", `${(ny * 4).toFixed(2)}deg`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--bx-tilt", "0deg");
    containerRef.current.style.setProperty("--by-tilt", "0deg");
  }, []);

  return (
    <div
      ref={beyondWorldRef}
      className="worldLayer beyondWorld"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 2D Cosmic Starfield Canvas */}
      <GalleryStarfieldCanvas />

      {/* Atmospheric Nebula Cosmic Glow */}
      <div className="beyondCosmicNebula" />

      {/* Center Iris Shockwave Ring (animated on entrance) */}
      <div className="beyondEyeIrisRing" />

      {/* Center 3D Floating Icon with Orbital Energy Rings */}
      <div ref={beyondStarRef} className="beyondStarFixed">
        {/* Dual Orbital Energy Rings */}
        <div className="beyondOrbitRing outerRing" />
        <div className="beyondOrbitRing innerRing" />

        <div className="cleanBeyondLogoWrapper">
          <div className="cleanBeyondLogoGlow" />
          <img src={hauloIconLogo} alt="Haulo Icon" className="cleanBeyondLogoImg" />
        </div>
      </div>

      {/* Typography Container */}
      <div ref={containerRef} className="beyondContainer">
        {/* Top-Left: "BEYOND" */}
        <div ref={beyondTitleRef} className="beyondTitleGroup">
          <h2 className="beyondMainHeading">BEYOND</h2>
        </div>

        {/* Bottom-Right: "ALL LIMITS" */}
        <div ref={limitsTitleRef} className="limitsTitleGroup">
          <h2 className="limitsMainHeading">ALL LIMITS</h2>
        </div>
      </div>
    </div>
  );
};

export default BeyondPortalSection;
