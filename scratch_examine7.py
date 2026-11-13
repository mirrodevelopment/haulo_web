from PIL import Image
import numpy as np

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793967331651_13ca7fc8.jpg")
print("Image 3 size:", im.size)
arr = np.array(im)

# check left 50 cols
left_mask = np.any(arr[:, :50, :3] < 240, axis=-1)
left_rows = np.where(np.any(left_mask, axis=1))[0]
if len(left_rows):
    print(f"Image 3 Left strip content rows: from y={left_rows[0]} to y={left_rows[-1]} (height={left_rows[-1] - left_rows[0] + 1})")

# check right 50 cols
w = im.size[0]
right_mask = np.any(arr[:, w-50:, :3] < 240, axis=-1)
right_rows = np.where(np.any(right_mask, axis=1))[0]
if len(right_rows):
    print(f"Image 3 Right strip content rows: from y={right_rows[0]} to y={right_rows[-1]} (height={right_rows[-1] - right_rows[0] + 1})")
