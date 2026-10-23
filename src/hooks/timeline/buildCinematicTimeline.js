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
  portalTextRef,
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
  promptsUiUxOffset,
  orbit,
  renderOrbit,
  getCachedCardScales,
  getProjectDistance,
  getProjectEnterX,
  getMarqueeOffset
}) => {
  // Clean, zero-dead-zone timeline labels
  master.addLabel("portalStart", 0.0);
  master.addLabel("heroEnter", 0.02);
  master.addLabel("heroHold", 1.05);
  master.addLabel("extract", 1.45);
  master.addLabel("straighten", 1.95);
  master.addLabel("singleCardHold", 2.05);
  master.addLabel("sideReveal", 2.08);
  master.addLabel("card0Front", 2.50);
  master.addLabel("turnToCard1", 2.55);
  master.addLabel("card1Front", 3.52);
  master.addLabel("turnToCard2", 3.62);
  master.addLabel("card2Front", 4.62);
  master.addLabel("turnToCard3", 4.72);
  master.addLabel("logoFront", 5.72);
  master.addLabel("logoZoom", 5.82);
  master.addLabel("beyondHold", 6.77);
  master.addLabel("projects", 6.92);
  master.addLabel("projectsStart", 7.82); // Card 0: Brand & Identity
  master.addLabel("projCard1", 8.42);     // Card 1: E-commerce Development
  master.addLabel("projectsMid", 9.02);   // Card 2: Cloud & Infrastructure
  master.addLabel("projCard3", 9.62);     // Card 3: Software Engineering
  master.addLabel("projectsEnd", 10.22);  // Card 4: ERP & Business Systems (Equal 0.60 hold, centered)
  master.addLabel("gallery1", 10.82);     // Seamless cross-transition: Section 1 moves left, Section 2 enters top-right
  master.addLabel("gallery1Hold", 11.67); // Spatial Gallery Batch 1 (Fully Assembled)
  master.addLabel("gallery2", 12.30);     // Flip to Face 2 ("Build beyond.")
  master.addLabel("gallery2Hold", 13.15);
  master.addLabel("finalHold", 13.80);

  const promptsHeroBgEl = promptsCardRef?.current?.querySelector(".promptsHeroBg");
  const heroCardBottomEl = promptsUiUxCardRef?.current?.querySelector(".orbitCardBottom");
  const promptsSecondEl = promptsCardRef?.current?.querySelector(".promptsSecondDiv");
  const logoCardDecorEls = cardNeuralPosRef?.current
    ? Array.from(cardNeuralPosRef.current.querySelectorAll(".logoCardBadge, .logoCardBottom, .logoCardBg"))
    : [];

  // --- SCENE 0 -> SCENE 1: Center HAULO SERVICE moves smoothly to the top side ---
  if (portalTopWordRef?.current) {
    master.to(
      portalTopWordRef.current,
      {
        yPercent: -120,
        y: -60,
        opacity: 0,
        duration: 0.85,
        ease: "power2.inOut"
      },
      "heroEnter"
    );
  }
  if (portalBottomWordRef?.current) {
    master.to(
      portalBottomWordRef.current,
      {
        yPercent: -120,
        y: -60,
        opacity: 0,
        duration: 0.85,
        ease: "power2.inOut"
      },
      "heroEnter"
    );
  }
  if (portalTextRef?.current) {
    master.to(
      portalTextRef.current,
      {
        y: -60,
        duration: 0.85,
        ease: "power2.inOut"
      },
      "heroEnter"
    );
  }
  if (portalGlowRef?.current) {
    master.to(
      portalGlowRef.current,
      {
        y: -80,
        scaleX: 1.6,
        scaleY: 1.2,
        opacity: 0,
        duration: 0.85,
        ease: "power2.inOut"
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

  // Rolls-Royce Luxury entrance: triggered once the section is fully revealed on screen
  const heroTargetsIn = [promptsHeadingRef?.current, promptsSecondEl, promptsBottomLeftRef?.current].filter(Boolean);
  if (heroTargetsIn.length) {
    master.fromTo(
      heroTargetsIn,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.16,
        ease: "power2.out",
        immediateRender: false
      },
      "heroEnter+=0.25"
    );
  }

  if (promptsUiUxCardRef?.current) {
    master.fromTo(
      promptsUiUxCardRef.current,
      { y: 45, x: promptsUiUxOffset, opacity: 0, autoAlpha: 0, scale: 1 },
      {
        y: 0,
        x: promptsUiUxOffset,
        opacity: 1,
        autoAlpha: 1,
        scale: 1,
        duration: 0.85,
        ease: "power2.out",
        immediateRender: false
      },
      "heroEnter+=0.30"
    );
    if (heroCardBottomEl) {
      master.set(heroCardBottomEl, { opacity: 0, autoAlpha: 0, display: "none" }, "heroEnter");
    }
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
        scale: 1.0,
        opacity: 1,
        duration: 0.46,
        ease: "power2.inOut"
      },
      "extract"
    );
    if (heroCardBottomEl) {
      master.fromTo(
        heroCardBottomEl,
        { opacity: 0, autoAlpha: 0 },
        { opacity: 1, autoAlpha: 1, duration: 0.32, ease: "power2.out", immediateRender: false },
        "extract+=0.10"
      );
    }
  }
  if (marqueeWorldRef?.current) {
    master.to(marqueeWorldRef.current, { autoAlpha: 1, duration: 0.35 }, "extract+=0.04");
  }

  // --- SCENE 2 & 4: Background Marquee Synchronized With Each Card in Center ---
  if (marqueeRef?.current) {
    // Card 0: Line 0 ("Building the web without limits") comes from right side smoothly into center
    const getInitialMarqueeX = () => {
      const base0 = getMarqueeOffset ? getMarqueeOffset(0) : 0;
      return base0 + Math.round(window.innerWidth * 0.55);
    };

    master.fromTo(
      marqueeRef.current,
      { x: getInitialMarqueeX },
      {
        x: () => (getMarqueeOffset ? getMarqueeOffset(0) : 0),
        duration: 0.46,
        ease: "power2.out",
        immediateRender: false
      },
      "extract"
    );

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
    master.to(cardTransitionWorldRef.current, { opacity: 1, autoAlpha: 1, display: "block", duration: 0.01, ease: "none" }, "straighten");
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
      { angle: 0, split: 0, sideReveal: 1, boxMorph: 1, duration: 0.46, ease: "power2.inOut", onUpdate: renderOrbit },
      "sideReveal"
    );

  if (cardOrbitCtaRef?.current) {
    master.to(cardOrbitCtaRef.current, { autoAlpha: 1, duration: 0.34, ease: "power2.out" }, "sideReveal+=0.10");
  }
  master.to(
    orbit,
    { angle: 0, split: 0, sideReveal: 1, boxMorph: 1, duration: 0.06, onUpdate: renderOrbit },
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

  // 1. Camera dives directly into the center icon's left eye
  if (neuralStarRef?.current) {
    master.to(
      neuralStarRef.current,
      {
        scale: 36,
        transformOrigin: "50% 50%",
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

  // 2. Next section opens seamlessly from inside the logo's left eye (expanding circular iris portal)
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

  // Transition world and all 3D orbit cards hide completely as the next section envelops the view
  if (cardTransitionWorldRef?.current) {
    master.to(
      cardTransitionWorldRef.current,
      { opacity: 0, autoAlpha: 0, display: "none", duration: 0.12, ease: "power1.out" },
      "logoZoom+=0.48"
    );
  }
  const allOrbitCards = [
    cardGreenPosRef?.current,
    cardPurplePosRef?.current,
    cardRockPosRef?.current,
    cardNeuralPosRef?.current
  ].filter(Boolean);
  if (allOrbitCards.length) {
    master.to(allOrbitCards, { opacity: 0, autoAlpha: 0, duration: 0.12, ease: "power1.out" }, "logoZoom+=0.48");
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

  // Hero headline glides up smoothly from bottom
  if (beyondTitleRef?.current) {
    master.fromTo(
      beyondTitleRef.current,
      { y: 70, scale: 1, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 0.52, ease: "power3.out", immediateRender: false },
      "logoZoom+=0.30"
    );
  }

  // Divider glides up smoothly
  const dividerEl = beyondWorldRef?.current?.querySelector(".beyondDivider");
  if (dividerEl) {
    master.fromTo(
      dividerEl,
      { y: 50, scaleX: 0.85, autoAlpha: 0 },
      { y: 0, scaleX: 1, autoAlpha: 1, duration: 0.50, ease: "power3.out", immediateRender: false },
      "logoZoom+=0.33"
    );
  }

  // Supporting statement & metrics glide up smoothly from bottom with staggered timing
  if (limitsTitleRef?.current) {
    master.fromTo(
      limitsTitleRef.current,
      { y: 70, scale: 1, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 0.54, ease: "power3.out", immediateRender: false },
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
        duration: 0.5,
        ease: "power2.inOut"
      },
      "projects"
    );
  }

  // Slow, silky-smooth card entrance: Card 0 glides gracefully from the right side into center
  if (projectTrackRef?.current) {
    master.fromTo(
      projectTrackRef.current,
      { x: () => (getProjectEnterX ? getProjectEnterX() : Math.round(window.innerWidth * 0.65)) },
      {
        x: 0,
        duration: 1.05,
        ease: "power2.inOut",
        immediateRender: false
      },
      "projects"
    );
  }

  const panStart = 7.82;
  const stepDuration = 0.60;
  const getStepX = (stepIdx) => () => {
    const cardEl = projectTrackRef?.current?.querySelector(".projectPanel");
    if (!cardEl) return 0;
    const cardW = cardEl.offsetWidth;
    const gap = window.innerWidth <= 768 ? 14 : 28;
    return -stepIdx * (cardW + gap);
  };

  if (projectTrackRef?.current) {
    // Step from Card 0 (Brand & Identity) -> Card 1 (E-commerce Development)
    master.to(
      projectTrackRef.current,
      { x: getStepX(1), duration: 0.52, ease: "power2.inOut" },
      "projectsStart+=0.04"
    );

    // Step from Card 1 (E-commerce Development) -> Card 2 (Cloud & Infrastructure)
    master.to(
      projectTrackRef.current,
      { x: getStepX(2), duration: 0.52, ease: "power2.inOut" },
      "projCard1+=0.04"
    );

    // Step from Card 2 (Cloud & Infrastructure) -> Card 3 (Software Engineering)
    master.to(
      projectTrackRef.current,
      { x: getStepX(3), duration: 0.52, ease: "power2.inOut" },
      "projectsMid+=0.04"
    );

    // Step from Card 3 (Software Engineering) -> Card 4 (ERP & Business Systems)
    master.to(
      projectTrackRef.current,
      { x: getStepX(4), duration: 0.52, ease: "power2.inOut" },
      "projCard3+=0.04"
    );

    // First image section moves smoothly to the left as second image section enters
    master.to(
      projectTrackRef.current,
      {
        x: () => {
          const cardEl = projectTrackRef?.current?.querySelector(".projectPanel");
          const cardW = cardEl ? cardEl.offsetWidth : 440;
          const gap = window.innerWidth <= 768 ? 14 : 28;
          return -6.5 * (cardW + gap) - window.innerWidth * 0.4;
        },
        duration: 0.85,
        ease: "power2.inOut"
      },
      "gallery1"
    );
  }

  // First image section track moves smoothly to the left, world layer fades cleanly without translating
  if (projectsWorldRef?.current) {
    master.to(
      projectsWorldRef.current,
      {
        autoAlpha: 0,
        duration: 0.85,
        ease: "power2.inOut"
      },
      "gallery1"
    );
    master.set(
      projectsWorldRef.current,
      { display: "none" },
      "gallery1Hold"
    );
  }

  // --- SCENE 8: Gallery world fades in full-screen (NO sliding box or boundary cut) ---
  const b1Nodes = (batch1NodesRef?.current || []).filter(Boolean);

  if (galleryWorldRef?.current) {
    master
      .set(
        galleryWorldRef.current,
        {
          display: "block",
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          filter: "none"
        },
        "gallery1"
      )
      .fromTo(
        galleryWorldRef.current,
        {
          autoAlpha: 0,
          filter: "none"
        },
        {
          autoAlpha: 1,
          filter: "none",
          duration: 0.75,
          ease: "power2.out",
          immediateRender: false
        },
        "gallery1"
      );
  }

  // Staggered 3D spatial assembly with cinematic curved depth
  b1Nodes.forEach((node, i) => {
    if (!node) return;
    const preset = B1_ENTRANCE_OFFSETS[i] || { x: 50, y: -40, z: -80, rotZ: 0, scale: 0.85 };
    const cfg = B1_LEVEL_CONFIG[i] || { rotY: 0, rotX: 0, rotZ: 0, z: 0 };
    const staggerDelay = (i % 4) * 0.03 + Math.floor(i / 4) * 0.03;
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
        duration: 0.82,
        ease: "power2.out",
        immediateRender: false
      },
      `gallery1+=${staggerDelay}`
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

    master.set(faceFront, { xPercent: 0, yPercent: 0, opacity: 1, autoAlpha: 1, scale: 1 }, "gallery1");
    master.set(faceBack, { xPercent: -110, yPercent: -110, opacity: 0, autoAlpha: 0, scale: 0.92 }, "gallery1");

    // Smooth glide from top-right into the spatial amphitheater (cards only, transparent stage)
    master.fromTo(
      editorialStage,
      {
        xPercent: 40,
        yPercent: -28,
        rotationY: -5,
        rotationX: 3.5,
        z: -80,
        scale: 0.92,
        autoAlpha: 0
      },
      {
        xPercent: 0,
        yPercent: 0,
        rotationY: 0,
        rotationX: 0,
        z: 0,
        scale: 1.0,
        autoAlpha: 1,
        duration: 0.85,
        ease: "power2.out",
        immediateRender: false
      },
      "gallery1"
    );

    master.to(
      faceFront,
      {
        xPercent: 110,
        yPercent: 110,
        opacity: 0,
        autoAlpha: 0,
        scale: 0.9,
        duration: 0.90,
        ease: "power2.inOut"
      },
      "gallery2"
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
        duration: 0.90,
        ease: "power2.out",
        immediateRender: false
      },
      "gallery2+=0.04"
    );

    master.to(
      editorialStage,
      {
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        z: 0,
        scale: 1,
        duration: 0.90,
        ease: "power2.out"
      },
      "gallery2+=0.04"
    );

    const backLeftContent = faceBack.querySelector(".finalLeftContent");
    if (backLeftContent) {
      master.fromTo(
        backLeftContent,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", immediateRender: false },
        "gallery2+=0.35"
      );
    }

    const backRightContent = faceBack.querySelector(".finalRightContent");
    if (backRightContent) {
      master.fromTo(
        backRightContent,
        { opacity: 0, x: 45, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.70, ease: "power2.out", immediateRender: false },
        "gallery2+=0.40"
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
      "gallery2Hold"
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
      "gallery2Hold"
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
