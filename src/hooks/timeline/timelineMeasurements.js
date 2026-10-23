/**
 * timelineMeasurements.js
 * Geometric layout measurements and dimensional cache calculations.
 */

import gsap from "gsap";

export const createMeasurementsManager = ({
  boxRadius,
  promptsCardRef,
  promptsUiUxCardRef,
  cardGreenPosRef,
  promptsPinkFillOverlayRef,
  beyondWorldRef,
  batch2NodesRef,
  projectTrackRef,
  marqueeWorldRef,
  marqueeRef
}) => {
  let cachedCardScales = {
    promptsScaleX: 0.25,
    promptsScaleY: 0.3,
    targetRadius: "22px",
    targetBorderWidth: 1.5,
    cardClipPath: "inset(160px 480px 160px 480px round 26px)"
  };

  let cachedExpandCard = {
    popX: 160,
    popY: -180,
    popW: 175,
    popH: 205,
    finalW: 1320,
    finalH: 740
  };

  const getProjectEnterX = () => {
    const cardEl = projectTrackRef?.current?.querySelector(".projectPanel");
    const cardW = cardEl?.offsetWidth || Math.min(window.innerWidth * 0.38, 480);
    return Math.round((window.innerWidth + cardW) * 0.48);
  };

  const getProjectDistance = () =>
    Math.max(0, (projectTrackRef.current?.scrollWidth || 0) - window.innerWidth);

  let cachedMarqueeOffsets = [0, -1450, -3100, -4750];

  const getMarqueeOffset = (sentenceIndex) => {
    return cachedMarqueeOffsets[sentenceIndex] ?? 0;
  };

  const updateCachedMeasurements = () => {
    // 1. Measure Card 0 rendered dimensions and pre-apply counter-scaled radius/border to promptsPinkFillOverlay
    const promptsEl = promptsCardRef.current;
    const cardEl = cardGreenPosRef.current;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let targetW = cardEl?.offsetWidth || 270;
    let targetH = cardEl?.offsetHeight || 405;

    if (cardEl) {
      gsap.set(cardEl, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        z: boxRadius,
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        scale: 1
      });
      const rect = cardEl.getBoundingClientRect();
      if (rect.width > 20 && rect.height > 20) {
        targetW = rect.width;
        targetH = rect.height;
      }
    }

    // Direct 1:1 pixel match between right-side hero card and 3D front card
    if (promptsUiUxCardRef?.current && targetW > 0 && targetH > 0) {
      gsap.set(promptsUiUxCardRef.current, {
        width: Math.round(targetW),
        height: Math.round(targetH)
      });
    }

    const promptsW = promptsEl?.offsetWidth || Math.max(340, Math.min(vw * 0.94, 1560));
    const promptsH = promptsEl?.offsetHeight || Math.max(520, Math.min(vh * 0.86, 880));

    const promptsScaleX = targetH / promptsW;
    const promptsScaleY = targetW / promptsH;

    const baseCardW = cardEl?.offsetWidth || Math.max(240, Math.min(vw * 0.19, 290));
    const visualRatio = targetW / baseCardW;
    const rx = Math.round((22 * visualRatio) / promptsScaleX);
    const ry = Math.round((22 * visualRatio) / promptsScaleY);
    const targetRadius = `${rx}px / ${ry}px`;
    const avgScale = (promptsScaleX + promptsScaleY) / 2;
    const targetBorderWidth = Math.round(((1.5 * visualRatio) / avgScale) * 10) / 10;

    const vInset = Math.max(0, Math.round((vh - targetH) / 2));
    const hInset = Math.max(0, Math.round((vw - targetW) / 2));
    const cardRadius = Math.round(22 * visualRatio);
    const cardClipPath = `inset(${vInset}px ${hInset}px ${vInset}px ${hInset}px round ${cardRadius}px)`;

    cachedCardScales = {
      promptsScaleX,
      promptsScaleY,
      targetRadius,
      targetBorderWidth,
      cardClipPath
    };

    // 2. Measure Gallery Batch 2 Expand Target Card (Slot 3: "Build beyond") for exact size-increase expansion
    const expandTargetEl = batch2NodesRef.current?.[3];
    const baseExpandW = expandTargetEl?.offsetWidth || Math.max(126, Math.min(vw * 0.094, 155));
    const baseExpandH = expandTargetEl?.offsetHeight || Math.max(145, Math.min(vh * 0.22, 185));
    const baseExpandLeft = expandTargetEl?.offsetLeft ?? vw * 0.565;
    const baseExpandTop = expandTargetEl?.offsetTop ?? vh * 0.09;
    cachedExpandCard = {
      popX: Math.round(baseExpandLeft + baseExpandW / 2 - vw / 2),
      popY: Math.round(baseExpandTop + baseExpandH / 2 - vh / 2),
      popW: Math.round(baseExpandW),
      popH: Math.round(baseExpandH),
      finalW: Math.round(Math.min(vw - 16, Math.max(280, Math.min(vw * 0.94, 1560)))),
      finalH: Math.round(Math.min(vh - 32, Math.max(340, Math.min(vh * 0.86, 880))))
    };

    // Statically set counter-scaled border-radius and border-width on promptsPinkFillOverlay once
    if (promptsPinkFillOverlayRef.current) {
      gsap.set(promptsPinkFillOverlayRef.current, {
        borderRadius: targetRadius,
        borderWidth: `${targetBorderWidth}px`
      });
    }
    if (beyondWorldRef.current) {
      gsap.set(beyondWorldRef.current, { clipPath: "none" });
    }

    // 3. Measure and cache exact marquee sentence center offsets for each 3D card
    if (marqueeRef?.current && marqueeWorldRef?.current) {
      const container = marqueeRef.current;
      const world = marqueeWorldRef.current;
      const prevVis = world.style.visibility;
      world.style.visibility = "visible";

      const containerRect = container.getBoundingClientRect();
      const texts = container.querySelectorAll(".marqueeText");

      if (texts.length >= 4 && containerRect.width > 0) {
        cachedMarqueeOffsets = Array.from(texts).map((el) => {
          const elRect = el.getBoundingClientRect();
          const relativeCenter = (elRect.left - containerRect.left) + elRect.width / 2;
          return Math.round(vw / 2 - relativeCenter);
        });
      }

      world.style.visibility = prevVis;
    }
  };

  return {
    updateCachedMeasurements,
    getCachedCardScales: () => cachedCardScales,
    getCachedExpandCard: () => cachedExpandCard,
    getProjectDistance,
    getProjectEnterX,
    getMarqueeOffset
  };
};
