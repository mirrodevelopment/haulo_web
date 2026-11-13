from PIL import Image
im1 = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\preview_service1.png")
im2 = Image.open(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\preview_service2.png")
# in im1: is it phone?
print("im1 middle pixel:", im1.getpixel((135, 180)))
print("im2 middle pixel:", im2.getpixel((135, 180)))
