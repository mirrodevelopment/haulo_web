import * as THREE from 'three';

// Create the complete mechanical side enclosure
function createFrameEnclosure() {
  const group = new THREE.Group();
  group.name = 'Complete_Mechanical_Enclosure';

  // 1. Perimeter Wall (8-sided)
  const perimeter2D = [
    [-3.48, 6.26],   // 0: top-left start
    [3.48, 6.26],    // 1: top-right start
    [4.015, 5.60],   // 2: right top
    [4.015, -5.60],  // 3: right bottom
    [3.48, -6.26],   // 4: bottom-right
    [-3.48, -6.26],  // 5: bottom-left
    [-4.015, -5.60], // 6: left bottom
    [-4.015, 5.60],  // 7: left top
  ];

  const zFront = 0.30;
  const zBack = -0.30;
  const positions = [];
  const normals = [];
  const uvs = [];

  for (let i = 0; i < perimeter2D.length; i++) {
    const next = (i + 1) % perimeter2D.length;
    const [x1, y1] = perimeter2D[i];
    const [x2, y2] = perimeter2D[next];

    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const nx = dy / len;
    const ny = -dx / len;

    positions.push(
      x1, y1, zFront,
      x2, y2, zFront,
      x2, y2, zBack,
      x1, y1, zFront,
      x2, y2, zBack,
      x1, y1, zBack
    );

    for (let k = 0; k < 6; k++) {
      normals.push(nx, ny, 0);
    }

    uvs.push(
      0, 1,   1, 1,   1, 0,
      0, 1,   1, 0,   0, 0
    );
  }

  const perimeterGeom = new THREE.BufferGeometry();
  perimeterGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  perimeterGeom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  perimeterGeom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  const alumMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#B7BFC0'),
    metalness: 0.95,
    roughness: 0.25,
    side: THREE.DoubleSide
  });

  const perimeterMesh = new THREE.Mesh(perimeterGeom, alumMat);
  group.add(perimeterMesh);

  // 2. Graphite mechanical recessed slots on left and right rails
  const slotMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#252A2B'),
    metalness: 0.65,
    roughness: 0.45,
    side: THREE.DoubleSide
  });

  // Right rail slot
  const rightSlot = new THREE.Mesh(new THREE.BoxGeometry(0.04, 9.8, 0.24), slotMat);
  rightSlot.position.set(4.02, 0, 0);
  group.add(rightSlot);

  // Left rail slot
  const leftSlot = new THREE.Mesh(new THREE.BoxGeometry(0.04, 9.8, 0.24), slotMat);
  leftSlot.position.set(-4.02, 0, 0);
  group.add(leftSlot);

  return group;
}

const enc = createFrameEnclosure();
console.log('Enclosure created with', enc.children.length, 'meshes');
