import React from "react";
import { projectPanelsData } from "../data/showcaseData";
import { GalleryStarfieldCanvas } from "./GalleryStarfieldCanvas";
import { CelestialMoon3D } from "./CelestialMoon3D";
import project1Img from "../assets/projects-img/project1.png";
import project2Img from "../assets/projects-img/project2.png";
import { CyberCard3DFrameCanvas } from "./CyberCard3DFrameCanvas";

const ProjectCardItem = ({ project, index }) => {
  const glow = project.glowColor || "rgba(56, 189, 248, 0.45)";
  // Second frame (index 1) displays project2.png; first frame displays project1.png
  const cardImage = index === 1 ? project2Img : (project.image || project1Img);

  return (
    <div
      className={`projectPanel projectImagePanel projectCard--${index}`}
      style={{
        "--card-glow": glow,
        "--float-delay": `${(index * 0.75).toFixed(2)}s`
      }}
    >
      {/* 3D Model Cyber Frame holding card artwork */}
      <div className="projectCardInner">
        <CyberCard3DFrameCanvas imageSrc={cardImage} theme="metallic-light-black" />
      </div>
    </div>
  );
};

export const ProjectsTrackSection = ({
  projectsWorldRef,
  projectTrackRef
}) => {
  return (
    <div ref={projectsWorldRef} className="worldLayer projectsWorld">
      {/* 2D Cosmic Starfield Canvas matching Spatial Gallery */}
      <GalleryStarfieldCanvas />

      {/* Photorealistic Three.js 3D Celestial Moon with Rayleigh Atmospheric Scattering */}
      <CelestialMoon3D />

      <div ref={projectTrackRef} className="projectTrack">
        {projectPanelsData.map((project, idx) => (
          <ProjectCardItem
            key={project.id || `proj-${idx}`}
            project={project}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsTrackSection;
