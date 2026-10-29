import os
from PIL import Image, ImageFilter, ImageEnhance

src = r'C:/Users/bhuva/.gemini/antigravity/brain/3cb66f2f-c021-4cb0-b143-0c1409d3cd4b/.user_uploaded/media_1792733515484_1de4026e.jpg'
out_dir = r'./public/brand'
os.makedirs(out_dir, exist_ok=True)

im = Image.open(src)
w, h = im.size

def enhance_and_save(img, name, scale=3):
    # Upscale using high-quality Lanczos
    up = img.resize((img.width * scale, img.height * scale), Image.Resampling.LANCZOS)
    # Apply subtle unsharp contrast enhancement for tack-sharp client display
    enhancer = ImageEnhance.Sharpness(up)
    sharp = enhancer.enhance(1.25)
    sharp.save(os.path.join(out_dir, name), quality=98)
    print(f"Saved {name}: {sharp.size}")

# 1. ORBIT
orbit_pure = im.crop((45, 185, 325, 365))
enhance_and_save(orbit_pure, 'shoe_orbit_pure_hd.jpg')
# Macro heel / sole detail for Orbit
orbit_macro = im.crop((120, 220, 325, 365))
enhance_and_save(orbit_macro, 'shoe_orbit_macro.jpg')

# 2. VELOCITY
velocity_pure = im.crop((385, 180, 665, 365))
enhance_and_save(velocity_pure, 'shoe_velocity_pure_hd.jpg')
# Macro sole / air pod detail for Velocity
velocity_macro = im.crop((450, 220, 665, 365))
enhance_and_save(velocity_macro, 'shoe_velocity_macro.jpg')

# 3. VOLT
volt_pure = im.crop((730, 175, 995, 365))
enhance_and_save(volt_pure, 'shoe_volt_pure_hd.jpg')
# Macro high-top collar detail for Volt
volt_macro = im.crop((780, 175, 995, 310))
enhance_and_save(volt_macro, 'shoe_volt_macro.jpg')

# 4. TERRAIN
terrain_pure = im.crop((50, 455, 325, 640))
enhance_and_save(terrain_pure, 'shoe_terrain_pure_hd.jpg')
# Macro rugged sole lugs detail for Terrain
terrain_macro = im.crop((50, 520, 320, 640))
enhance_and_save(terrain_macro, 'shoe_terrain_macro.jpg')

# 5. CLOUD
cloud_pure = im.crop((385, 455, 665, 640))
enhance_and_save(cloud_pure, 'shoe_cloud_pure_hd.jpg')
# Macro cloud foam detail for Cloud
cloud_macro = im.crop((450, 510, 665, 640))
enhance_and_save(cloud_macro, 'shoe_cloud_macro.jpg')

# 6. ECHO
echo_pure = im.crop((715, 455, 995, 640))
enhance_and_save(echo_pure, 'shoe_echo_pure_hd.jpg')
# Macro iridescent wave & air chamber detail for Echo
echo_macro = im.crop((740, 500, 995, 640))
enhance_and_save(echo_macro, 'shoe_echo_macro.jpg')

print("All pure shoe HD and macro views generated cleanly!")
