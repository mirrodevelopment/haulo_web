from PIL import Image

for i in range(1, 5):
    im = Image.open(rf"d:\AG\haulo\haulo_web-service_page\haulo_web-service_page\src\assets\modelCard\service-{i}.png")
    im.resize((150, 200)).save(rf"C:\Users\RX\.gemini\antigravity\brain\645def15-59b5-4620-a451-c503749fad28\thumb_service_{i}.png")
print("Saved 4 thumbnails")
