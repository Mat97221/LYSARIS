#!/usr/bin/env python3
"""Regenerate assets/img/responsive/ — AVIF + WebP + JPEG variants of the accueil's content
photos, at 900/1200/1920/2400px (capped at each source's native width, so a photo already
narrower than a given tier is never upscaled). AVIF first (best compression), WebP second, JPEG
as the universal <img> fallback. Re-run this after replacing any of the source photos listed in
IMAGES; keep it in sync with MN_IMG_WIDTHS in assets/js/home.js. Requires Pillow with AVIF support
(`pip install pillow`; recent Pillow wheels bundle libavif, no separate plugin needed).
"""

import os

from PIL import Image

SRC_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "img")
OUT_DIR = os.path.join(SRC_DIR, "responsive")
TARGET_WIDTHS = [900, 1200, 1920, 2400]

IMAGES = [
    "hero-mer.jpg",
    "texture-mareyage.jpg",
    "trois-caviars.webp",
    "bar-loup.jpg",
    "langoustine.jpg",
    "gamme-boites.webp",
    "grain-macro.webp",
]

# Single-size assets (product graphics reused at one consistent display size across La Table and
# its product pages — no responsive ladder needed): (filename, output width, save format).
SINGLE_SIZE_IMAGES = [
    ("boite-ouverte.png", 900, "PNG"),
]

# Photos used as a full-screen "hero" on at least one page (see La Table's product pages) get a
# dedicated portrait crop for mobile, in addition to the landscape ladder above — recadrées au
# centre en 3:4, jamais un simple redimensionnement de la version paysage (qui laisserait des
# bandes vides ou un cadrage absurde en plein écran vertical).
PORTRAIT_CROPS = ["bar-loup", "langoustine", "gamme-boites", "hero-mer"]
PORTRAIT_WIDTH = 900
PORTRAIT_RATIO = 3 / 4  # width / height


def save_all_formats(resized, out_path_no_ext, jpeg_quality=82, webp_quality=82, avif_quality=55):
    resized.save(f"{out_path_no_ext}.avif", "AVIF", quality=avif_quality)
    resized.save(f"{out_path_no_ext}.webp", "WEBP", quality=webp_quality, method=6)
    rgb = resized.convert("RGB") if resized.mode != "RGB" else resized
    rgb.save(f"{out_path_no_ext}.jpg", "JPEG", quality=jpeg_quality, optimize=True)


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
                save_all_formats(resized, os.path.join(OUT_DIR, f"{stem}-{w}w"))
            print(f"{fname}: native={native_w}x{native_h} -> widths {widths}")

            if stem in PORTRAIT_CROPS:
                # Recadrage centré en 3:4 depuis la version pleine résolution, pas depuis un
                # ratio déjà tronqué — on garde le maximum de hauteur disponible de la source.
                crop_h = native_h
                crop_w = round(crop_h * PORTRAIT_RATIO)
                if crop_w > native_w:
                    crop_w = native_w
                    crop_h = round(crop_w / PORTRAIT_RATIO)
                left = (native_w - crop_w) // 2
                top = (native_h - crop_h) // 2
                cropped = im.crop((left, top, left + crop_w, top + crop_h))
                out_h = round(PORTRAIT_WIDTH / PORTRAIT_RATIO)
                portrait = cropped.resize((PORTRAIT_WIDTH, out_h), Image.LANCZOS)
                save_all_formats(portrait, os.path.join(OUT_DIR, f"{stem}-portrait-{PORTRAIT_WIDTH}w"))
                print(f"{fname}: portrait crop -> {PORTRAIT_WIDTH}x{out_h}")

    for fname, w, fmt in SINGLE_SIZE_IMAGES:
        path = os.path.join(SRC_DIR, fname)
        stem = os.path.splitext(fname)[0]
        with Image.open(path) as im:
            native_w, native_h = im.size
            h = round(native_h * (w / native_w))
            resized = im.resize((w, h), Image.LANCZOS)
            out_base = os.path.join(OUT_DIR, f"{stem}-{w}w")
            resized.save(f"{out_base}.avif", "AVIF", quality=60)
            resized.save(f"{out_base}.webp", "WEBP", quality=85, method=6)
            resized.save(f"{out_base}.{fmt.lower()}", fmt, optimize=True)
            print(f"{fname}: native={native_w}x{native_h} -> single size {w}w ({fmt} + webp + avif)")


if __name__ == "__main__":
    main()
