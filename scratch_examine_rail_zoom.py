from PIL import Image

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793969875725_dc444aa2.png")
# The image is 484 x 74.
# Let's inspect the geometry shown:
# 1. Left side has "HAULO"
# 2. In the middle is a long rail with 2 lime LEDs.
# 3. But wait! Look at the top of the rail vs the side of the rail!
# Is the side of the rail hollow? Can we see inside?
# Let's crop into high resolution:
im_zoom = im.crop((150, 10, 350, 65))
im_zoom.resize((im_zoom.width * 4, im_zoom.height * 4), Image.NEAREST).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\rail_center_zoom.png")
print("Saved rail_center_zoom.png")
