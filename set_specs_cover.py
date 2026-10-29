import re

with open('src/data/products.js', 'r', encoding='utf-8') as f:
    text = f.read()

models = ['orbit', 'velocity', 'volt', 'terrain', 'cloud', 'echo']

for m in models:
    # 1. Update heroImage in all colors for this model to model_{m}.jpg
    # Find all heroImage lines within the product block
    p_pattern = rf'(id:\s*"nova-{m}"[\s\S]*?description:)'
    p_match = re.search(p_pattern, text)
    if p_match:
        block = p_match.group(1)
        # replace heroImage: "..." with heroImage: "/brand/model_{m}.jpg"
        new_block = re.sub(r'heroImage:\s*"[^"]+"', f'heroImage: "/brand/model_{m}.jpg"', block)
        
        # replace gallery blocks: make model_{m}.jpg the first image
        new_gallery = (
            f'gallery: [\n'
            f'          "/brand/model_{m}.jpg",\n'
            f'          "/brand/shoe_{m}_hero.png",\n'
            f'          "/brand/shoe_{m}_side.png",\n'
            f'          "/brand/shoe_{m}_heel.png",\n'
            f'          "/brand/shoe_{m}_front.png"\n'
            f'        ]'
        )
        new_block = re.sub(r'gallery:\s*\[[\s\S]*?\]', new_gallery, new_block)
        text = text[:p_match.start()] + new_block + text[p_match.end():]

with open('src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated all products: Specs card is now the cover image and gallery leader!')
