/**
 * buildCinematicTimeline.js
 * Master GSAP ScrollTrigger timeline construction for Scenes 0 through 9.
 * Fully null-safe: checks all ref.current and filters array targets to prevent GSAP warnings/exceptions.
 */

import gsap from "gsap";
import { B1_ENTRANCE_OFFSETS, B1_LEVEL_CONFIG } from "./timelineConstants";

export const buildCinematicTimeline = ({
  master,
  portalWorldRef,
  portalGlowRef,
  portalTopWordRef,
  portalBottomWordRef,
  promptsWorldRef,
  promptsCardRef,
  promptsHeadingRef,
  promptsBottomLeftRef,
  promptsUiUxCardRef,
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
  projectsWorldRef,
  projectTrackRef,
  galleryWorldRef,
  batch1NodesRef,
  finalWorldRef,
  bgDarkRef,
  bgLightRef,
  boxRadius,
  perspScale,
  orbit,
  renderOrbit,
  getCachedCardScales,
  getProjectDistance,
  getMarqueeOffset
}) => {
  // Clean, zero-dead-zone timeline labels
  master.addLabel("portalStart", 0.0);
  master.addLabel("heroEnter", 0.02);
  master.addLabel("heroHold", 0.52);
  master.addLabel("extract", 0.54);
  master.addLabel("straighten", 1.0);
  master.addLabel("singleCardHold", 1.08);
  master.addLabel("sideReveal", 1.1);
  master.addLabel("card0Front", 1.54);
  master.addLabel("turnToCard1", 1.58);
  master.addLabel("card1Front", 2.55);
  master.addLabel("turnToCard2", 2.65);
  master.addLabel("card2Front", 3.65);
  master.addLabel("turnToCard3", 3.75);
  master.addLabel("logoFront", 4.75);
  master.addLabel("logoZoom", 4.85);
  master.addLabel("beyondHold", 5.8);
  master.addLabel("projects", 5.95);
  master.addLabel("projectsStart", 6.85); // Card 0: Brand & Identity
  master.addLabel("projCard1", 7.45);     // Card 1: E-commerce Development
  master.addLabel("projectsMid", 8.05);   // Card 2: Cloud & Infrastructure
  master.addLabel("projCard3", 8.65);     // Card 3: Software Engineering
  master.addLabel("projectsEnd", 9.25);   // Card 4: ERP & Business Systems
  master.addLabel("gallery1", 9.55);
  master.addLabel("gallery1Hold", 10.6);
  master.addLabel("gallery2", 10.8);
  master.addLabel("gallery2Hold", 12.15);
  master.addLabel("screenCardZoom", 12.35);
  master.addLabel("finalHold", 13.45);

  const promptsHeroBgEl = promptsCardRef?.current?.querySelector(".promptsHeroBg");
  const promptsSecondEl = promptsCardRef?.current?.querySelector(".promptsSecondDiv");
  const logoCardDecorEls = cardNeuralPosRef?.current
    ? Array.from(cardNeuralPosRef.current.querySelectorAll(".logoCardBadge, .logoCardBottom, .logoCardBg"))
    : [];

  // --- SCENE 0 -> SCENE 1: Horizontal Split ---
  if (portalTopWordRef?.current) {
    master.to(
      portalTopWordRef.current,
      {
        yPercent: -130,
        opacity: 0,
        duration: 0.44,
        ease: "power2.inOut"
      },
      "heroEnter"
    );
  }
  if (portalBottomWordRef?.current) {
    master.to(
      portalBottomWordRef.current,
      {
        yPercent: -130,
        opacity: 0,
        duration: 0.44,
        ease: "power2.inOut"
      },
      "heroEnter"
    );
  }
  if (portalGlowRef?.current) {
    master.to(
      portalGlowRef.current,
      {
        scaleX: 2.2,
        scaleY: 1.4,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      },
      "heroEnter"
    );
  }
  if (promptsWorldRef?.current) {
    master.fromTo(
      promptsWorldRef.current,
      { autoAlpha: 0, scale: 1 },
      { autoAlpha: 1, scale: 1, duration: 0.38, ease: "power2.out" },
      "heroEnter+=0.10"
    );
  }
  if (portalWorldRef?.current) {
    master.to(portalWorldRef.current, { autoAlpha: 0, duration: 0.1, ease: "power1.out" }, "heroEnter+=0.38");
  }
  if (bgDarkRef?.current) {
    master.to(bgDarkRef.current, { autoAlpha: 0, duration: 0.32, ease: "power2.inOut" }, "heroEnter+=0.16");
  }
  if (bgLightRef?.current) {
    master.to(bgLightRef.current, { autoAlpha: 1, duration: 0.32, ease: "power2.inOut" }, "heroEnter+=0.16");
  }
  if (promptsWorldRef?.current) {
    master.to(promptsWorldRef.current, { autoAlpha: 1, scale: 1, duration: 0.06 }, "heroEnter+=0.48");
  }

  // Crisp bottom-up entrance animation triggered right when reaching the hero section
  const heroTargetsIn = [promptsHeadingRef?.current, promptsSecondEl, promptsBottomLeftRef?.current].filter(Boolean);
  if (heroTargetsIn.length) {
    master.fromTo(
      heroTargetsIn,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.22,
        stagger: 0.06,
        ease: "power2.out",
        immediateRender: false
      },
      "heroHold-=0.26"
    );
  }

  if (promptsUiUxCardRef?.current) {
    master.fromTo(
      promptsUiUxCardRef.current,
      { y: 70, opacity: 0, autoAlpha: 0 },
      {
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 0.26,
        ease: "power2.out",
        immediateRender: false
      },
      "heroHold-=0.24"
    );
  }

  // --- SCENE 1 -> SCENE 3: Card glides to center & left texts smoothly hide ---
  const headingTargets = [promptsHeadingRef?.current, promptsSecondEl, promptsBottomLeftRef?.current].filter(Boolean);
  if (headingTargets.length) {
    master.to(headingTargets, { opacity: 0, duration: 0.32, ease: "power2.out" }, "extract");
  }
  if (promptsHeroBgEl) {
    master.to(promptsHeroBgEl, { opacity: 0, duration: 0.4, ease: "power2.out" }, "extract");
  }
  if (promptsUiUxCardRef?.current) {
    master.to(
      promptsUiUxCardRef.current,
      {
        x: 0,
        y: 0,
        scale: perspScale,
        opacity: 1,
        duration: 0.42,
        ease: "power2.inOut"
      },
      "extract"
    );
  }
  if (marqueeWorldRef?.current) {
    master.to(marqueeWorldRef.current, { autoAlpha: 1, duration: 0.35 }, "extract+=0.08");
  }

  // --- SCENE 2 & 4: Background Marquee Synchronized With Each Card in Center ---
  if (marqueeRef?.current) {
    // Card 0: Line 0 ("Building the web without limits") centered
    master.set(marqueeRef.current, { x: () => (getMarqueeOffset ? getMarqueeOffset(0) : 0) }, "straighten");

    // Card 1: Line 1 ("Design that sells without compromise") centered as Card 1 rotates to front
    master.to(
      marqueeRef.current,
      {
        x: () => (getMarqueeOffset ? getMarqueeOffset(1) : 0),
        duration: 0.85,
        ease: "power2.inOut"
      },
      "turnToCard1"
    );

    // Card 2: Line 2 ("Design that feels as good as it looks") centered as Card 2 rotates to front
    master.to(
      marqueeRef.current,
      {
        x: () => (getMarqueeOffset ? getMarqueeOffset(2) : 0),
        duration: 0.85,
        ease: "power2.inOut"
      },
      "turnToCard2"
    );

    // Card 3: Line 3 ("We build what moves the future") centered as Card 3 rotates to front
    master.to(
      marqueeRef.current,
      {
        x: () => (getMarqueeOffset ? getMarqueeOffset(3) : 0),
        duration: 0.85,
        ease: "power2.inOut"
      },
      "turnToCard3"
    );
  }

  // --- SCENE 3: Seamless Discrete Handoff (Zero Ghosting, Zero Double Card) ---
  if (cardTransitionWorldRef?.current) {
    master.to(cardTransitionWorldRef.current, { opacity: 1, autoAlpha: 1, duration: 0.01, ease: "none" }, "straighten");
  }
  if (promptsUiUxCardRef?.current) {
    master.to(promptsUiUxCardRef.current, { autoAlpha: 0, opacity: 0, duration: 0.01, ease: "none" }, "straighten");
  }
  if (promptsWorldRef?.current) {
    master.to(promptsWorldRef.current, { autoAlpha: 0, duration: 0.01, ease: "none" }, "straighten");
  }
  master
    .to(
      orbit,
      { angle: 0, split: 0, sideReveal: 0, boxMorph: 0, duration: 0.02, onUpdate: renderOrbit },
      "straighten"
    )
    .to(
      orbit,
      { angle: 0, split: 0, sideReveal: 1, boxMorph: 0, duration: 0.46, ease: "power2.inOut", onUpdate: renderOrbit },
      "sideReveal"
    );

  if (cardOrbitCtaRef?.current) {
    master.to(cardOrbitCtaRef.current, { autoAlpha: 1, duration: 0.34, ease: "power2.out" }, "sideReveal+=0.10");
  }
  master.to(
    orbit,
    { angle: 0, split: 0, sideReveal: 1, boxMorph: 0, duration: 0.06, onUpdate: renderOrbit },
    "sideReveal+=0.46"
  );

  // --- SCENE 4: 3D Box Carousel Rotates ---
  const addBoxTurn = (turnLabel, holdLabel, targetAngle, holdDuration = 0.15) => {
    master
      .to(
        orbit,
        { angle: targetAngle, sideReveal: 1, boxMorph: 1, duration: 0.85, ease: "power2.inOut", onUpdate: renderOrbit },
        turnLabel
      )
      .to(orbit, { split: 8, duration: 0.42, ease: "sine.out", onUpdate: renderOrbit }, turnLabel)
      .to(orbit, { split: 0, duration: 0.43, ease: "sine.inOut", onUpdate: renderOrbit }, `${turnLabel}+=0.42`)
      .to(
        orbit,
        { angle: targetAngle, split: 0, sideReveal: 1, boxMorph: 1, duration: holdDuration, onUpdate: renderOrbit },
        `${turnLabel}+=0.85`
      );
  };

  addBoxTurn("turnToCard1", "card1Front", -Math.PI / 2, 0.15);
  addBoxTurn("turnToCard2", "card2Front", -Math.PI, 0.15);
  addBoxTurn("turnToCard3", "logoFront", (-3 * Math.PI) / 2, 0.15);

  // --- SCENE 5: Camera Zooms Into Center Logo Eye -> Opens "Beyond all limits" ---
  const sideCardsToHide = [
    cardGreenPosRef?.current,
    cardPurplePosRef?.current,
    cardRockPosRef?.current,
    ...logoCardDecorEls
  ].filter(Boolean);

  if (sideCardsToHide.length) {
    master.to(sideCardsToHide, { opacity: 0, duration: 0.20, ease: "power2.out" }, "logoZoom");
  }

  const zoomFadeTargets = [marqueeWorldRef?.current, cardOrbitCtaRef?.current].filter(Boolean);
  if (zoomFadeTargets.length) {
    master.to(zoomFadeTargets, { autoAlpha: 0, duration: 0.20, ease: "power2.out" }, "logoZoom");
  }

  // Background light fades smoothly to deep dark cosmic space
  if (bgLightRef?.current) {
    master.to(bgLightRef.current, { autoAlpha: 0, duration: 0.38, ease: "power2.inOut" }, "logoZoom");
  }
  if (bgDarkRef?.current) {
    master.to(bgDarkRef.current, { autoAlpha: 1, duration: 0.38, ease: "power2.inOut" }, "logoZoom");
  }

  // 1. Camera dives directly into the center icon's glowing eye
  if (neuralStarRef?.current) {
    master.to(
      neuralStarRef.current,
      {
        scale: 36,
        duration: 0.56,
        ease: "power2.in"
      },
      "logoZoom+=0.04"
    );
  }

  if (transitionRigRef?.current) {
    master.to(
      transitionRigRef.current,
      {
        z: 950,
        scale: 2.4,
        duration: 0.56,
        ease: "power2.in"
      },
      "logoZoom+=0.04"
    );
  }

  // 2. Next section opens seamlessly from inside the center icon's eye (expanding circular iris portal)
  if (beyondWorldRef?.current) {
    master.fromTo(
      beyondWorldRef.current,
      {
        autoAlpha: 1,
        scale: 1,
        yPercent: 0,
        clipPath: "circle(0% at 50% 50%)"
      },
      {
        autoAlpha: 1,
        scale: 1,
        yPercent: 0,
        clipPath: "circle(150% at 50% 50%)",
        duration: 0.52,
        ease: "power2.out",
        immediateRender: false
      },
      "logoZoom+=0.24"
    );
  }

  // Eye Iris Shockwave Ring radiating outwards from the icon's eye
  const eyeRingEl = beyondWorldRef?.current?.querySelector(".beyondEyeIrisRing");
  if (eyeRingEl) {
    master.fromTo(
      eyeRingEl,
      { scale: 0.1, opacity: 1 },
      { scale: 4.2, opacity: 0, duration: 0.56, ease: "power2.out", immediateRender: false },
      "logoZoom+=0.24"
    );
  }

  // Transition world hides as the next section completely envelops the view
  if (cardTransitionWorldRef?.current) {
    master.to(cardTransitionWorldRef.current, { opacity: 0, duration: 0.12, ease: "power1.out" }, "logoZoom+=0.48");
  }

  // Center logo settles in Scene 6
  if (beyondStarRef?.current) {
    master.fromTo(
      beyondStarRef.current,
      { scale: 0.6, rotationZ: 0, yPercent: 0, autoAlpha: 0 },
      { scale: 1.0, rotationZ: 0, yPercent: 0, autoAlpha: 1, duration: 0.44, ease: "power2.out", immediateRender: false },
      "logoZoom+=0.34"
    );
  }

  // "Beyond" opens to top-left from the eye portal
  if (beyondTitleRef?.current) {
    master.fromTo(
      beyondTitleRef.current,
      { xPercent: 0, x: 75, yPercent: 28, scale: 0.85, autoAlpha: 0 },
      { xPercent: 0, x: 0, yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.46, ease: "power3.out", immediateRender: false },
      "logoZoom+=0.36"
    );
  }

  // "all limits" opens to bottom-right from the eye portal
  if (limitsTitleRef?.current) {
    master.fromTo(
      limitsTitleRef.current,
      { xPercent: 0, x: -75, yPercent: -28, scale: 0.85, autoAlpha: 0 },
      { xPercent: 0, x: 0, yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.46, ease: "power3.out", immediateRender: false },
      "logoZoom+=0.36"
    );
  }

  if (beyondStarRef?.current) {
    master.to(beyondStarRef.current, { scale: 1, duration: 0.15 }, "beyondHold");
  }

  if (beyondWorldRef?.current) {
    master.to(beyondWorldRef.current, { yPercent: -100, autoAlpha: 0, duration: 0.8, ease: "power2.inOut" }, "projects");
  }
  if (beyondTitleRef?.current) {
    master.to(beyondTitleRef.current, { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, "projects");
  }
  if (limitsTitleRef?.current) {
    master.to(limitsTitleRef.current, { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, "projects");
  }
  if (beyondStarRef?.current) {
    master.to(beyondStarRef.current, { yPercent: -30, scale: 0.85, autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, "projects");
  }

  // --- SCENE 7: Projects Horizontal Track ---
  if (projectsWorldRef?.current) {
    master.to(
      projectsWorldRef.current,
      {
        xPercent: 0,
        yPercent: 0,
        autoAlpha: 1,
        filter: "none",
        duration: 0.85,
        ease: "power2.inOut"
      },
      "projects"
    );
  }

  const projectCards = projectTrackRef?.current
    ? Array.from(projectTrackRef.current.querySelectorAll(".projectPanel"))
    : [];
  const numProjectSteps = Math.max(1, projectCards.length - 1);
  const panStart = 7.0;
  const panEnd = 8.7;
  const stepDuration = (panEnd - panStart) / numProjectSteps;
  const getStepX = (stepIdx) => () => -(getProjectDistance() * (stepIdx / numProjectSteps));

  if (projectTrackRef?.current) {
    for (let s = 0; s < numProjectSteps; s++) {
      const stepStartTime = panStart + s * stepDuration;
      const nextCardIdx = s + 1;

      master.to(
        projectTrackRef.current,
        {
          x: getStepX(nextCardIdx),
          duration: stepDuration * 0.85,
          ease: "power2.inOut"
        },
        stepStartTime
      );
    }

    master.to(projectTrackRef.current, { x: getStepX(4), duration: 0.7 }, 8.7);
  }

  if (projectsWorldRef?.current) {
    master.to(
      projectsWorldRef.current,
      {
        xPercent: -100,
        yPercent: 100,
        rotationZ: -5,
        scale: 0.85,
        autoAlpha: 0,
        filter: "none",
        duration: 0.85,
        ease: "power2.inOut"
      },
      9.4
    );
  }

  // --- SCENE 8: Spatial Gallery Batch 1 & Batch 2 (9.40 -> 12.35) ---
  const b1Nodes = (batch1NodesRef?.current || []).filter(Boolean);

  if (galleryWorldRef?.current) {
    master
      .set(galleryWorldRef.current, { autoAlpha: 1, filter: "none" }, 9.4)
      .fromTo(
        galleryWorldRef.current,
        {
          xPercent: 100,
          yPercent: -100,
          scale: 1,
          autoAlpha: 1,
          filter: "none"
        },
        {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          autoAlpha: 1,
          filter: "none",
          duration: 0.85,
          ease: "power2.out",
          immediateRender: false
        },
        9.4
      );
  }

  // Staggered 3D spatial assembly with cinematic curved depth
  b1Nodes.forEach((node, i) => {
    if (!node) return;
    const preset = B1_ENTRANCE_OFFSETS[i] || { x: 50, y: -40, z: -80, rotZ: 0, scale: 0.85 };
    const cfg = B1_LEVEL_CONFIG[i] || { rotY: 0, rotX: 0, rotZ: 0, z: 0 };
    const staggerDelay = (i % 4) * 0.04 + Math.floor(i / 4) * 0.05;
    master.fromTo(
      node,
      {
        x: preset.x,
        y: preset.y,
        z: preset.z,
        rotationY: cfg.rotY * 1.8,
        rotationX: cfg.rotX * 1.8,
        rotationZ: preset.rotZ,
        scale: preset.scale,
        opacity: 0,
        filter: "none"
      },
      {
        x: 0,
        y: 0,
        z: cfg.z,
        rotationY: cfg.rotY,
        rotationX: cfg.rotX,
        rotationZ: cfg.rotZ,
        scale: 1,
        opacity: 1,
        filter: "none",
        duration: 0.85,
        ease: "power3.out",
        immediateRender: false
      },
      9.4 + staggerDelay
    );
  });

  // Editorial Stage Fly-Through & Balanced Spatial Presentation
  const editorialStage = galleryWorldRef?.current?.querySelector(".editorialStage");
  const faceFront = editorialStage?.querySelector(".editorialFaceFront");
  const faceBack = editorialStage?.querySelector(".editorialFaceBack");

  if (editorialStage && faceFront && faceBack) {
    gsap.set(editorialStage, {
      transformPerspective: 1400,
      transformOrigin: "center center",
      rotationY: 0,
      rotationX: 0,
      rotationZ: 0,
      z: 0,
      scale: 1.0
    });

    master.set(faceFront, { xPercent: 0, yPercent: 0, opacity: 1, autoAlpha: 1, scale: 1 }, 9.4);
    master.set(faceBack, { xPercent: -110, yPercent: -110, opacity: 0, autoAlpha: 0, scale: 0.92 }, 9.4);

    // Smooth camera dolly into the curved spatial amphitheater
    master.fromTo(
      editorialStage,
      {
        rotationY: -3,
        rotationX: 2.5,
        z: -60,
        scale: 0.96
      },
      {
        rotationY: 0,
        rotationX: 0,
        z: 0,
        scale: 1.0,
        duration: 0.95,
        ease: "power2.out",
        immediateRender: false
      },
      9.4
    );

    master.to(
      faceFront,
      {
        xPercent: 110,
        yPercent: 110,
        opacity: 0,
        autoAlpha: 0,
        scale: 0.9,
        duration: 1.35,
        ease: "power2.inOut"
      },
      10.7
    );

    master.fromTo(
      faceBack,
      {
        xPercent: -110,
        yPercent: -110,
        opacity: 0,
        autoAlpha: 1,
        scale: 0.92
      },
      {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
        autoAlpha: 1,
        scale: 1,
        duration: 1.35,
        ease: "power2.out",
        immediateRender: false
      },
      10.8
    );

    master.to(
      editorialStage,
      {
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        z: 0,
        scale: 1,
        duration: 1.35,
        ease: "power2.out"
      },
      10.8
    );

    const backLeftContent = faceBack.querySelector(".finalLeftContent");
    if (backLeftContent) {
      master.fromTo(
        backLeftContent,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", immediateRender: false },
        11.6
      );
    }

    const backRightContent = faceBack.querySelector(".finalRightContent");
    if (backRightContent) {
      master.fromTo(
        backRightContent,
        { opacity: 0, x: 45, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.65, ease: "power2.out", immediateRender: false },
        11.65
      );
    }

    master.set(
      faceBack,
      {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
        autoAlpha: 1,
        scale: 1
      },
      12.15
    );
    master.set(
      editorialStage,
      {
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        z: 0,
        scale: 1
      },
      12.15
    );
  }

  if (finalWorldRef?.current) {
    gsap.set(finalWorldRef.current, { autoAlpha: 0 });
  }

  return {
    panStart,
    stepDuration
  };
};
