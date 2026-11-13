import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fs from 'fs';

const buffer = fs.readFileSync('public/glb-file/frame5_light_strength.glb');
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  const scene = gltf.scene;
  const root = scene.children[0];
  console.log('Original root rotation:', root.rotation.x, root.rotation.y, root.rotation.z);
  console.log('Original root position:', root.position.x, root.position.y, root.position.z);
  console.log('Original root scale:', root.scale.x, root.scale.y, root.scale.z);
});
