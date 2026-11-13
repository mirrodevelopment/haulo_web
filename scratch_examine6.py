from PIL import Image
import numpy as np

im = Image.open(r'C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793968126386_8d2cd737.jpg')
arr = np.array(im)

for x in range(410, 472):
    col = arr[:, x, :3]
    non_white = np.where(np.any(col < 240, axis=1))[0]
    if len(non_white) > 0:
        print(f"Col x={x}: {len(non_white)} non-white pixels, min y={non_white[0]}, max y={non_white[-1]}")
