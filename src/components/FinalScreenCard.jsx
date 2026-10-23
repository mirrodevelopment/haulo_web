import React from "react";
import { ArrowUpRight } from "lucide-react";
import spaceImg from "../assets/space-img/space-img.png";
import { GalleryStarfieldCanvas } from "./GalleryStarfieldCanvas";
import ButtonBorderTrace from "./ButtonBorderTrace";

export const FinalScreenCard = ({ finalWorldRef, finalScreenCardRef, finalLeftContentRef }) => {
  return (
    <div ref={finalWorldRef} className="worldLayer finalWorld">
      {/* Cosmic background starfield */}
      <GalleryStarfieldCanvas />

      <div ref={finalScreenCardRef} className="finalScreenCard">
        {/* Ambient radial gradient background */}
        <div className="finalCardAmbient" />

        <div ref={finalLeftContentRef} className="finalLeftContent">
          <span className="finalEyebrow">HAULO / BEYOND THE ORDINARY</span>

          <h2 className="finalTitle">BUILD BEYOND.</h2>

          <p className="finalTagline">Think bigger. Create what's next.</p>

          <p className="finalBody">
            From brand identity and digital experiences to intelligent, scalable systems, we bring ambitious ideas to life through design and technology.
          </p>

          <button
            onClick={() => {
              window.location.href = "mailto:hello@haulo.com?subject=Project%20Inquiry%20via%20HAULO";
            }}
            className="finalCtaBtn"
          >
            <span>Start a Project</span>
            <span className="finalCtaIconBadge">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </span>
            <ButtonBorderTrace />
          </button>

          <div className="finalPillars">
            STRATEGY · DESIGN · TECHNOLOGY
          </div>
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
