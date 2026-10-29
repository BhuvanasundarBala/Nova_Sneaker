import re

with open('src/data/products.js', 'r', encoding='utf-8') as f:
    text = f.read()

models = ['orbit', 'velocity', 'volt', 'cloud', 'echo']

# Replace old hero images and galleries
for m in models:
    text = text.replace(f'/brand/shoe_{m}_pure_hd.jpg', f'/brand/shoe_{m}_hero.png')
    text = text.replace(f'/brand/shoe_{m}_macro.jpg', f'/brand/shoe_{m}_side.png')
    text = text.replace(f'/brand/shoe_{m}_pure.jpg', f'/brand/shoe_{m}_heel.png')

# Add spin360Frames to models if missing
for m in models:
    if f'/brand/360/{m}/png/frame_0.png' not in text:
        frames_str = ',\n    spin360Frames: [\n' + ',\n'.join([f'      "/brand/360/{m}/png/frame_{i}.png"' for i in range(36)]) + '\n    ]'
        # Insert after inventoryCount
        pattern = rf'(id:\s*"nova-{m}"[\s\S]*?inventoryCount:\s*\d+)'
        match = re.search(pattern, text)
        if match:
            text = text[:match.end()] + frames_str + text[match.end():]

with open('src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated src/data/products.js successfully!')
