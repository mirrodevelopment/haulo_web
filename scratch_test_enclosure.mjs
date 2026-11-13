import * as THREE from 'three';

// Function to generate the complete closed side enclosure for the cyber frame
export function createSideEnclosureGeometry() {
  const geom = new THREE.BufferGeometry();

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

    // Compute outward normal
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    // Outward 2D normal (pointing right of vector for counter-clockwise perimeter)
    // Here perimeter is clockwise: (-3.48, 6.26) -> (3.48, 6.26) is +X, so outward is +Y (dy=0, dx>0 -> nx=0, ny=1)
    const nx = dy / len;
    const ny = -dx / len;

    // Two triangles for quad: (p1_front, p2_front, p2_back) and (p1_front, p2_back, p1_back)
    // p1_front: (x1, y1, zFront)
    // p2_front: (x2, y2, zFront)
    // p2_back:  (x2, y2, zBack)
    // p1_back:  (x1, y1, zBack)

    // Tri 1
    positions.push(
      x1, y1, zFront,
      x2, y2, zFront,
      x2, y2, zBack
    );
    // Tri 2
    positions.push(
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

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  return geom;
}

const g = createSideEnclosureGeometry();
console.log('Side enclosure geometry created! Vertex count:', g.attributes.position.count);
const box = new THREE.Box3();
g.computeBoundingBox();
console.log('Box size:', g.boundingBox.getSize(new THREE.Vector3()));
