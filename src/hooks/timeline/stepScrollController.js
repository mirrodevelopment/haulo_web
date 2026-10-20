/**
 * stepScrollController.js
 * Snapped section-to-section step scroll controller for wheel, touch, keyboard, and direct navigation.
 * Engineered for slow, silky-smooth, cinematic transitions between all sections.
 */

import gsap from "gsap";
import { SECTION_HOLD_LABELS, TOTAL_TIMELINE_DURATION } from "./timelineConstants";

export const setupStepController = ({
  master,
  portalWorldRef,
  cardOrbitCtaRef,
  introState,
  updateCachedMeasurements,
  autoAdvanceRef,
  selectProjectRef,
  panStart,
  stepDuration
}) => {
  const getSectionSteps = () => {
    const st = master.scrollTrigger;
    const start = st?.start || 0;
    const end = st?.end || start + 9600;
    const totalDur = master.totalDuration() || TOTAL_TIMELINE_DURATION;
    return SECTION_HOLD_LABELS.map((labelName) => {
      const time = master.labels[labelName] ?? 0;
      return start + (time / totalDur) * (end - start);
    });
  };

  let isNavigating = false;
  let activeStepIndex = 0;
  let navTimeout = null;
  let lastNavStartTime = 0;

  // Velvety smooth cubic ease: responsive liftoff, fluid cruising, whisper-soft stop
  const smoothEase = (t) => 1 - Math.pow(1 - t, 3.2);

  const syncClosestStepIndex = (currentY, steps) => {
    const minIdx = introState.hasPassed ? 1 : 0;
    let closestIdx = minIdx;
    let minDiff = Infinity;
    for (let i = minIdx; i < steps.length; i++) {
      const diff = Math.abs(currentY - steps[i]);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    return closestIdx;
  };

  const scrollToStep = (targetIdx, steps) => {
    const minIdx = introState.hasPassed ? 1 : 0;
    const clampedIdx = Math.max(minIdx, Math.min(steps.length - 1, targetIdx));
    const targetY = steps[clampedIdx];
    activeStepIndex = clampedIdx;
    isNavigating = true;
    lastNavStartTime = performance.now();

    // Fluid step duration: responsive and luxurious without locking or sticking
    const isExpandOrGalleryStep = clampedIdx === 13 || clampedIdx === 14 || clampedIdx === 15;
    const stepDur = isExpandOrGalleryStep ? 1.15 : 0.88;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, {
        duration: stepDur,
        lock: false,
        force: true,
        easing: smoothEase,
        onComplete: () => {
          isNavigating = false;
          if (clampedIdx >= 1 && !introState.hasPassed) {
            introState.hasPassed = true;
            if (portalWorldRef.current) {
              gsap.set(portalWorldRef.current, { autoAlpha: 0, display: "none" });
            }
          }
        }
      });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }

    clearTimeout(navTimeout);
    navTimeout = setTimeout(() => {
      isNavigating = false;
      if (clampedIdx >= 1 && !introState.hasPassed) {
        introState.hasPassed = true;
        if (portalWorldRef.current) {
          gsap.set(portalWorldRef.current, { autoAlpha: 0, display: "none" });
        }
      }
    }, Math.round(stepDur * 1000));
  };

  const handleStepScroll = (direction, e) => {
    const currentY = window.__lenis?.scroll ?? window.scrollY;
    const steps = getSectionSteps();
    const firstStepY = steps[0];
    const lastStepY = steps[steps.length - 1];

    // Only control scrolling while within the showcase scroll range
    if (currentY < firstStepY - 60 || currentY > lastStepY + 60) {
      return false;
    }

    if (!isNavigating) {
      activeStepIndex = syncClosestStepIndex(currentY, steps);
    }

    const minIdx = introState.hasPassed ? 1 : 0;

    // If user is at top section and scrolls up, keep them there smoothly
    if (direction < 0 && activeStepIndex <= minIdx) {
      if (e?.cancelable) e.preventDefault();
      if (e?.stopImmediatePropagation) e.stopImmediatePropagation();
      return true;
    }

    // If user is at the bottom section and scrolls down, allow default page behavior
    if (direction > 0 && activeStepIndex === steps.length - 1 && currentY >= lastStepY - 10) {
      return false;
    }

    if (e?.cancelable) {
      e.preventDefault();
    }
    if (e?.stopImmediatePropagation) {
      e.stopImmediatePropagation();
    }

    const nextIdx = activeStepIndex + (direction > 0 ? 1 : -1);
    if (nextIdx >= minIdx && nextIdx < steps.length) {
      scrollToStep(nextIdx, steps);
      return true;
    }

    return false;
  };

  const onWheel = (e) => {
    const absDelta = Math.abs(e.deltaY);
    if (absDelta < 4) return;

    const now = performance.now();

    // Guard during active navigation: absorb extra wheel ticks/inertia so sections don't skip or rush
    if (isNavigating || now - lastNavStartTime < 380) {
      if (e.cancelable) e.preventDefault();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      return;
    }

    handleStepScroll(e.deltaY > 0 ? 1 : -1, e);
  };

  let touchStartY = null;
  const onTouchStart = (e) => {
    if (e.touches?.length > 0) {
      touchStartY = e.touches[0].clientY;
    }
  };

  const onTouchMove = (e) => {
    if (touchStartY === null || !e.touches?.length) return;
    const now = performance.now();
    if (isNavigating || now - lastNavStartTime < 380) {
      if (e.cancelable) e.preventDefault();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      return;
    }
    const diff = touchStartY - e.touches[0].clientY;
    if (Math.abs(diff) < 30) return;
    if (handleStepScroll(diff > 0 ? 1 : -1, e)) {
      touchStartY = e.touches[0].clientY;
    }
  };

  const onKeyDown = (e) => {
    const now = performance.now();
    if (isNavigating || now - lastNavStartTime < 380) return;
    if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
      handleStepScroll(1, e);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      handleStepScroll(-1, e);
    }
  };

  autoAdvanceRef.current = () => {
    if (!introState.hasPassed && activeStepIndex === 0 && !isNavigating) {
      updateCachedMeasurements();
      scrollToStep(1, getSectionSteps());
    }
  };

  window.addEventListener("wheel", onWheel, { passive: false, capture: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
  window.addEventListener("keydown", onKeyDown);

  if (cardOrbitCtaRef.current) {
    cardOrbitCtaRef.current.onclick = () => handleStepScroll(1);
  }

  selectProjectRef.current = (idx) => {
    const st = master.scrollTrigger;
    const start = st?.start || 0;
    const end = st?.end || start + 9600;
    const totalDur = master.totalDuration() || TOTAL_TIMELINE_DURATION;
    const targetT = idx === 0 ? 6.9 : panStart + idx * stepDuration;
    const targetY = start + (targetT / totalDur) * (end - start);
    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, { duration: 1.15, lock: true, force: true, easing: smoothEase });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  window.__hauloScrollTo = (target) => {
    const st = master.scrollTrigger;
    const start = st?.start || 0;
    const end = st?.end || start + 9600;
    const totalDur = master.totalDuration() || TOTAL_TIMELINE_DURATION;

    let targetT = 0;
    if (target === "service" || target === "services") {
      targetT = master.labels["heroHold"] ?? 0.52;
    } else if (target === "services-cards") {
      targetT = master.labels["card0Front"] ?? 1.54;
    } else if (target === "work" || target === "projects") {
      targetT = master.labels["projectsStart"] ?? 6.9;
    } else if (target === "contact" || target === "final") {
      targetT = master.labels["finalHold"] ?? 13.45;
    } else if (target === "top") {
      targetT = 0;
    } else if (typeof target === "number") {
      targetT = target;
    }

    const targetY = start + (targetT / totalDur) * (end - start);
    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, { duration: 1.35, lock: true, force: true, easing: smoothEase });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return () => {
    window.__hauloScrollTo = null;
    autoAdvanceRef.current = null;
    selectProjectRef.current = null;
    window.removeEventListener("wheel", onWheel, { capture: true });
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove, { capture: true });
    window.removeEventListener("keydown", onKeyDown);
    clearTimeout(navTimeout);
  };
};
