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
// Print all node names in animations
const nodeNames = anim.channels.map(ch => gltf.nodes[ch.target.node].name);
console.log('Unique animated nodes:', [...new Set(nodeNames)]);

// Let's inspect BODY translation Y and Z at 0.1s steps from 0 to 4.0s
anim.channels.forEach(ch => {
  const node = gltf.nodes[ch.target.node];
  if (node.name === 'BODY' && ch.target.path === 'translation') {
    const sampler = anim.samplers[ch.sampler];
    const times = readAccessor(sampler.input);
    const values = readAccessor(sampler.output);
    for (let t = 0; t <= 4.0; t += 0.1) {
      // Find closest time
      let closestIdx = 0;
      let minDiff = 999;
      times.forEach((timeVal, idx) => {
        const diff = Math.abs(timeVal - t);
        if (diff < minDiff) { minDiff = diff; closestIdx = idx; }
      });
      const v = values[closestIdx];
      console.log(`t=${t.toFixed(1)}s (actual ${times[closestIdx].toFixed(2)}s): y=${v[1].toFixed(3)}, z=${v[2].toFixed(3)}`);
    }
  }
});
