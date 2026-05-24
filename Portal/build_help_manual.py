from pathlib import Path

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "Conserva_GeoPortal_Help_Manual.pdf"
ASSETS = ROOT / "help-manual-assets"
ICONS = ROOT / "assets" / "icons"
LOGO = ROOT / "assets" / "landing" / "conserva-logo-cropped.png"

PAGE_W, PAGE_H = landscape(letter)

DARK = colors.HexColor("#1d2529")
CHARCOAL = colors.HexColor("#323d42")
GOLD = colors.HexColor("#d2b549")
GOLD_DARK = colors.HexColor("#8f792a")
TEXT = colors.HexColor("#1d2529")
MUTED = colors.HexColor("#5f686c")
LIGHT = colors.HexColor("#f7f7f3")
LINE = colors.HexColor("#d8ddd9")


def image_size(path):
    with Image.open(path) as img:
        return img.size


def draw_image_fit(c, path, x, y, w, h, border=True):
    iw, ih = image_size(path)
    scale = min(w / iw, h / ih)
    dw = iw * scale
    dh = ih * scale
    dx = x + (w - dw) / 2
    dy = y + (h - dh) / 2
    if border:
        c.setFillColor(colors.white)
        c.roundRect(x, y, w, h, 8, stroke=0, fill=1)
        c.setStrokeColor(LINE)
        c.setLineWidth(1)
        c.roundRect(x, y, w, h, 8, stroke=1, fill=0)
    c.drawImage(ImageReader(str(path)), dx, dy, dw, dh, mask="auto")


def icon_path(name):
    return ICONS / f"{name}.png"


def draw_tool_icon(c, name, x, y, size=22, label=None, dark=True):
    if icon_path(name).exists():
        draw_image_fit(c, icon_path(name), x, y, size, size, border=False)
    if label:
        c.setFillColor(colors.white if dark else TEXT)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(x + size + 7, y + 7, label)


def wrap_text(c, text, font, size, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if c.stringWidth(trial, font, size) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def paragraph(c, text, x, y, width, size=10.5, leading=14, color=TEXT, font="Helvetica"):
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrap_text(c, text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def bullets(c, items, x, y, width, size=10, leading=14):
    for item in items:
        c.setFillColor(GOLD)
        c.circle(x + 3, y + 4, 2.2, stroke=0, fill=1)
        y = paragraph(c, item, x + 14, y, width - 14, size=size, leading=leading)
        y -= 5
    return y


def header(c, title, page_no):
    c.setFillColor(DARK)
    c.rect(0, PAGE_H - 58, PAGE_W, 58, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, PAGE_H - 60, PAGE_W, 3, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(44, PAGE_H - 36, "Conserva GeoPortal Help Manual")
    c.setFillColor(colors.white)
    c.setFont("Helvetica", 10)
    c.drawRightString(PAGE_W - 44, PAGE_H - 36, title)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawCentredString(PAGE_W / 2, 24, f"Mapping Conservation. Preserving Tomorrow.  |  Page {page_no}")


def icon_band(c, icons, x, y, w):
    c.setFillColor(DARK)
    c.roundRect(x, y, w, 38, 8, stroke=0, fill=1)
    step = w / max(len(icons), 1)
    for i, (name, label) in enumerate(icons):
        draw_tool_icon(c, name, x + 14 + i * step, y + 8, size=22, label=label, dark=True)


def section_page(c, page_no, title, kicker, screenshot, intro, items, icons=None):
    header(c, title, page_no)
    left_x = 44
    top = PAGE_H - 92
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(left_x, top, kicker.upper())
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 25)
    c.drawString(left_x, top - 31, title)
    y = top - 62
    if icons:
        icon_band(c, icons, left_x, y - 34, 286)
        y -= 54
    y = paragraph(c, intro, left_x, y, 286, size=10.5, leading=15, color=MUTED)
    y -= 14
    bullets(c, items, left_x, y, 286, size=10, leading=14)
    draw_image_fit(c, ROOT / screenshot, 398, 70, 300, 420)
    c.showPage()


def draw_expand_symbol(c, x, y):
    c.setStrokeColor(TEXT)
    c.setLineWidth(1.8)
    c.line(x, y + 12, x + 8, y + 4)
    c.line(x + 8, y + 4, x + 16, y + 12)


def draw_eye_symbol(c, x, y):
    c.setStrokeColor(TEXT)
    c.setLineWidth(1.4)
    c.ellipse(x, y + 3, x + 22, y + 15, stroke=1, fill=0)
    c.circle(x + 11, y + 9, 3, stroke=1, fill=0)


def draw_legend_symbol(c, x, y):
    c.setStrokeColor(TEXT)
    c.setLineWidth(1.5)
    for offset in (13, 8, 3):
        c.circle(x + 3, y + offset, 1.2, stroke=1, fill=0)
        c.line(x + 8, y + offset, x + 23, y + offset)


def draw_more_symbol(c, x, y):
    c.setFillColor(TEXT)
    for offset in (4, 9, 14):
        c.circle(x + 9, y + offset, 1.7, stroke=0, fill=1)


def control_card(c, x, y, title, body, symbol):
    c.setFillColor(colors.white)
    c.roundRect(x, y - 74, 162, 74, 8, stroke=0, fill=1)
    c.setStrokeColor(LINE)
    c.roundRect(x, y - 74, 162, 74, 8, stroke=1, fill=0)
    symbol(c, x + 12, y - 33)
    c.setFillColor(GOLD_DARK)
    c.setFont("Helvetica-Bold", 9.2)
    c.drawString(x + 44, y - 23, title)
    paragraph(c, body, x + 44, y - 39, 106, size=7.8, leading=10, color=TEXT)


def layer_page(c, page_no):
    header(c, "Layer List", page_no)
    left_x = 44
    top = PAGE_H - 92
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(left_x, top, "DATA VISIBILITY")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 25)
    c.drawString(left_x, top - 31, "Layer List")
    icon_band(c, [("layer", "Layer")], left_x, top - 96, 250)
    y = top - 118
    y = paragraph(
        c,
        "The Layer List controls which conservation datasets appear on the map. It also gives access to layer symbols and export links.",
        left_x,
        y,
        250,
        size=10.5,
        leading=15,
        color=MUTED,
    )
    y -= 12
    y = bullets(
        c,
        [
            "Expand a group to see individual datasets inside it.",
            "Turn layers on or off before reading the map.",
            "Use the layer menu when you need to export or download a layer form.",
        ],
        left_x,
        y,
        250,
    )
    draw_image_fit(c, ASSETS / "focus-03-layer-list.png", 412, 160, 270, 330)

    c.setFillColor(DARK)
    c.roundRect(44, 54, 708, 94, 10, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(64, 128, "Layer control symbols")
    control_card(c, 64, 110, "Down arrow", "Expand or collapse grouped layers.", draw_expand_symbol)
    control_card(c, 236, 110, "Eye", "Show or hide a dataset on the map.", draw_eye_symbol)
    control_card(c, 408, 110, "Legend icon", "Open the symbol preview for a visible layer.", draw_legend_symbol)
    control_card(c, 580, 110, "Three dots", "Open the layer menu. Export downloads the layer form.", draw_more_symbol)
    c.showPage()


def metadata_page(c, page_no):
    section_page(
        c,
        page_no,
        "Metadata",
        "Dataset sources",
        "help-manual-assets/focus-05-metadata-panel.png",
        "The Metadata panel lists dataset names and source links. Gold text means a metadata record is available. Text that is not gold means the portal does not currently have metadata for that dataset.",
        [
            "Click a gold dataset link to open its metadata record.",
            "Use metadata records to confirm source information and downloads.",
            "Non-gold dataset names are listed for context, but they do not link to metadata yet.",
        ],
        icons=[("metadata", "Metadata")],
    )


def coming_soon_page(c, page_no):
    header(c, "Upcoming Tools", page_no)
    x = 54
    y = PAGE_H - 106
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 26)
    c.drawString(x, y, "Upcoming Tools")
    y -= 32
    y = paragraph(
        c,
        "Bookmark, Draw, and Print are already enabled in the portal header. Each opens its panel and currently shows Coming soon.",
        x,
        y,
        650,
        size=10.8,
        leading=15,
        color=MUTED,
    )
    y -= 22
    cards = [
        ("bookmark", "Bookmark", "Coming soon.", "focus-06-bookmark-panel.png"),
        ("draw", "Draw", "Coming soon.", "focus-07-draw-panel.png"),
        ("print", "Print", "Coming soon.", "focus-08-print-panel.png"),
    ]
    card_w = 220
    for i, (icon, name, text, shot) in enumerate(cards):
        cx = x + i * (card_w + 20)
        c.setFillColor(colors.white)
        c.roundRect(cx, y - 286, card_w, 286, 8, stroke=0, fill=1)
        c.setStrokeColor(LINE)
        c.roundRect(cx, y - 286, card_w, 286, 8, stroke=1, fill=0)
        c.setFillColor(DARK)
        c.rect(cx, y - 44, card_w, 44, stroke=0, fill=1)
        draw_tool_icon(c, icon, cx + 14, y - 34, size=24, label=name, dark=True)
        paragraph(c, text, cx + 14, y - 64, card_w - 28, size=9, leading=12, color=TEXT)
        draw_image_fit(c, ASSETS / shot, cx + 42, y - 270, card_w - 84, 184)
    c.showPage()


def cover(c):
    c.setFillColor(DARK)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    c.setFillColor(CHARCOAL)
    c.rect(0, 0, PAGE_W, 88, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, 86, PAGE_W, 3, stroke=0, fill=1)

    if LOGO.exists():
        draw_image_fit(c, LOGO, 44, PAGE_H - 96, 210, 54, border=False)

    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 34)
    c.drawString(44, PAGE_H - 170, "GeoPortal Help Manual")
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(46, PAGE_H - 198, "Mapping Conservation. Preserving Tomorrow.")
    paragraph(
        c,
        "A practical guide to navigating the Conserva GeoPortal, changing basemaps, managing layers, reading legends, and accessing metadata.",
        46,
        PAGE_H - 230,
        285,
        size=11,
        leading=16,
        color=colors.HexColor("#e6e0d0"),
    )
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(46, 48, "Standalone PDF - not linked to the portal")
    draw_image_fit(c, ASSETS / "focus-01-about-panel.png", 430, 70, 220, 405)
    c.showPage()


def quick_reference(c, page_no):
    header(c, "Quick Reference", page_no)
    x = 54
    y = PAGE_H - 106
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 26)
    c.drawString(x, y, "Quick Reference")
    y -= 36
    y = paragraph(
        c,
        "The tools below match the header icons used in the portal.",
        x,
        y,
        640,
        size=10.5,
        leading=15,
        color=MUTED,
    )
    y -= 20

    cards = [
        ("about", "About", "Project overview and credits."),
        ("basemap", "Basemap", "Switch the map background."),
        ("layer", "Layer", "Control data visibility and layer exports."),
        ("legend", "Legend", "Read visible map symbols."),
        ("bookmark", "Bookmark", "Coming soon."),
        ("draw", "Draw", "Coming soon."),
        ("print", "Print", "Coming soon."),
        ("metadata", "Metadata", "Open available metadata links."),
    ]
    col_w = 168
    row_h = 76
    start_x = 54
    start_y = y
    for index, (icon, name, desc) in enumerate(cards):
        col = index % 4
        row = index // 4
        cx = start_x + col * (col_w + 14)
        cy = start_y - row * (row_h + 16)
        c.setFillColor(colors.white)
        c.roundRect(cx, cy - row_h, col_w, row_h, 8, stroke=0, fill=1)
        c.setStrokeColor(LINE)
        c.roundRect(cx, cy - row_h, col_w, row_h, 8, stroke=1, fill=0)
        c.setFillColor(DARK)
        c.rect(cx, cy - 28, col_w, 28, stroke=0, fill=1)
        draw_tool_icon(c, icon, cx + 10, cy - 24, size=20, label=name, dark=True)
        paragraph(c, desc, cx + 12, cy - 42, col_w - 24, size=8.8, leading=12, color=TEXT)

    c.setFillColor(LIGHT)
    c.roundRect(54, 70, PAGE_W - 108, 68, 10, stroke=0, fill=1)
    c.setFillColor(GOLD_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(76, 116, "Metadata note")
    paragraph(
        c,
        "Gold metadata text is clickable. Non-gold metadata text identifies data that is present in the portal but does not currently have a metadata link.",
        76,
        98,
        620,
        size=9.5,
        leading=13,
        color=TEXT,
    )
    c.showPage()


def build():
    c = canvas.Canvas(str(OUT), pagesize=landscape(letter))
    c.setTitle("Conserva GeoPortal Help Manual")
    c.setAuthor("Conserva GeoPortal")

    cover(c)
    section_page(
        c,
        2,
        "Portal Layout",
        "Getting started",
        "help-manual-assets/focus-01-about-panel.png",
        "The portal opens with the map on the left and an information panel on the right. The header tabs control which panel is visible.",
        [
            "Use the top search bar to find an address or place.",
            "Use the header icon buttons to move between tools.",
            "Resize or collapse the right panel with the vertical handle.",
        ],
        icons=[("about", "About"), ("basemap", "Basemap"), ("layer", "Layer")],
    )
    section_page(
        c,
        3,
        "Basemap Gallery",
        "Map background",
        "help-manual-assets/focus-02-basemap-panel.png",
        "Basemaps change the visual context behind the conservation layers without changing the conservation data itself.",
        [
            "Click a basemap card once to make it active.",
            "Double click the active basemap to toggle it off.",
            "Use OpenStreetMap when road and place detail is helpful.",
        ],
        icons=[("basemap", "Basemap")],
    )
    layer_page(c, 4)
    section_page(
        c,
        5,
        "Legend",
        "Map symbols",
        "help-manual-assets/focus-04-legend-panel.png",
        "The Legend explains the colors and symbols used by the visible map datasets.",
        [
            "Open the Legend tab when comparing multiple layers.",
            "Hidden layers are removed from the legend display.",
            "Use the legend together with the Layer List for clearer map reading.",
        ],
        icons=[("legend", "Legend")],
    )
    metadata_page(c, 6)
    coming_soon_page(c, 7)
    quick_reference(c, 8)
    c.save()


if __name__ == "__main__":
    build()
