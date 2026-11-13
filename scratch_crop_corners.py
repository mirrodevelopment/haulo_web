from PIL import Image

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793968126386_8d2cd737.jpg")
w, h = im.size

# Bottom-left: (0, 400, 100, h)
im.crop((0, 400, 100, h)).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\bottom_left.png")

# Bottom-right: (w-100, 400, w, h)
im.crop((w-100, 400, w, h)).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\bottom_right.png")

# Top-left: (0, 0, 100, 150)
im.crop((0, 0, 100, 150)).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\top_left.png")

# Top-right: (w-100, 0, w, 150)
im.crop((w-100, 0, w, 150)).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\top_right.png")

print("Saved corner crops")
