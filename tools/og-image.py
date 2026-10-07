"""Genera public/og.png (1200x630): la vista previa al compartir 4ledmt.dev.

Uso:  pip install pillow fonttools brotli && python tools/og-image.py
Toma las fuentes de node_modules (@fontsource-variable), así que corre `npm ci` antes.
"""
from pathlib import Path
import tempfile

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og.png"
W, H = 1200, 630
BG, INK, MUTED, ACCENT, LINE = "#050507", "#f4f4f6", "#8a8a9c", "#ff003c", "#1c1c24"

FONTS = {
    "display": "node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
    "mono": "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
}


def load(kind: str, size: int, weight: int) -> ImageFont.FreeTypeFont:
    """Convierte el woff2 variable a TTF temporal y fija el peso."""
    ttf = Path(tempfile.gettempdir()) / f"og-{kind}.ttf"
    if not ttf.exists():
        f = TTFont(ROOT / FONTS[kind])
        f.flavor = None
        f.save(ttf)
    font = ImageFont.truetype(str(ttf), size)
    font.set_variation_by_axes([weight])
    return font


img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# Cuadrícula tenue y barra de acento
for x in range(0, W, 56):
    d.line([(x, 0), (x, H)], fill="#0f0a0d")
for y in range(0, H, 56):
    d.line([(0, y), (W, y)], fill="#0f0a0d")
d.rectangle([0, 0, W, 8], fill=ACCENT)

pad = 72
d.text((pad, 80), "// FULL STACK DEVELOPER", font=load("mono", 26, 600), fill=ACCENT)
d.text((pad, 128), "ALEJANDRO_", font=load("mono", 104, 800), fill=INK)
name2 = load("mono", 104, 800)
d.text((pad, 238), "VEGA", font=name2, fill=INK)
d.text((pad + d.textlength("VEGA", font=name2), 238), ".", font=name2, fill=ACCENT)

d.text((pad, 380), "Productos web de punta a punta: frontend, backend,", font=load("display", 34, 400), fill=MUTED)
d.text((pad, 424), "automatización y datos.", font=load("display", 34, 400), fill=MUTED)

# Stack principal como etiquetas
x = pad
chip = load("mono", 24, 600)
for tech in ["TypeScript", "Python", "NestJS", "React", "PostgreSQL"]:
    w = d.textlength(tech, font=chip) + 28
    d.rectangle([x, 500, x + w, 544], outline=ACCENT, width=2)
    d.text((x + 14, 508), tech, font=chip, fill=INK)
    x += w + 14

d.line([(pad, 580), (W - pad, 580)], fill=LINE, width=2)
d.text((pad, 590), "4ledmt.dev  ·  Bogotá, CO  ·  remoto / híbrido", font=load("mono", 22, 500), fill=MUTED)

OUT.parent.mkdir(exist_ok=True)
img.save(OUT, optimize=True)
print(f"OK -> {OUT.relative_to(ROOT)}")
