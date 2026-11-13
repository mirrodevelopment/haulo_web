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

  console.log('--- FRAME STRUCTURAL COMPONENTS ---');
  const components = {};

  scene.traverse((child) => {
    if (child.isMesh && child.name !== 'Plane') {
      const baseName = child.name.replace(/\.\d+$/, '').replace(/\d+$/, '');
      if (!components[baseName]) {
        components[baseName] = { count: 0, min: new THREE.Vector3(Infinity, Infinity, Infinity), max: new THREE.Vector3(-Infinity, -Infinity, -Infinity) };
      }
      const box = new THREE.Box3().setFromObject(child);
      components[baseName].count++;
      components[baseName].min.min(box.min);
      components[baseName].max.max(box.max);
    }
  });

  for (const [name, data] of Object.entries(components)) {
    const size = new THREE.Vector3().subVectors(data.max, data.min);
    console.log(`${name.padEnd(35)}: count=${data.count}, X=[${data.min.x.toFixed(2)}, ${data.max.x.toFixed(2)}], Y=[${data.min.y.toFixed(2)}, ${data.max.y.toFixed(2)}], Z=[${data.min.z.toFixed(2)}, ${data.max.z.toFixed(2)}], size=[${size.x.toFixed(2)}, ${size.y.toFixed(2)}, ${size.z.toFixed(2)}]`);
  }
});
