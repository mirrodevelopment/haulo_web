from PIL import Image

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793969875725_dc444aa2.png")
print("Size:", im.size)
# It's 484 x 74.
# Let's save a 2x scaled version
im.resize((im.size[0] * 2, im.size[1] * 2), Image.NEAREST).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\blender_crop_large.png")
print("Saved blender_crop_large.png")
