from PIL import Image
import numpy as np

tl = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\top_left.png")
tr = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\top_right.png")
bl = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\bottom_left.png")
br = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\bottom_right.png")

# Let's check what's in top_left
arr_tl = np.array(tl)
# find non-white pixels in left 30 cols
mask_tl = np.any(arr_tl[:, :30, :3] < 240, axis=-1)
rows_tl = np.where(np.any(mask_tl, axis=1))[0]
print("Top left (x < 30): non-white rows:", rows_tl[:5], "to", rows_tl[-5:] if len(rows_tl) else "none")

# What's in left 30 cols of bottom_left?
arr_bl = np.array(bl)
mask_bl = np.any(arr_bl[:, :30, :3] < 240, axis=-1)
rows_bl = np.where(np.any(mask_bl, axis=1))[0]
print("Bottom left (x < 30): non-white rows:", rows_bl[:5] if len(rows_bl) else "none")

# What's in right 30 cols of top_right?
arr_tr = np.array(tr)
mask_tr = np.any(arr_tr[:, 70:, :3] < 240, axis=-1)
rows_tr = np.where(np.any(mask_tr, axis=1))[0]
print("Top right (x > 70): non-white rows:", rows_tr[:5] if len(rows_tr) else "none")

# What's in right 30 cols of bottom_right?
arr_br = np.array(br)
mask_br = np.any(arr_br[:, 70:, :3] < 240, axis=-1)
rows_br = np.where(np.any(mask_br, axis=1))[0]
print("Bottom right (x > 70): non-white rows:", rows_br[:5] if len(rows_br) else "none", "to", rows_br[-5:] if len(rows_br) else "none")
