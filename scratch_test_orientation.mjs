import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fs from 'fs';

const buffer = fs.readFileSync('public/glb-file/frame5_light_strength.glb');
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  const scene = gltf.scene;
  const root = scene.children[0];

  // Case A: original
  scene.updateMatrixWorld(true);
  const boxA = new THREE.Box3().setFromObject(scene);
  const sizeA = new THREE.Vector3();
  boxA.getSize(sizeA);
  console.log('Case A (original):', sizeA);

  // Case B: child.rotation.set(0, 0, 0)
  root.rotation.set(0, 0, 0);
  scene.updateMatrixWorld(true);
  const boxB = new THREE.Box3().setFromObject(scene);
  const sizeB = new THREE.Vector3();
  boxB.getSize(sizeB);
  console.log('Case B (rotation 0, 0, 0):', sizeB);
});
