from PIL import Image

im = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793985077998_02182b77.jpg")
w, h = im.size
print(f"Image: {w}x{h}")

# The user image shows:
# 1. Left card: x from ~60 to ~220
# 2. Middle card: x from ~220 to ~350
# 3. Third card: x from ~330 to ~530
# 4. Rightmost edge: x from ~530 to 600

# Crop left card top corner where the user drew the circle
circle_crop = im.crop((50, 0, 250, 150))
circle_crop.save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\user_circle_crop.png")

# Crop left card bottom
bottom_crop = im.crop((50, 450, 250, h))
bottom_crop.save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\user_left_bottom_crop.png")

# Crop middle card top
mid_crop = im.crop((300, 0, 550, 150))
mid_crop.save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\user_mid_top_crop.png")

print("Saved inspection crops")

