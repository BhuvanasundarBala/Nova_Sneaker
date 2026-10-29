import os
import shutil
import numpy as np
from PIL import Image
import scipy.ndimage as ndi

models = {
    'orbit': r'C:/Users/bhuva/.gemini/antigravity/brain/3cb66f2f-c021-4cb0-b143-0c1409d3cd4b/.user_uploaded/media_1792744346727_d239d1f4.jpg',
    'velocity': r'C:/Users/bhuva/.gemini/antigravity/brain/3cb66f2f-c021-4cb0-b143-0c1409d3cd4b/.user_uploaded/media_1792744358336_3161104e.jpg',
    'volt': r'C:/Users/bhuva/.gemini/antigravity/brain/3cb66f2f-c021-4cb0-b143-0c1409d3cd4b/.user_uploaded/media_1792744368858_04f81004.jpg',
    'cloud': r'C:/Users/bhuva/.gemini/antigravity/brain/3cb66f2f-c021-4cb0-b143-0c1409d3cd4b/.user_uploaded/media_1792744335039_79502f08.jpg',
    'echo': r'C:/Users/bhuva/.gemini/antigravity/brain/3cb66f2f-c021-4cb0-b143-0c1409d3cd4b/.user_uploaded/media_1792744376286_cdfe1020.jpg'
}

cols = [(2, 168), (173, 338), (344, 509), (515, 680), (685, 850), (856, 1021)]
rows = [(2, 113), (117, 226), (230, 339), (343, 452), (456, 565), (570, 679)]

brand_dir = r'public/brand'

def process_single_frame(cell_raw):
    # Inpaint bottom 10 rows (degree text) with pure white
    cell_raw[-10:, :, :] = 255
    
    # 3x Lanczos upsampling for crisp display
    cell_img = Image.fromarray(cell_raw).resize((cell_raw.shape[1] * 3, cell_raw.shape[0] * 3), Image.Resampling.LANCZOS)
    arr_hd = np.array(cell_img)
    h, w, _ = arr_hd.shape
    
    # Threshold pure white background pixels (R, G, B > 236)
    is_shoe_pixel = ~np.all(arr_hd > 236, axis=-1)
    
    # Label connected components
    labels, num = ndi.label(is_shoe_pixel)
    if num == 0:
        return Image.fromarray(np.zeros((h, w, 4), dtype=np.uint8))
        
    sizes = ndi.sum(is_shoe_pixel, labels, range(num + 1))
    largest_label = np.argmax(sizes[1:]) + 1
    
    shoe_mask = (labels == largest_label)
    # Fill internal holes (protects white mesh, logo, laces)
    shoe_mask = ndi.binary_fill_holes(shoe_mask)
    
    # Clean up faint contact shadow underneath the sole (bottom 18% of frame)
    for y in range(int(h * 0.82), h):
        for x in range(w):
            if shoe_mask[y, x]:
                p = arr_hd[y, x]
                sat = int(max(p)) - int(min(p))
                val = float(p.mean())
                if sat < 15 and val > 140:
                    shoe_mask[y, x] = False

    # Punch out pull tab loop hole in top 35% of frame if present
    for y in range(int(h * 0.35)):
        for x in range(w):
            if shoe_mask[y, x]:
                p = arr_hd[y, x]
                sat = int(max(p)) - int(min(p))
                val = float(p.mean())
                if sat < 12 and val > 230:
                    shoe_mask[y, x] = False
                    
    # Erode boundary by 1 pixel to remove white fringe
    shoe_mask = ndi.binary_erosion(shoe_mask, structure=np.ones((3, 3)))
    alpha = ndi.gaussian_filter(shoe_mask.astype(float) * 255.0, sigma=0.8)
    alpha = np.clip(alpha, 0, 255).astype(np.uint8)
    
    out_arr = np.zeros((h, w, 4), dtype=np.uint8)
    out_arr[:, :, :3] = arr_hd
    out_arr[:, :, 3] = alpha
    
    return Image.fromarray(out_arr)

for model_name, sheet_path in models.items():
    print(f'Starting processing for: {model_name}...')
    out_dir = os.path.join(brand_dir, '360', model_name, 'png')
    os.makedirs(out_dir, exist_ok=True)
    
    sheet_im = Image.open(sheet_path).convert('RGB')
    sheet_arr = np.array(sheet_im)
    
    frame_idx = 0
    for r_idx, (r_start, r_end) in enumerate(rows):
        for c_idx, (c_start, c_end) in enumerate(cols):
            cell_raw = sheet_arr[r_start:r_end, c_start:c_end].copy()
            frame_png = process_single_frame(cell_raw)
            out_file = os.path.join(out_dir, f'frame_{frame_idx}.png')
            frame_png.save(out_file, format='PNG')
            frame_idx += 1
            
    print(f'Generated 36 frames for {model_name}')
    
    # Export the 4 standard gallery & hero transparent shots
    # Frame 4: 40° 3/4 angle
    # Frame 9: 90° lateral profile
    # Frame 18: 180° rear heel
    # Frame 0: 0° front toe
    shutil.copyfile(os.path.join(out_dir, 'frame_4.png'), os.path.join(brand_dir, f'shoe_{model_name}_hero.png'))
    shutil.copyfile(os.path.join(out_dir, 'frame_9.png'), os.path.join(brand_dir, f'shoe_{model_name}_side.png'))
    shutil.copyfile(os.path.join(out_dir, 'frame_18.png'), os.path.join(brand_dir, f'shoe_{model_name}_heel.png'))
    shutil.copyfile(os.path.join(out_dir, 'frame_0.png'), os.path.join(brand_dir, f'shoe_{model_name}_front.png'))
    print(f'Exported hero and gallery assets for {model_name}')

print('ALL 5 MODELS PROCESSED SUCCESSFULLY!')
