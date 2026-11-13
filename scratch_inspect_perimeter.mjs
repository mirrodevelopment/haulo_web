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

  // Let's inspect the outer perimeter vertices of the frame
  // The frame has 8 main outer edges:
  // 1. Top horizontal: Y ~ 6.26, X from -3.3 to 3.3
  // 2. Top-right chamfer: from (3.3, 6.26) to (4.01, 5.57)
  // 3. Right vertical: X ~ 4.01, Y from 5.57 to -5.57
  // 4. Bottom-right chamfer: from (4.01, -5.57) to (3.3, -6.26)
  // 5. Bottom horizontal: Y ~ -6.26, X from 3.3 to -3.3
  // 6. Bottom-left chamfer: from (-3.3, -6.26) to (-4.01, -5.57)
  // 7. Left vertical: X ~ -4.01, Y from -5.57 to 5.57
  // 8. Top-left chamfer: from (-4.01, 5.57) to (-3.3, 6.26)

  console.log('--- OUTER TITANIUM RIM VERTICES ---');
  scene.traverse((child) => {
    if (child.name.includes('Outer_titanium_rim_2001') || child.name.includes('Outer_titanium_rim_6001')) {
      const box = new THREE.Box3().setFromObject(child);
      console.log(child.name, 'box:', box.min, box.max);
    }
    if (child.name.includes('Broad_HAULO_header001')) {
      const box = new THREE.Box3().setFromObject(child);
      console.log(child.name, 'box:', box.min, box.max);
    }
  });
});
