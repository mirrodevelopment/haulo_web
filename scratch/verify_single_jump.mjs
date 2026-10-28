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
const bodyCh = anim.channels.find(ch => gltf.nodes[ch.target.node].name === 'BODY' && ch.target.path === 'translation');
const sampler = anim.samplers[bodyCh.sampler];
const times = readAccessor(sampler.input);
const values = readAccessor(sampler.output);

console.log('--- Body between 1.1s and 3.5s ---');
times.forEach((t, i) => {
  if (t >= 1.1 && t <= 3.5) {
    console.log(`t=${t.toFixed(2)}s: z=${values[i][2].toFixed(3)}`);
  }
});
