"""
enhance_360.py
Upscales all 360° frames for all NOVA shoe models.
- Lanczos upscaling to 1200x900 (2x resolution)
- Unsharp mask for crisp edge sharpening
- Slight contrast and brightness boost
- Saves back as optimised PNG (lossless, palette-free)
"""

from PIL import Image, ImageEnhance, ImageFilter
import os
import sys

BASE_DIR = r"c:\Users\bhuva\Downloads\SCM\public\brand\360"
MODELS   = ["orbit", "terrain", "velocity", "cloud", "volt", "echo"]

TARGET_W = 1200   # output width  (px)
TARGET_H = 900    # output height (px)

def enhance_frame(src_path: str, dst_path: str):
    img = Image.open(src_path).convert("RGBA")

    # ── 1. Lanczos upscale (highest quality resampling) ──────────────────────
    # Keep original aspect; pad to target canvas so the shoe stays centered
    img_w, img_h = img.size
    scale = min(TARGET_W / img_w, TARGET_H / img_h)
    new_w = round(img_w * scale)
    new_h = round(img_h * scale)
    img = img.resize((new_w, new_h), Image.LANCZOS)

    canvas = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    offset = ((TARGET_W - new_w) // 2, (TARGET_H - new_h) // 2)
    canvas.paste(img, offset, img)

    # Work on the RGB channels for enhancement; keep alpha separate
    rgb = canvas.convert("RGB")
    alpha = canvas.split()[3]

    # ── 2. Unsharp Mask – crisp edges without halation ───────────────────────
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.1, percent=145, threshold=2))

    # ── 3. Contrast boost (+8 %) ──────────────────────────────────────────────
    rgb = ImageEnhance.Contrast(rgb).enhance(1.08)

    # ── 4. Very slight brightness lift (+2 %) ────────────────────────────────
    rgb = ImageEnhance.Brightness(rgb).enhance(1.02)

    # ── 5. Color saturation boost (+6 %) – makes colorways pop ───────────────
    rgb = ImageEnhance.Color(rgb).enhance(1.06)

    # Recompose RGBA
    out = rgb.convert("RGBA")
    out.putalpha(alpha)

    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    # Save lossless PNG; compress_level=6 is a good speed/size balance
    out.save(dst_path, format="PNG", compress_level=6, optimize=True)


def main():
    total = 0
    errors = []
    for model in MODELS:
        png_dir = os.path.join(BASE_DIR, model, "png")
        if not os.path.isdir(png_dir):
            print(f"  [SKIP] {model} – directory not found")
            continue
        frames = sorted(f for f in os.listdir(png_dir) if f.endswith(".png"))
        print(f"\n[{model.upper()}] Processing {len(frames)} frames …")
        for fname in frames:
            src = os.path.join(png_dir, fname)
            dst = src  # overwrite in-place
            try:
                enhance_frame(src, dst)
                total += 1
                print(f"  OK {fname}", end="\r", flush=True)
            except Exception as e:
                errors.append(f"{model}/{fname}: {e}")
                print(f"  ERR {fname} -> {e}")
        print(f"  Done – {len(frames)} frames enhanced.")

    print(f"\n{'='*50}")
    print(f"Total enhanced: {total} frames across {len(MODELS)} models")
    if errors:
        print(f"Errors ({len(errors)}):")
        for err in errors:
            print(f"  ERR {err}")
    else:
        print("All frames enhanced successfully!")


if __name__ == "__main__":
    main()
