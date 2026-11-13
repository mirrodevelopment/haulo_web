from PIL import Image
import numpy as np

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793968126386_8d2cd737.jpg")
arr = np.array(im)

# Center card left border is around x = 75..90
# Center card right border is around x = 390..405
# Let's find top and bottom of card border at x = 85 (left edge of center card)
col_left = arr[:, 85, :3]
rows_l = np.where(np.any(col_left < 200, axis=1))[0]

col_right = arr[:, 395, :3]
rows_r = np.where(np.any(col_right < 200, axis=1))[0]

print(f"Center card at x=85 (left edge): top={rows_l[0]}, bottom={rows_l[-1]}, height={rows_l[-1] - rows_l[0]}")
print(f"Center card at x=395 (right edge): top={rows_r[0]}, bottom={rows_r[-1]}, height={rows_r[-1] - rows_r[0]}")

# Also check top chassis horizontal line:
# from x=100 to x=380
# where is the top border at each x?
top_y = []
for x in range(100, 380, 20):
    col = arr[:, x, :3]
    dark = np.where(np.any(col < 180, axis=1))[0]
    if len(dark):
        top_y.append((x, dark[0]))
print("Top line y values across x:", top_y)
