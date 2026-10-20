import React from "react";
import { ArrowUpRight } from "lucide-react";
import hauloIconLogo from "../assets/logo/haulo-icon-logo.png";
import smallCard1Img from "../assets/gallery/Small-Card-1.png";
import smallCard2Img from "../assets/gallery/Small-Card-2.png";
import smallCard3Img from "../assets/gallery/Small-Card-3.png";

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
        {/* CARD 0: Creative (Front 0°) */}
        <div ref={cardGreenPosRef} className="cardPosition">
          <div className="rockCardFace cardFaceFront">
            <img src={smallCard1Img} alt="Creative" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">WEB DEVELOPMENT</span>
            </div>
          </div>
          <div className="rockCardFace cardFaceBack">
            <img src={smallCard1Img} alt="Creative" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">WEB DEVELOPMENT</span>
            </div>
          </div>
        </div>

        {/* CARD 1: Innovation (Right 90°) */}
        <div ref={cardPurplePosRef} className="cardPosition">
          <div className="greenCardFace cardFaceFront">
            <img src={smallCard2Img} alt="Innovation" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">MOBILE DEVELOPMENT</span>
            </div>
          </div>
          <div className="greenCardFace cardFaceBack">
            <img src={smallCard2Img} alt="Innovation" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">MOBILE DEVELOPMENT</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Digital (Back 180°) */}
        <div ref={cardRockPosRef} className="cardPosition">
          <div className="webDevCardFace cardFaceFront">
            <img src={smallCard3Img} alt="Digital" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">UI/UX DESIGN</span>
            </div>
          </div>
          <div className="webDevCardFace cardFaceBack">
            <img src={smallCard3Img} alt="Digital" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">UI/UX DESIGN</span>
            </div>
          </div>
        </div>

        {/* CARD 3: Haulo Animated Logo Card (Left 270°) */}
        <div ref={cardNeuralPosRef} className="cardPosition">
          <div className="logoCardFace cardFaceFront">
            <div className="logoCardBg" />
            <div className="logoCardGlow" />
            <div className="logoCardContent">
              {/* Badge — Tailwind responsive sizing */}
              <div className="logoCardBadge text-[8px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.14em]">
                HAULO ECOSYSTEM
              </div>

              <div className="logoCardCenterContainer" ref={neuralStarRef}>
                <div className="cardOrbitRing outerRing" />
                <div className="cardOrbitRing innerRing" />
                <div className="cardLogoGlow" />
                <img
                  src={hauloIconLogo}
                  alt="Haulo Icon"
                  className="logoCardImg"
                  decoding="async"
                  loading="eager"
                />
              </div>

              <div className="logoCardBottom">
                {/* Title — Tailwind responsive */}
                <span className="logoCardTitle text-base sm:text-[22px] font-black tracking-[0.08em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                  HAULO
                </span>
                {/* Subtitle — Tailwind responsive */}
                <span className="logoCardSubtitle text-[9px] sm:text-[11px] font-semibold tracking-[0.14em] text-purple-200/90 uppercase">
                  INTELLIGENCE, BEYOND LIMITS
                </span>
              </div>
            </div>
          </div>

          <div className="logoCardFace cardFaceBack">
            <div className="logoCardBg" />
            <div className="logoCardGlow" />
            <div className="logoCardContent">
              <div className="logoCardBadge text-[8px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.14em]">
                HAULO ECOSYSTEM
              </div>
              <div className="logoCardCenterContainer">
                <div className="cardOrbitRing outerRing" />
                <div className="cardOrbitRing innerRing" />
                <div className="cardLogoGlow" />
                <img
                  src={hauloIconLogo}
                  alt="Haulo Icon"
                  className="logoCardImg"
                  decoding="async"
                  loading="eager"
                />
              </div>
              <div className="logoCardBottom">
                <span className="logoCardTitle text-base sm:text-[22px] font-black tracking-[0.08em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                  HAULO
                </span>
                <span className="logoCardSubtitle text-[9px] sm:text-[11px] font-semibold tracking-[0.14em] text-purple-200/90 uppercase">
                  INTELLIGENCE, BEYOND LIMITS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orbit CTA — responsive via CSS @media */}
      <button ref={cardOrbitCtaRef} className="cardOrbitCta">
        Explore the collection <ArrowUpRight size={14} />
      </button>
    </div>
  );
};

export default CardBoxOrbit;
