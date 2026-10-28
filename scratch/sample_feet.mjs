import fs from 'fs';

const buf = fs.readFileSync('src/final frog.glb');
const jsonLen = buf.readUInt32LE(12);
const jsonBuf = buf.subarray(20, 20 + jsonLen);
const gltf = JSON.parse(jsonBuf.toString('utf8'));
const binChunkOffset = 20 + jsonLen + 8;

function readAccessor(accIdx) {
  const acc = gltf.accessors[accIdx];
  const bv = gltf.bufferViews[acc.bufferView];
  const byteOffset = binChunkOffset + (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const count = acc.count;
  if (acc.type === 'SCALAR') {
    const arr = [];
    for (let i = 0; i < count; i++) arr.push(buf.readFloatLE(byteOffset + i * 4));
    return arr;
  }
  if (acc.type === 'VEC3') {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push([
        buf.readFloatLE(byteOffset + i * 12),
        buf.readFloatLE(byteOffset + i * 12 + 4),
        buf.readFloatLE(byteOffset + i * 12 + 8),
      ]);
    }
    return arr;
  }
  return null;
}

const anim = gltf.animations[0];
['CTRL_Front_Foot.L', 'CTRL_Rear_Foot.L'].forEach(targetNode => {
  anim.channels.forEach(ch => {
    const node = gltf.nodes[ch.target.node];
    if (node.name === targetNode && ch.target.path === 'translation') {
      const sampler = anim.samplers[ch.sampler];
      const times = readAccessor(sampler.input);
      const values = readAccessor(sampler.output);
      console.log(`Node ${targetNode}:`);
      for (let t = 0; t <= 4.0; t += 0.2) {
        let closestIdx = 0, minDiff = 999;
        times.forEach((timeVal, idx) => {
          const diff = Math.abs(timeVal - t);
          if (diff < minDiff) { minDiff = diff; closestIdx = idx; }
        });
        const v = values[closestIdx];
        console.log(`  t=${t.toFixed(1)}s: x=${v[0].toFixed(3)}, y=${v[1].toFixed(3)}, z=${v[2].toFixed(3)}`);
      }
    }
  });
});
