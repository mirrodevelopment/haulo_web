import React from "react";
import { ArrowRight } from "lucide-react";
import ButtonBorderTrace from "./ButtonBorderTrace";
import HeroButtons from "./HeroButtons";
import { CyberCard3DFrameCanvas } from "./CyberCard3DFrameCanvas";

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

        {/* Left-Center Column: Heading & Action Buttons */}
        <div className="promptsLeftCol">
          {/* DIV 1: Heading */}
          <div ref={promptsHeadingRef} className="promptsFirstDiv">
            <h1 className="promptsTopHeading hero-heading">

              <span className="hero-heading-top">Services that</span>
              <span className="promptsHeadingAccent gradient-text">move ideas </span>
              <span className="promptsHeadingAccent forward-text">forward</span>
            </h1>
          </div>

          {/* DIV 2: Two Buttons */}
          <div ref={promptsBottomLeftRef} className="promptsThirdDiv">
            {/* Button row */}
            <div className="promptsBtnRow">
              <HeroButtons />
            </div>
          </div>
        </div>

        {/* Preview card (GSAP-controlled) */}
        <div ref={promptsUiUxCardRef} className="cardPosition promptsUiUxContainer">
          <CyberCard3DFrameCanvas />
          {/* Photorealistic floor contact shadow pod directly beneath floating frame */}
          <div className="frameGroundShadowPod" aria-hidden="true">
            <div className="frameShadowFloorGlow" />
            <div className="frameShadowDiffuse" />
            <div className="frameShadowCore" />
          </div>
          <div className="rockCardFace cardFaceFront" />
        </div>
      </div>
    </div>
  );
};

export default ServicesHeroPanel;
