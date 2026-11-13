from PIL import Image

im1 = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793969875725_dc444aa2.png")
im2 = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793969881184_94a898e7.jpg")

print("im1 (png):", im1.size)
print("im2 (jpg):", im2.size)

# save both to brain with descriptive names
im1.save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\user_ref_blender_side.png")
im2.save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\user_ref_website_crop.png")
