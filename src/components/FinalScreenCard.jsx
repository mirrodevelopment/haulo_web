import React from "react";
import { ArrowRight } from "lucide-react";
import spaceImg from "../assets/space-img/space-img.png";
import { GalleryStarfieldCanvas } from "./GalleryStarfieldCanvas";

export const FinalScreenCard = ({ finalWorldRef, finalScreenCardRef, finalLeftContentRef }) => {
  return (
    <div ref={finalWorldRef} className="worldLayer finalWorld">
      {/* Cosmic background starfield */}
      <GalleryStarfieldCanvas />

      <div ref={finalScreenCardRef} className="finalScreenCard">
        {/* Ambient radial gradient background */}
        <div className="finalCardAmbient" />

        <div ref={finalLeftContentRef} className="finalLeftContent">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-[10px] font-mono tracking-widest uppercase mb-4 w-max">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
            NEXT-GEN CAPABILITIES
          </div>

          {/* Responsive title: 34px mobile → 86px desktop */}
          <h2 className="finalTitle text-[clamp(34px,5.4vw,86px)] font-bold leading-[0.94] tracking-[-0.04em] text-white m-0">
            Build beyond limits
          </h2>

          {/* Responsive body text */}
          <p className="finalBody text-[13.5px] sm:text-[15.5px] text-white/85 leading-relaxed mt-4 sm:mt-5 max-w-[260px] sm:max-w-xs md:max-w-[460px] m-0">
            Brand identity, intelligent digital systems, and cutting-edge visual experiences crafted for continuous evolution.
          </p>

          {/* Responsive CTA button */}
          <div className="flex items-center gap-4 mt-6 sm:mt-8 flex-wrap">
            <button
              onClick={() => {
                window.location.href = "mailto:hello@haulo.com?subject=Project%20Inquiry%20via%20HAULO";
              }}
              className="finalCtaBtn inline-flex items-center gap-2 sm:gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-[#06020e] text-[12.5px] sm:text-sm font-bold cursor-pointer border-none shadow-[0_4px_24px_rgba(255,255,255,0.25)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Get started <ArrowRight size={14} />
            </button>
            <span className="text-white/50 font-mono text-[11px] tracking-wider hidden sm:inline">
              HELLO@HAULO.COM
            </span>
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
