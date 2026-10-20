import React, { useEffect, useRef } from "react";

/**
 * GalleryStarfieldCanvas
 * High-fidelity starry cosmic background with delicate twinkling stars,
 * diamond sparkle glints with 4-point diffraction crosses, and smooth mouse parallax.
 */
export const GalleryStarfieldCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = null;
    let isMounted = true;

    // Maximum 10 stars as requested by user
    const count = 10;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    setupCanvas();

    const handleResize = () => {
      setupCanvas();
    };
    window.addEventListener("resize", handleResize);

    // Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 10 well-distributed coordinates across viewport sectors (avoiding card obstruction)
    const starSectors = [
      { xPct: 0.08, yPct: 0.18 },
      { xPct: 0.22, yPct: 0.10 },
      { xPct: 0.48, yPct: 0.14 },
      { xPct: 0.78, yPct: 0.10 },
      { xPct: 0.94, yPct: 0.28 },
      { xPct: 0.04, yPct: 0.52 },
      { xPct: 0.26, yPct: 0.88 },
      { xPct: 0.52, yPct: 0.82 },
      { xPct: 0.74, yPct: 0.92 },
      { xPct: 0.92, yPct: 0.74 }
    ];

    // Initialize exactly 10 stars
    const stars = starSectors.map((pos, idx) => ({
      x: pos.xPct * width,
      y: pos.yPct * height,
      baseRadius: idx % 3 === 0 ? 1.6 : idx % 2 === 0 ? 1.2 : 0.9,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      parallaxDepth: 0.6 + (idx % 3) * 0.35,
      twinkleSpeed: 0.02 + (idx % 5) * 0.008,
      twinklePhase: (idx * Math.PI) / 5,
      minAlpha: 0.25,
      maxAlpha: idx % 2 === 0 ? 0.95 : 0.8,
      type: idx % 3 === 0 ? 2 : 1, // subtle sparkle diamond or twinkling star
      tint: idx % 4 === 0 ? "186, 230, 253" : "255, 255, 255"
    }));

    let time = 0;



    const render = () => {
      if (!isMounted) return;

      // Mouse lerp
      curMouseX += (targetMouseX - curMouseX) * 0.05;
      curMouseY += (targetMouseY - curMouseY) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      time += 1;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Drift motion
        s.x += s.vx;
        s.y += s.vy;

        // Screen boundary wrapping
        if (s.x < 0) s.x = width;
        else if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        else if (s.y > height) s.y = 0;

        // Apply mouse parallax offset based on star depth
        const drawX = s.x + curMouseX * 18 * s.parallaxDepth;
        const drawY = s.y + curMouseY * 18 * s.parallaxDepth;

        // Twinkle oscillation
        const wave = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        const normalized = (wave + 1) * 0.5;
        const blinkFactor = Math.pow(normalized, s.type === 2 ? 3.0 : 1.8);
        const alpha = s.minAlpha + (s.maxAlpha - s.minAlpha) * blinkFactor;
        const currentRadius = s.baseRadius * (0.85 + 0.45 * blinkFactor);

        // Core star point
        ctx.beginPath();
        ctx.arc(drawX, drawY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.tint}, ${alpha.toFixed(3)})`;
        ctx.fill();

        // Atmospheric halo & glints for bright stars
        if (s.type >= 1 && alpha > 0.55) {
          const glowAlpha = (alpha - 0.55) * 0.45;
          ctx.beginPath();
          ctx.arc(drawX, drawY, currentRadius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.tint}, ${glowAlpha.toFixed(3)})`;
          ctx.fill();

          // 4-Point diamond sparkle cross flare at peak twinkle
          if (s.type === 2 && alpha > 0.7) {
            const rayLen = (alpha - 0.7) * 20;
            ctx.strokeStyle = `rgba(255, 255, 255, ${(glowAlpha * 0.95).toFixed(3)})`;
            ctx.lineWidth = 0.85;

            ctx.beginPath();
            // Horizontal ray
            ctx.moveTo(drawX - rayLen, drawY);
            ctx.lineTo(drawX + rayLen, drawY);
            // Vertical ray
            ctx.moveTo(drawX, drawY - rayLen);
            ctx.lineTo(drawX, drawY + rayLen);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="galleryStarfieldCanvas"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        display: "block"
      }}
    />
  );
};

export default GalleryStarfieldCanvas;
