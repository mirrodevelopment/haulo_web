from PIL import Image
import numpy as np

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\blender_crop_large.png")
print("Image size:", im.size)
# What is in this image?
# Let's print out what colors exist
arr = np.array(im)
# Find bright yellow/lime pixels
lime_pixels = np.where((arr[:, :, 0] > 180) & (arr[:, :, 1] > 200) & (arr[:, :, 2] < 150))
print(f"Lime pixels count: {len(lime_pixels[0])}")
if len(lime_pixels[0]):
    print("Lime pixel x coords:", np.min(lime_pixels[1]), np.max(lime_pixels[1]))
    print("Lime pixel y coords:", np.min(lime_pixels[0]), np.max(lime_pixels[0]))
