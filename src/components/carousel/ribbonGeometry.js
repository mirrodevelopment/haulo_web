import * as THREE from 'three';

export const CARD_WIDTH = 350;
export const CARD_HEIGHT = 480;
export const SUBDIV_X = 32;
export const SUBDIV_Y = 32;
export const CARD_GAP = 0;
export const EFFECTIVE_CARD_WIDTH = CARD_WIDTH + CARD_GAP;

export const W_TEX = 1400;
export const H_TEX = 1920;

export const STATIC_FRAME_INDICES = [-3, -2, -1, 0, 1, 2, 3];
export const RIBBON_Y_OFFSET = -40; // Moves center frame slightly down in viewport

export const wrap = (v, m) => ((v % m) + m) % m;
export const shortest = (v, count) => wrap(v + count / 2, count) - count / 2;

/**
 * Transforms planar vertices along the continuous 3D cylindrical wave profile
 * with center convex spherical ball deformation and tapering perspective wings.
 */
export function applyRibbonDeformation(origArr, arr, vertCount, cardTrackCenter, zOffset = 0) {
  const centerHalfHeight = CARD_HEIGHT / 2;

  for (let k = 0; k < vertCount; k++) {
    const idx = k * 3;
    const localX = origArr[idx];
    const localY = origArr[idx + 1];
    const yNorm = localY / centerHalfHeight;
    const rawGx = cardTrackCenter + localX;
    const absGx = Math.abs(rawGx);

    // 1. Smooth Spatial Profile:
    // - Center & first flanking cards (|gx| < 340px): Full continuous convex arch
    // - Transition (|gx| = 340px to 530px): Smooth C1 easing into straight horizontal track
    // - Outer flanks (|gx| >= 530px): Straight horizontal track
    const normX390 = absGx / 390.0;
    const hArch = 65.0 + 175.0 / (1.0 + normX390 * normX390);
    const t = Math.max(0.0, Math.min(1.0, (absGx - 340.0) / 190.0));
    const s = t * t * (3.0 - 2.0 * t);
    const halfH = (1.0 - s) * hArch + s * 132.0;
    const gy = yNorm * halfH;

    // 2. 3D Spherical Ball Rotation:
    const normX310 = absGx / 310.0;
    const domeZ = 145.0 / (1.0 + normX310 * normX310);
    const ballY = Math.cos((Math.PI / 2) * Math.min(1.0, Math.abs(yNorm)));
    const zSphere = 38 * (domeZ / 145.0) * ballY;
    const zTrack = -0.16 * Math.min(absGx, 530.0) - 0.03 * Math.max(0, absGx - 530.0);
    const gz = zTrack + domeZ + zSphere;

    arr[idx] = rawGx;
    arr[idx + 1] = gy;
    arr[idx + 2] = gz + zOffset;
  }
}

/**
 * Builds the static cybernetic monitor frame meshes permanently positioned along the ribbon
 */
export function buildStaticFrameMeshes(scene, texOpen) {
  const staticFrameMeshes = [];

  for (const fixedD of STATIC_FRAME_INDICES) {
    const geom = new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT, SUBDIV_X, SUBDIV_Y);
    const origPos = geom.attributes.position.clone();
    const posAttr = geom.attributes.position;
    const arr = posAttr.array;
    const origArr = origPos.array;
    const vertCount = posAttr.count;
    const cardTrackCenter = fixedD * CARD_WIDTH;

    applyRibbonDeformation(origArr, arr, vertCount, cardTrackCenter, 0);
    posAttr.needsUpdate = true;

    const mat = new THREE.MeshBasicMaterial({
      map: texOpen,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: true,
      depthWrite: false
    });

    const frameMesh = new THREE.Mesh(geom, mat);
    frameMesh.position.set(0, RIBBON_Y_OFFSET, 0);
    frameMesh.rotation.set(0, 0, 0);
    frameMesh.scale.set(1, 1, 1);
    frameMesh.renderOrder = 2000; // Always renders ON TOP of moving color cards
    frameMesh.frustumCulled = false;
    scene.add(frameMesh);
    staticFrameMeshes.push(frameMesh);
  }

  return staticFrameMeshes;
}
