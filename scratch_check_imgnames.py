from PIL import Image

for name in ['media_1793968126386_8d2cd737.jpg', 'media_1793967331651_13ca7fc8.jpg', 'media_1793966873245_0ef147c3.jpg']:
    p = rf"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\.user_uploaded\{name}"
    im = Image.open(p)
    print(name, im.size)
