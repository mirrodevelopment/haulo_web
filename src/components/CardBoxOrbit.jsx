import React from "react";
import hauloIconLogo from "../assets/logo/haulo-icon-logo.png";
import ButtonBorderTrace from "./ButtonBorderTrace";
import { Cyber4SidedBoxCanvas } from "./Cyber4SidedBoxCanvas";

export const CardBoxOrbit = ({
  cardTransitionWorldRef,
  transitionRigRef,
  cardGreenPosRef,
  cardPurplePosRef,
  cardRockPosRef,
  cardNeuralPosRef,
  neuralStarRef,
  cardOrbitCtaRef
}) => {
  return (
    <div ref={cardTransitionWorldRef} className="worldLayer cardTransitionWorld">
      <div ref={transitionRigRef} className="transitionRig">
        {/* Unified 4-Sided Connected 3D Box Canvas (with encapsulated 3D shadow & ground pod) */}
        <Cyber4SidedBoxCanvas />

        {/* Tracking DOM elements so GSAP and timeline controllers maintain references */}
        <div ref={cardGreenPosRef} className="cardPosition trackingRef" style={{ opacity: 0, pointerEvents: 'none' }} />
        <div ref={cardPurplePosRef} className="cardPosition trackingRef" style={{ opacity: 0, pointerEvents: 'none' }} />
        <div ref={cardRockPosRef} className="cardPosition trackingRef" style={{ opacity: 0, pointerEvents: 'none' }} />
        <div ref={cardNeuralPosRef} className="cardPosition trackingRef" style={{ opacity: 0, pointerEvents: 'none' }} />

        {/* Dedicated HAULO ICON LOGO for the Dual-Eye Cosmic Portal Zoom Animation */}
        <div
          ref={neuralStarRef}
          className="hauloMascotPortalContainer"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(220px, 24vw, 320px)',
            zIndex: 40,
            opacity: 0,
            visibility: 'hidden',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform, opacity'
          }}
        >
          <img
            src={hauloIconLogo}
            alt="Haulo Mascot Logo"
            className="hauloMascotZoomImg"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 35px rgba(183, 255, 0, 0.55)) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.8))'
            }}
            decoding="async"
            loading="eager"
          />
        </div>
      </div>

      {/* Orbit CTA — technical chamfered black button */}
      <button ref={cardOrbitCtaRef} className="cardOrbitCta tech-btn orbit-tech-btn" type="button">
        <svg className="tech-btn-frame" viewBox="-2 -2 264 48" fill="none" preserveAspectRatio="none" aria-hidden="true">
          {/* Black solid capsule fill */}
          <polygon points="11,1 243,1 254,12 254,31 241,43 11,43 1,33 1,11" fill="#070709" />

          {/* Top-left chamfer with notch */}
          <line x1="1" y1="11" x2="4" y2="8" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="7" y1="5" x2="11" y2="1" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="1" x2="243" y2="1" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Top-right chamfer and right edge */}
          <line x1="243" y1="1" x2="254" y2="12" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="254" y1="12" x2="254" y2="31" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bottom-right chamfer and bottom edge */}
          <line x1="254" y1="31" x2="241" y2="43" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="241" y1="43" x2="25" y2="43" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bottom-left border notch, bottom-left chamfer and left vertical edge */}
          <line x1="19" y1="43" x2="11" y2="43" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="43" x2="1" y2="33" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="1" y1="33" x2="1" y2="11" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Top-right floating reticle dot */}
          <circle cx="257" cy="1.5" r="1.3" fill="#ffffff" />

          {/* Bottom-right lime technical accent wedge & expanding horizontal line */}
          <g className="btn-corner-accent">
            <polygon points="240.5,43 254,30 254,27 240.5,40" fill="#a3e635" />
            <rect x="228" y="40" width="13.5" height="3" fill="#a3e635" className="btn-accent-bar" />
          </g>
        </svg>

        <span className="btn-text">
          EXPLORE THE COLLECTION
        </span>
      </button>
    </div>
  );
};

export default CardBoxOrbit;
