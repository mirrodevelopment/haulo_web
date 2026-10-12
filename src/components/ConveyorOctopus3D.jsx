import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { loadOctopusModel, cloneOctopusInstance } from '../utils/octopusLoader';

// =============================================================================
// CONVEYOR OCTOPUS 3D — Real-time Three.js creature floating behind typography
// Replaces the static frog PNG images with a living, animated 3D octopus.
// The creature floats centrally, reacts to mouse movement, and its opacity
// is driven by HeroExperience's scroll conveyor system.
// =============================================================================

export const ConveyorOctopus3D = forwardRef(function ConveyorOctopus3D(_, ref) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Externally driven opacity & scale (controlled by HeroExperience scroll)
  const targetOpacityRef = useRef(1);
  const currentOpacityRef = useRef(0);
  const targetScaleRef = useRef(1);

  // Expose imperative control to parent (HeroExperience)
  useImperativeHandle(ref, () => ({
    /** Set the desired opacity (0–1). Smoothly lerped each frame. */
    setOpacity(value) {
      targetOpacityRef.current = Math.max(0, Math.min(1, value));
    },
    /** Set a scale multiplier driven by scroll progress */
    setScale(value) {
      targetScaleRef.current = value;
    },
    /** Direct container element access for GSAP quickSetter if needed */
    get el() {
      return containerRef.current;
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animFrameId = null;
    let mixer = null;
    let isMounted = true;

    // ---- RENDERER ----
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // ---- SCENE ----
    const scene = new THREE.Scene();

    // ---- CAMERA ----
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      80
    );
    camera.position.set(0, 0, 6.5);

    // ---- LIGHTING (Rich pearlescent / translucent jellyfish-style) ----
    const ambientLight = new THREE.AmbientLight(0xeae2fc, 2.0);
    scene.add(ambientLight);

    // Warm key light from top-right
    const keyLight = new THREE.DirectionalLight(0xfff6e6, 2.8);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    // Lavender/purple rim light (back left) — pearlescent highlight
    const rimLight = new THREE.DirectionalLight(0xc8a8ff, 3.5);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // Cyan aquatic fill light from below
    const fillLight = new THREE.DirectionalLight(0xa0dcff, 2.0);
    fillLight.position.set(2, -5, 3);
    scene.add(fillLight);

    // Bright specular point on the mantle
    const pointLight = new THREE.PointLight(0xffffff, 2.2, 12);
    pointLight.position.set(0.5, 2.2, 3.5);
    scene.add(pointLight);

    // Subtle blue glow point for underwater feel
    const glowLight = new THREE.PointLight(0x80c8ff, 1.2, 10);
    glowLight.position.set(-1, -1, 2);
    scene.add(glowLight);

    // ---- ROOT GROUP ----
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const modelGroup = new THREE.Group();
    rootGroup.add(modelGroup);

    // ---- FLOATING GLASS CRYSTALS (ambient particle feel) ----
    const crystalGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ddd0ff'),
      transparent: true,
      opacity: 0.22,
      roughness: 0.05,
      metalness: 0.02,
      side: THREE.DoubleSide,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });

    const crystalCount = 14;
    const crystalMesh = new THREE.InstancedMesh(crystalGeo, crystalMat, crystalCount);
    const dummy = new THREE.Object3D();
    const crystalData = [];

    for (let i = 0; i < crystalCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 3 - 1.5;
      const scale = 0.25 + Math.random() * 0.55;
      const rotSpeed = (Math.random() - 0.5) * 0.3;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scale);
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      dummy.updateMatrix();
      crystalMesh.setMatrixAt(i, dummy.matrix);

      crystalData.push({ x, y, z, scale, rotSpeed, rotY: dummy.rotation.y });
    }
    crystalMesh.instanceMatrix.needsUpdate = true;
    scene.add(crystalMesh);

    // ---- LOAD 3D OCTOPUS MODEL ----
    loadOctopusModel()
      .then((gltf) => {
        if (!isMounted) return;

        const instance = cloneOctopusInstance(gltf);
        if (!instance) return;

        const model = instance.scene;

        // Enhance materials for rich translucent appearance
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
              child.material.envMapIntensity = 1.4;
              child.material.needsUpdate = true;
            }
          }
        });

        // Center model in group (offset from model's origin)
        model.position.set(0.193, -0.893, -0.024);
        modelGroup.add(model);

        // Scale to fill the typography viewport nicely
        modelGroup.scale.setScalar(3.2);

        // Orient: head up, tentacles down, facing camera
        modelGroup.rotation.set(0, -Math.PI / 2, Math.PI / 2);

        // ---- ANIMATION MIXER ----
        mixer = new THREE.AnimationMixer(model);

        const swimClip =
          THREE.AnimationClip.findByName(instance.animations, '01_Swim_Cycle') ||
          THREE.AnimationClip.findByName(instance.animations, '05_Idle_Loop') ||
          instance.animations[0];

        if (swimClip) {
          const action = mixer.clipAction(swimClip);
          action.setEffectiveTimeScale(0.75); // Majestic, slow underwater tempo
          action.play();
        }
      })
      .catch((err) => {
        console.warn('[ConveyorOctopus3D] Error loading 3D octopus:', err);
      });

    // ---- MOUSE PARALLAX ----
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const onPointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltY = nx * 0.20;
      targetTiltX = -ny * 0.12;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // ---- RESIZE HANDLER ----
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.position.z = window.innerWidth < 768 ? 7.8 : 6.5;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    onResize(); // Initial size
    window.addEventListener('resize', onResize);

    // ---- RENDER LOOP ----
    let lastTime = performance.now();
    const startTime = performance.now();

    function renderFrame() {
      animFrameId = requestAnimationFrame(renderFrame);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      if (mixer) {
        mixer.update(delta);
      }

      // Smooth opacity lerp
      currentOpacityRef.current +=
        (targetOpacityRef.current - currentOpacityRef.current) * 0.12;

      // Apply opacity to container
      if (containerRef.current) {
        containerRef.current.style.opacity = currentOpacityRef.current.toFixed(4);
      }

      // Idle floating bob
      const idleY = Math.sin(elapsed * 0.8) * 0.08;
      const idleRotZ = Math.sin(elapsed * 0.55) * 0.025;

      // Smooth mouse parallax
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      rootGroup.position.y = idleY;
      rootGroup.rotation.z = idleRotZ;
      rootGroup.rotation.x = currentTiltX + Math.sin(elapsed * 0.65) * 0.015;
      rootGroup.rotation.y = currentTiltY + Math.cos(elapsed * 0.45) * 0.02;

      // Scroll-driven scale
      const s = targetScaleRef.current;
      rootGroup.scale.setScalar(s);

      // Animate floating crystals
      for (let i = 0; i < crystalCount; i++) {
        const cd = crystalData[i];
        dummy.position.set(
          cd.x,
          cd.y + Math.sin(elapsed * 0.6 + i * 1.1) * 0.06,
          cd.z
        );
        dummy.scale.setScalar(cd.scale);
        dummy.rotation.y = cd.rotY + elapsed * cd.rotSpeed;
        dummy.updateMatrix();
        crystalMesh.setMatrixAt(i, dummy.matrix);
      }
      crystalMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    }

    renderFrame();

    // ---- CLEANUP ----
    return () => {
      isMounted = false;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (mixer) mixer.stopAllAction();
      crystalGeo.dispose();
      crystalMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="conveyor-octopus-3d"
      style={{ opacity: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
});
