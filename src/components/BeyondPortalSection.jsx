import React from "react";
import { GalleryStarfieldCanvas } from "./GalleryStarfieldCanvas";

export const BeyondPortalSection = ({
  beyondWorldRef,
  beyondVisibilityRef,
  beyondStarRef,
  beyondTitleRef,
  limitsTitleRef
}) => {
  return (
    <>
      {/* SVG Dual-Eye Feathered Mask and ClipPath for smooth, organic portal emergence from frog's eyes */}
      <svg
        className="beyondPortalSvgDefs"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 44,
          overflow: "visible"
        }}
      >
        <defs>
          <filter id="eyesPortalFeather" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <mask id="eyesPortalMask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect x="-100%" y="-100%" width="300%" height="300%" fill="black" />
            <g filter="url(#eyesPortalFeather)">
              <circle id="portalLeftEyeMask" cx="0" cy="0" r="0" fill="white" />
              <circle id="portalRightEyeMask" cx="0" cy="0" r="0" fill="white" />
            </g>
          </mask>
          <clipPath id="eyesPortalClip" clipPathUnits="userSpaceOnUse">
            <circle id="portalLeftEye" cx="0" cy="0" r="0" />
            <circle id="portalRightEye" cx="0" cy="0" r="0" />
          </clipPath>
        </defs>
      </svg>

      <div
        ref={beyondWorldRef}
        className="worldLayer beyondWorld"
      >
      {/* 2D Cosmic Starfield Canvas */}
      <GalleryStarfieldCanvas />

      {/* Editorial Content Container */}
      <div className="beyondContainer">
        {/* Top Header Group */}
        <div ref={beyondTitleRef} className="beyondHeroGroup">
          <span className="beyondEyebrow">OUR PHILOSOPHY / 001</span>
          <h1 className="beyondHeroHeadline">
            <span className="beyondHeroLine1">WHERE VISION MEETS</span>
            <span className="beyondHeroLine2">UNCOMPROMISED CRAFT.</span>
          </h1>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="beyondDivider" />

        {/* Bottom Group: Value Pillars */}
        <div ref={limitsTitleRef} className="beyondBottomGroup">
          <div className="beyondValuesRow">
            <div className="beyondValueCol">
              <span className="beyondValueTitle">DESIGN</span>
              <span className="beyondValueSubtitle">Built with purpose</span>
            </div>
            <div className="beyondValueCol">
              <span className="beyondValueTitle">TECH</span>
              <span className="beyondValueSubtitle">Made to perform</span>
            </div>
            <div className="beyondValueCol">
              <span className="beyondValueTitle">IMPACT</span>
              <span className="beyondValueSubtitle">Created to matter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default BeyondPortalSection;
