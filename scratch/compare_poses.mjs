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
  if (acc.type === 'VEC4') {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push([
        buf.readFloatLE(byteOffset + i * 16),
        buf.readFloatLE(byteOffset + i * 16 + 4),
        buf.readFloatLE(byteOffset + i * 16 + 8),
        buf.readFloatLE(byteOffset + i * 16 + 12),
      ]);
    }
    return arr;
  }
  return null;
}

const anim = gltf.animations[0];
let maxDiff = 0;
let diffDetails = [];

anim.channels.forEach((ch, i) => {
  const sampler = anim.samplers[ch.sampler];
  const times = readAccessor(sampler.input);
  const values = readAccessor(sampler.output);
  if (!times || !values) return;

  function sampleAt(targetT) {
    let best = 0, minD = 999;
    times.forEach((t, idx) => {
      const d = Math.abs(t - targetT);
      if (d < minD) { minD = d; best = idx; }
    });
    return values[best];
  }

  const vA = sampleAt(1.00);
  const vB = sampleAt(3.50);
  const node = gltf.nodes[ch.target.node].name;
  const path = ch.target.path;

  let d = 0;
  if (Array.isArray(vA)) {
    d = Math.hypot(...vA.map((val, idx) => val - vB[idx]));
  } else {
    d = Math.abs(vA - vB);
  }
  if (d > maxDiff) maxDiff = d;
  if (d > 0.05) diffDetails.push({ node, path, d: d.toFixed(4) });
});

console.log('Max difference between t=1.00s and t=3.50s:', maxDiff.toFixed(4));
console.log('Channels with diff > 0.05:', diffDetails);
