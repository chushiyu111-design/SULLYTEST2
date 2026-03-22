import sys
from fontTools.ttLib import TTFont
import traceback

fonts = [
    r"c:\Users\ASUS\Desktop\糯米机二改\SULLYTEST2\public\fonts\tarot.ttf",
]

for font_path in fonts:
    try:
        print(f"Loading {font_path}")
        font = TTFont(font_path)
        font.flavor = "woff2"
        out_path = font_path.replace('.ttf', '.woff2')
        font.save(out_path)
        print(f"Saved {out_path}")
    except Exception as e:
        print(f"Error {font_path}: {e}")
        traceback.print_exc()
