from PIL import Image
import numpy as np

im = Image.open(r'C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793968126386_8d2cd737.jpg')
arr = np.array(im)

# Look at left strip (columns 0..60)
# Find non-white pixels (where r < 240 or g < 240 or b < 240)
left_mask = np.any(arr[:, :60, :3] < 240, axis=-1)
# which rows have content?
left_rows = np.where(np.any(left_mask, axis=1))[0]
if len(left_rows):
    print(f"Left strip content rows: from y={left_rows[0]} to y={left_rows[-1]} (height={left_rows[-1] - left_rows[0] + 1})")
else:
    print("Left strip has no dark pixels")

# Look at right strip (columns 412..472)
right_mask = np.any(arr[:, 412:, :3] < 240, axis=-1)
right_rows = np.where(np.any(right_mask, axis=1))[0]
if len(right_rows):
    print(f"Right strip content rows: from y={right_rows[0]} to y={right_rows[-1]} (height={right_rows[-1] - right_rows[0] + 1})")
else:
    print("Right strip has no dark pixels")

# Center card (columns 80..390)
center_mask = np.any(arr[:, 80:390, :3] < 240, axis=-1)
center_rows = np.where(np.any(center_mask, axis=1))[0]
if len(center_rows):
    print(f"Center card rows: from y={center_rows[0]} to y={center_rows[-1]} (height={center_rows[-1] - center_rows[0] + 1})")
