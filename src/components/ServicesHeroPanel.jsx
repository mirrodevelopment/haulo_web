import React from "react";
import { ArrowRight } from "lucide-react";
import cardBoxImg1 from "../assets/cardBoxImg/CardBoxOrbit-1.png";
import ButtonBorderTrace from "./ButtonBorderTrace";

export const ServicesHeroPanel = ({
  promptsWorldRef,
  promptsCardRef,
  promptsHeadingRef,
  promptsBottomLeftRef,
  promptsUiUxCardRef,
  promptsPinkFillOverlayRef
}) => {
  return (
    <div ref={promptsWorldRef} className="worldLayer promptsWorld">
      <div ref={promptsCardRef} className="promptsCard">
        <div className="promptsHeroBg" />
        <div ref={promptsPinkFillOverlayRef} className="promptsPinkFillOverlay" />

        {/* Left-Center Column: Split into 3 distinct divs with properly proportioned gaps */}
        <div className="promptsLeftCol">
          {/* DIV 1: Heading */}
          <div ref={promptsHeadingRef} className="promptsFirstDiv">
            <h2 className="promptsTopHeading">
              Services that{" "}
              <span className="promptsHeadingAccent">move ideas forward</span>
            </h2>
          </div>

          {/* DIV 2: Description Paragraph */}
          <div className="promptsSecondDiv">
            <p className="promptsParagraph mt-2 text-[12.5px] sm:text-[13.5px] text-black/75 leading-relaxed">
              From strategy and design to development, AI, and scalable systems — we bring every
              layer together to build digital products that perform and evolve.
            </p>
          </div>

          {/* DIV 3: Two Buttons & Bottom Text */}
          <div ref={promptsBottomLeftRef} className="promptsThirdDiv">
            {/* Button row */}
            <div className="promptsBtnRow flex items-center gap-2.5 sm:gap-3.5 flex-wrap">
              <button
                onClick={() => window.__hauloScrollTo?.("services-cards")}
                className="promptsSecondaryBtn px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-black text-[12px] sm:text-[13px] font-semibold cursor-pointer"
              >
                <span>View Services</span>
                <ButtonBorderTrace />
              </button>
              <button
                onClick={() => window.__hauloScrollTo?.("contact")}
                className="promptsPrimaryBtn inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-white text-[12px] sm:text-[13px] font-bold cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight size={14} />
                <ButtonBorderTrace />
              </button>
            </div>

            {/* Social proof row */}
            <div className="promptsSocialProof flex items-center gap-2.5 text-[11px] sm:text-[11.5px] text-black/70">
              {/* Avatar stack */}
              <div className="avatarStack flex items-center">
                <div className="avatarCircle w-[22px] h-[22px] rounded-full border-2 border-white bg-[#ae7bff] shadow-xs" />
                <div className="avatarCircle w-[22px] h-[22px] rounded-full border-2 border-white -ml-[6px] bg-[#6c2bff] shadow-xs" />
                <div className="avatarCircle w-[22px] h-[22px] rounded-full border-2 border-white -ml-[6px] bg-[#b6ff00] shadow-xs" />
              </div>
              <span>Built across design, technology &amp; intelligence</span>
            </div>
          </div>
        </div>

        {/* Preview card (GSAP-controlled) */}
        <div ref={promptsUiUxCardRef} className="cardPosition promptsUiUxContainer">
          <div className="rockCardFace cardFaceFront">
            <img src={cardBoxImg1} alt="Web Development" className="orbitCardImg" />
            
            <div className="orbitCardBottom">
              <span className="orbitCardWord">WEB DEVELOPMENT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHeroPanel;
