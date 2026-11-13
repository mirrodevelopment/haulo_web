from PIL import Image
import numpy as np

im1 = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793971239152_da66220e.png")
im2 = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793971299638_c2d97d77.png")

print("im1 (target reference) size:", im1.size)
print("im2 (mistake) size:", im2.size)

arr1 = np.array(im1)
arr2 = np.array(im2)

# In im1, find the light capsule pixels
lime1 = arr1[(arr1[:, :, 0] > 150) & (arr1[:, :, 1] > 180) & (arr1[:, :, 2] < 160)]
print("im1 light color min:", np.min(lime1, axis=0))
print("im1 light color max:", np.max(lime1, axis=0))
print("im1 light color mean:", np.mean(lime1, axis=0))

# In im2, find brightest pixel
max2 = np.max(arr2, axis=(0, 1))
print("im2 brightest pixel:", max2)
bright_pixels = np.where(np.all(arr2 > 240, axis=-1))
print(f"im2 count of pure white pixels: {len(bright_pixels[0])}")
