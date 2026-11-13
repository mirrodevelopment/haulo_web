import os
from PIL import Image

for i in [1, 2, 3, 4]:
    p = rf"d:\AG\haulo\haulo_web-service_page\haulo_web-service_page\src\assets\modelCard\service-{i}.png"
    if os.path.exists(p):
        im = Image.open(p)
        print(f"service-{i}.png: size={im.size}")
