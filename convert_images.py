import os
try:
    from PIL import Image
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

dir_name = "phone-sequence-img"

print("Starting conversion from PNG to JPG...")
for filename in os.listdir(dir_name):
    if filename.endswith(".png"):
        img_path = os.path.join(dir_name, filename)
        
        try:
            img = Image.open(img_path)
            # Convert to RGB (JPG doesn't support alpha channel/transparency)
            rgb_im = img.convert('RGB')
            
            # Create new filename
            new_filename = filename.replace(".png", ".jpg")
            new_path = os.path.join(dir_name, new_filename)
            
            # Save as JPG, optimized
            rgb_im.save(new_path, format="JPEG", quality=85, optimize=True)
            
            # Remove original PNG to save space
            os.remove(img_path)
        except Exception as e:
            print(f"Error converting {filename}: {e}")

print("All PNGs converted to JPG successfully!")
