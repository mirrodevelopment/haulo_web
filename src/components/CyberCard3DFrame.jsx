import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useSpring, animated } from "@react-spring/web";
import cyberFrameFallbackImg from "../assets/cardBoxImg/cyber-frame.png";
import "../styles/sections/cyberFrame3D.css";

/**
 * CyberCard3DFrame
 * Hybrid 3D Cybernetic Chassis Frame component for the 4 service cards.
 * 
 * Features:
 * 1. Automatic 3D Model Loader:
 *    - Loads .glb / .gltf 3D model files from `public/models/cyber-frame.glb` or `public/models/card-frame.glb`.
 *    - Applies metallic PBR materials (metalness: 0.88, roughness: 0.22) and emissive neon lime LEDs (#c8ff00).
 *    - Automatically centers, scales, and aligns the 3D model to the card face.
 * 2. Instant High-Fidelity Hybrid Fallback:
 *    - Uses high-resolution cutout texture from user asset (cyber-frame.png).
 *    - Real-time Three.js specular lighting + 8 animated pulsing neon LEDs (#c8ff00) matching all bezel slots.
 * 3. Seamless GSAP Integration:
 *    - Fully compatible with the 3D Orbit Carousel rig and CSS 3D transforms.
 */
export const CyberCard3DFrame = ({
  imageSrc,
  alt = "Service Card",
  label = "",
  modelUrl = "/models/cyber-frame.glb",
  children,
  className = "",
  showBadge = false
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  // React Spring 3D physics engine for realistic interactive chassis tilt & recoil
  const [{ xys, ledIntensity }, springApi] = useSpring(() => ({
    xys: [0, 0, 1], // [rotateX, rotateY, scale]
    ledIntensity: 1.0,
    config: { mass: 2.2, tension: 280, friction: 32 }
  }));

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth physics angles (-8.5deg to +8.5deg) with responsive micro-depth scale (1.028)
    const rotX = -((y - centerY) / centerY) * 8.5;
    const rotY = ((x - centerX) / centerX) * 8.5;

    springApi.start({
      xys: [rotX, rotY, 1.028],
      ledIntensity: 1.45
    });
  };

  const handleMouseLeave = () => {
    springApi.start({
      xys: [0, 0, 1],
      ledIntensity: 1.0
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isMounted = true;
    let animId = null;

    const width = container.clientWidth || 350;
    const height = container.clientHeight || 466;

    // 1. SCENE
    const scene = new THREE.Scene();

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 4. LIGHTS (Metallic reflections & lime LED glow)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLightTopLeft = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLightTopLeft.position.set(-3, 4, 4);
    scene.add(dirLightTopLeft);

    const dirLightBottomRight = new THREE.DirectionalLight(0xa3e635, 1.2);
    dirLightBottomRight.position.set(3, -4, 2);
    scene.add(dirLightBottomRight);

    // Corner LED accent point lights (#c8ff00)
    const ledLightTL = new THREE.PointLight(0xc8ff00, 1.2, 3);
    ledLightTL.position.set(-1.4, 2.0, 0.4);
    scene.add(ledLightTL);

    const ledLightTR = new THREE.PointLight(0xc8ff00, 1.2, 3);
    ledLightTR.position.set(1.4, 2.0, 0.4);
    scene.add(ledLightTR);

    const ledLightBL = new THREE.PointLight(0xc8ff00, 1.2, 3);
    ledLightBL.position.set(-1.4, -2.0, 0.4);
    scene.add(ledLightBL);

    const ledLightBR = new THREE.PointLight(0xc8ff00, 1.2, 3);
    ledLightBR.position.set(1.4, -2.0, 0.4);
    scene.add(ledLightBR);

    let frame3DGroup = new THREE.Group();
    scene.add(frame3DGroup);

    // 5. GLTF 3D MODEL LOADER PIPELINE
    const setupGLTFLoader = () => {
      const loader = new GLTFLoader();
      
      // Setup DRACO decompression support if needed
      try {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
        loader.setDRACOLoader(dracoLoader);
      } catch (e) {
        // Fallback without Draco if CDN blocked
      }

      // Candidate paths for team's 3D model
      const candidates = [
        modelUrl,
        "/models/cyber-frame.glb",
        "/models/card-frame.glb",
        "/models/frame.glb",
        "/models/cyber-frame.gltf"
      ];

      const tryLoadCandidate = (index) => {
        if (index >= candidates.length || !isMounted) return;
        const candidateUrl = candidates[index];

        // Check if file exists via HEAD request first
        fetch(candidateUrl, { method: "HEAD" })
          .then((res) => {
            if (res.ok && res.status !== 404 && res.headers.get("content-type")?.includes("octet-stream") || res.ok) {
              loader.load(
                candidateUrl,
                (gltf) => {
                  if (!isMounted) return;
                  const model = gltf.scene || gltf.scenes[0];

                  // Compute bounding box and normalize scale to match card proportions
                  const box = new THREE.Box3().setFromObject(model);
                  const size = new THREE.Vector3();
                  box.getSize(size);
                  const center = new THREE.Vector3();
                  box.getCenter(center);

                  model.position.sub(center); // Center model

                  // Scale to fit target dimensions (height ~ 4.2 units in camera view)
                  const targetHeight = 4.2;
                  const scale = targetHeight / (size.y || 1);
                  model.scale.set(scale, scale, scale);

                  // Traverse and upgrade materials
                  model.traverse((child) => {
                    if (child.isMesh) {
                      child.castShadow = true;
                      child.receiveShadow = true;

                      const name = (child.name || "").toLowerCase();
                      const isLed = name.includes("led") || name.includes("light") || name.includes("glow") || name.includes("neon");
                      const isScrew = name.includes("bolt") || name.includes("screw");

                      if (isLed) {
                        child.material = new THREE.MeshStandardMaterial({
                          color: new THREE.Color(0xc8ff00),
                          emissive: new THREE.Color(0xc8ff00),
                          emissiveIntensity: 2.8,
                          roughness: 0.15,
                          metalness: 0.2
                        });
                      } else if (isScrew) {
                        child.material = new THREE.MeshStandardMaterial({
                          color: new THREE.Color(0x22252a),
                          metalness: 0.95,
                          roughness: 0.12
                        });
                      } else {
                        // Futuristic titanium metallic chassis
                        child.material = new THREE.MeshStandardMaterial({
                          color: new THREE.Color(0xdce2ea),
                          metalness: 0.88,
                          roughness: 0.22,
                          envMapIntensity: 1.2
                        });
                      }
                    }
                  });

                  frame3DGroup.add(model);
                  setModelLoaded(true);
                },
                undefined,
                () => {
                  // If loading fails, try next candidate
                  tryLoadCandidate(index + 1);
                }
              );
            } else {
              tryLoadCandidate(index + 1);
            }
          })
          .catch(() => {
            tryLoadCandidate(index + 1);
          });
      };

      tryLoadCandidate(0);
    };

    setupGLTFLoader();

    // 6. ANIMATION & SPECULAR REFLECTION LOOP
    let time = 0;
    const animate = () => {
      if (!isMounted) return;
      time += 0.02;

      // Gentle pulsing of corner LED point lights
      const pulse = 1.0 + Math.sin(time * 2.5) * 0.35;
      ledLightTL.intensity = 1.2 * pulse;
      ledLightTR.intensity = 1.2 * pulse;
      ledLightBL.intensity = 1.2 * pulse;
      ledLightBR.intensity = 1.2 * pulse;

      // Subtle dynamic metallic highlight sweep
      dirLightTopLeft.position.x = -3 + Math.sin(time * 0.8) * 0.8;
      dirLightTopLeft.position.y = 4 + Math.cos(time * 0.8) * 0.6;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    // 7. RESIZE HANDLER
    const handleResize = () => {
      if (!container || !isMounted) return;
      const w = container.clientWidth || 350;
      const h = container.clientHeight || 466;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);

      // Dispose Three.js objects
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [modelUrl]);

  return (
    <animated.div
      ref={containerRef}
      className={`cyberCardContainer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: xys.to(
          (x, y, s) =>
            `perspective(800px) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg) scale3d(${s.toFixed(3)}, ${s.toFixed(3)}, ${s.toFixed(3)})`
        ),
        transformStyle: "preserve-3d"
      }}
    >
      {/* 1. Recessed inner screen for card content */}
      <div className="cyberCardInnerScreen">
        {children ? (
          children
        ) : imageSrc ? (
          <img src={imageSrc} alt={alt} decoding="async" />
        ) : null}
      </div>

      {/* 2. Standalone Metallic Frame Cutout (Seamless overlay until 3D model loads, or hybrid base) */}
      <img
        src={cyberFrameFallbackImg}
        alt="Cybernetic Frame Chassis"
        className="cyberFrameOverlay"
        decoding="async"
        loading="eager"
      />

      {/* 3. Three.js Real-time 3D Canvas (Hosts GLTF 3D Mesh & dynamic specular lighting) */}
      <canvas ref={canvasRef} className="cyberFrame3DCanvas" />

      {/* 4. 8-Point Cyber Neon Lime LED Arrays (#c8ff00) matching chassis slots */}
      <animated.div
        className="cyberLedLuminescence"
        aria-hidden="true"
        style={{
          opacity: ledIntensity
        }}
      >
        <span className="cyberLedPoint cyberLed-tl" />
        <span className="cyberLedPoint cyberLed-tr" />
        <span className="cyberLedPoint cyberLed-l-top" />
        <span className="cyberLedPoint cyberLed-l-mid" />
        <span className="cyberLedPoint cyberLed-r-top" />
        <span className="cyberLedPoint cyberLed-r-mid" />
        <span className="cyberLedPoint cyberLed-bl" />
        <span className="cyberLedPoint cyberLed-br" />
      </animated.div>

      {/* 5. Optional 3D Model Readiness Badge */}
      {showBadge && modelLoaded && (
        <span className="cyber3DReadyBadge">3D GLTF ACTIVE</span>
      )}

      {/* 6. Card Title Word (Optional) */}
      {label && (
        <div className="cyberCardLabelBar">
          <span className="cyberCardWord">{label}</span>
        </div>
      )}
    </animated.div>
  );
};

export default CyberCard3DFrame;

