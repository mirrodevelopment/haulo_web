from PIL import Image

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793968126386_8d2cd737.jpg")
w, h = im.size

# In media_1793968126386_8d2cd737.jpg, what is the center card's x position?
# Let's find the bounding box of the center card:
# The center card has 'HAULO' at top:
print("Image size:", w, h)

# Left sliver is around x = 50..70
# Right sliver is around x = 410..460
left_crop = im.crop((50, 20, 80, 560))
right_crop = im.crop((410, 20, 460, 560))

left_crop.save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\left_sliver.png")
right_crop.save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\right_sliver.png")
print("Saved left_sliver.png and right_sliver.png")
