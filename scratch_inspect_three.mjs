import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fs from 'fs';

// Read glb buffer
const buffer = fs.readFileSync('public/glb-file/frame5_light_strength.glb');
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  const scene = gltf.scene;
  console.log('Scene loaded successfully!');
  console.log('Scene children count:', scene.children.length);
  console.log('Scene children[0] name:', JSON.stringify(scene.children[0].name));

  // Traverse and inspect
  const meshes = [];
  scene.traverse((child) => {
    if (child.isMesh) {
      child.geometry.computeBoundingBox();
      const b = child.geometry.boundingBox;
      const size = new THREE.Vector3();
      b.getSize(size);
      meshes.push({
        name: child.name,
        mat: child.material?.name,
        size: [size.x.toFixed(3), size.y.toFixed(3), size.z.toFixed(3)],
        pos: [child.position.x.toFixed(3), child.position.y.toFixed(3), child.position.z.toFixed(3)]
      });
    }
  });

  console.log('Total meshes found:', meshes.length);
  // Total bounding box of entire scene
  scene.updateMatrixWorld(true);
  const totalBox = new THREE.Box3().setFromObject(scene);
  const totalSize = new THREE.Vector3();
  totalBox.getSize(totalSize);
  const totalCenter = new THREE.Vector3();
  totalBox.getCenter(totalCenter);

  console.log('Total Box Min:', totalBox.min);
  console.log('Total Box Max:', totalBox.max);
  console.log('Total Box Size:', totalSize);
  console.log('Total Box Center:', totalCenter);

  // Check unique mesh base names
  const uniqueNames = new Set(meshes.map(m => m.name.replace(/\.\d+$/, '')));
  console.log('\nUnique mesh categories:', Array.from(uniqueNames));
});
