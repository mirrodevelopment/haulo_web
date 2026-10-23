/**
 * timelineInitialStates.js
 * Initial GSAP states and pre-decoding for cinematic elements before scrolling begins.
 * Safe target checks protect against unmounted or hot-reloaded elements.
 */

import gsap from "gsap";
import { B1_ENTRANCE_OFFSETS } from "./timelineConstants";

export const setupInitialStates = ({
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
  cardNeuralPosRef,
  neuralStarRef,
  beyondWorldRef,
  beyondTitleRef,
  limitsTitleRef,
  beyondStarRef,
  projectsWorldRef,
  projectTrackRef,
  galleryWorldRef,
  batch1NodesRef,
  batch2NodesRef,
  finalWorldRef,
  finalScreenCardRef,
  finalLeftContentRef,
  cardNodes,
  boxRadius,
  perspScale,
  promptsUiUxOffset,
  renderOrbit,
  getCachedExpandCard,
  getMarqueeOffset,
  getProjectEnterX
}) => {
  // Pre-decode all images inside stage so GPU textures are warm before scrolling
  if (stageRef?.current) {
    const stageImages = stageRef.current.querySelectorAll("img");
    stageImages.forEach((img) => {
      if (typeof img.decode === "function") {
        img.decode().catch(() => {});
      }
    });
  }

  // Initialize static transform properties on cardNodes once
  cardNodes.forEach((card) => {
    if (!card) return;
    gsap.set(card, {
      xPercent: -50,
      yPercent: -50,
      y: 0,
      rotationX: 0,
      rotationZ: 0,
      scale: 1,
      visibility: "visible"
    });
  });

  // Background states
  if (bgDarkRef?.current) gsap.set(bgDarkRef.current, { autoAlpha: 0 });
  if (bgLightRef?.current) gsap.set(bgLightRef.current, { autoAlpha: 1 });

  // Scene 0: HAULO SERVICE Intro
  if (portalWorldRef?.current) gsap.set(portalWorldRef.current, { autoAlpha: 1, display: "flex" });
  if (portalGlowRef?.current) gsap.set(portalGlowRef.current, { scale: 1, scaleX: 1, scaleY: 1, opacity: 0.9 });
  if (portalTextRef?.current) {
    gsap.set(portalTextRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
      autoAlpha: 1
    });
  }
  if (portalTopWordRef?.current) {
    gsap.set(portalTopWordRef.current, { y: 0, yPercent: 0, opacity: 1 });
  }
  if (portalBottomWordRef?.current) {
    gsap.set(portalBottomWordRef.current, { y: 0, yPercent: 0, opacity: 1 });
  }

  // Scene 1: Services Card
  const promptsHeroBgEl = promptsCardRef?.current?.querySelector(".promptsHeroBg");
  if (promptsWorldRef?.current) gsap.set(promptsWorldRef.current, { autoAlpha: 0, scale: 1 });
  if (promptsCardRef?.current) {
    gsap.set(promptsCardRef.current, {
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      yPercent: 0,
      rotationZ: 0,
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0
    });
  }
  if (promptsHeroBgEl) {
    gsap.set(promptsHeroBgEl, { opacity: 1 });
  }
  if (promptsPinkFillOverlayRef?.current) {
    gsap.set(promptsPinkFillOverlayRef.current, { opacity: 0 });
  }
  const promptsSecondElInit = promptsCardRef?.current?.querySelector(".promptsSecondDiv");
  const heroTextTargets = [promptsHeadingRef?.current, promptsSecondElInit, promptsBottomLeftRef?.current].filter(Boolean);
  if (heroTextTargets.length) {
    gsap.set(heroTextTargets, {
      opacity: 0,
      y: 65
    });
  }
  if (promptsUiUxCardRef?.current) {
    gsap.set(promptsUiUxCardRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: promptsUiUxOffset,
      y: 80,
      rotationZ: 0,
      scale: 1,
      opacity: 0,
      autoAlpha: 0
    });
    const heroCardBottomEl = promptsUiUxCardRef.current.querySelector('.orbitCardBottom');
    if (heroCardBottomEl) {
      gsap.set(heroCardBottomEl, { opacity: 0, autoAlpha: 0, display: "none" });
    }
  }

  // Scene 2-5: Marquee & 3D Box Cards
  if (cardTransitionWorldRef?.current) gsap.set(cardTransitionWorldRef.current, { opacity: 0, visibility: "visible" });
  if (marqueeWorldRef?.current) gsap.set(marqueeWorldRef.current, { autoAlpha: 0 });
  if (marqueeRef?.current) {
    const getInitialMarqueeX = () => {
      const base0 = getMarqueeOffset ? getMarqueeOffset(0) : 0;
      return base0 + Math.round(window.innerWidth * 0.55);
    };
    gsap.set(marqueeRef.current, { x: getInitialMarqueeX, xPercent: 0 });
  }
  if (cardOrbitCtaRef?.current) gsap.set(cardOrbitCtaRef.current, { autoAlpha: 0 });
  if (transitionRigRef?.current) {
    gsap.set(transitionRigRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      scale: 1,
      rotationZ: 0,
      rotationX: 0,
      rotationY: 0
    });
  }
  const logoCardDecorEls = cardNeuralPosRef?.current
    ? Array.from(cardNeuralPosRef.current.querySelectorAll(".logoCardBadge, .logoCardBottom, .logoCardBg"))
    : [];
  if (neuralStarRef?.current) {
    gsap.set(neuralStarRef.current, { scale: 1, x: 0, y: 0, rotationZ: 0, transformOrigin: "50% 50%" });
  }
  if (logoCardDecorEls.length) {
    gsap.set(logoCardDecorEls, { opacity: 1, y: 0 });
  }
  renderOrbit();

  // Scene 6: Beyond World (Iris circle originates from mascot left eye)
  if (beyondWorldRef?.current) {
    gsap.set(beyondWorldRef.current, { autoAlpha: 0, scale: 1, yPercent: 0, clipPath: "circle(0% at 50% 50%)" });
    const eyeRingInit = beyondWorldRef.current.querySelector(".beyondEyeIrisRing");
    if (eyeRingInit) gsap.set(eyeRingInit, { scale: 0.15, opacity: 0 });
  }
  if (beyondTitleRef?.current) gsap.set(beyondTitleRef.current, { x: 0, y: 70, scale: 1, autoAlpha: 0 });
  if (limitsTitleRef?.current) gsap.set(limitsTitleRef.current, { x: 0, y: 70, scale: 1, autoAlpha: 0 });
  const dividerInit = beyondWorldRef?.current?.querySelector(".beyondDivider");
  if (dividerInit) gsap.set(dividerInit, { y: 50, scaleX: 0.85, autoAlpha: 0 });
  if (beyondStarRef?.current) gsap.set(beyondStarRef.current, { scale: 0.55, rotationZ: 0, yPercent: 0, autoAlpha: 0 });

  // Scene 7: Projects Horizontal Track
  const projectCards = projectTrackRef?.current
    ? Array.from(projectTrackRef.current.querySelectorAll(".projectPanel"))
    : [];

  if (projectsWorldRef?.current) {
    gsap.set(projectsWorldRef.current, {
      autoAlpha: 0,
      xPercent: 0,
      yPercent: 0,
      rotationY: 0,
      rotationX: 0,
      rotationZ: 0,
      scale: 1,
      z: 0,
      filter: "none"
    });
  }
  if (projectTrackRef?.current) {
    const enterX = getProjectEnterX ? getProjectEnterX() : Math.round(window.innerWidth * 0.65);
    gsap.set(projectTrackRef.current, { x: enterX });
  }
  if (projectCards.length) {
    gsap.set(projectCards, { y: 0, scale: 1, rotationZ: 0, rotationX: 0, rotationY: 0 });
  }

  // Scene 8: Spatial Gallery
  const setBatch1EntranceState = (nodes) => {
    if (!nodes) return;
    nodes.forEach((node, i) => {
      if (!node) return;
      const preset = B1_ENTRANCE_OFFSETS[i] || { x: 50, y: -40, z: -80, rotZ: 0, scale: 0.85 };
      gsap.set(node, {
        x: preset.x,
        y: preset.y,
        z: preset.z,
        rotationX: 0,
        rotationY: 0,
        rotationZ: preset.rotZ,
        scale: preset.scale,
        opacity: 0,
        filter: "none"
      });
    });
  };

  const setBatch2EntranceState = (nodes) => {
    if (!nodes) return;
    nodes.forEach((node) => {
      if (!node) return;
      gsap.set(node, {
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        opacity: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        filter: "none"
      });
    });
  };

  if (batch2NodesRef?.current) setBatch2EntranceState(batch2NodesRef.current);
  if (batch1NodesRef?.current) setBatch1EntranceState(batch1NodesRef.current);
  if (galleryWorldRef?.current) {
    gsap.set(galleryWorldRef.current, {
      autoAlpha: 0,
      display: "none",
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      filter: "none"
    });
    const stage = galleryWorldRef.current.querySelector(".editorialStage");
    if (stage) {
      gsap.set(stage, {
        xPercent: 40,
        yPercent: -28,
        rotationY: -5,
        rotationX: 3.5,
        z: -80,
        scale: 0.92,
        autoAlpha: 0
      });
    }
  }

  // Scene 9: Final Panel
  if (finalWorldRef?.current) gsap.set(finalWorldRef.current, { autoAlpha: 0 });
  if (finalScreenCardRef?.current) {
    gsap.set(finalScreenCardRef.current, {
      autoAlpha: 0,
      scale: 1,
      xPercent: -50,
      yPercent: -50,
      x: () => getCachedExpandCard().popX,
      y: () => getCachedExpandCard().popY,
      width: () => `${getCachedExpandCard().popW}px`,
      height: () => `${getCachedExpandCard().popH}px`,
      borderRadius: "18px",
      rotationZ: 0,
      z: 0
    });
  }
  if (finalLeftContentRef?.current) gsap.set(finalLeftContentRef.current, { opacity: 0, y: 30 });
};
