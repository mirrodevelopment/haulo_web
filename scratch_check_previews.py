from PIL import Image
import numpy as np

# In CardBoxOrbit.jsx:
# CARD 0: service1Img
# CARD 1: service2Img
# CARD 2: service3Img
# CARD 3: service4Img

im1 = Image.open(r"d:\AG\haulo\haulo_web-service_page\haulo_web-service_page\src\assets\modelCard\service-1.png")
im2 = Image.open(r"d:\AG\haulo\haulo_web-service_page\haulo_web-service_page\src\assets\modelCard\service-2.png")

# Let's save small previews to check which is the phone
im1.resize((270, 360)).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\preview_service1.png")
im2.resize((270, 360)).save(r"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\preview_service2.png")
print("Saved previews")
