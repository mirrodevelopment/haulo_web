import React, { useEffect, useRef } from "react";

/**
 * ParticlePortalCanvas - Dynamic Energy Shockwave & Cyber HUD Portal
 * Replaces simple concentric static arcs with a high-end, multi-layered visual experience:
 * 1. Continuous Expanding Energy Shockwaves (Acoustic / Gravitational Sonar Ripples)
 * 2. Rotating Holographic Radar Scanner Beam (360° Conic Sweep)
 * 3. Precision Cyber HUD Compass Ring with Radial Tick Marks & Cardinal Accents
 * 4. Dual Counter-Rotating Segmented Orbit Rings with Comet Energy Beacons
 * 5. Twinkling Deep Cosmic Starlight Dust
 * 6. Responsive High-DPI Canvas Rendering & Smooth Mouse Parallax
 */
export const ParticlePortalCanvas = ({ visibilityRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = null;
    let isMounted = true;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    const onResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      width = canvas.width = cssWidth * dpr;
      height = canvas.height = cssHeight * dpr;
    };
    window.addEventListener("resize", onResize);

    // Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / cssWidth - 0.5) * 2;
      targetMouseY = (e.clientY / cssHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Cosmic Starlight Particles
    const particleCount = 55;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * cssWidth,
      y: Math.random() * cssHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      radius: 0.75 + Math.random() * 1.4,
      baseAlpha: 0.15 + Math.random() * 0.45,
      pulseSpeed: 0.012 + Math.random() * 0.025,
      pulsePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? "rgba(163, 230, 53," : "rgba(56, 189, 248,"
    }));

    // Orbiting Comet Beacons
    const beacons = [
      { ring: 0, angle: 0, speed: 0.012, size: 3.2, trail: [] },
      { ring: 0, angle: Math.PI, speed: 0.012, size: 2.5, trail: [] },
      { ring: 1, angle: Math.PI * 0.5, speed: -0.007, size: 3.0, trail: [] },
      { ring: 1, angle: Math.PI * 1.5, speed: -0.007, size: 2.2, trail: [] },
      { ring: 2, angle: Math.PI * 0.2, speed: 0.004, size: 2.8, trail: [] }
    ];

    let radarAngle = 0;
    let innerRingAngle = 0;
    let outerRingAngle = 0;
    let hudDialAngle = 0;

    let startTime = performance.now();

    const render = (now) => {
      if (!isMounted) return;

      const isVisible = visibilityRef ? visibilityRef.current > 0.01 : true;
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTime) * 0.001; // in seconds

      // Mouse Lerp
      curMouseX += (targetMouseX - curMouseX) * 0.05;
      curMouseY += (targetMouseY - curMouseY) * 0.05;

      // Coordinate scaling
      const baseScale = Math.max(0.68, Math.min(1.25, Math.min(cssWidth, cssHeight) / 880));
      const centerX = (cssWidth / 2 + curMouseX * 16) * dpr;
      const centerY = (cssHeight / 2 + curMouseY * 16) * dpr;

      ctx.clearRect(0, 0, width, height);
      ctx.save();

      // ========================================================
      // 1. SOFT MULTI-TONE AMBIENT NEBULA GLOW
      // ========================================================
      const glowRadius = Math.min(width, height) * 0.46;
      const pulseBreath = 1 + Math.sin(elapsed * 1.5) * 0.06;

      const ambientGlow = ctx.createRadialGradient(
        centerX, centerY, 20 * dpr,
        centerX, centerY, glowRadius * pulseBreath
      );
      ambientGlow.addColorStop(0, "rgba(163, 230, 53, 0.16)"); // Haulo Neon Lime
      ambientGlow.addColorStop(0.25, "rgba(56, 189, 248, 0.12)"); // Electric Cyan
      ambientGlow.addColorStop(0.55, "rgba(99, 102, 241, 0.05)"); // Deep Indigo
      ambientGlow.addColorStop(0.85, "rgba(15, 23, 42, 0.02)");
      ambientGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius * pulseBreath, 0, Math.PI * 2);
      ctx.fill();

      // ========================================================
      // 2. CONTINUOUS EXPANDING ENERGY SHOCKWAVE PULSES
      // ========================================================
      const shockwaveCount = 4;
      const maxRippleR = 430 * baseScale * dpr;
      const minRippleR = 48 * baseScale * dpr;
      const rippleSpeed = 0.18; // loop frequency

      for (let i = 0; i < shockwaveCount; i++) {
        // Continuous offset phase between 0 and 1
        const phase = (elapsed * rippleSpeed + i / shockwaveCount) % 1;
        const currentR = minRippleR + phase * (maxRippleR - minRippleR);

        // Opacity curve: ramps up quickly, then gently fades out as radius expands
        let waveAlpha = 0;
        if (phase < 0.18) {
          waveAlpha = (phase / 0.18) * 0.45;
        } else {
          waveAlpha = (1 - (phase - 0.18) / 0.82) * 0.45;
        }

        if (waveAlpha > 0.01) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, currentR, 0, Math.PI * 2);

          // Alternating subtle lime & cyan tinting
          if (i % 2 === 0) {
            ctx.strokeStyle = `rgba(163, 230, 53, ${waveAlpha * 0.85})`;
          } else {
            ctx.strokeStyle = `rgba(56, 189, 248, ${waveAlpha * 0.9})`;
          }
          ctx.lineWidth = Math.max(1, (1.8 - phase * 1.0) * dpr);
          ctx.stroke();

          // Subtle harmonic glow on the active shockwave
          if (phase > 0.1 && phase < 0.6) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${waveAlpha * 0.25})`;
            ctx.lineWidth = 0.7 * dpr;
            ctx.stroke();
          }
        }
      }

      // ========================================================
      // 3. ROTATING HOLOGRAPHIC RADAR SCANNER BEAM (SWEEP CONE)
      // ========================================================
      radarAngle += 0.009;
      const sweepRadius = 380 * baseScale * dpr;
      const sweepAngleSpan = Math.PI * 0.32; // ~58 degrees sweep beam

      const sweepSteps = 16;
      for (let s = 0; s < sweepSteps; s++) {
        const stepFrac = s / sweepSteps;
        const a1 = radarAngle - sweepAngleSpan * (1 - stepFrac);
        const a2 = radarAngle - sweepAngleSpan * (1 - (s + 1) / sweepSteps);
        const stepAlpha = Math.pow(stepFrac, 2.2) * 0.09;

        ctx.fillStyle = `rgba(56, 189, 248, ${stepAlpha})`;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, sweepRadius, a1, a2);
        ctx.closePath();
        ctx.fill();
      }

      // Leading beam edge line
      const leadX = centerX + Math.cos(radarAngle) * sweepRadius;
      const leadY = centerY + Math.sin(radarAngle) * sweepRadius;
      const beamGrad = ctx.createLinearGradient(centerX, centerY, leadX, leadY);
      beamGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      beamGrad.addColorStop(0.3, "rgba(163, 230, 53, 0.35)");
      beamGrad.addColorStop(0.85, "rgba(56, 189, 248, 0.2)");
      beamGrad.addColorStop(1, "rgba(56, 189, 248, 0)");

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(leadX, leadY);
      ctx.strokeStyle = beamGrad;
      ctx.lineWidth = 1.2 * dpr;
      ctx.stroke();

      // ========================================================
      // 4. PRECISION CYBER HUD DIAL (RADIAL TICK COMPASS)
      // ========================================================
      hudDialAngle -= 0.0018; // Very slow majestic rotation
      const hudR = 210 * baseScale * dpr;
      const tickCount = 64;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(hudDialAngle);

      for (let t = 0; t < tickCount; t++) {
        const tickA = (t / tickCount) * Math.PI * 2;
        const isMajor = t % 8 === 0;
        const isCardinal = t % 16 === 0;
        const tickLen = (isCardinal ? 9 : isMajor ? 6 : 3.5) * dpr;

        const r1 = hudR - tickLen;
        const r2 = hudR;

        const cosA = Math.cos(tickA);
        const sinA = Math.sin(tickA);

        ctx.beginPath();
        ctx.moveTo(cosA * r1, sinA * r1);
        ctx.lineTo(cosA * r2, sinA * r2);

        if (isCardinal) {
          ctx.strokeStyle = "rgba(163, 230, 53, 0.65)"; // Lime major tick
          ctx.lineWidth = 1.5 * dpr;
        } else if (isMajor) {
          ctx.strokeStyle = "rgba(147, 197, 253, 0.45)"; // Cyan tick
          ctx.lineWidth = 1.0 * dpr;
        } else {
          ctx.strokeStyle = "rgba(147, 197, 253, 0.2)"; // Minor tick
          ctx.lineWidth = 0.8 * dpr;
        }
        ctx.stroke();
      }

      // Faint guideline ring for the HUD dial
      ctx.beginPath();
      ctx.arc(0, 0, hudR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(147, 197, 253, 0.15)";
      ctx.lineWidth = 0.8 * dpr;
      ctx.setLineDash([3 * dpr, 6 * dpr]);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      ctx.restore();

      // ========================================================
      // 5. INNER & OUTER DUAL COUNTER-ROTATING TECH RINGS
      // ========================================================
      innerRingAngle += 0.006;
      outerRingAngle -= 0.0035;

      const innerR = 135 * baseScale * dpr;
      const outerR = 315 * baseScale * dpr;

      // --- Inner Segmented Ring ---
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(innerRingAngle);

      const innerSegments = [
        { start: 0, len: Math.PI * 0.45, color: "rgba(163, 230, 53, 0.55)", width: 1.6 },
        { start: Math.PI * 0.65, len: Math.PI * 0.5, color: "rgba(56, 189, 248, 0.45)", width: 1.2 },
        { start: Math.PI * 1.35, len: Math.PI * 0.4, color: "rgba(163, 230, 53, 0.5)", width: 1.4 }
      ];

      innerSegments.forEach((seg) => {
        ctx.beginPath();
        ctx.arc(0, 0, innerR, seg.start, seg.start + seg.len);
        ctx.strokeStyle = seg.color;
        ctx.lineWidth = seg.width * dpr;
        ctx.stroke();
      });

      // Accent tick brackets at 0° and 180°
      [0, Math.PI].forEach((ang) => {
        const bx = Math.cos(ang) * innerR;
        const by = Math.sin(ang) * innerR;
        ctx.beginPath();
        ctx.arc(bx, by, 2.5 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(163, 230, 53, 0.85)";
        ctx.fill();
      });
      ctx.restore();

      // --- Outer Segmented Ring ---
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(outerRingAngle);

      const outerSegments = [
        { start: 0, len: Math.PI * 0.6, color: "rgba(56, 189, 248, 0.35)", width: 1.0 },
        { start: Math.PI * 0.8, len: Math.PI * 0.4, color: "rgba(147, 197, 253, 0.28)", width: 1.0 },
        { start: Math.PI * 1.4, len: Math.PI * 0.45, color: "rgba(163, 230, 53, 0.35)", width: 1.2 }
      ];

      outerSegments.forEach((seg) => {
        ctx.beginPath();
        ctx.arc(0, 0, outerR, seg.start, seg.start + seg.len);
        ctx.strokeStyle = seg.color;
        ctx.lineWidth = seg.width * dpr;
        ctx.stroke();
      });

      // 4 Cardinal Precision Target Brackets on outer ring
      [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach((bracketAng) => {
        const cosB = Math.cos(bracketAng);
        const sinB = Math.sin(bracketAng);
        const bLen = 6 * dpr;

        ctx.beginPath();
        ctx.moveTo(cosB * (outerR - bLen), sinB * (outerR - bLen));
        ctx.lineTo(cosB * (outerR + bLen), sinB * (outerR + bLen));
        ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();
      });
      ctx.restore();

      // ========================================================
      // 6. LUMINOUS ORBITING COMET SATELLITES WITH LIGHT TRAILS
      // ========================================================
      const ringRadii = [innerR, hudR, outerR];

      beacons.forEach((b) => {
        b.angle += b.speed;
        const curR = ringRadii[b.ring];
        const bx = centerX + Math.cos(b.angle) * curR;
        const by = centerY + Math.sin(b.angle) * curR;

        // Save trail position
        b.trail.push({ x: bx, y: by, time: now });
        if (b.trail.length > 8) b.trail.shift();

        // Draw trail
        for (let i = 0; i < b.trail.length - 1; i++) {
          const tPoint = b.trail[i];
          const tNext = b.trail[i + 1];
          const tFrac = (i + 1) / b.trail.length;

          ctx.beginPath();
          ctx.moveTo(tPoint.x, tPoint.y);
          ctx.lineTo(tNext.x, tNext.y);
          ctx.strokeStyle = b.ring === 0 
            ? `rgba(163, 230, 53, ${tFrac * 0.5})` 
            : `rgba(56, 189, 248, ${tFrac * 0.5})`;
          ctx.lineWidth = (b.size * 0.6 * tFrac) * dpr;
          ctx.stroke();
        }

        // Luminous Beacon Head
        const isLime = b.ring === 0 || b.ring === 2;
        const haloColor = isLime ? "rgba(163, 230, 53, 0.55)" : "rgba(56, 189, 248, 0.55)";

        // Outer halo
        ctx.beginPath();
        ctx.arc(bx, by, (b.size + 3.5) * dpr, 0, Math.PI * 2);
        ctx.fillStyle = haloColor;
        ctx.fill();

        // Solid brilliant core
        ctx.beginPath();
        ctx.arc(bx, by, b.size * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      // ========================================================
      // 7. AMBIENT DRIFTING COSMIC STARLIGHT DUST
      // ========================================================
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = cssWidth;
        if (p.x > cssWidth) p.x = 0;
        if (p.y < 0) p.y = cssHeight;
        if (p.y > cssHeight) p.y = 0;

        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.baseAlpha * (0.65 + 0.35 * Math.sin(p.pulsePhase));

        const px = p.x * dpr;
        const py = p.y * dpr;

        ctx.fillStyle = `${p.color} ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.radius * dpr, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [visibilityRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1
      }}
    />
  );
};

export default ParticlePortalCanvas;
