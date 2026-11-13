from PIL import Image
import numpy as np

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793969875725_dc444aa2.png")
print("Size:", im.size)
# What are the dimensions, what is in the crop?
# Let's crop:
# 1. Left section (0 to 100)
# 2. Middle-left section (100 to 220)
# 3. Middle-right section (220 to 350)
# 4. Right section (350 to 484)

im.crop((0, 0, 120, 74)).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\blender_crop_left.png")
im.crop((120, 0, 250, 74)).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\blender_crop_mid.png")
im.crop((250, 0, 380, 74)).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\blender_crop_midright.png")
im.crop((380, 0, 484, 74)).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\blender_crop_right.png")

print("Saved section crops")
