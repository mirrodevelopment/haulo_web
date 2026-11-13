import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ThreeEditorialWorld
 * Real-time Three.js 3D depth world rendered behind the full-screen editorial cards.
 * Features:
 * - 3D dual-color volumetric particle field (electric cyan & fiery amber)
 * - Receding 3D cyber horizon grid with depth fog
 * - Dynamic 3D lighting reacting to scroll depth
 * - Smooth camera & world 3D rotation tied to scroll progress
 */
export const ThreeEditorialWorld = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId = null;
    let isMounted = true;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. SCENE & FOG
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
    camera.position.set(0, 0, 950);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 5. 3D LIGHTS (Dynamic ambient & point lighting for 3D depth)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3, 1600);
    cyanLight.position.set(-600, 200, 300);
    scene.add(cyanLight);

    const amberLight = new THREE.PointLight(0xf97316, 3, 1600);
    amberLight.position.set(600, -100, 300);
    scene.add(amberLight);

    // 7. INTERACTIVE MOUSE PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 8. RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 9. ANIMATION LOOP SYNCHRONIZED WITH SCROLL
    let currentRotY = 0;
    let currentRotX = 0;
    let currentZ = 950;

    let isVisible = true;
    const parentEl = container.closest('.worldLayer') || container;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    if (parentEl) observer.observe(parentEl);

    const animate = () => {
      if (!isMounted) return;

      if (!isVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const progress = typeof window.__galleryScrollProgress === "number"
        ? window.__galleryScrollProgress
        : 0;

      // 3D rotation calculations on scroll (orbiting into back side & sweeping)
      // When progress moves from 0 to 1, the camera and scene rotate dramatically in 3D
      const scrollRotY = (progress - 0.4) * -0.95;
      const scrollRotX = Math.sin(progress * Math.PI) * 0.28;
      const scrollZ = 950 + Math.sin(progress * Math.PI) * 380;

      const targetRotY = scrollRotY + mouseX * 0.12;
      const targetRotX = scrollRotX - mouseY * 0.10;

      // Smooth lerp
      const diffY = targetRotY - currentRotY;
      const diffX = targetRotX - currentRotX;
      const diffZ = scrollZ - currentZ;

      // When outside the gallery section and settled, idle to save GPU power
      if (progress === 0 && Math.abs(diffY) < 0.001 && Math.abs(diffX) < 0.001 && Math.abs(diffZ) < 0.1) {
        animId = requestAnimationFrame(animate);
        return;
      }

      currentRotY += diffY * 0.06;
      currentRotX += diffX * 0.06;
      currentZ += diffZ * 0.06;

      camera.position.x += ((mouseX * 80) - camera.position.x) * 0.05;
      camera.position.y += ((-mouseY * 60) - camera.position.y) * 0.05;
      camera.position.z = currentZ;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animId) cancelAnimationFrame(animId);

      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="threeEditorialCanvasContainer"
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

export default ThreeEditorialWorld;
