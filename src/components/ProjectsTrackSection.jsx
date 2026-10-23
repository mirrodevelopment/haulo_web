import React from "react";
import { projectPanelsData } from "../data/showcaseData";
import { GalleryStarfieldCanvas } from "./GalleryStarfieldCanvas";

export const ProjectsTrackSection = ({
  projectsWorldRef,
  projectTrackRef
}) => {
  return (
    <div ref={projectsWorldRef} className="worldLayer projectsWorld">
      {/* 2D Cosmic Starfield Canvas matching Spatial Gallery */}
      <GalleryStarfieldCanvas />

      <div ref={projectTrackRef} className="projectTrack">
        {projectPanelsData.map((project) => {
          const glow = project.glowColor || "rgba(168, 85, 247, 0.45)";

          return (
            <div
              key={project.id}
              className="projectPanel projectImagePanel"
            >
              {/* Background Gallery Image */}
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="projectPanelImg"
                  loading="eager"
                  decoding="async"
                />
              )}

              {/* Cinematic Vignette Overlay for Text Legibility */}
              <div className="projectPanelOverlay" />

              {/* Dynamic ambient radial lighting */}
              <div
                className="panelAmbientOrb"
                style={{
                  background: `radial-gradient(circle, ${glow} 0%, transparent 68%)`
                }}
              />

              {/* Content — Tailwind responsive classes */}
              <div className="projectPanelInner">
                <div className="projectPanelCenter">
                  {/* Responsive heading: 20px mobile → 36px desktop */}
                  <h2 className="projectHeading text-[clamp(20px,2.2vw,36px)] font-bold tracking-[-0.035em] text-white mb-2 leading-[1.14] m-0 [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
                    {project.title}
                  </h2>
                  {/* Responsive description */}
                  <p className="projectDesc text-[clamp(11.5px,0.95vw,14px)] text-white/90 max-w-[440px] leading-[1.55] m-0 [text-shadow:0_1px_8px_rgba(0,0,0,0.75)]">
                    {project.description}
                  </p>
                </div>


              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsTrackSection;
