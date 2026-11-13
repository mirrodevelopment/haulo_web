from PIL import Image, ImageDraw
import numpy as np

im = Image.open(r'C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793968126386_8d2cd737.jpg')
arr = np.array(im)

# Let's save a visual inspection of left strip and right strip side by side
h = im.size[1]
comp = Image.new('RGB', (200, h), (255, 255, 255))
comp.paste(im.crop((0, 0, 70, h)), (0, 0))
comp.paste(im.crop((402, 0, 472, h)), (100, 0))

draw = ImageDraw.Draw(comp)
# draw horizontal lines across
for y in range(0, h, 50):
    draw.line([(0, y), (200, y)], fill=(255, 0, 0), width=1)

comp.save(r'C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\side_by_side_strips.png')
print("Saved side_by_side_strips.png")
