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

    // Star count: rich and dense cosmic background starfield with celestial dust
    const count = 180;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

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
      const prevW = width;
      const prevH = height;
      setupCanvas();
      if (prevW > 0 && prevH > 0) {
        stars.forEach((s) => {
          s.x = (s.x / prevW) * width;
          s.y = (s.y / prevH) * height;
        });
      }
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

    // Initialize rich star population with multi-layered depth and twinkling
    const stars = Array.from({ length: count }, (_, idx) => {
      // 10% diamond sparkle glints with 4-point diffraction crosses
      // 25% medium twinkling stars with atmospheric glow halo
      // 65% tiny ambient background stars providing deep cosmic field
      const rand = Math.random();
      let type = 0;
      let baseRadius = 0.6 + Math.random() * 0.45;
      let parallaxDepth = 0.25 + Math.random() * 0.35;
      let minAlpha = 0.15;
      let maxAlpha = 0.6 + Math.random() * 0.25;

      if (rand < 0.10) {
        type = 2; // Diamond 4-point sparkle cross
        baseRadius = 1.7 + Math.random() * 0.7;
        parallaxDepth = 0.85 + Math.random() * 0.5;
        minAlpha = 0.3;
        maxAlpha = 0.98;
      } else if (rand < 0.35) {
        type = 1; // Medium star with glowing halo
        baseRadius = 1.1 + Math.random() * 0.45;
        parallaxDepth = 0.5 + Math.random() * 0.4;
        minAlpha = 0.25;
        maxAlpha = 0.88;
      }

      // Starlight tint variations: crisp white, celestial ice blue, and faint lime-white
      let tint = "255, 255, 255";
      const tintRand = Math.random();
      if (tintRand < 0.22) {
        tint = "186, 230, 253"; // Soft icy blue
      } else if (tintRand < 0.34) {
        tint = "220, 252, 231"; // Soft Haulo lime-emerald tint
      } else if (tintRand < 0.44) {
        tint = "241, 245, 249"; // Soft silver white
      }

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        parallaxDepth,
        twinkleSpeed: 0.012 + Math.random() * 0.024,
        twinklePhase: Math.random() * Math.PI * 2,
        minAlpha,
        maxAlpha,
        type,
        tint
      };
    });

    let time = 0;

    let isVisible = true;
    const parentEl = canvas.closest('.worldLayer') || canvas;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    if (parentEl) observer.observe(parentEl);

    const render = () => {
      if (!isMounted) return;

      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

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
      observer.disconnect();
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
