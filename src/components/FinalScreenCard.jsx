import React from "react";
import { ArrowUpRight } from "lucide-react";
import spaceImg from "../assets/space-img/final-sapce.webp";
import earthImg from "../assets/space-img/earth.png";
import { GalleryStarfieldCanvas } from "./GalleryStarfieldCanvas";
import "./HeroButtons.css";

export const FinalScreenCard = ({ finalWorldRef, finalScreenCardRef, finalLeftContentRef }) => {
  return (
    <div ref={finalWorldRef} className="worldLayer finalWorld">
      {/* Cosmic background starfield */}
      <GalleryStarfieldCanvas />

      <div ref={finalScreenCardRef} className="finalScreenCard">
        {/* Ambient radial gradient background */}
        <div className="finalCardAmbient" />

        {/* Earth horizon on the bottom-left / button side */}
        <div className="finalEarthContent">
          <img
            src={earthImg}
            alt="Earth Horizon"
            className="finalEarthImg"
            draggable={false}
          />
        </div>

        <div ref={finalLeftContentRef} className="finalLeftContent">
          <div className="finalEyebrow">
            <span className="finalEyebrowBar" />
            <span className="finalEyebrowText">HAULO / BEYOND THE ORDINARY</span>
          </div>

          <h2 className="finalTitle">
            <span>BUILD</span>
            <span>BEYOND.</span>
          </h2>

          <p className="finalTagline">Think bigger. Create what's next.</p>

          <button
            onClick={() => {
              window.location.href = "mailto:hello@haulo.com?subject=Project%20Inquiry%20via%20HAULO";
            }}
            className="finalTechCtaBtn"
            type="button"
            data-cursor-hover="true"
          >
            {/* Purposeful Four-Side Corner Technical SVG Frame */}
            <svg className="tech-btn-frame" viewBox="-2 -2 254 48" fill="none" preserveAspectRatio="none" aria-hidden="true">
              {/* Solid capsule fill (Black) */}
              <polygon className="btn-bg-polygon" points="13,1 237,1 249,13 249,31 237,43 13,43 1,31 1,13" fill="#000000" />

              {/* Top-left chamfer with notch */}
              <line x1="1" y1="13" x2="4" y2="10" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="8" y1="6" x2="13" y2="1" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="13" y1="1" x2="237" y2="1" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

              {/* Top-right chamfer and right edge */}
              <line x1="237" y1="1" x2="249" y2="13" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="249" y1="13" x2="249" y2="31" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

              {/* Bottom-right chamfer and bottom edge */}
              <line x1="249" y1="31" x2="237" y2="43" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="237" y1="43" x2="25" y2="43" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

              {/* Bottom-left border notch, bottom-left chamfer and left vertical edge */}
              <line x1="19" y1="43" x2="13" y2="43" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="13" y1="43" x2="1" y2="31" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="1" y1="31" x2="1" y2="13" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

              {/* Top-right floating reticle dot */}
              <circle cx="251" cy="2" r="1.3" fill="#FFFFFF" />

              {/* Bottom-right white technical accent wedge & expanding horizontal line */}
              <g className="btn-corner-accent">
                <polygon points="234.5,43 249,28 249,25 234.5,39" fill="#FFFFFF" />
                <rect x="220" y="40" width="14.5" height="3" fill="#FFFFFF" className="btn-accent-bar" />
              </g>
            </svg>

            <span className="finalStatusDot" />
            <span className="finalBtnText">START A PROJECT</span>
            <ArrowUpRight className="finalBtnArrow" size={17} strokeWidth={2.4} />
          </button>
        </div>

        {/* Right side: Futuristic sci-fi space station */}
        <div className="finalRightContent">
          <img
            src={spaceImg}
            alt="Space Station"
            className="finalSpaceImg"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default FinalScreenCard;
