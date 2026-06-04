"""Recolor the teal Invaritech logos to forest green #0F5132.

Strategy: treat each pixel's existing brightness as an intensity mask
on the target color. White backgrounds stay white; teal strokes become
forest green of the equivalent darkness, preserving anti-aliasing and
the subtle gradient.
"""
from pathlib import Path
from PIL import Image

TARGET = (15, 81, 50)  # #0F5132 forest
ROOT = Path(__file__).resolve().parent.parent / "public"
FILES = ["logo-image.png", "logo-image.webp", "logo-text.png", "logo-text.webp", "logo.png"]


def recolor(path: Path) -> None:
    img = Image.open(path).convert("RGBA")
    px = img.load()
    w, h = img.size
    tr, tg, tb = TARGET
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            # Intensity = how "non-white" this pixel is. White (255,255,255) -> 0, full color -> 1.
            # Use the min channel as a proxy for ink density: teal has low R, so 255-min(r,g,b) is large where ink is.
            ink = 1.0 - (min(r, g, b) / 255.0)
            # Blend target over white using ink as alpha.
            nr = round(255 * (1 - ink) + tr * ink)
            ng = round(255 * (1 - ink) + tg * ink)
            nb = round(255 * (1 - ink) + tb * ink)
            px[x, y] = (nr, ng, nb, a)
    fmt = "WEBP" if path.suffix.lower() == ".webp" else "PNG"
    save_kwargs = {"quality": 95, "method": 6} if fmt == "WEBP" else {"optimize": True}
    img.save(path, fmt, **save_kwargs)
    print(f"recolored {path.name}")


if __name__ == "__main__":
    for name in FILES:
        recolor(ROOT / name)
