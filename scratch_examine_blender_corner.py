from PIL import Image

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793969875725_dc444aa2.png")
# Let's save a zoomed in crop of the corner
corner = im.crop((0, 0, 150, 74))
corner.resize((450, 222), Image.NEAREST).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\blender_corner_zoom.png")

# Also right corner
rcorner = im.crop((350, 0, 484, 74))
rcorner.resize((402, 222), Image.NEAREST).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\blender_rcorner_zoom.png")

print("Saved zoomed corner images")
