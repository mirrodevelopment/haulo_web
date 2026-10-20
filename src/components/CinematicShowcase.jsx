import React, { useRef } from "react";
import CinematicBackgrounds from "./CinematicBackgrounds";
import PortalIntro from "./PortalIntro";
import MarqueeLayer from "./MarqueeLayer";
import ServicesHeroPanel from "./ServicesHeroPanel";
import CardBoxOrbit from "./CardBoxOrbit";
import BeyondPortalSection from "./BeyondPortalSection";
import ProjectsTrackSection from "./ProjectsTrackSection";
import SpatialGallerySection from "./SpatialGallerySection";
import FinalScreenCard from "./FinalScreenCard";
import { useCinematicTimeline } from "../hooks/useCinematicTimeline";
import "../styles/CinematicShowcase.css";

export const CinematicShowcase = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  // Background layers
  const bgDarkRef = useRef(null);
  const bgLightRef = useRef(null);

  // Scene 0: HAULO SERVICE Intro
  const portalWorldRef = useRef(null);
  const portalGlowRef = useRef(null);
  const portalTextRef = useRef(null);
  const portalTopWordRef = useRef(null);
  const portalBottomWordRef = useRef(null);

  // Scene 1: Services Hero Panel
  const promptsWorldRef = useRef(null);
  const promptsCardRef = useRef(null);
  const promptsHeadingRef = useRef(null);
  const promptsBottomLeftRef = useRef(null);
  const promptsUiUxCardRef = useRef(null);
  const promptsPinkFillOverlayRef = useRef(null);

  // Scene 2 - 5: Marquee & 3D Box Orbit Rig
  const marqueeWorldRef = useRef(null);
  const marqueeRef = useRef(null);
  const cardTransitionWorldRef = useRef(null);
  const transitionRigRef = useRef(null);
  const cardOrbitCtaRef = useRef(null);
  const cardGreenPosRef = useRef(null);
  const cardPurplePosRef = useRef(null);
  const cardRockPosRef = useRef(null);
  const cardNeuralPosRef = useRef(null);
  const neuralStarRef = useRef(null);

  // Scene 6: Beyond Particle Portal
  const beyondWorldRef = useRef(null);
  const beyondTitleRef = useRef(null);
  const limitsTitleRef = useRef(null);
  const beyondStarRef = useRef(null);
  const beyondVisibilityRef = useRef(0);

  // Scene 7: Full-Screen Panoramic Projects Stage
  const projectsWorldRef = useRef(null);
  const projectTrackRef = useRef(null);

  // Scene 8: Spatial Floating Gallery (Batch 1 & Batch 2)
  const galleryWorldRef = useRef(null);
  const batch1NodesRef = useRef([]);
  const batch2NodesRef = useRef([]);

  // Scene 9: Final Purple Screen Card
  const finalWorldRef = useRef(null);
  const finalScreenCardRef = useRef(null);
  const finalLeftContentRef = useRef(null);

  // Initialize master GSAP timeline, measurements, and step scroll controller via custom hook
  const { autoAdvanceRef } = useCinematicTimeline({
    sectionRef,
    stageRef,
    bgDarkRef,
    bgLightRef,
    portalWorldRef,
    portalGlowRef,
    portalTextRef,
    portalTopWordRef,
    portalBottomWordRef,
    promptsWorldRef,
    promptsCardRef,
    promptsHeadingRef,
    promptsBottomLeftRef,
    promptsUiUxCardRef,
    promptsPinkFillOverlayRef,
    marqueeWorldRef,
    marqueeRef,
    cardTransitionWorldRef,
    transitionRigRef,
    cardOrbitCtaRef,
    cardGreenPosRef,
    cardPurplePosRef,
    cardRockPosRef,
    cardNeuralPosRef,
    neuralStarRef,
    beyondWorldRef,
    beyondTitleRef,
    limitsTitleRef,
    beyondStarRef,
    beyondVisibilityRef,
    projectsWorldRef,
    projectTrackRef,
    galleryWorldRef,
    batch1NodesRef,
    batch2NodesRef,
    finalWorldRef,
    finalScreenCardRef,
    finalLeftContentRef
  });

  return (
    <section ref={sectionRef} className="cinematicScroll" id="cinematic-showcase">
      <div ref={stageRef} className="cinematicStage">
        {/* Background Layers */}
        <CinematicBackgrounds bgDarkRef={bgDarkRef} bgLightRef={bgLightRef} />

        {/* Scene 0: HAULO SERVICE Intro */}
        <PortalIntro
          portalWorldRef={portalWorldRef}
          portalGlowRef={portalGlowRef}
          portalTextRef={portalTextRef}
          portalTopWordRef={portalTopWordRef}
          portalBottomWordRef={portalBottomWordRef}
          onAutoAdvanceToHero={() => autoAdvanceRef.current?.()}
        />

        {/* Background Marquee Text Layer */}
        <MarqueeLayer
          marqueeWorldRef={marqueeWorldRef}
          marqueeRef={marqueeRef}
        />

        {/* Scene 1: Services Hero Panel */}
        <ServicesHeroPanel
          promptsWorldRef={promptsWorldRef}
          promptsCardRef={promptsCardRef}
          promptsHeadingRef={promptsHeadingRef}
          promptsBottomLeftRef={promptsBottomLeftRef}
          promptsUiUxCardRef={promptsUiUxCardRef}
          promptsPinkFillOverlayRef={promptsPinkFillOverlayRef}
        />

        {/* Scene 2 - 5: Normal Cards 3D Box Orbit Rig */}
        <CardBoxOrbit
          cardTransitionWorldRef={cardTransitionWorldRef}
          transitionRigRef={transitionRigRef}
          cardGreenPosRef={cardGreenPosRef}
          cardPurplePosRef={cardPurplePosRef}
          cardRockPosRef={cardRockPosRef}
          cardNeuralPosRef={cardNeuralPosRef}
          neuralStarRef={neuralStarRef}
          cardOrbitCtaRef={cardOrbitCtaRef}
        />

        {/* Scene 6: Beyond Particle Portal */}
        <BeyondPortalSection
          beyondWorldRef={beyondWorldRef}
          beyondVisibilityRef={beyondVisibilityRef}
          beyondStarRef={beyondStarRef}
          beyondTitleRef={beyondTitleRef}
          limitsTitleRef={limitsTitleRef}
        />

        {/* Scene 7: Horizontal Projects Track */}
        <ProjectsTrackSection
          projectsWorldRef={projectsWorldRef}
          projectTrackRef={projectTrackRef}
        />

        {/* Scene 8: Spatial Floating Gallery */}
        <SpatialGallerySection
          galleryWorldRef={galleryWorldRef}
          batch1NodesRef={batch1NodesRef}
          batch2NodesRef={batch2NodesRef}
        />

        {/* Scene 9: Final Purple Screen Card */}
        <FinalScreenCard
          finalWorldRef={finalWorldRef}
          finalScreenCardRef={finalScreenCardRef}
          finalLeftContentRef={finalLeftContentRef}
        />
      </div>
    </section>
  );
};

export default CinematicShowcase;
