import os
try:
    from PIL import Image
except ImportError:
    import subprocess, sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

dir_name = "phone-sequence-img"
converted = 0
print("Converting JPGs to WebP...")
for filename in sorted(os.listdir(dir_name)):
    if filename.endswith(".jpg") or filename.endswith(".jpeg"):
        img_path = os.path.join(dir_name, filename)
        try:
            img = Image.open(img_path)
            new_filename = os.path.splitext(filename)[0] + ".webp"
            new_path = os.path.join(dir_name, new_filename)
            img.save(new_path, format="WEBP", quality=90, method=6)
            os.remove(img_path)
            converted += 1
        except Exception as e:
            print(f"  Error: {filename}: {e}")

print(f"Done! Converted {converted} frames to WebP.")
