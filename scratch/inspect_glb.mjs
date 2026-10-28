import fs from 'fs';

// Look for animation clips and duration inside final frog.glb
const buf = fs.readFileSync('src/final frog.glb');
// The GLB binary starts with 12 bytes header, then JSON chunk
const jsonLen = buf.readUInt32LE(12);
const jsonBuf = buf.subarray(20, 20 + jsonLen);
const gltf = JSON.parse(jsonBuf.toString('utf8'));

console.log('GLTF animations:', gltf.animations?.length);
if (gltf.animations) {
  gltf.animations.forEach((anim, i) => {
    console.log(`Animation ${i}: name=${anim.name}, samplers=${anim.samplers.length}, channels=${anim.channels.length}`);
    // Check min/max of time accessors
    const timeAccessorIndices = new Set(anim.samplers.map(s => s.input));
    timeAccessorIndices.forEach(idx => {
      const acc = gltf.accessors[idx];
      console.log(`  Sampler input accessor ${idx}: min=${acc.min}, max=${acc.max}, count=${acc.count}`);
    });
  });
}
