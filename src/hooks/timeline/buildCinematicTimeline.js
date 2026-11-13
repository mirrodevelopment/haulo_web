/**
 * buildCinematicTimeline.js
 * Master GSAP ScrollTrigger timeline construction for Scenes 0 through 9.
 * Fully null-safe: checks all ref.current and filters array targets to prevent GSAP warnings/exceptions.
 */

import gsap from "gsap";
import { B1_ENTRANCE_OFFSETS, B1_LEVEL_CONFIG, B1_EXIT_VECTORS } from "./timelineConstants";

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
  promptsUiUxOffsetY = 0,
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
  master.addLabel("projectsEnd", 10.22);  // Card 4: ERP & Business Systems (Hold, centered)
  master.addLabel("gallery1", 10.35);     // Panoramic transition with gap matching user reference
  master.addLabel("gallery1Hold", 11.15); // 1st Scroll: First image section (Fully Assembled Baseline)
  master.addLabel("galleryDim1Forward", 11.95); // 2nd Scroll: Second image section (Mobile spotlight, rear nodes forward)
  master.addLabel("gallery2Hold", 12.80); // 3rd Scroll: Camera moves inside cosmic-vortex.webp, then open next section!
  master.addLabel("finalHold", 13.50);

  const promptsHeroBgEl = promptsCardRef?.current?.querySelector(".promptsHeroBg");
  const heroCardBottomEl = promptsUiUxCardRef?.current?.querySelector(".orbitCardBottom");
  const promptsSecondEl = promptsCardRef?.current?.querySelector(".promptsSecondDiv");
  const logoCardDecorEls = cardNeuralPosRef?.current
    ? Array.from(cardNeuralPosRef.current.querySelectorAll(".logoCardBadge, .logoCardBottom, .logoCardBg, .logoCardBgImg"))
    : [];

  // --- SCENE 0 -> SCENE 1: Portal Intro yields to Hero Section ---
  if (portalWorldRef?.current) {
    master.to(
      portalWorldRef.current,
      {
        autoAlpha: 0,
        duration: 0.45,
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
        xPercent: -50,
        yPercent: -50,
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

  // Heading & action buttons entrance in master timeline so they are always visible and scrubbable at heroHold!
  const heroTargetsIn = [promptsHeadingRef?.current, promptsSecondEl, promptsBottomLeftRef?.current].filter(Boolean);
  if (heroTargetsIn.length) {
    master.fromTo(
      heroTargetsIn,
      { y: 35, opacity: 0, autoAlpha: 0 },
      { y: 0, opacity: 1, autoAlpha: 1, duration: 0.55, stagger: 0.10, ease: "power2.out", immediateRender: false },
      "heroEnter+=0.15"
    );
  }

  if (promptsUiUxCardRef?.current) {
    master.fromTo(
      promptsUiUxCardRef.current,
      { y: 35 + promptsUiUxOffsetY, x: promptsUiUxOffset, opacity: 0, autoAlpha: 0, scale: 1 },
      { y: promptsUiUxOffsetY, x: promptsUiUxOffset, opacity: 1, autoAlpha: 1, scale: 1, duration: 0.65, ease: "power2.out", immediateRender: false },
      "heroEnter+=0.18"
    );
    if (heroCardBottomEl) {
      master.set(heroCardBottomEl, { opacity: 0, autoAlpha: 0, display: "none" }, "portalStart");
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
        scale: 1.0, // Maintain exact same size (no decrease) while moving to center
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
    master.to(marqueeWorldRef.current, { autoAlpha: 1, duration: 0.35, ease: "power2.out" }, "extract+=0.10");
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

  // --- SCENE 4: 3D Box Carousel Rotates (Static radius & scale, no pulsing) ---
  const addBoxTurn = (turnLabel, holdLabel, targetAngle, holdDuration = 0.15) => {
    master
      .to(
        orbit,
        { angle: targetAngle, split: 0, sideReveal: 1, boxMorph: 1, duration: 0.85, ease: "power2.inOut", onUpdate: renderOrbit },
        turnLabel
      )
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
    cardRockPosRef?.current
  ].filter(Boolean);

  // Immediately hide side cards and ghosted background faces with zero bleed-through
  if (sideCardsToHide.length) {
    master.to(
      sideCardsToHide,
      { autoAlpha: 0, opacity: 0, duration: 0.10, ease: "power2.out" },
      "logoZoom"
    );
  }

  // Fade out card decorations cleanly
  if (logoCardDecorEls.length) {
    master.to(
      logoCardDecorEls,
      { autoAlpha: 0, opacity: 0, duration: 0.18, ease: "power2.out" },
      "logoZoom"
    );
  }

  const zoomFadeTargets = [marqueeWorldRef?.current, cardOrbitCtaRef?.current].filter(Boolean);
  if (zoomFadeTargets.length) {
    master.to(zoomFadeTargets, { autoAlpha: 0, duration: 0.16, ease: "power2.out" }, "logoZoom");
  }

  // Background light fades smoothly to deep dark cosmic space
  if (bgLightRef?.current) {
    master.to(bgLightRef.current, { autoAlpha: 0, duration: 0.38, ease: "power2.inOut" }, "logoZoom");
  }
  if (bgDarkRef?.current) {
    master.to(bgDarkRef.current, { autoAlpha: 1, duration: 0.38, ease: "power2.inOut" }, "logoZoom");
  }

  // 1. Fade out 3D Carousel frame smoothly so Haulo Mascot Logo takes center stage
  if (transitionRigRef?.current) {
    master.to(
      transitionRigRef.current,
      {
        autoAlpha: 0,
        scale: 1.25,
        duration: 0.38,
        ease: "power2.in",
        force3D: true
      },
      "logoZoom"
    );
  }

  // 2. HAULO ICON LOGO mascot emerges in the center, and portal bursts from its eyes
  if (neuralStarRef?.current) {
    master.fromTo(
      neuralStarRef.current,
      { autoAlpha: 0, scale: 0.8, yPercent: 0 },
      {
        autoAlpha: 1,
        scale: 1.18,
        transformOrigin: "50% 50%",
        duration: 0.40,
        ease: "power2.out",
        force3D: true
      },
      "logoZoom"
    );
    master.to(
      neuralStarRef.current,
      {
        scale: 3.4,
        autoAlpha: 0,
        duration: 0.42,
        ease: "power2.in",
        force3D: true
      },
      "logoZoom+=0.26"
    );
  }

  // 3. High-performance Dual-Eye Cosmic Portal bursting directly from Haulo Mascot eyes
  const cachedLeftEyeCircle = document.getElementById("portalLeftEye");
  const cachedRightEyeCircle = document.getElementById("portalRightEye");
  const cachedLeftEyeMask = document.getElementById("portalLeftEyeMask");
  const cachedRightEyeMask = document.getElementById("portalRightEyeMask");
  const leftEyePair = [cachedLeftEyeCircle, cachedLeftEyeMask].filter(Boolean);
  const rightEyePair = [cachedRightEyeCircle, cachedRightEyeMask].filter(Boolean);

  const maxPortalRadius = Math.max(window.innerWidth, window.innerHeight) * 1.5;
  // Eye coordinates precisely matched to Haulo Mascot sunglasses/pupil centers:
  // spread: 52px apart horizontally, dy: -32px upward from vertical center
  const portalState = { r: 0, spread: 52, dy: -32 };

  if (beyondWorldRef?.current) {
    // 1. Smooth fade-in: portal emerges as circles expand outward from the mascot's eyes
    master.fromTo(
      beyondWorldRef.current,
      {
        autoAlpha: 0,
        opacity: 0,
        scale: 1,
        yPercent: 0,
        mask: "url(#eyesPortalMask)",
        WebkitMask: "url(#eyesPortalMask)"
      },
      {
        autoAlpha: 1,
        opacity: 1,
        duration: 0.16,
        ease: "power2.out",
        immediateRender: false
      },
      "logoZoom+=0.16"
    );

    // 2. Feathered dual-eye portal expands from inside mascot eye lenses outward into the cosmos
    master.fromTo(
      portalState,
      { r: 0, spread: 52, dy: -32 },
      {
        r: maxPortalRadius,
        spread: 120,
        dy: 10,
        duration: 0.54,
        ease: "power2.inOut",
        immediateRender: false,
        onUpdate: () => {
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2 + portalState.dy;

          const rVal = Math.max(0, portalState.r).toFixed(1);
          const leftCx = (cx - portalState.spread).toFixed(1);
          const rightCx = (cx + portalState.spread).toFixed(1);
          const cyVal = cy.toFixed(1);

          for (let i = 0; i < leftEyePair.length; i++) {
            leftEyePair[i].setAttribute("cx", leftCx);
            leftEyePair[i].setAttribute("cy", cyVal);
            leftEyePair[i].setAttribute("r", rVal);
          }
          for (let i = 0; i < rightEyePair.length; i++) {
            rightEyePair[i].setAttribute("cx", rightCx);
            rightEyePair[i].setAttribute("cy", cyVal);
            rightEyePair[i].setAttribute("r", rVal);
          }
        }
      },
      "logoZoom+=0.16"
    );

    master.set(beyondWorldRef.current, { mask: "none", WebkitMask: "none", clipPath: "none" }, "logoZoom+=0.70");
  }

  // Transition world and all 3D orbit cards hide completely as the aperture pinches shut
  if (cardTransitionWorldRef?.current) {
    master.to(
      cardTransitionWorldRef.current,
      { opacity: 0, autoAlpha: 0, display: "none", duration: 0.12, ease: "power1.out" },
      "logoZoom+=0.64"
    );
  }
  const allOrbitCards = [
    cardGreenPosRef?.current,
    cardPurplePosRef?.current,
    cardRockPosRef?.current,
    cardNeuralPosRef?.current
  ].filter(Boolean);
  if (allOrbitCards.length) {
    master.to(allOrbitCards, { opacity: 0, autoAlpha: 0, duration: 0.12, ease: "power1.out" }, "logoZoom+=0.64");
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

  // Scene 6 Circular Iris Portal Reveal: Text is revealed organically through the expanding aperture
  if (beyondTitleRef?.current) {
    master.fromTo(
      beyondTitleRef.current,
      { scale: 0.96, autoAlpha: 1 },
      { scale: 1.0, autoAlpha: 1, duration: 0.54, ease: "power2.out", immediateRender: false },
      "logoZoom+=0.16"
    );
  }
  if (limitsTitleRef?.current) {
    master.fromTo(
      limitsTitleRef.current,
      { scale: 0.96, autoAlpha: 1 },
      { scale: 1.0, autoAlpha: 1, duration: 0.54, ease: "power2.out", immediateRender: false },
      "logoZoom+=0.16"
    );
  }

  if (beyondStarRef?.current) {
    master.to(beyondStarRef.current, { scale: 1, autoAlpha: 1, duration: 0.50, ease: "power2.out" }, "logoZoom+=0.40");
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

  // Scene 7 Project Cards: Clean, static same-size alignment (no 3D tilt, no scaling, no entrance bounce)
  if (projectTrackRef?.current) {
    master.set(projectTrackRef.current, { x: 0 }, "projects");

    const projectCards = Array.from(projectTrackRef.current.querySelectorAll(".projectPanel"));
    if (projectCards.length) {
      projectCards.forEach((card) => {
        master.set(
          card,
          {
            rotationY: 0,
            rotationX: 0,
            rotationZ: 0,
            y: 0,
            z: 0,
            scale: 1.0,
            opacity: 1.0
          },
          "projects"
        );
      });
    }
  }

  const panStart = 7.82;
  const stepDuration = 0.60;
  const getStepX = (stepIdx) => () => {
    const trackEl = projectTrackRef?.current;
    if (!trackEl) return 0;
    const cards = trackEl.querySelectorAll(".projectPanel");
    if (!cards || !cards[0]) return 0;
    if (!cards[stepIdx]) {
      const cardW = cards[0].offsetWidth;
      let gap = 32;
      const computedGap = parseFloat(window.getComputedStyle(trackEl).gap);
      if (!isNaN(computedGap)) gap = computedGap;
      return -stepIdx * (cardW + gap);
    }
    const center0 = cards[0].offsetLeft + cards[0].offsetWidth / 2;
    const centerTarget = cards[stepIdx].offsetLeft + cards[stepIdx].offsetWidth / 2;
    return -(centerTarget - center0);
  };

  if (projectTrackRef?.current) {
    // Step from Card 0 (Brand & Identity) -> Card 1 (E-commerce Development)
    master.to(
      projectTrackRef.current,
      { x: getStepX(1), duration: 0.54, ease: "sine.inOut" },
      "projectsStart+=0.02"
    );

    // Step from Card 1 (E-commerce Development) -> Card 2 (Cloud & Infrastructure)
    master.to(
      projectTrackRef.current,
      { x: getStepX(2), duration: 0.54, ease: "sine.inOut" },
      "projCard1+=0.02"
    );

    // Step from Card 2 (Cloud & Infrastructure) -> Card 3 (Software Engineering)
    master.to(
      projectTrackRef.current,
      { x: getStepX(3), duration: 0.54, ease: "sine.inOut" },
      "projectsMid+=0.02"
    );

    // Step from Card 3 (Software Engineering) -> Card 4 (ERP & Business Systems)
    master.to(
      projectTrackRef.current,
      { x: getStepX(4), duration: 0.54, ease: "sine.inOut" },
      "projCard3+=0.02"
    );

    // Section 7 glides smoothly into the distance and fades as Section 8 emerges
    master.to(
      projectTrackRef.current,
      {
        x: () => {
          const startX = getStepX(4)();
          return startX - window.innerWidth * 0.95;
        },
        duration: 0.70,
        ease: "power2.inOut"
      },
      "gallery1"
    );
  }

  // Section 7 crossfades seamlessly with Section 8 so there is zero black gap or jump
  if (projectsWorldRef?.current) {
    master.to(
      projectsWorldRef.current,
      {
        autoAlpha: 0,
        duration: 0.55,
        ease: "power2.inOut"
      },
      "gallery1+=0.10"
    );
    master.set(
      projectsWorldRef.current,
      { display: "none", pointerEvents: "none" },
      "gallery1+=0.70"
    );
  }

  // --- SCENE 8: Gallery world enters seamlessly after Section 7 has cleared ---
  const b1Nodes = (batch1NodesRef?.current || []).filter(Boolean);

  if (galleryWorldRef?.current) {
    master
      .set(
        galleryWorldRef.current,
        {
          display: "block",
          pointerEvents: "auto",
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
          duration: 0.60,
          ease: "power2.out",
          immediateRender: false
        },
        "gallery1+=0.02"
      );
  }

    // ==============================================================
    // SCENE 8: SPATIAL GALLERY (SERVICE UNIVERSE) ENTRANCE
    // Smooth cinematic stage lock-in (stable baseline, zero distortion)
    // ==============================================================

  // Editorial Stage Fly-Through & Balanced Spatial Presentation
  const editorialStage = galleryWorldRef?.current?.querySelector(".editorialStage");
  const faceFront = editorialStage?.querySelector(".editorialFaceFront");
  const faceBack = editorialStage?.querySelector(".editorialFaceBack");

  // Dynamic responsive scale for Spatial Gallery: 1:1 viewport matching so CSS handles responsive scaling cleanly
  const getStageScale = (multiplier = 1.0) => {
    return Number((1.0 * multiplier).toFixed(3));
  };

  if (editorialStage && faceFront && faceBack) {
    gsap.set(editorialStage, {
      transformPerspective: 1400,
      transformOrigin: "center center",
      rotationY: 0,
      rotationX: 0,
      rotationZ: 0,
      z: 0,
      scale: () => getStageScale(1.0)
    });

    master.set(faceFront, { xPercent: 0, yPercent: 0, opacity: 1, autoAlpha: 1, scale: 1 }, "gallery1");
    master.set(
      faceBack,
      {
        xPercent: -22,
        yPercent: -18,
        z: -120,
        rotationY: 4,
        rotationX: -3,
        rotationZ: -1.2,
        opacity: 0,
        autoAlpha: 0,
        scale: 0.86,
        transformOrigin: "left top"
      },
      "gallery1"
    );

    // Smooth cinematic stage lock-in (stable, no zoom distortion)
    master.fromTo(
      editorialStage,
      {
        xPercent: 0,
        yPercent: 0,
        rotationY: 0,
        rotationX: 0,
        z: 0,
        scale: () => getStageScale(1.0),
        autoAlpha: 1
      },
      {
        xPercent: 0,
        yPercent: 0,
        rotationY: 0,
        rotationX: 0,
        z: 0,
        scale: () => getStageScale(1.0),
        autoAlpha: 1,
        duration: 0.85,
        ease: "power2.out",
        immediateRender: false
      },
      "gallery1"
    );

    // ==============================================================
    // SCROLL-ACTIVATED 3D FLY-THROUGH FLOW (Face 1)
    // Concept on scroll:
    // 1) Orbital track & 11 platforms come FRONT (surge towards viewer, z: 1150, scale: 2.15, opacity: 0)
    // 2) Concurrently, left-side text content hides (x: -120, opacity: 0)
    // 3) Concurrently, left-bottom side image smoothly goes outside (x: -240, y: 160, opacity: 0)
    // ==============================================================
    // ==============================================================
    // SCROLL-ACTIVATED 3D Z-DEPTH CAMERA FLY-THROUGH (Face 1)
    // Concept on 1st scroll:
    // 1) 3D camera / orbitSystem moves forward in Z-direction, centering Mobile Development
    // 2) Nodes BEFORE Mobile Development (E-Commerce, Web, AI) glide smoothly DOWNWARDS off the bottom
    // 3) Mobile Development advances to hero front-and-center position
    // 4) Nodes AFTER Mobile Development (Content, Brand, Cloud, ERP, Automation, SEO, IoT) move forward to front positions
    // 5) Left-side text slides left & hides, framing beams slide outside
    // ==============================================================
    const orbitSystem = faceFront.querySelector(".universeOrbitSystem");
    const serviceContainer = faceFront.querySelector(".serviceUniverseContainer");
    const skyVortex = faceFront.querySelector(".universeSkyVortex");
    const topBeam = faceFront.querySelector(".universeTopBeam");
    const cornerBeam = faceFront.querySelector(".universeCornerBeam");
    const frameCenter = faceFront.querySelector(".universeCenterFrameImg");

    // 11 Interactive Service Platforms
    const allServiceNodes = faceFront.querySelectorAll(".serviceTrackNode");
    const nodeMobile = faceFront.querySelector(".serviceNode_mobile");
    const nodeEcommerce = faceFront.querySelector(".serviceNode_ecommerce");
    const nodeWeb = faceFront.querySelector(".serviceNode_web");
    const nodeAi = faceFront.querySelector(".serviceNode_ai");
    const nodeContent = faceFront.querySelector(".serviceNode_content");
    const nodeBrand = faceFront.querySelector(".serviceNode_brand");
    const nodeCloud = faceFront.querySelector(".serviceNode_cloud");
    const nodeErp = faceFront.querySelector(".serviceNode_erp");
    const nodeAutomation = faceFront.querySelector(".serviceNode_automation");
    const nodeSeo = faceFront.querySelector(".serviceNode_seo");
    const nodeIot = faceFront.querySelector(".serviceNode_iot");

    if (allServiceNodes && allServiceNodes.length > 0) {
      master.set(
        allServiceNodes,
        {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          opacity: 1
        },
        "gallery1"
      );

      // 11 service platforms emerge with a gentle rise and center-staggered beacon illumination
      master.fromTo(
        allServiceNodes,
        {
          scale: 0.80,
          y: 16,
          opacity: 0
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.60,
          stagger: {
            amount: 0.22,
            from: "center"
          },
          ease: "back.out(1.15)",
          immediateRender: false
        },
        "gallery1+=0.12"
      );
    }

    if (orbitSystem) {
      master.set(
        orbitSystem,
        {
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          rotationZ: 0,
          opacity: 1
        },
        "gallery1"
      );

      // Smooth, majestic 3D cosmic entrance from deep space settling gracefully into the baseline
      master.fromTo(
        orbitSystem,
        {
          x: () => (typeof window !== "undefined" && window.innerWidth <= 900 ? 0 : Math.round(window.innerWidth * 0.08)),
          y: () => (typeof window !== "undefined" && window.innerWidth <= 900 ? 35 : 20),
          z: -260,
          scale: 0.86,
          rotationX: 6,
          rotationY: -5,
          opacity: 0
        },
        {
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power2.out",
          immediateRender: false
        },
        "gallery1+=0.04"
      );

      // 2nd Scroll (gallery1Hold -> galleryDim1Forward):
      // Orbit system moves forward in Z direction and smoothly centers to match Image 2
      master.to(
        orbitSystem,
        {
          x: () => {
            const isSmall = typeof window !== "undefined" && window.innerWidth <= 900;
            return isSmall ? 0 : -Math.round(window.innerWidth * 0.105);
          },
          y: () => {
            const isSmall = typeof window !== "undefined" && window.innerWidth <= 900;
            return isSmall ? -Math.round(window.innerHeight * 0.12) : Math.round(window.innerHeight * 0.015);
          },
          z: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? 140 : 240),
          scale: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? 1.10 : 1.20),
          opacity: 1,
          duration: 0.70,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );

      // 3rd Scroll (galleryDim1Forward -> gallery2Hold):
      // Orbit system flies past camera as viewer dives into cosmic-vortex singularity
      master.to(
        orbitSystem,
        {
          x: () => {
            const isSmall = typeof window !== "undefined" && window.innerWidth <= 900;
            return isSmall ? 0 : -Math.round(window.innerWidth * 0.16);
          },
          y: () => {
            const isSmall = typeof window !== "undefined" && window.innerWidth <= 900;
            return isSmall ? -Math.round(window.innerHeight * 0.22) : Math.round(window.innerHeight * 0.15);
          },
          z: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? 550 : 850),
          scale: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? 1.45 : 1.85),
          opacity: 0,
          duration: 0.50,
          ease: "power2.in"
        },
        "galleryDim1Forward"
      );
    }

    // ==============================================================
    // CENTER FRAME (frame-center.webp) CHOREOGRAPHY
    // Moves to the bottom along with the foreground images on 2nd scroll
    // ==============================================================
    if (frameCenter) {
      master.set(
        frameCenter,
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1
        },
        "gallery1"
      );

      // 2nd Scroll (gallery1Hold -> galleryDim1Forward):
      // The center frame glides smoothly downwards with the descending foreground images
      master.to(
        frameCenter,
        {
          y: () => {
            const isSmall = typeof window !== "undefined" && window.innerWidth <= 900;
            return isSmall ? Math.round(window.innerHeight * 0.08) : Math.round(window.innerHeight * 0.16);
          },
          scale: 1.05,
          duration: 0.70,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );

      // 3rd Scroll (galleryDim1Forward -> gallery2Hold):
      master.to(
        frameCenter,
        {
          y: () => Math.round(window.innerHeight * 0.30),
          scale: 1.30,
          opacity: 0,
          duration: 0.50,
          ease: "power2.in"
        },
        "galleryDim1Forward"
      );
    }

    // Nodes BEFORE Mobile Development (Foreground nodes: E-Commerce, Web, AI, ERP):
    // Smoothly glide in DOWN direction off the bottom edge on 2nd Scroll (gallery1Hold -> galleryDim1Forward)
    if (nodeEcommerce) {
      master.to(
        nodeEcommerce,
        {
          xPercent: -50,
          yPercent: -50,
          y: () => Math.round(window.innerHeight * 0.48),
          z: 130,
          scale: 1.15,
          opacity: 0,
          duration: 0.70,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );
    }

    if (nodeWeb) {
      master.to(
        nodeWeb,
        {
          xPercent: -50,
          yPercent: -50,
          x: -60,
          y: () => Math.round(window.innerHeight * 0.40),
          z: 95,
          scale: 1.10,
          opacity: 0,
          duration: 0.70,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );
    }

    if (nodeAi) {
      master.to(
        nodeAi,
        {
          xPercent: -50,
          yPercent: -50,
          x: 55,
          y: () => Math.round(window.innerHeight * 0.38),
          z: 85,
          scale: 1.05,
          opacity: 0,
          duration: 0.70,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );
    }

    if (nodeErp) {
      master.to(
        nodeErp,
        {
          xPercent: -50,
          yPercent: -50,
          x: 35,
          y: () => Math.round(window.innerHeight * 0.40),
          z: 85,
          scale: 1.05,
          opacity: 0,
          duration: 0.70,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );
    }

    // Mobile Development:
    // 2nd Scroll: advances forward into the hero front focal point (centered and prominent - Image 2)
    if (nodeMobile) {
      master.to(
        nodeMobile,
        {
          xPercent: -50,
          yPercent: -50,
          x: () => {
            const isSmall = typeof window !== "undefined" && window.innerWidth <= 900;
            return isSmall ? 0 : Math.round(window.innerWidth * 0.035);
          },
          y: () => {
            const isSmall = typeof window !== "undefined" && window.innerWidth <= 900;
            return isSmall ? Math.round(window.innerHeight * 0.08) : Math.round(window.innerHeight * 0.16);
          },
          z: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? 180 : 280),
          scale: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? 1.30 : 1.55),
          opacity: 1,
          duration: 0.70,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );

      // 3rd Scroll: surges past camera as viewer enters the cosmic vortex
      master.to(
        nodeMobile,
        {
          xPercent: -50,
          yPercent: -50,
          z: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? 500 : 780),
          scale: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? 1.70 : 2.20),
          opacity: 0,
          duration: 0.50,
          ease: "power2.in"
        },
        "galleryDim1Forward"
      );
    }

    // Nodes AFTER Mobile Development:
    // 2nd Scroll: surge forward into balanced amphitheater FRONT positions (Image 2)
    const rearServiceNodes = [
      {
        el: nodeBrand,
        z: 220,
        scale: 1.38,
        y: () => Math.round(window.innerHeight * 0.16),
        x: () => -Math.round(window.innerWidth * 0.010)
      },
      {
        el: nodeContent,
        z: 210,
        scale: 1.32,
        y: () => Math.round(window.innerHeight * 0.13),
        x: 0
      },
      {
        el: nodeCloud,
        z: 220,
        scale: 1.34,
        y: () => Math.round(window.innerHeight * 0.12),
        x: 0
      },
      {
        el: nodeAutomation,
        z: 260,
        scale: 1.95,
        y: () => Math.round(window.innerHeight * 0.09),
        x: 0
      },
      {
        el: nodeSeo,
        z: 250,
        scale: 2.15,
        y: () => Math.round(window.innerHeight * 0.07),
        x: 0
      },
      {
        el: nodeIot,
        z: 250,
        scale: 2.10,
        y: () => Math.round(window.innerHeight * 0.08),
        x: 0
      }
    ];

    rearServiceNodes.forEach(({ el, z, scale, y, x }) => {
      if (el) {
        // 2nd Scroll: Move to Image 2 framing positions
        master.to(
          el,
          {
            xPercent: -50,
            yPercent: -50,
            x,
            y,
            z,
            scale,
            opacity: 1,
            duration: 0.70,
            ease: "power2.inOut"
          },
          "gallery1Hold"
        );

        // 3rd Scroll: Surge past camera as camera dives into cosmic vortex
        master.to(
          el,
          {
            xPercent: -50,
            yPercent: -50,
            z: z + 380,
            scale: scale * 1.30,
            opacity: 0,
            duration: 0.50,
            ease: "power2.in"
          },
          "galleryDim1Forward"
        );
      }
    });

    // Left-side text content: Elegant slide-in, then hides on 2nd scroll
    if (serviceContainer) {
      master.fromTo(
        serviceContainer,
        {
          x: () => (typeof window !== "undefined" && window.innerWidth <= 900 ? 0 : -65),
          y: () => (typeof window !== "undefined" && window.innerWidth <= 900 ? 25 : 0),
          opacity: 0
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.68,
          ease: "power2.out",
          immediateRender: false
        },
        "gallery1+=0.08"
      );

      // 2nd Scroll: Slides left & fades out
      master.to(
        serviceContainer,
        {
          x: () => (typeof window !== "undefined" && window.innerWidth <= 900 ? 0 : -140),
          y: () => (typeof window !== "undefined" && window.innerWidth <= 900 ? -60 : 0),
          opacity: 0,
          duration: 0.70,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );
    }

    // Left-bottom side spaceship hull / framing beam:
    if (cornerBeam) {
      master.fromTo(
        cornerBeam,
        {
          x: -60,
          y: 45,
          opacity: 0
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.68,
          ease: "power2.out",
          immediateRender: false
        },
        "gallery1+=0.08"
      );

      // 2nd Scroll: Slides away
      master.to(
        cornerBeam,
        {
          x: -260,
          y: 180,
          opacity: 0,
          duration: 0.70,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );
    }

    // Top ceiling beam:
    if (topBeam) {
      master.fromTo(
        topBeam,
        {
          y: -35,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          immediateRender: false
        },
        "gallery1+=0.08"
      );

      // 2nd Scroll: Slides away
      master.to(
        topBeam,
        {
          y: -120,
          opacity: 0,
          duration: 0.65,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );
    }

    // Cosmic sky vortex (cosmic-vortex.webp):
    if (skyVortex) {
      // Step 1: Cosmic sky vortex softly spirals and glows into view for Image 1
      master.fromTo(
        skyVortex,
        {
          scale: 0.86,
          x: 0,
          y: 0,
          rotation: -12,
          opacity: 0
        },
        {
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 0.85,
          duration: 0.70,
          ease: "power2.out",
          immediateRender: false
        },
        "gallery1+=0.04"
      );

      // 2nd Scroll (gallery1Hold -> galleryDim1Forward):
      // Expands circle size and shifts left to frame behind platforms (Image 2 view)
      master.to(
        skyVortex,
        {
          scale: 1.55,
          x: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? -50 : -140),
          y: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? 10 : 25),
          rotation: 10,
          opacity: 0.98,
          duration: 0.70,
          ease: "power2.inOut"
        },
        "gallery1Hold"
      );

      // 3rd Scroll (galleryDim1Forward -> gallery2Hold):
      // CAMERA DIRECTION MOVES DIRECTLY TO INSIDE cosmic-vortex.webp!
      // Center-plunge singularity dive with acceleration
      master.to(
        skyVortex,
        {
          x: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? -Math.round(window.innerWidth * 0.28) : -Math.round(window.innerWidth * 0.40)),
          y: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? Math.round(window.innerHeight * 0.22) : Math.round(window.innerHeight * 0.30)),
          scale: () => (typeof window !== "undefined" && window.innerWidth <= 768 ? 20 : 30),
          rotation: "+=180",
          opacity: 1,
          filter: "drop-shadow(0 0 50px rgba(99, 102, 241, 0.9)) drop-shadow(0 0 100px rgba(0, 240, 255, 0.8)) brightness(2.2)",
          duration: 0.74,
          ease: "power3.inOut"
        },
        "galleryDim1Forward"
      );
    }

    // Keep stage stable and fixed at baseline scale during scrolls
    master.to(
      editorialStage,
      {
        z: 0,
        scale: () => getStageScale(1.0),
        duration: 0.70,
        ease: "none"
      },
      "gallery1Hold"
    );

    // ==============================================================
    // 3RD SCROLL: OPEN NEXT SECTION ("BUILD BEYOND" Face 2)
    // As the camera plunges into the singularity of cosmic-vortex.webp,
    // the next section emerges seamlessly from inside the cosmic wormhole!
    // ==============================================================
    master.to(
      faceFront,
      {
        opacity: 0,
        autoAlpha: 0,
        duration: 0.28,
        ease: "power2.inOut"
      },
      "galleryDim1Forward+=0.42"
    );
    master.set(
      faceFront,
      { display: "none", pointerEvents: "none" },
      "galleryDim1Forward+=0.72"
    );

    master.set(
      faceBack,
      { display: "block", pointerEvents: "auto" },
      "galleryDim1Forward+=0.44"
    );

    master.fromTo(
      faceBack,
      {
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 20,
        z: -180,
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        opacity: 0,
        autoAlpha: 0,
        scale: 0.78
      },
      {
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
        z: 0,
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        opacity: 1,
        autoAlpha: 1,
        scale: 1,
        duration: 0.58,
        ease: "power2.out",
        immediateRender: false
      },
      "galleryDim1Forward+=0.44"
    );

    master.to(
      editorialStage,
      {
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        z: 0,
        scale: 1,
        duration: 0.58,
        ease: "power2.out"
      },
      "galleryDim1Forward+=0.44"
    );

    const backLeftContent = faceBack.querySelector(".finalLeftContent");
    if (backLeftContent) {
      master.fromTo(
        backLeftContent,
        {
          opacity: 0,
          y: 24
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          immediateRender: false
        },
        "galleryDim1Forward+=0.50"
      );
    }

    const backEarthContent = faceBack.querySelector(".finalEarthContent");
    if (backEarthContent) {
      master.fromTo(
        backEarthContent,
        {
          opacity: 0,
          y: 35
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.58,
          ease: "power2.out",
          immediateRender: false
        },
        "galleryDim1Forward+=0.46"
      );
    }

    const backRightContent = faceBack.querySelector(".finalRightContent");
    if (backRightContent) {
      master.fromTo(
        backRightContent,
        {
          opacity: 0,
          x: 25,
          y: 15
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          immediateRender: false
        },
        "galleryDim1Forward+=0.50"
      );
    }

    master.set(
      faceBack,
      {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
        autoAlpha: 1,
        scale: 1,
        rotationZ: 0,
        rotationY: 0,
        rotationX: 0,
        z: 0
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
