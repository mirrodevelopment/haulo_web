import fs from 'fs';

const buf = fs.readFileSync('src/final frog.glb');
const jsonLen = buf.readUInt32LE(12);
const jsonBuf = buf.subarray(20, 20 + jsonLen);
const gltf = JSON.parse(jsonBuf.toString('utf8'));

// Bin chunk starts at 20 + jsonLen + 8
const binChunkOffset = 20 + jsonLen + 8;

function readAccessor(accIdx) {
  const acc = gltf.accessors[accIdx];
  const bv = gltf.bufferViews[acc.bufferView];
  const byteOffset = binChunkOffset + (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const count = acc.count;
  
  if (acc.type === 'SCALAR' && acc.componentType === 5126) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(buf.readFloatLE(byteOffset + i * 4));
    }
    return arr;
  }
  if (acc.type === 'VEC3' && acc.componentType === 5126) {
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

// Find channels targeting root or body or legs
const anim = gltf.animations[0];
anim.channels.forEach((ch, idx) => {
  const node = gltf.nodes[ch.target.node];
  const prop = ch.target.path;
  const sampler = anim.samplers[ch.sampler];
  const times = readAccessor(sampler.input);
  const values = readAccessor(sampler.output);
  if (node.name === 'BODY' || node.name === 'ROOT' || node.name?.toLowerCase().includes('leg')) {
    console.log(`Channel ${idx}: node=${node.name}, path=${prop}, timesCount=${times?.length}`);
    if (prop === 'translation' && values) {
      // Find peak Y
      let maxY = -999, maxT = 0, minY = 999, minT = 0;
      times.forEach((t, i) => {
        const y = values[i][1];
        if (y > maxY) { maxY = y; maxT = t; }
        if (y < minY) { minY = y; minT = t; }
      });
      console.log(`  translation.y min=${minY.toFixed(3)} at t=${minT.toFixed(2)}, max=${maxY.toFixed(3)} at t=${maxT.toFixed(2)}`);
      // Print values between 0s and 5s
      const samples = times.map((t, i) => ({ t: t.toFixed(2), y: values[i][1].toFixed(3), z: values[i][2].toFixed(3) })).filter(s => parseFloat(s.t) <= 5.0);
      console.log(`  samples up to 5s (every 5th):`, samples.filter((_, i) => i % 4 === 0));
    }
  }
});
