from PIL import Image
import numpy as np

tl = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\top_left.png")
arr = np.array(tl)

for x in range(0, 100, 5):
    non_white = np.where(np.any(arr[:, x, :3] < 240, axis=1))[0]
    if len(non_white) > 0:
        print(f"tl col x={x}: rows from {non_white[0]} to {non_white[-1]}")
    else:
        print(f"tl col x={x}: empty")
