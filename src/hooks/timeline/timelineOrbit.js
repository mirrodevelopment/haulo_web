/**
 * timelineOrbit.js
 * 3D Box Orbit mathematical transform renderer.
 * Features:
 * 1. Single card at singleCardHold (side cards 100% hidden).
 * 2. On 1 scroll: side cards unfold and open into a 3D box.
 * 3. On subsequent scrolls: 3D box rotates seamlessly face-by-face.
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
      // 0: Web Development (front, 0)
      // 1: Mobile Development (right, PI/2)
      // 2: UI/UX Design (back, PI)
      // 3: Haulo Logo (left, -Math.PI / 2)
      let baseTheta = 0;
      if (index === 1) baseTheta = Math.PI / 2;
      else if (index === 2) baseTheta = Math.PI;
      else if (index === 3) baseTheta = -Math.PI / 2;

      const theta = currentAngle + baseTheta;
      const rotationY = (theta * 180) / Math.PI;

      if (index === 0) {
        // Front Card 0: always visible in center
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
      } else if (reveal >= 0.999 && Math.abs(currentAngle) > 0.005) {
        // Full 3D Box Orbit mode during rotation
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
        // Silky-smooth side-cards opening animation (from reveal = 0 to reveal = 1)
        const r = Math.max(0, Math.min(1, reveal));
        const targetX = Math.sin(theta) * currentRadius;
        const targetZ = Math.cos(theta) * currentRadius;
        const targetRotY = (theta * 180) / Math.PI;

        let startX = 0;
        let startZ = -20;
        let startRotY = 0;

        if (index === 1) {
          // Right card: unfolds cleanly from behind Card 0
          startX = 0;
          startZ = -20;
          startRotY = 0;
        } else if (index === 3) {
          // Left card: unfolds cleanly from behind Card 0
          startX = 0;
          startZ = -20;
          startRotY = 0;
        } else if (index === 2) {
          // Back card: pushes back into position
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
