from PIL import Image
import numpy as np

im = Image.open(r'C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\side_by_side_strips.png')
# let's analyze the left 100 pixels (which is the left strip)
arr = np.array(im)

left_part = arr[:, :70, :3]
right_part = arr[:, 100:170, :3]

# For each row, calculate mean brightness
left_mean = np.mean(left_part, axis=(1, 2))
right_mean = np.mean(right_part, axis=(1, 2))

print("Left strip brightness < 250 in rows:")
for y in range(0, len(left_mean), 20):
    print(f"y={y:3d} : left={left_mean[y]:.1f}, right={right_mean[y]:.1f}")
