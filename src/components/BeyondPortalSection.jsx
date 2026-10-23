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

        {/* Bottom Group: Mission Statement + Value Pillars */}
        <div ref={limitsTitleRef} className="beyondBottomGroup">
          <p className="beyondHeroParagraph">
            We partner with ambitious teams to turn complex ideas into purposeful digital products, distinctive brands, and experiences designed to make a difference.
          </p>

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
  );
};

export default BeyondPortalSection;
