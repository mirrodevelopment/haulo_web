import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import frogModelUrl from '../final frog.glb?url';

let cachedGLTF = null;
let gltfLoadingPromise = null;
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(`${import.meta.env.BASE_URL}draco/`);

function loadFrogGLTF() {
  if (cachedGLTF) return Promise.resolve(cachedGLTF);
  if (gltfLoadingPromise) return gltfLoadingPromise;

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  gltfLoadingPromise = new Promise((resolve, reject) => {
    loader.load(
      frogModelUrl,
      (gltf) => {
        cachedGLTF = gltf;
        gltfLoadingPromise = null;
        resolve(gltf);
      },
      undefined,
      (err) => {
        gltfLoadingPromise = null;
        reject(err);
      }
    );
  });
  return gltfLoadingPromise;
}

// Config per word action personality: grounded hero stance matching reference images
const WORD_ACTIONS = [
  // 0: HAULO — Sovereign, balanced hero stance
  {
    scale: 1.30,
    position: [0.00, -0.47, 0],
    rotation: [0.00, 0.00, 0.02],
    yaw: -0.70,
    camY: 0.30,
    camZ: 2.12,
    targetY: 0.08,
  },
  // 1: DESIGN TO — Architectural stance
  {
    scale: 1.37,
    position: [0, -0.47, 0],
    rotation: [0.02, 0.10, -0.02],
    yaw: -0.65,
    camY: 0.32,
    camZ: 2.12,
    targetY: 0.08,
  },
  // 2: THINK — Contemplative angle
  {
    scale: 1.30,
    position: [0, -0.47, 0],
    rotation: [-0.02, -0.10, 0.02],
    yaw: -0.60,
    camY: 0.32,
    camZ: 2.12,
    targetY: 0.08,
  },
  // 3: BUILD — Mechanical ready stance
  {
    scale: 1.35,
    position: [0, -0.47, 0],
    rotation: [0.03, 0.12, -0.02],
    yaw: -0.66,
    camY: 0.32,
    camZ: 2.12,
    targetY: 0.08,
  },
  // 4: AND EVOLVE — Interactive 3D showcase stance
  {
    scale: 1.32,
    position: [0, -0.47, 0],
    rotation: [0.00, 0.00, 0.00],
    yaw: -0.62,
    camY: 0.32,
    camZ: 2.12,
    targetY: 0.08,
  },
];

// Scratch objects for high-performance zero-allocation matrix updates
const _tempEuler = new THREE.Euler();
const _tempQuat = new THREE.Quaternion();
const _qSpaceForward = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 2, Math.PI / 2, 'XYZ'));
const _qSpaceBackward = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI / 2, -Math.PI / 2, 'XYZ'));
const _qSpace = new THREE.Quaternion();
const _qGround = new THREE.Quaternion();
const _qOsc = new THREE.Quaternion();

// Exact 5 section poses matching the 5 reference images:
// Paws remain solidly anchored on the floor plane while rear leg folds and stances articulate
const SECTION_POSES = [
  // 0: HAULO
  {
    bodyOffsetY: 0.0,
    bodyPitch: 0.0,
    bodyRoll: 0.0,
    thighL: [0, 0, 0],
    shinL: [0, 0, 0],
    hockL: [0, 0, 0],
    palmL: [0, 0, 0],
    thighR: [0, 0, 0],
    shinR: [0, 0, 0],
    hockR: [0, 0, 0],
    palmR: [0, 0, 0],
    armL: [0, 0, 0],
    forearmL: [0, 0, 0],
    armR: [0, 0, 0],
    forearmR: [0, 0, 0],
  },
  // 1: DESIGN TO - Asymmetrical architectural stance with left knee flared
  {
    bodyOffsetY: 0.0,
    bodyPitch: 0.0,
    bodyRoll: 0.0,
    thighL: [0.12, 0.08, -0.12],
    shinL: [-0.08, 0.0, 0.06],
    hockL: [0.02, 0.0, -0.02],
    palmL: [0.0, 0.0, 0.0],
    thighR: [-0.04, 0.0, 0.04],
    shinR: [0.04, 0.0, -0.04],
    hockR: [0.0, 0.0, 0.0],
    palmR: [0.0, 0.0, 0.0],
    armL: [0, 0, 0],
    forearmL: [0, 0, 0],
    armR: [0, 0, 0],
    forearmR: [0, 0, 0],
  },
  // 2: THINK - Compact tightly-folded crouch (hind legs tightly compressed into flank)
  {
    bodyOffsetY: 0.0,
    bodyPitch: 0.0,
    bodyRoll: 0.0,
    thighL: [0.24, -0.08, 0.16],
    shinL: [0.18, 0.04, -0.12],
    hockL: [-0.10, 0.0, 0.0],
    palmL: [0.0, 0.0, 0.0],
    thighR: [0.24, 0.08, -0.16],
    shinR: [0.18, -0.04, 0.12],
    hockR: [-0.10, 0.0, 0.0],
    palmR: [0.0, 0.0, 0.0],
    armL: [0, 0, 0],
    forearmL: [0, 0, 0],
    armR: [0, 0, 0],
    forearmR: [0, 0, 0],
  },
  // 3: BUILD - Wide mechanical push-up stance with wide flared hind legs
  {
    bodyOffsetY: 0.0,
    bodyPitch: 0.0,
    bodyRoll: 0.0,
    thighL: [-0.10, 0.14, -0.18],
    shinL: [0.10, 0.0, 0.08],
    hockL: [0.04, 0.0, -0.04],
    palmL: [0.0, 0.0, 0.0],
    thighR: [-0.10, -0.14, 0.18],
    shinR: [0.10, 0.0, -0.08],
    hockR: [0.04, 0.0, 0.04],
    palmR: [0.0, 0.0, 0.0],
    armL: [0, 0, 0],
    forearmL: [0, 0, 0],
    armR: [0, 0, 0],
    forearmR: [0, 0, 0],
  },
  // 4: AND EVOLVE - Extended low aerodynamic stance with unfolded left hind leg
  {
    bodyOffsetY: 0.0,
    bodyPitch: 0.0,
    bodyRoll: 0.0,
    thighL: [-0.28, 0.20, -0.28],
    shinL: [-0.18, -0.08, 0.15],
    hockL: [0.14, 0.0, -0.06],
    palmL: [0.0, 0.0, 0.0],
    thighR: [-0.12, -0.08, 0.12],
    shinR: [0.04, 0.0, -0.04],
    hockR: [0.0, 0.0, 0.0],
    palmR: [0.0, 0.0, 0.0],
    armL: [0, 0, 0],
    forearmL: [0, 0, 0],
    armR: [0, 0, 0],
    forearmR: [0, 0, 0],
  },
  // 5: EDITORIAL HERO — Left-facing balanced hero stance
  {
    bodyOffsetY: 0.0,
    bodyPitch: 0.0,
    bodyRoll: 0.0,
    thighL: [0, 0, 0],
    shinL: [0, 0, 0],
    hockL: [0, 0, 0],
    palmL: [0, 0, 0],
    thighR: [0, 0, 0],
    shinR: [0, 0, 0],
    hockR: [0, 0, 0],
    palmR: [0, 0, 0],
    armL: [0, 0, 0],
    forearmL: [0, 0, 0],
    armR: [0, 0, 0],
    forearmR: [0, 0, 0],
  },
];

export default function Frog3D({ wordIndex = 0, className = '', style = {}, facingRef = null }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const actionConfig = WORD_ACTIONS[wordIndex] || WORD_ACTIONS[0];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animFrameId = null;
    let isMounted = true;
    let controls = null;

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
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.10;

    // ---- SCENE ----
    const scene = new THREE.Scene();

    let modelInstance = null;
    let mixer = null;
    let bodyBone = null;
    let rootBone = null;
    let bones = null;
    let currentPRel = wordIndex || 0;
    const floorY = actionConfig.position[1]; // Ground baseline elevation

    // ---- CAMERA ----
    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 50);
    camera.position.set(0, actionConfig.camY, actionConfig.camZ);
    camera.lookAt(0, actionConfig.targetY, 0);

    // ---- STUDIO LIGHTING FOR VOLUMETRIC FORM & CRISP SPECULAR HIGHLIGHTS ----
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.3);
    rimLight.position.set(-4, 5, -3);
    scene.add(rimLight);

    const topRimLight = new THREE.DirectionalLight(0xffffff, 0.9);
    topRimLight.position.set(0, 6, -2);
    scene.add(topRimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    // ---- ROOT GROUP ----
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    let heroFacingYaw = actionConfig.yaw !== undefined ? actionConfig.yaw : -0.70;
    let targetJumpFrac = 0;

    // Interactive jump state (Spacebar / Canvas click impulse)
    let isInteractiveJumping = false;
    let interactiveJumpProgress = 0;

    const triggerInteractiveJump = () => {
      if (isInteractiveJumping) return;
      isInteractiveJumping = true;
      interactiveJumpProgress = 0;
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isInteractiveJumping) {
        e.preventDefault();
        triggerInteractiveJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const handleCanvasClick = () => {
      if (!isInteractiveJumping && (!controls || !controls.enabled)) {
        triggerInteractiveJump();
      }
    };
    canvas.addEventListener('click', handleCanvasClick);

    // ---- ORBIT CONTROLS ----
    controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false; // Never block page scroll
    controls.enablePan = false;  // Keep grounded on shadow
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, actionConfig.targetY, 0);
    controls.minPolarAngle = Math.PI / 4.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Do not go under floor
    controls.minAzimuthAngle = -Math.PI / 2;
    controls.maxAzimuthAngle = Math.PI / 2;

    // Manual rotation disabled for 1st 4 areas, enabled ONLY for 5th area ("AND EVOLVE")
    const isFifthAreaInitial = wordIndex === 4;
    controls.enabled = isFifthAreaInitial;
    let isSpaceFloat = false;
    let spaceFloatT = 0;
    let targetSpaceScrollPhase = 0;
    let spaceModelScale = 1.0;
    let spaceDirTurn = 0;
    let currentSpaceDirTurn = 0;
    let spaceScrollDir = 1;

    if (facingRef) {
      facingRef.current = (yaw, pRel = 0, jumpFrac = 0, isSpace = false, scrollPhase = 0, modelScale = 1.0, dirTurn = 0, scrollDir = 1) => {
        if (typeof yaw === 'number') {
          heroFacingYaw = yaw;
        }
        currentPRel = Math.max(0, Math.min(5, pRel));
        targetJumpFrac = Math.max(0, Math.min(1, jumpFrac));
        isSpaceFloat = Boolean(isSpace);
        targetSpaceScrollPhase = typeof scrollPhase === 'number' ? scrollPhase : 0;
        if (typeof modelScale === 'number' && modelScale > 0) {
          spaceModelScale = modelScale;
        }
        if (typeof dirTurn === 'number') {
          spaceDirTurn = Math.max(0, Math.min(1, dirTurn));
        }
        if (typeof scrollDir === 'number') {
          spaceScrollDir = scrollDir;
        }

        // Enable manual rotation only for the 5th area ("AND EVOLVE", 3.65 <= pRel <= 4.05)
        const isFifthArea = pRel >= 3.65 && pRel <= 4.05;
        if (controls) {
          if (controls.enabled !== isFifthArea) {
            controls.enabled = isFifthArea;
            canvas.style.cursor = isFifthArea ? 'grab' : 'default';
          }
        }
      };

      // Immediately apply initial orientation and lock controls
      facingRef.current(heroFacingYaw, currentPRel, 0, false, 0);
    }

    let isUserDragging = false;
    let targetParallaxY = 0;
    let targetParallaxX = 0;
    let currentParallaxY = 0;
    let currentParallaxX = 0;

    controls.addEventListener('start', () => {
      isUserDragging = true;
      canvas.style.cursor = 'grabbing';
    });
    controls.addEventListener('end', () => {
      isUserDragging = false;
      canvas.style.cursor = 'grab';
    });

    const onPointerMove = (e) => {
      if (isUserDragging || controls.enabled) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetParallaxY = nx * 0.07;
      targetParallaxX = -ny * 0.04;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // ---- RESIZE HANDLER ----
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 1000;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      if (modelInstance) modelInstance.scale.setScalar(actionConfig.scale);
    };
    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    // ---- LOAD MODEL & EMBEDDED ANIMATION ACTION ----
    loadFrogGLTF()
      .then((gltf) => {
        if (!isMounted) return;

        // Use SkeletonUtils to clone skinned meshes with full skeletal rebinding
        const model = SkeletonUtils.clone(gltf.scene);
        const materialInstances = new Map();

        // Turn OFF internal Blender 35,000-lumen lights to prevent blowout
        model.traverse((child) => {
          if (child.isLight) {
            child.visible = false;
            child.intensity = 0;
          }
          if (child.isMesh && child.material) {
            const makeMaterial = (sourceMaterial) => {
              if (!sourceMaterial) return sourceMaterial;
              let mat = materialInstances.get(sourceMaterial);
              if (!mat) {
                mat = sourceMaterial.clone();
                materialInstances.set(sourceMaterial, mat);
              }

              const materialName = mat.name.toLowerCase();
              const isRingOrNailPad =
                materialName.includes('complete ring') ||
                materialName.includes('black center') ||
                materialName.includes('ring');

              const isGreenSurface =
                materialName.includes('_green') ||
                materialName.includes('neon') ||
                materialName === 'eye' ||
                materialName.startsWith('material.003') ||
                materialName.startsWith('material.004') ||
                isRingOrNailPad;

              if (isRingOrNailPad) {
                // Joint rings and toe nail pads: RETAIN texture so black center circle is preserved
                mat.color.set('#FFFFFF');
                if (mat.map) {
                  mat.map.colorSpace = THREE.SRGBColorSpace;
                  mat.map.needsUpdate = true;
                  mat.emissiveMap = mat.map;
                }
                mat.emissive.set('#D8FF00');
                mat.emissiveIntensity = 0.38;
                mat.roughness = 0.14;
                mat.metalness = 0.02;
              } else if (isGreenSurface) {
                // High-chroma electric lemon-neon matching reference images
                const isEyeOrAccent = materialName === 'eye' || materialName.includes('neon');
                mat.color.set('#EAFF00');
                mat.map = null;
                mat.emissive.set(isEyeOrAccent ? '#D8FF00' : '#B8FF00');
                mat.emissiveIntensity = isEyeOrAccent ? 0.48 : 0.22;
                mat.roughness = 0.14;
                mat.metalness = 0.02;
              } else if (mat.map) {
                mat.map.colorSpace = THREE.SRGBColorSpace;
                mat.map.needsUpdate = true;
              }
              mat.needsUpdate = true;
              return mat;
            };
            child.material = Array.isArray(child.material)
              ? child.material.map(makeMaterial)
              : makeMaterial(child.material);
          }
        });

        // Initialize AnimationMixer using the model's authentic 72-channel animation action
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const clipAction = mixer.clipAction(gltf.animations[0]);
          clipAction.setLoop(THREE.LoopOnce, 1);
          clipAction.clampWhenFinished = true;
          clipAction.play();
          mixer.setTime(0.0416); // Set initial resting posture
        }

        bodyBone = model.getObjectByName('BODY');
        rootBone = model.getObjectByName('ROOT');
        bones = {
          body: bodyBone,
          thighL: model.getObjectByName('Rear_Thigh.L'),
          shinL: model.getObjectByName('Rear_Shin.L'),
          hockL: model.getObjectByName('Rear_Hock.L'),
          palmL: model.getObjectByName('Rear_Palm.L'),
          thighR: model.getObjectByName('Rear_Thigh.R'),
          shinR: model.getObjectByName('Rear_Shin.R'),
          hockR: model.getObjectByName('Rear_Hock.R'),
          palmR: model.getObjectByName('Rear_Palm.R'),
          armL: model.getObjectByName('Front_Upper.L'),
          forearmL: model.getObjectByName('Front_Lower.L'),
          armR: model.getObjectByName('Front_Upper.R'),
          forearmR: model.getObjectByName('Front_Lower.R'),
        };

        // Set action-specific position, scale, and attitude
        model.position.set(...actionConfig.position);
        modelInstance = model;
        model.scale.setScalar(actionConfig.scale);
        model.rotation.set(...actionConfig.rotation);
        rootGroup.add(model);
      })
      .catch((err) => {
        console.error('[Frog3D] Error rendering frog model:', err);
      });

    // ---- RENDER LOOP ----
    let lastTime = performance.now();
    const startTime = performance.now();
    let wasJumping = false;
    let lastLandTime = -999;

    function animate() {
      animFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      if (modelInstance && mixer) {
        let jumpProgress = 0;

        if (isInteractiveJumping) {
          // Play interactive jump in real-time with snappy speed (~0.65s leap duration)
          interactiveJumpProgress += delta * 1.55;
          if (interactiveJumpProgress >= 1) {
            interactiveJumpProgress = 1;
            isInteractiveJumping = false;
          }
          jumpProgress = interactiveJumpProgress;
        } else if (targetJumpFrac > 0.001) {
          jumpProgress = targetJumpFrac;
        }

        if (isSpaceFloat) {
          // Direct scroll coupling during flight (0.0 -> 1.0) and in ring sections
          if (targetSpaceScrollPhase <= 1.0) {
            spaceFloatT = Math.max(0, Math.min(1, targetSpaceScrollPhase));
          } else {
            spaceFloatT = 1.0;
          }

          // Zero-g flying & floating leg motion (NO ground running)
          let swimAnimTime;
          if (targetSpaceScrollPhase <= 1.0) {
            // Flight between Section 2 and Section 3
            const p = Math.max(0, Math.min(1, targetSpaceScrollPhase));
            if (spaceScrollDir === -1) {
              // Backward: flight descending back onto Section 2 floor
              if (p > 0.85) {
                swimAnimTime = 2.00 + ((1.0 - p) / 0.15) * (2.35 - 2.00);
              } else if (p > 0.35) {
                swimAnimTime = 2.35 + ((0.85 - p) / 0.50) * (1.35 - 2.35);
              } else {
                swimAnimTime = 1.35 + ((0.35 - p) / 0.35) * (1.00 - 1.35);
              }
            } else {
              // Forward: push-off -> full flying kick stroke -> glide into ring
              if (p < 0.15) {
                swimAnimTime = 1.00 + (p / 0.15) * (1.35 - 1.00); // Spring push-off from floor
              } else if (p < 0.65) {
                swimAnimTime = 1.35 + ((p - 0.15) / 0.50) * (2.35 - 1.35); // Full flying stroke
              } else {
                swimAnimTime = 2.35 + ((p - 0.65) / 0.35) * (2.00 - 2.35); // Glide smoothly into resting ring pose
              }
            }
          } else {
            // Inside the ring section: flying and floating kicks driven by scrolling through rings
            const ringStroke = (targetSpaceScrollPhase - 1.0);
            const strokePhase = spaceScrollDir === -1 ? -ringStroke : ringStroke;
            const strokeCycle = (Math.sin(strokePhase * Math.PI * 2) + 1) * 0.5;
            // 1.55s -> 2.45s: purely airborne flying & floating strokes (NO ground running)
            swimAnimTime = 1.55 + strokeCycle * (2.45 - 1.55);
          }

          mixer.setTime(swimAnimTime);

          if (bodyBone && rootBone) {
            const forwardOffset = bodyBone.position.x - (-0.060);
            rootBone.position.x = -forwardOffset;
          }

          modelInstance.position.y = floorY;
          modelInstance.rotation.x = actionConfig.rotation[0];
        } else {
          spaceFloatT = 0.0;
          if (jumpProgress > 0.001) {
            wasJumping = true;
            // Piecewise keyframe timing synchronized with section arrival:
            // 0.00 -> 0.06: immediate crouch spring compression on floor (1.00s -> 1.33s)
            // 0.06 -> 0.50: airborne launch up to peak apex (1.33s -> 2.04s)
            // 0.50 -> 0.94: airborne flight & descent towards touchdown (2.04s -> 2.79s)
            // 0.94 -> 1.00: feet contact touchdown cushion & settle right as area arrives (2.79s -> 3.70s)
            let animTime = 1.00;
            if (jumpProgress < 0.06) {
              animTime = 1.00 + (jumpProgress / 0.06) * (1.33 - 1.00);
            } else if (jumpProgress < 0.50) {
              const p = (jumpProgress - 0.06) / (0.50 - 0.06);
              animTime = 1.33 + p * (2.04 - 1.33);
            } else if (jumpProgress < 0.94) {
              const p = (jumpProgress - 0.50) / (0.94 - 0.50);
              animTime = 2.04 + p * (2.79 - 2.04);
            } else {
              const p = (jumpProgress - 0.94) / (1.00 - 0.94);
              animTime = 2.79 + p * (3.70 - 2.79);
            }
            mixer.setTime(animTime);

            // In-place root motion compensation
            if (bodyBone && rootBone) {
              const forwardOffset = bodyBone.position.x - (-0.060);
              rootBone.position.x = -forwardOffset;
            }

            // Real 3D continuous physical elevation & gentle flight pitch
            // Stays airborne across 0.06 -> 0.94 so landing coincides with area arrival
            let elevY = 0;
            let pitchTilt = 0;

            if (jumpProgress < 0.06) {
              // Smooth crouch spring compression
              const tC = jumpProgress / 0.06;
              elevY = -0.03 * Math.sin(tC * Math.PI);
              pitchTilt = 0.04 * Math.sin(tC * Math.PI);
            } else if (jumpProgress <= 0.94) {
              // Airborne flight arc spanning all the way across to destination area
              const w = (jumpProgress - 0.06) / (0.94 - 0.06);
              elevY = 0.36 * Math.sin(w * Math.PI);
              pitchTilt = (w < 0.50 ? 0.18 : -0.14) * Math.sin(w * Math.PI);
            } else {
              // Touchdown cushion & soft ground settling as area completes arrival
              const v = (jumpProgress - 0.94) / 0.06;
              elevY = 0.02 * Math.sin(v * Math.PI) * (1 - v);
              pitchTilt = -0.04 * (1 - v) * (1 - v);
            }

            modelInstance.position.y = floorY + elevY;
            modelInstance.rotation.x = actionConfig.rotation[0] + pitchTilt;
          } else {
            // When landing from a jump, record the landing timestamp
            if (wasJumping) {
              wasJumping = false;
              lastLandTime = elapsed;
            }

            // Lively head dance holds still for 1.0 second after landing, then smoothly begins
            const timeSinceLand = elapsed - lastLandTime;
            let danceWeight = 1.0;
            if (timeSinceLand < 1.0) {
              danceWeight = 0.0;
            } else if (timeSinceLand < 1.35) {
              const t = (timeSinceLand - 1.0) / 0.35;
              danceWeight = t * t * (3 - 2 * t);
            }

            // LIVELY RESTING STANCE: ORGANIC HEAD DANCING & RESPIRATORY PULSE
            const primaryPulse = Math.sin(elapsed * 2.2);
            const microPulse = Math.sin(elapsed * 4.4) * 0.25;
            const combinedCycle = (primaryPulse + microPulse + 1.25) / 2.5; // Normalized 0.0 -> 1.0
            const clampedCycle = Math.max(0, Math.min(1, combinedCycle));
            // When danceWeight = 0 (first 1s after landing): holds still at 0.35s landed pose
            const breatheTime = 0.35 + clampedCycle * 0.50 * danceWeight;
            mixer.setTime(breatheTime);

            if (bodyBone && rootBone) {
              const forwardOffset = bodyBone.position.x - (-0.060);
              rootBone.position.x = -forwardOffset;
            }

            modelInstance.position.y = floorY;
            modelInstance.rotation.x = actionConfig.rotation[0];
          }
        }

        // Apply calibrated held pose & leg folds matching reference images for the 5 sections
        if (bones && bones.body) {
          const clampedPRel = Math.max(0, Math.min(5, currentPRel));
          const idx = Math.min(4, Math.floor(clampedPRel));
          const frac = clampedPRel - idx;
          const smoothT = frac * frac * (3 - 2 * frac);

          const poseA = SECTION_POSES[idx];
          const poseB = SECTION_POSES[Math.min(5, idx + 1)];

          // Blend pose smoothly with jump: during airborne jump flight (0.06..0.94),
          // let the dynamic jump animation take over, and ease smoothly back into the landing pose
          let poseWeight = 1.0;
          if (spaceFloatT > 0.01) {
            poseWeight = Math.max(0, 1.0 - spaceFloatT);
          } else if (jumpProgress > 0.06 && jumpProgress < 0.94) {
            const flightT = (jumpProgress - 0.06) / (0.94 - 0.06);
            poseWeight = 1.0 - Math.sin(flightT * Math.PI) * 0.85;
          }

          const applyBoneRot = (bone, key) => {
            if (!bone || !poseA[key] || !poseB[key]) return;
            const a = poseA[key];
            const b = poseB[key];
            const rx = (a[0] + (b[0] - a[0]) * smoothT) * poseWeight;
            const ry = (a[1] + (b[1] - a[1]) * smoothT) * poseWeight;
            const rz = (a[2] + (b[2] - a[2]) * smoothT) * poseWeight;
            if (Math.abs(rx) > 0.0001 || Math.abs(ry) > 0.0001 || Math.abs(rz) > 0.0001) {
              _tempEuler.set(rx, ry, rz);
              _tempQuat.setFromEuler(_tempEuler);
              bone.quaternion.multiply(_tempQuat);
            }
          };

          applyBoneRot(bones.thighL, 'thighL');
          applyBoneRot(bones.shinL, 'shinL');
          applyBoneRot(bones.hockL, 'hockL');
          applyBoneRot(bones.palmL, 'palmL');

          applyBoneRot(bones.thighR, 'thighR');
          applyBoneRot(bones.shinR, 'shinR');
          applyBoneRot(bones.hockR, 'hockR');
          applyBoneRot(bones.palmR, 'palmR');

          applyBoneRot(bones.armL, 'armL');
          applyBoneRot(bones.forearmL, 'forearmL');

          applyBoneRot(bones.armR, 'armR');
          applyBoneRot(bones.forearmR, 'forearmR');

          // Torso pitch, roll, and elevation offset
          const bodyOffsetY = (poseA.bodyOffsetY + (poseB.bodyOffsetY - poseA.bodyOffsetY) * smoothT) * poseWeight;
          const bodyPitch = (poseA.bodyPitch + (poseB.bodyPitch - poseA.bodyPitch) * smoothT) * poseWeight;
          const bodyRoll = (poseA.bodyRoll + (poseB.bodyRoll - poseA.bodyRoll) * smoothT) * poseWeight;

          bones.body.position.y += bodyOffsetY;
          if (Math.abs(bodyPitch) > 0.0001 || Math.abs(bodyRoll) > 0.0001) {
            _tempEuler.set(bodyPitch, 0, bodyRoll);
            _tempQuat.setFromEuler(_tempEuler);
            bones.body.quaternion.multiply(_tempQuat);
          }
        }
      }

      controls.update();

      if (!isUserDragging) {
        currentParallaxX += (targetParallaxX - currentParallaxX) * 0.05;
        currentParallaxY += (targetParallaxY - currentParallaxY) * 0.05;
        currentSpaceDirTurn += (spaceDirTurn - currentSpaceDirTurn) * 0.12;

        // Ground orientation (Sections 1 & 2)
        const groundRotX = actionConfig.rotation[0] || 0;
        const groundRotY = heroFacingYaw + currentParallaxY + Math.sin(elapsed * 0.5) * 0.008;
        const groundRotZ = actionConfig.rotation[2] + currentParallaxX + Math.cos(elapsed * 0.7) * 0.005;
        _qGround.setFromEuler(_tempEuler.set(groundRotX, groundRotY, groundRotZ, 'XYZ'));

        // Space Ring Orientation (Section 3 Space Rings)
        // Locked to TOP SIDE SHOWING (dorsal spine facing camera, dorsal.z = +1.00 ALWAYS)
        // Forward: Head UP (+Y)
        // Backward: Head DOWN (-Y)
        _qSpace.copy(_qSpaceForward).slerp(_qSpaceBackward, currentSpaceDirTurn);

        // Gentle zero-g floating micro-oscillations & parallax
        const oscPitch = Math.sin(elapsed * 1.5) * 0.03;
        const oscYaw = currentParallaxY * 0.25;
        const oscRoll = Math.cos(elapsed * 1.2) * 0.03 + currentParallaxX * 0.25;
        _qOsc.setFromEuler(_tempEuler.set(oscPitch, oscYaw, oscRoll, 'XYZ'));
        _qSpace.multiply(_qOsc);

        // Blend between Ground and Space
        rootGroup.quaternion.copy(_qGround).slerp(_qSpace, spaceFloatT);

        // Apply 3D model scale in space ring sections so the DOM frame stays 100vw x 100vh without clipping legs
        if (isSpaceFloat) {
          rootGroup.scale.setScalar(spaceModelScale);
        } else {
          rootGroup.scale.setScalar(1.0);
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    // ---- CLEANUP ----
    return () => {
      isMounted = false;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('click', handleCanvasClick);
      if (facingRef) facingRef.current = null;
      ro.disconnect();
      if (controls) controls.dispose();
      renderer.dispose();
    };
  }, [wordIndex, facingRef, actionConfig]);

  return (
    <div
      ref={containerRef}
      className={`frog-3d-wrapper ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        pointerEvents: wordIndex === 4 ? 'auto' : 'none',
        touchAction: 'none',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: wordIndex === 4 ? 'grab' : 'default',
          pointerEvents: 'auto',
        }}
      />
    </div>
  );
}
