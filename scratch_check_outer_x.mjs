import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fs from 'fs';

const buffer = fs.readFileSync('public/glb-file/frame5_light_strength.glb');
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  const scene = gltf.scene;
  const root = scene.children[0];
  root.rotation.set(0, 0, 0);
  root.position.set(-28.837, 0, 0);
  scene.updateMatrixWorld(true);

  // Check meshes at the outermost X (X > 3.9)
  console.log('--- MESHES AT OUTERMOST X (X > 3.9) ---');
  scene.traverse((child) => {
    if (child.isMesh) {
      const box = new THREE.Box3().setFromObject(child);
      if (box.max.x > 3.95) {
        console.log(`Mesh: "${child.name}", Z range: [${box.min.z.toFixed(3)}, ${box.max.z.toFixed(3)}], X range: [${box.min.x.toFixed(3)}, ${box.max.x.toFixed(3)}], Y range: [${box.min.y.toFixed(3)}, ${box.max.y.toFixed(3)}]`);
      }
    }
  });
});
