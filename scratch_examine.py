from PIL import Image

im = Image.open(r'C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\media_1793968126386_8d2cd737.jpg')
w, h = im.size
print(f"Image dimensions: {w}x{h}")

# The user image has:
# Left edge: x = 0..60
# Right edge: x = 410..472
# Center card: x = 60..410

# Crop left strip
left_strip = im.crop((0, 0, 70, h))
left_strip.save(r'C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\user_req_left_strip.png')

# Crop right strip
right_strip = im.crop((400, 0, w, h))
right_strip.save(r'C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\user_req_right_strip.png')

print("Cropped left and right strips successfully")
