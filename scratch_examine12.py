from PIL import Image
import numpy as np

left_im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\left_sliver.png")
right_im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\right_sliver.png")

arr_l = np.array(left_im)
arr_r = np.array(right_im)

print("Left sliver shape:", arr_l.shape)
print("Right sliver shape:", arr_r.shape)

# Let's find rows with non-white in arr_l
non_white_l = np.where(np.any(arr_l < 240, axis=(1, 2)))[0]
non_white_r = np.where(np.any(arr_r < 240, axis=(1, 2)))[0]

print(f"Left sliver active rows (y relative to 20): {non_white_l[0]} to {non_white_l[-1]}, total = {len(non_white_l)}")
print(f"Right sliver active rows (y relative to 20): {non_white_r[0]} to {non_white_r[-1]}, total = {len(non_white_r)}")

# Print some color samples from left vs right
for i in [non_white_l[0], non_white_l[len(non_white_l)//2], non_white_l[-1]]:
    print(f"Left row {i}: min pixel={np.min(arr_l[i], axis=0)}, mean pixel={np.mean(arr_l[i], axis=0)}")

for i in [non_white_r[0], non_white_r[len(non_white_r)//2], non_white_r[-1]]:
    print(f"Right row {i}: min pixel={np.min(arr_r[i], axis=0)}, mean pixel={np.mean(arr_r[i], axis=0)}")
