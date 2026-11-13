/**
 * timelineOrbit.js
 * 3D Box Orbit mathematical transform renderer.
 * Synchronizes the unified 4-sided 3D box carousel with GSAP scroll timeline.
 */

import gsap from "gsap";

// Shared reactive state read directly by React Three Fiber useFrame
export const orbitSharedState = {
  angle: 0,
  sideReveal: 1,
  split: 0,
  invalidate: null
};

export const createOrbitRenderer = (cardNodes, boxRadius, orbit) => {
  return () => {
    const currentAngle = orbit.angle || 0;
    const reveal = orbit.sideReveal !== undefined ? orbit.sideReveal : 1;

    // Update shared state for the 3D WebGL box
    orbitSharedState.angle = currentAngle;
    orbitSharedState.sideReveal = reveal;
    orbitSharedState.split = orbit.split || 0;

    // Invalidate R3F canvas on demand only when angle/reveal updates
    if (orbitSharedState.invalidate) {
      orbitSharedState.invalidate();
    }

    // Update tracking DOM nodes so GSAP and timeline controllers maintain references
    for (let index = 0; index < cardNodes.length; index++) {
      const card = cardNodes[index];
      if (!card) continue;

      let baseTheta = 0;
      if (index === 1) baseTheta = Math.PI / 2;
      else if (index === 2) baseTheta = Math.PI;
      else if (index === 3) baseTheta = -Math.PI / 2;

      const theta = currentAngle + baseTheta;
      card.dataset.theta = theta.toString();
    }
  };
};

export default createOrbitRenderer;
