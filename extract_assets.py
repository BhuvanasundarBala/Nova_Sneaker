import os
from PIL import Image

src_path = r'C:/Users/bhuva/.gemini/antigravity/brain/3cb66f2f-c021-4cb0-b143-0c1409d3cd4b/.user_uploaded/media_1792574357483_a15abd32.png'
out_dir = r'./public/brand'
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path)
w, h = img.size
print(f"Original image size: {w}x{h}")

# Save full copy
img.save(os.path.join(out_dir, 'brand-board-full.png'))

# Crop 1: Top-left hero athlete in motion with sneaker & logo
# In 1024x512:
# Hero covers approximately x: 0 to 575, y: 0 to 258
hero = img.crop((0, 0, int(w * 0.565), int(h * 0.505)))
hero.save(os.path.join(out_dir, 'hero-board-crop.png'))

# Crop 2: Just the athlete shoe & foot in air
# x: ~320 to 570, y: 0 to 258
shoe_action = img.crop((int(w * 0.32), 0, int(w * 0.565), int(h * 0.505)))
shoe_action.save(os.path.join(out_dir, 'sneaker-action-kick.png'))

# Crop 3: Bottom web banner mockup
# x: 0 to ~398, y: ~362 to 512
banner = img.crop((0, int(h * 0.708), int(w * 0.40), h))
banner.save(os.path.join(out_dir, 'website-banner-mockup.png'))

# Crop 4: Studio close-up pair of sneakers on concrete ledge
# x: ~398 to ~625, y: ~362 to 512
sneakers_pair = img.crop((int(w * 0.398), int(h * 0.708), int(w * 0.625), h))
sneakers_pair.save(os.path.join(out_dir, 'sneaker-pair-hero.png'))

# Crop 5: Hangtag
# x: ~625 to ~805, y: ~362 to 512
hangtag = img.crop((int(w * 0.625), int(h * 0.708), int(w * 0.805), h))
hangtag.save(os.path.join(out_dir, 'nova-hangtag.png'))

# Crop 6: Matte Black Shoe Box
# x: ~805 to 1024, y: ~362 to 512
shoebox = img.crop((int(w * 0.805), int(h * 0.708), w, h))
shoebox.save(os.path.join(out_dir, 'nova-shoebox.png'))

# Crop 7: Logo White Monochrome
# x: ~700 to 790, y: ~75 to 135
logo_white = img.crop((int(w * 0.69), int(h * 0.15), int(w * 0.79), int(h * 0.28)))
logo_white.save(os.path.join(out_dir, 'logo-white.png'))

# Crop 8: Logo Lime Green
# x: ~790 to 890, y: ~75 to 135
logo_lime = img.crop((int(w * 0.79), int(h * 0.15), int(w * 0.89), int(h * 0.28)))
logo_lime.save(os.path.join(out_dir, 'logo-lime.png'))

# Crop 9: Star Mark Icon Only
# x: ~790 to 870, y: ~170 to 240
star_mark = img.crop((int(w * 0.785), int(h * 0.33), int(w * 0.875), int(h * 0.49)))
star_mark.save(os.path.join(out_dir, 'star-mark.png'))

# Crop 10: App Icon Black
# x: ~885 to 940, y: ~175 to 235
app_icon_black = img.crop((int(w * 0.885), int(h * 0.35), int(w * 0.94), int(h * 0.46)))
app_icon_black.save(os.path.join(out_dir, 'app-icon-black.png'))

print("All brand assets successfully extracted to", out_dir)
