from PIL import Image

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\blender_corner_zoom.png")
# Let's inspect what is visible in this image
print("Corner zoom size:", im.size)
# The image shows the corner of the frame in Blender 3D viewport.
