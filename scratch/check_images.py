import os
import re

p = re.compile(r'(/[\w\-\./]+\.(?:png|jpg|jpeg|svg|webp|glb))')
found = set()

for r, d, fs in os.walk('src'):
    for f in fs:
        if f.endswith(('.js', '.jsx', '.css')):
            content = open(os.path.join(r, f), 'r', encoding='utf-8', errors='ignore').read()
            for m in p.findall(content):
                found.add(m)

print(f"Total image paths found: {len(found)}")
for m in sorted(found):
    rel = m.lstrip('/')
    exists = os.path.exists(os.path.join('public', rel))
    status = 'OK' if exists else 'MISSING 404!'
    print(f"  {m} -> {status}")
