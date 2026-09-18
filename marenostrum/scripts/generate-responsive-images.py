#!/usr/bin/env python3
"""Regenerate assets/img/responsive/ — WebP + JPEG variants of the accueil's content photos, at
768/1280/1920px (capped at each source's native width, so a photo already narrower than a given
tier is never upscaled). Re-run this after replacing any of the source photos listed in IMAGES;
keep it in sync with MN_IMG_WIDTHS in assets/js/home.js. Requires Pillow (`pip install pillow`).
"""

import os

from PIL import Image

SRC_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "img")
OUT_DIR = os.path.join(SRC_DIR, "responsive")
TARGET_WIDTHS = [768, 1280, 1920]

IMAGES = [
    "hero-mer.jpg",
    "texture-mareyage.jpg",
    "trois-caviars.webp",
    "hero-montagne.webp",
    "bar-loup.jpg",
    "langoustine.jpg",
    "gamme-boites.webp",
    "grain-macro.webp",
]

# Single-size assets (product graphics reused at one consistent display size across La Table and
# its product pages — no responsive ladder needed): (filename, output width, save format).
SINGLE_SIZE_IMAGES = [
    ("boite-ouverte.png", 800, "PNG"),
]


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for fname in IMAGES:
        path = os.path.join(SRC_DIR, fname)
        stem = os.path.splitext(fname)[0]
        with Image.open(path) as im:
            im = im.convert("RGB")
            native_w, native_h = im.size
            widths = sorted(set([w for w in TARGET_WIDTHS if w <= native_w] + [native_w]))
            for w in widths:
                h = round(native_h * (w / native_w))
                resized = im.resize((w, h), Image.LANCZOS)
                resized.save(os.path.join(OUT_DIR, f"{stem}-{w}w.webp"), "WEBP", quality=82, method=6)
                resized.save(os.path.join(OUT_DIR, f"{stem}-{w}w.jpg"), "JPEG", quality=82, optimize=True)
            print(f"{fname}: native={native_w}x{native_h} -> widths {widths}")

    for fname, w, fmt in SINGLE_SIZE_IMAGES:
        path = os.path.join(SRC_DIR, fname)
        stem = os.path.splitext(fname)[0]
        with Image.open(path) as im:
            native_w, native_h = im.size
            h = round(native_h * (w / native_w))
            resized = im.resize((w, h), Image.LANCZOS)
            resized.save(os.path.join(OUT_DIR, f"{stem}-{w}w.webp"), "WEBP", quality=85, method=6)
            resized.save(os.path.join(OUT_DIR, f"{stem}-{w}w.{fmt.lower()}"), fmt, optimize=True)
            print(f"{fname}: native={native_w}x{native_h} -> single size {w}w ({fmt} + webp)")


if __name__ == "__main__":
    main()
