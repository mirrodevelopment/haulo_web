import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { CyberFrameModel } from './CyberFrameModel';
import service1Img from '../assets/modelCard/service-1.png';
import service2Img from '../assets/modelCard/service-2.png';
import service3Img from '../assets/modelCard/service-3.png';
import service4Img from '../assets/modelCard/service-4.png';
import { orbitSharedState } from '../hooks/timeline/timelineOrbit';

/**
 * Cyber4SidedBoxGroup
 * Calibrated 4-Sided Rotating 3D Frame Carousel:
 * 1. Gap between cards: 20–35 px (R = 4.495 creates ~25px diagonal corner gap).
 * 2. Card thickness: 8–12 px (Z-scale 0.55 creates ~10px crisp extruded thickness).
 * 3. Perspective: 1000–1400 px (Camera FOV 38° at Z=21 maps directly to 1200px perspective).
 * 4. Rotation speed: Slow (0.18 rad/s, ~35s per full rotation).
 * 5. Animation: Continuous 360° rotation seamlessly combined with GSAP scroll timeline.
 */
function Cyber4SidedBoxGroup() {
  const { size, invalidate } = useThree();
  const boxGroupRef = useRef();
  const face1GroupRef = useRef();
  const face2GroupRef = useRef();
  const face3GroupRef = useRef();

  // Model half-width is 4.015.
  // Calibrated R = 6.4 provides a distinct, elegant, comfortable gap between the center frame
  // and the left/right side frames in 3D perspective view
  const R = 6.4;

  // Calibrated fitScale ensuring the front card face renders at the exact same pixel dimensions
  // (Width: 293px, Height: 457px) matching the hero card (promptsUiUxContainer) 1:1 with zero size difference
  const H = (size && size.height > 0)
    ? size.height
    : (typeof window !== 'undefined' ? (window.innerHeight || 900) : 900);
  const W = (size && size.width > 0)
    ? size.width
    : (typeof window !== 'undefined' ? (window.innerWidth || 1440) : 1440);

  const targetH = W <= 768 ? Math.min(305, Math.max(240, W * 0.67)) : 457;
  const tanFov = Math.tan((38 * Math.PI) / 360);
  const fitScale = (targetH * 2 * tanFov * 21) / (12.54 * H + targetH * 2 * tanFov * R);

  // Register on-demand invalidator with GSAP timeline runner
  useEffect(() => {
    orbitSharedState.invalidate = invalidate;
    invalidate();
    const t1 = setTimeout(invalidate, 100);
    const t2 = setTimeout(invalidate, 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (orbitSharedState.invalidate === invalidate) {
        orbitSharedState.invalidate = null;
      }
    };
  }, [invalidate]);

  useFrame(() => {
    if (!boxGroupRef.current) return;

    // 100% scroll-controlled 3D rotation driven directly by GSAP ScrollTrigger
    boxGroupRef.current.rotation.y = orbitSharedState.angle;

    // 3D Card Expansion Animation (Section 4):
    // Left and right frame panels open outward clearly from behind the center frame
    // without ever moving inward or overlapping the center frame
    const rawReveal = orbitSharedState.sideReveal !== undefined ? orbitSharedState.sideReveal : 1;
    const reveal = Math.max(0, Math.min(1, rawReveal));

    // Smooth outward expansion distance: starts tucked behind the center frame's edges
    // and expands outward to the calibrated gap radius R
    const startX = 3.2; // Tucked safely behind the center frame (half-width 4.015 at Z=0)
    const currentX = startX + (R - startX) * reveal;

    // Angle offset: panels open outward from depth into their 90-degree box orientations
    const angleOffset = 0.20 * (1 - reveal);

    if (face1GroupRef.current) {
      // Right panel emerges strictly OUTWARD to the right (+X), stays at Z=0 (well behind front card Z=R)
      face1GroupRef.current.position.set(currentX, 0, 0);
      face1GroupRef.current.rotation.y = (Math.PI / 2) + angleOffset;
      face1GroupRef.current.scale.set(1, 1, 0.55 * (0.85 + 0.15 * reveal));
      face1GroupRef.current.visible = reveal > 0.02;
    }
    if (face3GroupRef.current) {
      // Left panel emerges strictly OUTWARD to the left (-X), stays at Z=0 (well behind front card Z=R)
      face3GroupRef.current.position.set(-currentX, 0, 0);
      face3GroupRef.current.rotation.y = (-Math.PI / 2) - angleOffset;
      face3GroupRef.current.scale.set(1, 1, 0.55 * (0.85 + 0.15 * reveal));
      face3GroupRef.current.visible = reveal > 0.02;
    }
    if (face2GroupRef.current) {
      // Rear card moves smoothly to back
      face2GroupRef.current.position.set(0, 0, -R * reveal);
      face2GroupRef.current.visible = reveal > 0.05;
    }
  });

  return (
    <group ref={boxGroupRef} position={[0, 0, 0]} scale={[fitScale, fitScale, fitScale]}>
      {/* FACE 0: Mobile Development (Front 0°) - Calibrated 8-12px thickness */}
      <group position={[0, 0, R]} rotation={[0, 0, 0]}>
        <CyberFrameModel imageSrc={service1Img} scale={[1, 1, 0.55]} />
      </group>

      {/* FACE 1: Web Development (Right 90°) - Emerges outward from behind main card */}
      <group ref={face1GroupRef} position={[R, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <CyberFrameModel imageSrc={service2Img} scale={[1, 1, 0.55]} />
      </group>

      {/* FACE 2: UI/UX Design (Back 180°) - 3D Carousel Face */}
      <group ref={face2GroupRef} position={[0, 0, -R]} rotation={[0, Math.PI, 0]}>
        <CyberFrameModel imageSrc={service3Img} scale={[1, 1, 0.55]} />
      </group>

      {/* FACE 3: Haulo Core Brand (Left -90°) - Emerges outward from behind main card */}
      <group ref={face3GroupRef} position={[-R, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <CyberFrameModel imageSrc={service4Img} scale={[1, 1, 0.55]} />
      </group>
    </group>
  );
}

/**
 * Cyber4SidedBoxCanvas
 * Encapsulated React Three Fiber canvas hosting the unified 4-sided rotating 3D box carousel.
 * Camera perspective calibrated to 1200px (1000-1400px range).
 */
export const Cyber4SidedBoxCanvas = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100vw',
        height: '100vh',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'visible'
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 21], fov: 38 }}
        dpr={[1, 1.25]}
        frameloop="demand"
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true
        }}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          /* Volumetric elevation drop-shadow tracing 3D frame contour onto marquee & white floor */
          filter: 'drop-shadow(0 6px 12px rgba(8, 11, 12, 0.09)) drop-shadow(0 20px 32px rgba(8, 11, 12, 0.14)) drop-shadow(0 42px 64px rgba(8, 11, 12, 0.16))'
        }}
      >
        {/* Symmetrical balanced studio illumination: equal brightness on left and right frame halves */}
        <ambientLight intensity={0.90} color="#f6f9fc" />
        <directionalLight position={[-10, 10, 12]} intensity={1.15} color="#ffffff" />
        <directionalLight position={[10, 10, 12]} intensity={1.15} color="#ffffff" />
        <directionalLight position={[0, 14, 8]} intensity={0.65} color="#ffffff" />
        <directionalLight position={[0, 10, -10]} intensity={0.80} color="#ffffff" />
        <directionalLight position={[0, -10, 6]} intensity={0.40} color="#ffffff" />

        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.65} />
          <Cyber4SidedBoxGroup />
        </Suspense>
      </Canvas>

      {/* Photorealistic floor contact shadow pod directly below centered floating frame */}
      <div
        className="frameGroundShadowPod"
        style={{
          position: 'absolute',
          top: 'calc(50% + 228.5px - 8px)',
          bottom: 'auto',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5
        }}
      >
        <div className="frameShadowFloorGlow" />
        <div className="frameShadowDiffuse" />
        <div className="frameShadowCore" />
      </div>
    </div>
  );
};

export default Cyber4SidedBoxCanvas;
