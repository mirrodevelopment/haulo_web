import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import CyberFrameModel from './CyberFrameModel';

/**
 * DemandInvalidator
 * For cards rendered in on-demand frameloop mode (Scene 7 Project cards),
 * triggers renders on mount and upon asset commit so the 3D frame & card artwork
 * are cleanly rendered into the GPU buffer with zero subsequent frame loop overhead.
 */
function DemandInvalidator({ imageSrc }) {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
    const t1 = setTimeout(invalidate, 60);
    const t2 = setTimeout(invalidate, 200);
    const t3 = setTimeout(invalidate, 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [invalidate, imageSrc]);
  return null;
}

/**
 * ResponsiveCyberFrame
 * Automatically scales the complete 3D frame model to fit inside the card
 * container with all 4 sides (top, bottom chassis, left rail, right rail) fully visible.
 * Model base dimensions: width = 8.04, height = 12.54.
 * 
 * Features dynamic real-time 3D rotation:
 * When the card is on the left or right side of the orbit, the 3D model rotates around Y
 * to prominently display the genuine 3D extruded side profile, titanium rails,
 * dark graphite pockets, and glowing neon lime LED capsules.
 */
function ResponsiveCyberFrame({ imageSrc, cardRef, staticRotationY = 0, theme = 'silver' }) {
  const { viewport } = useThree();
  const groupRef = useRef();

  // Calibrated to user specifications:
  // Width: 293px, Height: 457px, Aspect ratio: 293 / 457 (approx 0.64114)
  // Model base dimensions: width = 8.04, height = 12.54 (base aspect ratio = 0.64115)
  const fitScaleY = viewport.height / 12.54;
  const targetAspect = 293 / 457;
  const baseAspect = 8.04 / 12.54;
  const fitScaleX = fitScaleY * (targetAspect / baseAspect);

  useFrame(() => {
    if (!groupRef.current) return;
    if (staticRotationY) {
      groupRef.current.rotation.y = staticRotationY;
    } else if (cardRef && cardRef.current) {
      const thetaStr = cardRef.current.dataset.theta;
      if (thetaStr !== undefined) {
        const theta = parseFloat(thetaStr);
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        // Subtle tilt when orbiting to showcase genuine 3D extruded depth without ever swinging out of frame
        if (cosT >= -0.2) {
          groupRef.current.rotation.y = sinT * 0.18;
        } else {
          groupRef.current.rotation.y = 0;
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <CyberFrameModel
        imageSrc={imageSrc}
        theme={theme}
        scale={[fitScaleX, fitScaleY, fitScaleY]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

/**
 * CyberCard3DFrameCanvas
 * Encapsulated React Three Fiber canvas rendering the true 3D frame model
 * calibrated to Width: 293px, Height: 457px, Aspect ratio: 293 / 457 (~0.641).
 * High-performance on-demand frameloop eliminates render lag across multiple cards.
 */
export const CyberCard3DFrameCanvas = ({ imageSrc, cardRef, staticRotationY = 0, theme = 'silver' }) => {
  const isBlackTheme = theme === 'metallic-light-black' || theme === 'black';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'visible'
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 19], fov: 36 }}
        dpr={[1, 1.25]}
        frameloop={cardRef ? "always" : "demand"}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true
        }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
      >
        {/* Symmetrical balanced studio illumination */}
        <ambientLight intensity={isBlackTheme ? 1.05 : 0.90} color="#f6f9fc" />
        <directionalLight position={[-10, 10, 12]} intensity={isBlackTheme ? 1.35 : 1.15} color="#ffffff" />
        <directionalLight position={[10, 10, 12]} intensity={isBlackTheme ? 1.35 : 1.15} color="#ffffff" />
        <directionalLight position={[0, 14, 8]} intensity={isBlackTheme ? 0.80 : 0.65} color="#ffffff" />
        {/* 7. Subtle blue reflections on selected edges */}
        {isBlackTheme && (
          <directionalLight position={[-12, -4, 8]} intensity={0.65} color="#7dd3fc" />
        )}
        <directionalLight position={[0, 10, -10]} intensity={0.80} color="#ffffff" />
        <directionalLight position={[0, -10, 6]} intensity={0.40} color="#ffffff" />

        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={isBlackTheme ? 0.85 : 0.65} />
          <DemandInvalidator imageSrc={imageSrc} />
          <ResponsiveCyberFrame imageSrc={imageSrc} cardRef={cardRef} staticRotationY={staticRotationY} theme={theme} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CyberCard3DFrameCanvas;
