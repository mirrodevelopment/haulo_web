import json
import struct

with open(r'public\glb-file\frame5_light_strength.glb', 'rb') as f:
    magic, version, length = struct.unpack('<4sII', f.read(12))
    chunk_len, chunk_type = struct.unpack('<II', f.read(8))
    json_bytes = f.read(chunk_len)
    gltf = json.loads(json_bytes.decode('utf-8'))

print("GLTF keys:", gltf.keys())
print("Total meshes:", len(gltf.get('meshes', [])))
print("Total nodes:", len(gltf.get('nodes', [])))

for i, mesh in enumerate(gltf.get('meshes', [])):
    name = mesh.get('name', f'mesh_{i}')
    prims = mesh.get('primitives', [])
    mat_ids = [p.get('material') for p in prims]
    mat_names = [gltf['materials'][m]['name'] if m is not None and m < len(gltf['materials']) else 'None' for m in mat_ids]
    print(f"Mesh {i}: '{name}', prims={len(prims)}, mats={mat_names}")

print("\n--- NODES ---")
for i, node in enumerate(gltf.get('nodes', [])):
    name = node.get('name', f'node_{i}')
    mesh_idx = node.get('mesh')
    children = node.get('children', [])
    translation = node.get('translation')
    rotation = node.get('rotation')
    scale = node.get('scale')
    print(f"Node {i}: '{name}', mesh={mesh_idx}, children={children}, pos={translation}, rot={rotation}")
