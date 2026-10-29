import os
from PIL import Image, ImageEnhance, ImageOps
import numpy as np

src_path = r'C:/Users/bhuva/.gemini/antigravity/brain/3cb66f2f-c021-4cb0-b143-0c1409d3cd4b/.user_uploaded/media_1792574357483_a15abd32.png'
out_dir = r'./public/brand'
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert("RGBA")
w, h = img.size

# 1. High-res crop of the studio pair of NOVA sneakers on concrete ledge:
# In 1024x512:
# x: ~390 to ~630, y: ~360 to 512
shoe_pair = img.crop((int(w * 0.388), int(h * 0.705), int(w * 0.628), h))
shoe_pair.save(os.path.join(out_dir, 'nova-authentic-pair.png'))

# 2. Crop individual right shoe (hero shoe)
# Within the pair, the right shoe is from ~x 440 to 625, y 365 to 495
single_shoe = img.crop((int(w * 0.44), int(h * 0.71), int(w * 0.625), int(h * 0.98)))
# Let's create an isolated cut of this single shoe
single_shoe.save(os.path.join(out_dir, 'nova-single-hero.png'))

# 3. Create isolated single shoe on transparent background
# Let's process the background: the background is dark grey/black above the shoe
arr = np.array(single_shoe)
# Alpha mask creation:
# Pixels that are very dark (background) can have gradual alpha or clean cutout
# Let's upscale with high quality Lanczos for crisp display
shoe_hd = single_shoe.resize((single_shoe.width * 3, single_shoe.height * 3), Image.Resampling.LANCZOS)
shoe_hd.save(os.path.join(out_dir, 'nova-apex-cyber-hd.png'))

# 4. Generate Colorway 1: "Phantom Stealth Black"
# We darken the white mesh and suede into deep charcoal/black while keeping the neon lime green pops!
arr_black = np.array(shoe_hd)
# Find non-green pixels (green has high G, moderate/low B)
is_green = (arr_black[:, :, 1] > 160) & (arr_black[:, :, 0] > 140) & (arr_black[:, :, 2] < 120)
# For non-green and non-background pixels, reduce brightness
is_white_panel = (arr_black[:, :, 0] > 140) & (arr_black[:, :, 1] > 140) & (arr_black[:, :, 2] > 140) & ~is_green
arr_black[is_white_panel, 0] = (arr_black[is_white_panel, 0] * 0.22).astype(np.uint8)
arr_black[is_white_panel, 1] = (arr_black[is_white_panel, 1] * 0.22).astype(np.uint8)
arr_black[is_white_panel, 2] = (arr_black[is_white_panel, 2] * 0.25).astype(np.uint8)

black_shoe = Image.fromarray(arr_black)
black_shoe.save(os.path.join(out_dir, 'nova-apex-stealth-black.png'))

# 5. Generate Colorway 2: "Nimbus Silver White"
# Make the black accents silver grey
arr_silver = np.array(shoe_hd)
is_black_panel = (arr_silver[:, :, 0] < 60) & (arr_silver[:, :, 1] < 60) & (arr_silver[:, :, 2] < 60)
arr_silver[is_black_panel, 0] = (arr_silver[is_black_panel, 0] + 120).clip(0, 255).astype(np.uint8)
arr_silver[is_black_panel, 1] = (arr_silver[is_black_panel, 1] + 120).clip(0, 255).astype(np.uint8)
arr_silver[is_black_panel, 2] = (arr_silver[is_black_panel, 2] + 130).clip(0, 255).astype(np.uint8)

silver_shoe = Image.fromarray(arr_silver)
silver_shoe.save(os.path.join(out_dir, 'nova-apex-silver.png'))

# 6. Generate Colorway 3: "High Voltage Lime Shock"
# Boost the lime green elements and add lime glow
arr_volt = np.array(shoe_hd)
is_cream = (arr_volt[:, :, 0] > 170) & (arr_volt[:, :, 1] > 170) & (arr_volt[:, :, 2] > 140)
arr_volt[is_cream, 0] = (arr_volt[is_cream, 0] * 0.85).astype(np.uint8)
arr_volt[is_cream, 1] = (np.clip(arr_volt[is_cream, 1] * 1.15, 0, 255)).astype(np.uint8)
arr_volt[is_cream, 2] = (arr_volt[is_cream, 2] * 0.6).astype(np.uint8)

volt_shoe = Image.fromarray(arr_volt)
volt_shoe.save(os.path.join(out_dir, 'nova-apex-volt.png'))

# 7. Authentic Athlete Action Kick Crop (from top left)
action_kick = img.crop((int(w * 0.315), 0, int(w * 0.575), int(h * 0.505)))
action_kick_hd = action_kick.resize((action_kick.width * 2, action_kick.height * 2), Image.Resampling.LANCZOS)
action_kick_hd.save(os.path.join(out_dir, 'nova-athlete-action.png'))

# 8. Authentic Website Banner Mockup (bottom left)
banner_crop = img.crop((0, int(h * 0.705), int(w * 0.395), h))
banner_hd = banner_crop.resize((banner_crop.width * 2, banner_crop.height * 2), Image.Resampling.LANCZOS)
banner_hd.save(os.path.join(out_dir, 'nova-banner-real.png'))

# 9. Authentic Shoebox HD
shoebox_crop = img.crop((int(w * 0.80), int(h * 0.705), w, h))
shoebox_hd = shoebox_crop.resize((shoebox_crop.width * 2, shoebox_crop.height * 2), Image.Resampling.LANCZOS)
shoebox_hd.save(os.path.join(out_dir, 'nova-shoebox-hd.png'))

# 10. Authentic Hangtag HD
hangtag_crop = img.crop((int(w * 0.625), int(h * 0.705), int(w * 0.80), h))
hangtag_hd = hangtag_crop.resize((hangtag_crop.width * 2, hangtag_crop.height * 2), Image.Resampling.LANCZOS)
hangtag_hd.save(os.path.join(out_dir, 'nova-hangtag-hd.png'))

# 11. Large Brand Logo Crop (top left)
logo_crop = img.crop((0, 0, int(w * 0.33), int(h * 0.50)))
logo_crop.save(os.path.join(out_dir, 'nova-hero-logo.png'))

print("Generated all authentic NOVA sneaker assets successfully!")
