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

function findBestMatches(tRef) {
  // We want to find a time tEnd where rotations match tRef
  const rotationChannels = anim.channels.filter(ch => ch.target.path === 'rotation');
  let bestT = 0, minRotDiff = 999;
  
  for (let testT = 2.5; testT <= 4.5; testT += 0.04) {
    let totalDiff = 0;
    rotationChannels.forEach(ch => {
      const sampler = anim.samplers[ch.sampler];
      const times = readAccessor(sampler.input);
      const values = readAccessor(sampler.output);
      function sample(t) {
        let b = 0, m = 999;
        times.forEach((val, idx) => {
          const d = Math.abs(val - t);
          if (d < m) { m = d; b = idx; }
        });
        return values[b];
      }
      const v1 = sample(tRef);
      const v2 = sample(testT);
      totalDiff += Math.hypot(...v1.map((val, idx) => val - v2[idx]));
    });
    if (totalDiff < minRotDiff) {
      minRotDiff = totalDiff;
      bestT = testT;
    }
  }
  console.log(`For tRef=${tRef}s, best matching rotation tEnd=${bestT.toFixed(3)}s with totalRotDiff=${minRotDiff.toFixed(4)}`);
}

findBestMatches(0.16);
findBestMatches(0.30);
findBestMatches(1.00);
findBestMatches(1.33);
