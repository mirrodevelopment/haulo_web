import json
import struct

with open(r'public\glb-file\frame5_light_strength.glb', 'rb') as f:
    magic, version, length = struct.unpack('<4sII', f.read(12))
    chunk_len, chunk_type = struct.unpack('<II', f.read(8))
    json_bytes = f.read(chunk_len)
    gltf = json.loads(json_bytes.decode('utf-8'))

default_scene = gltf.get('scene', 0)
scene_obj = gltf['scenes'][default_scene]
root_node_indices = scene_obj.get('nodes', [])
print("Root node indices in default scene:", root_node_indices)
for idx in root_node_indices:
    node = gltf['nodes'][idx]
    print(f"Root node {idx}: '{node.get('name')}', mesh={node.get('mesh')}, children count={len(node.get('children', []))}")
