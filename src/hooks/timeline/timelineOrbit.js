/**
 * timelineOrbit.js
 * 3D Box Orbit mathematical transform renderer.
 */

import gsap from "gsap";

export const createOrbitRenderer = (cardNodes, boxRadius, orbit) => {
  return () => {
    const currentRadius = boxRadius + (orbit.split || 0);
    const currentAngle = orbit.angle || 0;
    const reveal = orbit.sideReveal !== undefined ? orbit.sideReveal : 1;

    for (let index = 0; index < cardNodes.length; index++) {
      const card = cardNodes[index];
      if (!card) continue;

      // 4 faces of the 3D box:
      // 0: Pink (front, 0)
      // 1: Red (right, PI/2)
      // 2: Blue (back, PI)
      // 3: Haulo Logo (left, -PI/2)
      let baseTheta = 0;
      if (index === 1) baseTheta = Math.PI / 2;
      else if (index === 2) baseTheta = Math.PI;
      else if (index === 3) baseTheta = -Math.PI / 2;

      const theta = currentAngle + baseTheta;
      const rotationY = (theta * 180) / Math.PI;

      if (index === 0) {
        const x = Math.sin(theta) * currentRadius;
        const z = Math.cos(theta) * currentRadius;
        const zIndex = Math.round(z + 1000);

        gsap.set(card, {
          x,
          z,
          rotationY,
          scale: 1,
          opacity: 1,
          visibility: "visible",
          zIndex
        });
      } else if (reveal >= 0.999) {
        // Full 3D Box Orbit mode
        const x = Math.sin(theta) * currentRadius;
        const z = Math.cos(theta) * currentRadius;
        const zIndex = Math.round(z + 1000);

        gsap.set(card, {
          x,
          z,
          rotationY,
          scale: 1,
          opacity: 1,
          visibility: "visible",
          zIndex
        });
      } else {
        // Ultra-smooth side-cards fanning opening animation
        const r = Math.max(0, Math.min(1, reveal));
        const targetX = Math.sin(theta) * currentRadius;
        const targetZ = Math.cos(theta) * currentRadius;
        const targetRotY = (theta * 180) / Math.PI;

        let startX = 0;
        let startZ = -20;
        let startRotY = 0;

        if (index === 1) {
          // Right card: unfolds cleanly from behind Card 0, always remaining behind Card 0's plane
          startX = 0;
          startZ = -20;
          startRotY = 0;
        } else if (index === 3) {
          // Left card: unfolds cleanly from behind Card 0, always remaining behind Card 0's plane
          startX = 0;
          startZ = -20;
          startRotY = 0;
        } else if (index === 2) {
          // Back card
          startX = 0;
          startZ = -currentRadius;
          startRotY = 180;
        }

        const x = startX * (1 - r) + targetX * r;
        const z = startZ * (1 - r) + targetZ * r;
        const rotY = startRotY * (1 - r) + targetRotY * r;
        const scale = 0.92 + 0.08 * r;
        const opacity = r <= 0.02 ? 0 : Math.min(1, (r - 0.02) * 1.4);
        const visibility = r <= 0.02 ? "hidden" : "visible";
        const zIndex = Math.round(z + 1000);

        gsap.set(card, {
          x,
          z,
          rotationY: rotY,
          scale,
          opacity,
          visibility,
          zIndex
        });
      }
    }
  };
};
