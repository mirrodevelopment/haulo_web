import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

let cachedGLTF = null;
let loadingPromise = null;

export const OCTOPUS_MODEL_URL = '/final143%20octo.glb';

export function loadOctopusModel() {
  if (cachedGLTF) {
    return Promise.resolve(cachedGLTF);
  }
  if (loadingPromise) {
    return loadingPromise;
  }

  const loader = new GLTFLoader();
  loadingPromise = new Promise((resolve, reject) => {
    loader.load(
      OCTOPUS_MODEL_URL,
      (gltf) => {
        cachedGLTF = gltf;
        loadingPromise = null;
        resolve(gltf);
      },
      undefined,
      (error) => {
        console.warn('[octopusLoader] Failed to load 3D octopus model:', error);
        loadingPromise = null;
        reject(error);
      }
    );
  });

  return loadingPromise;
}

export function cloneOctopusInstance(gltf) {
  if (!gltf || !gltf.scene) return null;
  const cloneScene = SkeletonUtils.clone(gltf.scene);
  return {
    scene: cloneScene,
    animations: gltf.animations || []
  };
}
