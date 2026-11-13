from PIL import Image
import numpy as np

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\user_circle_crop.png")
arr = np.array(im)

# Look at rows where the card starts
# The card has "HAULO" at the top
for y in range(0, im.height, 10):
    row = arr[y, :, :3]
    dark = np.where(np.any(row < 200, axis=1))[0]
    print(f"y={y}: min_x={dark[0] if len(dark) else 'none'}, max_x={dark[-1] if len(dark) else 'none'}")

