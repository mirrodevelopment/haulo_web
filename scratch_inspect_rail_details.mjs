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

  console.log('--- ALL SIDE RAIL MESHES (Right side: X > 3.0) ---');
  scene.traverse((child) => {
    if (child.isMesh) {
      const box = new THREE.Box3().setFromObject(child);
      if (box.min.x > 3.0) {
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const geom = child.geometry;
        const vertCount = geom.attributes.position ? geom.attributes.position.count : 0;
        const indexCount = geom.index ? geom.index.count : 0;
        console.log(`Mesh: "${child.name}", mat: "${child.material?.name}", center: [${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)}], size: [${size.x.toFixed(2)}, ${size.y.toFixed(2)}, ${size.z.toFixed(2)}], verts: ${vertCount}, tris: ${indexCount/3}`);
      }
    }
  });
});
