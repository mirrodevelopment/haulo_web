import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DEFAULT_CARDS_DATA } from './carousel/cardData';
import { renderProceduralCard } from './carousel/proceduralFrameRenderer';
import { createCardTexture } from './carousel/cardTextureRenderer';
import {
  CARD_WIDTH,
  CARD_HEIGHT,
  SUBDIV_X,
  SUBDIV_Y,
  W_TEX,
  H_TEX,
  EFFECTIVE_CARD_WIDTH,
  wrap,
  shortest,
  applyRibbonDeformation,
  buildStaticFrameMeshes,
  RIBBON_Y_OFFSET
} from './carousel/ribbonGeometry';

// Avoid re-assigning THREE to window to eliminate duplicate instance warning
if (typeof window !== 'undefined' && !window.THREE) {
  window.THREE = THREE;
}

/**
 * Calculates responsive camera distance and aspect ratio to ensure
 * the 3D ribbon and center card fit proportionately on any device screen.
 */
function updateCameraViewport(camera, width, height) {
  const aspect = width / height;
  camera.aspect = aspect;

  if (aspect >= 1.5) {
    // Standard widescreen desktop
    camera.position.z = 1050;
  } else {
    // Tablets and portrait mobile: smoothly pull camera back to keep full ribbon visible
    const targetFrustumWidth = width < 500 ? 840 : (width < 768 ? 960 : 1100);
    const tanHalfFov = Math.tan((38 * Math.PI) / 360);
    const reqZ = targetFrustumWidth / (2 * tanHalfFov * aspect);
    camera.position.z = Math.max(1050, Math.min(2350, reqZ));
  }
  camera.updateProjectionMatrix();
}

/**
 * RibbonCarousel Component
 *
 * High-performance 3D interactive cybernetic ribbon carousel:
 * - 3D cylindrical wave profile with center spherical bulging
 * - Procedural titanium hardware frames with pure white frosted diffuser and cyber-yellow status lighting
 * - Moving project cards with cover-fit imagery, pure white title/description text, and white divider seams
 * - High-precision pointer drag and smooth glide autoplay
 */
export default function RibbonCarousel({ items, images, speed = 0.35, onProgress }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const cardList = (items && items.length > 0)
    ? items
    : ((images && images.length > 0) ? images : DEFAULT_CARDS_DATA);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const count = cardList.length;

    // 1. Three.js Scene & Perspective Camera
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      4000
    );
    updateCameraViewport(camera, window.innerWidth, window.innerHeight);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const maxAniso = renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 8;

    // 3. Static Procedural Cybernetic Frame
    const cvsOpen = document.createElement('canvas');
    cvsOpen.width = W_TEX;
    cvsOpen.height = H_TEX;
    renderProceduralCard(cvsOpen, null, true);

    const texOpen = new THREE.CanvasTexture(cvsOpen);
    texOpen.minFilter = THREE.LinearMipmapLinearFilter;
    texOpen.magFilter = THREE.LinearFilter;
    texOpen.generateMipmaps = true;
    texOpen.anisotropy = maxAniso;

    const staticFrameMeshes = buildStaticFrameMeshes(scene, texOpen);

    // 4. Moving Project Card Textures & Meshes
    const textures = [texOpen];
    const cardMeshes = [];

    for (let i = 0; i < count; i++) {
      const item = cardList[i];
      const { texture } = createCardTexture(item, maxAniso);
      textures.push(texture);

      const geometry = new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT, SUBDIV_X, SUBDIV_Y);
      geometry.userData.origPosition = geometry.attributes.position.clone();

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        depthTest: true,
        depthWrite: false
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, RIBBON_Y_OFFSET, 0);
      mesh.renderOrder = 100;
      mesh.frustumCulled = false;
      scene.add(mesh);
      cardMeshes.push(mesh);
    }

    // 5. Carousel Motion State
    let phase = 0.10;
    const AUTOPLAY_SPEED = speed;
    let dragging = false;
    let dragLastX = 0;
    let inertia = 0;
    let prevDragT = 0;
    let lastTime = performance.now();
    let animationFrameId = null;

    /**
     * Updates moving card positions and 3D ribbon vertex deformation
     * with high-performance visibility culling to eliminate redundant CPU/GPU cycles.
     */
    function updateGlobalRibbonGeometry() {
      for (let i = 0; i < count; i++) {
        const d = shortest(i - phase, count);
        const absD = Math.abs(d);
        const mesh = cardMeshes[i];

        // Smooth fade out at outer loop boundary
        let opacity = 1.0;
        const outerFade = count / 2 - 0.75;
        if (absD > outerFade) {
          opacity = Math.max(0, 1.0 - (absD - outerFade) / 0.75);
        }
        mesh.material.opacity = opacity;

        // Culling: Only cards within visible ribbon range (|d| < 4.2 and opacity > 0)
        // require CPU vertex deformation and GPU buffer upload
        const isVisible = opacity > 0.001 && absD < 4.2;
        mesh.visible = isVisible;

        if (isVisible) {
          const cardTrackCenter = d * EFFECTIVE_CARD_WIDTH;
          const geom = mesh.geometry;
          const posAttr = geom.attributes.position;
          const origPos = geom.userData.origPosition;

          applyRibbonDeformation(origPos.array, posAttr.array, posAttr.count, cardTrackCenter, -1.5);
          posAttr.needsUpdate = true;

          // Continuous depth sorting
          const depthRank = Math.round((1 - absD / (count / 2)) * 1000);
          mesh.renderOrder = 100 + depthRank;
        }
      }
    }

    // 6. Animation Loop
    function animate(now) {
      const dt = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;

      if (!dragging) {
        phase = wrap(phase + (AUTOPLAY_SPEED + inertia) * dt, count);
        inertia *= Math.pow(0.025, dt);
      }

      updateGlobalRibbonGeometry();
      renderer.render(scene, camera);

      if (onProgress) {
        onProgress(wrap(phase, count) / count);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    // 7. Interactive Pointer & Drag Events
    canvas.addEventListener('pointerdown', e => {
      dragging = true;
      canvas.classList.add('is-dragging');
      dragLastX = e.clientX;
      prevDragT = performance.now();
      inertia = 0;
      canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener('pointermove', e => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - dragLastX;
      const dt = Math.max(8, now - prevDragT) / 1000;
      dragLastX = e.clientX;
      prevDragT = now;

      const pxPerCard = EFFECTIVE_CARD_WIDTH;
      const delta = dx / pxPerCard;
      phase = wrap(phase - delta, count);
      inertia = Math.max(-3.5, Math.min(3.5, -delta / dt));
    });

    function releasePointer() {
      dragging = false;
      canvas.classList.remove('is-dragging');
    }
    canvas.addEventListener('pointerup', releasePointer);
    canvas.addEventListener('pointercancel', releasePointer);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      updateCameraViewport(camera, w, h);
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Initial render
    updateGlobalRibbonGeometry();
    renderer.render(scene, camera);

    // Start loop
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointerup', releasePointer);
      canvas.removeEventListener('pointercancel', releasePointer);
      renderer.dispose();
      cardMeshes.forEach(mesh => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      staticFrameMeshes.forEach(mesh => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      textures.forEach(tex => tex.dispose());
    };
  }, [cardList, speed, onProgress]);

  return (
    <div id="canvas-container" className="canvas-container" ref={containerRef}>
      <canvas id="webgl-canvas" className="webgl-canvas" ref={canvasRef} />
    </div>
  );
}
