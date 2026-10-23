import React from "react";
import { ArrowUpRight } from "lucide-react";
import hauloIconLogo from "../assets/logo/haulo-icon-logo.png";
import cardBoxImg1 from "../assets/cardBoxImg/CardBoxOrbit-1.png";
import cardBoxImg2 from "../assets/cardBoxImg/CardBoxOrbit-2.png";
import cardBoxImg3 from "../assets/cardBoxImg/CardBoxOrbit-3.png";
import ButtonBorderTrace from "./ButtonBorderTrace";

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
            <img src={cardBoxImg1} alt="Web Development" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">WEB DEVELOPMENT</span>
            </div>
          </div>
          <div className="rockCardFace cardFaceBack">
            <img src={cardBoxImg1} alt="Web Development" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">WEB DEVELOPMENT</span>
            </div>
          </div>
        </div>

        {/* CARD 1: Innovation (Right 90°) */}
        <div ref={cardPurplePosRef} className="cardPosition">
          <div className="greenCardFace cardFaceFront">
            <img src={cardBoxImg2} alt="Mobile Development" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">MOBILE DEVELOPMENT</span>
            </div>
          </div>
          <div className="greenCardFace cardFaceBack">
            <img src={cardBoxImg2} alt="Mobile Development" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">MOBILE DEVELOPMENT</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Digital (Back 180°) */}
        <div ref={cardRockPosRef} className="cardPosition">
          <div className="webDevCardFace cardFaceFront">
            <img src={cardBoxImg3} alt="UI/UX Design" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">UI/UX DESIGN</span>
            </div>
          </div>
          <div className="webDevCardFace cardFaceBack">
            <img src={cardBoxImg3} alt="UI/UX Design" className="orbitCardImg" />
            <div className="orbitCardBottom">
              <span className="orbitCardWord">UI/UX DESIGN</span>
            </div>
          </div>
        </div>

        {/* CARD 3: Haulo Animated Logo Card (Left 270°) */}
        <div ref={cardNeuralPosRef} className="cardPosition">
          <div className="logoCardFace cardFaceFront">
            <div className="logoCardContent">
              {/* Badge — Tailwind responsive sizing */}
              <div className="logoCardBadge text-[8px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.14em]">
                HAULO 
              </div>

              <div className="logoCardCenterContainer" ref={neuralStarRef}>
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
                <span className="logoCardTitle text-base sm:text-[22px] font-[200] tracking-[0.08em] text-white">
                  HAULO
                </span>
                {/* Subtitle — Tailwind responsive */}
                <span className="logoCardSubtitle text-[9px] sm:text-[11px] font-[200] tracking-[0.14em] text-white/85 uppercase">
                  INTELLIGENCE, BEYOND LIMITS
                </span>
              </div>
            </div>
          </div>

          <div className="logoCardFace cardFaceBack">
            <div className="logoCardContent">
              <div className="logoCardBadge text-[8px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.14em]">
                HAULO
              </div>
              <div className="logoCardCenterContainer">
                <img
                  src={hauloIconLogo}
                  alt="Haulo Icon"
                  className="logoCardImg"
                  decoding="async"
                  loading="eager"
                />
              </div>
              <div className="logoCardBottom">
                <span className="logoCardTitle text-base sm:text-[22px] font-[200] tracking-[0.08em] text-white">
                  HAULO
                </span>
                <span className="logoCardSubtitle text-[9px] sm:text-[11px] font-[200] tracking-[0.14em] text-white/85 uppercase">
                  INTELLIGENCE, BEYOND LIMITS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orbit CTA — responsive via CSS @media */}
      <button ref={cardOrbitCtaRef} className="cardOrbitCta">
        <span>Explore the collection</span>
        <ArrowUpRight size={14} />
        <ButtonBorderTrace />
      </button>
    </div>
  );
};

export default CardBoxOrbit;
