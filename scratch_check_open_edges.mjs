import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fs from 'fs';
// Check open boundary edges

// We can render with software or raycasting or Three.js SoftwareRenderer,
// or we can analyze vertex positions and normals to see where open edges are!
// Let's first check open boundary edges! (An edge shared by only 1 face means OPEN GEOMETRY!)
const buffer = fs.readFileSync('public/glb-file/frame5_light_strength.glb');
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  const scene = gltf.scene;
  const root = scene.children[0];
  root.rotation.set(0, 0, 0);
  root.position.set(-28.837, 0, 0);
  scene.updateMatrixWorld(true);

  console.log('Checking open boundary edges in meshes...');
  const openMeshes = [];

  scene.traverse((child) => {
    if (child.isMesh && child.name !== 'Plane') {
      const geom = child.geometry;
      const pos = geom.attributes.position;
      if (!pos) return;

      // Map edges to triangle count
      const edgeMap = new Map();
      const getVKey = (idx) => {
        const x = pos.getX(idx).toFixed(4);
        const y = pos.getY(idx).toFixed(4);
        const z = pos.getZ(idx).toFixed(4);
        return `${x},${y},${z}`;
      };

      const addEdge = (v1, v2) => {
        const k1 = getVKey(v1);
        const k2 = getVKey(v2);
        const edgeKey = k1 < k2 ? `${k1}|${k2}` : `${k2}|${k1}`;
        edgeMap.set(edgeKey, (edgeMap.get(edgeKey) || 0) + 1);
      };

      if (geom.index) {
        const idx = geom.index.array;
        for (let i = 0; i < idx.length; i += 3) {
          addEdge(idx[i], idx[i+1]);
          addEdge(idx[i+1], idx[i+2]);
          addEdge(idx[i+2], idx[i]);
        }
      } else {
        for (let i = 0; i < pos.count; i += 3) {
          addEdge(i, i+1);
          addEdge(i+1, i+2);
          addEdge(i+2, i);
        }
      }

      let openEdges = 0;
      for (const count of edgeMap.values()) {
        if (count === 1) openEdges++;
      }

      if (openEdges > 0) {
        openMeshes.push({ name: child.name, openEdges, totalEdges: edgeMap.size });
      }
    }
  });

  console.log(`Found ${openMeshes.length} meshes with open boundary edges!`);
  openMeshes.slice(0, 20).forEach(m => {
    console.log(`- ${m.name}: ${m.openEdges} open edges out of ${m.totalEdges}`);
  });
});
