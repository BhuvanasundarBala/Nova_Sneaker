"""
upscale_4k.py
=============
AI Super-Resolution upscale for all NOVA 360 shoe frames.
Uses OpenCV EDSR x4 (Enhanced Deep Super-Resolution) neural network model.
- Input:  current 1200x900 PNG frames
- Output: ~4800x3600 (4K+) lossless PNG, same transparency preserved
- Also applies: Unsharp mask + contrast/saturation polish after EDSR
"""

import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import os
import sys
import time

BASE_DIR   = r"c:\Users\bhuva\Downloads\SCM\public\brand\360"
MODEL_PATH = r"c:\Users\bhuva\Downloads\SCM\EDSR_x4.pb"
MODELS     = ["orbit", "terrain", "velocity", "cloud", "volt", "echo"]

# ---------------------------------------------------------------------------
# Load EDSR x4 model ONCE (expensive — ~2-3s to initialise)
# ---------------------------------------------------------------------------
print("Loading EDSR x4 AI super-resolution model...")
sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(MODEL_PATH)
sr.setModel("edsr", 4)          # 4x upscale
print("Model loaded OK\n")


def upscale_frame(src_path: str, dst_path: str):
    # --- Load as RGBA via PIL to preserve transparency ---
    pil_img = Image.open(src_path).convert("RGBA")
    rgb_pil  = pil_img.convert("RGB")
    alpha    = pil_img.split()[3]           # save alpha channel

    # --- Convert RGB to BGR numpy for OpenCV ---
    bgr = cv2.cvtColor(np.array(rgb_pil), cv2.COLOR_RGB2BGR)

    # --- EDSR 4x Neural Super-Resolution ---
    upscaled_bgr = sr.upsample(bgr)        # ~4x resolution

    # --- Back to RGB PIL for post-processing ---
    rgb_up = Image.fromarray(cv2.cvtColor(upscaled_bgr, cv2.COLOR_BGR2RGB))

    # --- Post-process for maximum clarity ---
    # 1. Gentle unsharp mask to restore EDSR softness on edges
    rgb_up = rgb_up.filter(ImageFilter.UnsharpMask(radius=0.8, percent=120, threshold=2))
    # 2. Slight contrast lift
    rgb_up = ImageEnhance.Contrast(rgb_up).enhance(1.06)
    # 3. Brightness micro-lift
    rgb_up = ImageEnhance.Brightness(rgb_up).enhance(1.01)
    # 4. Saturation — make colorways vivid (neon lime, amber, holographic)
    rgb_up = ImageEnhance.Color(rgb_up).enhance(1.08)

    # --- Upscale alpha to match new dimensions ---
    new_w, new_h = rgb_up.size
    alpha_up = alpha.resize((new_w, new_h), Image.LANCZOS)

    # --- Recompose RGBA ---
    out = rgb_up.convert("RGBA")
    out.putalpha(alpha_up)

    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    out.save(dst_path, format="PNG", compress_level=6, optimize=True)
    return new_w, new_h


def main():
    total  = 0
    errors = []
    t0     = time.time()

    for model in MODELS:
        png_dir = os.path.join(BASE_DIR, model, "png")
        if not os.path.isdir(png_dir):
            print(f"[SKIP] {model} - directory not found")
            continue

        frames = sorted(f for f in os.listdir(png_dir) if f.endswith(".png"))
        print(f"[{model.upper()}] Upscaling {len(frames)} frames to 4K...")
        model_t = time.time()

        for i, fname in enumerate(frames, 1):
            src = os.path.join(png_dir, fname)
            dst = src   # overwrite in-place
            try:
                w, h = upscale_frame(src, dst)
                total += 1
                elapsed = time.time() - model_t
                eta = (elapsed / i) * (len(frames) - i)
                print(f"  [{i:02d}/{len(frames)}] {fname} -> {w}x{h}  ETA: {eta:.0f}s", end="\r", flush=True)
            except Exception as e:
                errors.append(f"{model}/{fname}: {e}")
                print(f"\n  ERR {fname} -> {e}")

        model_elapsed = time.time() - model_t
        print(f"\n  Done - {len(frames)} frames in {model_elapsed:.0f}s\n")

    total_elapsed = time.time() - t0
    print("=" * 55)
    print(f"Total upscaled : {total} frames across {len(MODELS)} models")
    print(f"Total time     : {total_elapsed/60:.1f} minutes")
    if errors:
        print(f"Errors ({len(errors)}):")
        for err in errors:
            print(f"  ERR {err}")
    else:
        print("All frames upscaled to 4K+ successfully!")


if __name__ == "__main__":
    main()
