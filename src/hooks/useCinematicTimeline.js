import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TOTAL_TIMELINE_DURATION } from "./timeline/timelineConstants";
import { createOrbitRenderer } from "./timeline/timelineOrbit";
import { createMeasurementsManager } from "./timeline/timelineMeasurements";
import { setupInitialStates } from "./timeline/timelineInitialStates";
import { buildCinematicTimeline } from "./timeline/buildCinematicTimeline";
import { setupStepController } from "./timeline/stepScrollController";

gsap.registerPlugin(ScrollTrigger);

export const useCinematicTimeline = (refs) => {
  const {
    sectionRef,
    stageRef,
    portalWorldRef,
    beyondVisibilityRef
  } = refs;

  const autoAdvanceRef = useRef(null);
  const selectProjectRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stageRef.current) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true, force: true });
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 769px) and (max-width: 1023px)",
        isMobile: "(max-width: 768px)"
      },
      (context) => {
        if (!stageRef.current || !refs.promptsWorldRef?.current) return;
        const { isDesktop, isTablet } = context.conditions;

        // Responsive 3D Box Geometry
        const boxRadius = isDesktop ? 155 : isTablet ? 130 : 105;
        const perspScale = 2000 / (2000 - boxRadius);
        const promptsUiUxOffset = isDesktop ? 260 : isTablet ? 170 : 0;
        const orbit = { angle: 0, split: 0, sideReveal: 0, boxMorph: 0 };

        const cardNodes = [
          refs.cardGreenPosRef.current,
          refs.cardPurplePosRef.current,
          refs.cardRockPosRef.current,
          refs.cardNeuralPosRef.current
        ];

        const renderOrbit = createOrbitRenderer(cardNodes, boxRadius, orbit);

        const {
          updateCachedMeasurements,
          getCachedCardScales,
          getCachedExpandCard,
          getProjectDistance,
          getMarqueeOffset
        } = createMeasurementsManager({
          boxRadius,
          promptsCardRef: refs.promptsCardRef,
          cardGreenPosRef: refs.cardGreenPosRef,
          promptsPinkFillOverlayRef: refs.promptsPinkFillOverlayRef,
          beyondWorldRef: refs.beyondWorldRef,
          batch2NodesRef: refs.batch2NodesRef,
          projectTrackRef: refs.projectTrackRef,
          marqueeRef: refs.marqueeRef
        });

        // 1. Initial GSAP states
        setupInitialStates({
          ...refs,
          cardNodes,
          boxRadius,
          perspScale,
          promptsUiUxOffset,
          renderOrbit,
          getCachedExpandCard,
          getMarqueeOffset
        });

        updateCachedMeasurements();

        // 2. Master ScrollTrigger Timeline
        const introState = { hasPassed: false };

        const master = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=9600",
            pin: stageRef.current,
            scrub: 0.55,
            invalidateOnRefresh: true,
            onRefreshInit: updateCachedMeasurements,
            onUpdate: (self) => {
              const t = self.progress * TOTAL_TIMELINE_DURATION;
              beyondVisibilityRef.current = t >= 4.8 && t <= 6.95 ? 1 : 0;

              // Scene 8 Three.js Gallery scroll progress
              if (t >= 9.2 && t <= 12.5) {
                window.__galleryScrollProgress = Math.max(0, Math.min(1, (t - 9.4) / (12.35 - 9.4)));
              } else {
                window.__galleryScrollProgress = 0;
              }

              // Once intro logo-zoom completes, permanently hide PortalIntro
              if (!introState.hasPassed && t >= 0.48) {
                introState.hasPassed = true;
                if (portalWorldRef.current) {
                  gsap.set(portalWorldRef.current, { autoAlpha: 0, display: "none" });
                }
              }
            }
          }
        });

        const { panStart, stepDuration } = buildCinematicTimeline({
          master,
          ...refs,
          boxRadius,
          perspScale,
          orbit,
          renderOrbit,
          getCachedCardScales,
          getProjectDistance
        });

        // 3. Step Navigation Controller
        const cleanupStepController = setupStepController({
          master,
          portalWorldRef: refs.portalWorldRef,
          cardOrbitCtaRef: refs.cardOrbitCtaRef,
          introState,
          updateCachedMeasurements,
          autoAdvanceRef,
          selectProjectRef,
          panStart,
          stepDuration
        });

        return cleanupStepController;
      }
    );

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, [
    refs.sectionRef,
    refs.stageRef,
    refs.bgDarkRef,
    refs.bgLightRef,
    refs.portalWorldRef,
    refs.portalGlowRef,
    refs.portalTextRef,
    refs.portalTopWordRef,
    refs.portalBottomWordRef,
    refs.promptsWorldRef,
    refs.promptsCardRef,
    refs.promptsHeadingRef,
    refs.promptsBottomLeftRef,
    refs.promptsUiUxCardRef,
    refs.promptsPinkFillOverlayRef,
    refs.marqueeWorldRef,
    refs.marqueeRef,
    refs.cardTransitionWorldRef,
    refs.transitionRigRef,
    refs.cardOrbitCtaRef,
    refs.cardGreenPosRef,
    refs.cardPurplePosRef,
    refs.cardRockPosRef,
    refs.cardNeuralPosRef,
    refs.neuralStarRef,
    refs.beyondWorldRef,
    refs.beyondTitleRef,
    refs.limitsTitleRef,
    refs.beyondStarRef,
    refs.beyondVisibilityRef,
    refs.projectsWorldRef,
    refs.projectTrackRef,
    refs.galleryWorldRef,
    refs.batch1NodesRef,
    refs.batch2NodesRef,
    refs.finalWorldRef,
    refs.finalScreenCardRef,
    refs.finalLeftContentRef
  ]);

  return {
    autoAdvanceRef,
    selectProjectRef
  };
};

export default useCinematicTimeline;
