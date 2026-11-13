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

  // Remove planes
  const p1 = scene.getObjectByName('Plane');
  if (p1) p1.parent.remove(p1);
  const p2 = scene.getObjectByName('Plane002');
  if (p2) p2.parent.remove(p2);

  scene.updateMatrixWorld(true);

  // Find all meshes
  const items = [];
  scene.traverse((child) => {
    if (child.isMesh) {
      const box = new THREE.Box3().setFromObject(child);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);
      items.push({
        name: child.name,
        min: [box.min.x.toFixed(2), box.min.y.toFixed(2), box.min.z.toFixed(2)],
        max: [box.max.x.toFixed(2), box.max.y.toFixed(2), box.max.z.toFixed(2)],
        size: [size.x.toFixed(2), size.y.toFixed(2), size.z.toFixed(2)],
        center: [center.x.toFixed(2), center.y.toFixed(2), center.z.toFixed(2)]
      });
    }
  });

  // Group meshes by side:
  // Left: center.x < -3.0
  // Right: center.x > 3.0
  // Top: center.y > 5.0
  // Bottom: center.y < -5.0
  const leftMeshes = items.filter(m => parseFloat(m.center[0]) < -3.0);
  const rightMeshes = items.filter(m => parseFloat(m.center[0]) > 3.0);
  const topMeshes = items.filter(m => parseFloat(m.center[1]) > 5.0);
  const bottomMeshes = items.filter(m => parseFloat(m.center[1]) < -5.0);

  console.log(`Left meshes count: ${leftMeshes.length}`);
  console.log(`Right meshes count: ${rightMeshes.length}`);
  console.log(`Top meshes count: ${topMeshes.length}`);
  console.log(`Bottom meshes count: ${bottomMeshes.length}`);

  console.log('\n--- LEFT MESHES (first 10) ---');
  leftMeshes.slice(0, 10).forEach(m => console.log(m.name, 'center:', m.center, 'size:', m.size));

  console.log('\n--- RIGHT MESHES (first 10) ---');
  rightMeshes.slice(0, 10).forEach(m => console.log(m.name, 'center:', m.center, 'size:', m.size));
});
