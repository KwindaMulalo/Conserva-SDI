import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  createSlideContext,
  ensureArtifactToolWorkspace,
  importArtifactTool,
  saveBlobToFile,
} from "file:///C:/Users/TheLandlord/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.dirname(__filename);
const WORKSPACE = path.join(ROOT, "ppt-workspace");
const PREVIEW_DIR = path.join(WORKSPACE, "preview");
const OUT = path.join(ROOT, "Conserva_GeoPortal_Help_Manual.pptx");
const CONTACT_SHEET = path.join(WORKSPACE, "contact-sheet.png");

const C = {
  dark: "#1d2529",
  charcoal: "#323d42",
  gold: "#d2b549",
  goldDark: "#8f792a",
  paper: "#f7f7f3",
  text: "#1d2529",
  muted: "#5f686c",
  line: "#d8ddd9",
  white: "#ffffff",
};

const W = 1280;
const H = 720;
const asset = (...parts) => path.join(ROOT, ...parts);
const img = (name) => asset("help-manual-assets", name);
const icon = (name) => asset("assets", "icons", `${name}.png`);
const logo = asset("assets", "landing", "conserva-logo-cropped.png");

function addBg(slide, ctx) {
  ctx.addShape(slide, { x: 0, y: 0, w: W, h: H, fill: C.paper, line: ctx.line() });
}

function addHeader(slide, ctx, kicker, title, page) {
  ctx.addShape(slide, { x: 0, y: 0, w: W, h: 74, fill: C.dark, line: ctx.line() });
  ctx.addShape(slide, { x: 0, y: 72, w: W, h: 4, fill: C.gold, line: ctx.line() });
  ctx.addText(slide, {
    text: kicker.toUpperCase(),
    x: 56,
    y: 24,
    w: 210,
    h: 20,
    fontSize: 13,
    bold: true,
    color: C.gold,
    valign: "middle",
  });
  ctx.addText(slide, {
    text: title,
    x: 270,
    y: 18,
    w: 730,
    h: 34,
    fontSize: 24,
    bold: true,
    color: C.white,
    valign: "middle",
  });
  ctx.addText(slide, {
    text: String(page).padStart(2, "0"),
    x: 1150,
    y: 22,
    w: 72,
    h: 26,
    fontSize: 15,
    bold: true,
    color: C.gold,
    align: "right",
    valign: "middle",
  });
}

function addFooter(slide, ctx) {
  ctx.addText(slide, {
    text: "Mapping Conservation. Preserving Tomorrow.",
    x: 56,
    y: 682,
    w: 500,
    h: 20,
    fontSize: 12,
    color: C.muted,
  });
}

function addBody(slide, ctx, text, x, y, w, h = 110, size = 22) {
  ctx.addText(slide, {
    text,
    x,
    y,
    w,
    h,
    fontSize: size,
    color: C.muted,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

function addBullets(slide, ctx, bullets, x, y, w, gap = 54) {
  bullets.forEach((text, i) => {
    const yy = y + i * gap;
    ctx.addShape(slide, { x, y: yy + 8, w: 9, h: 9, geometry: "ellipse", fill: C.gold, line: ctx.line() });
    ctx.addText(slide, {
      text,
      x: x + 22,
      y: yy,
      w,
      h: 44,
      fontSize: 18,
      color: C.text,
      insets: { left: 0, right: 0, top: 0, bottom: 0 },
    });
  });
}

async function addPanelImage(slide, ctx, imagePath, x = 780, y = 118, w = 310, h = 500) {
  ctx.addShape(slide, { x: x - 14, y: y - 14, w: w + 28, h: h + 28, fill: C.white, line: { fill: C.line, width: 1 } });
  await ctx.addImage(slide, { path: imagePath, x, y, w, h, fit: "contain", alt: "Focused portal screenshot" });
}

async function addToolChip(slide, ctx, iconPath, label, x, y, w = 180) {
  ctx.addShape(slide, { x, y, w, h: 44, fill: C.dark, line: ctx.line() });
  await ctx.addImage(slide, { path: iconPath, x: x + 14, y: y + 8, w: 26, h: 26, fit: "contain", alt: `${label} icon` });
  ctx.addText(slide, {
    text: label,
    x: x + 52,
    y: y + 11,
    w: w - 64,
    h: 22,
    fontSize: 15,
    bold: true,
    color: C.white,
    valign: "middle",
  });
}

async function cover(presentation, ctx) {
  const slide = presentation.slides.add();
  ctx.addShape(slide, { x: 0, y: 0, w: W, h: H, fill: C.dark, line: ctx.line() });
  ctx.addShape(slide, { x: 0, y: 618, w: W, h: 102, fill: C.charcoal, line: ctx.line() });
  ctx.addShape(slide, { x: 0, y: 614, w: W, h: 4, fill: C.gold, line: ctx.line() });
  await ctx.addImage(slide, { path: logo, x: 56, y: 44, w: 245, h: 72, fit: "contain", alt: "Conserva logo" });
  ctx.addText(slide, {
    text: "GeoPortal\nHelp Manual",
    x: 56,
    y: 170,
    w: 520,
    h: 150,
    fontSize: 56,
    bold: true,
    color: C.white,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  ctx.addText(slide, {
    text: "Mapping Conservation. Preserving Tomorrow.",
    x: 60,
    y: 338,
    w: 480,
    h: 28,
    fontSize: 21,
    bold: true,
    color: C.gold,
  });
  addBody(slide, ctx, "A practical guide to the Conserva GeoPortal tools, focused on the active functions and the symbols users see in the portal.", 60, 390, 435, 90, 22);
  await addPanelImage(slide, ctx, img("focus-01-about-panel.png"), 750, 118, 260, 470);
  ctx.addText(slide, { text: "Standalone deck - not linked to the portal", x: 60, y: 650, w: 420, h: 22, fontSize: 15, bold: true, color: C.gold });
  return slide;
}

async function standardSlide(presentation, ctx, spec) {
  const slide = presentation.slides.add();
  addBg(slide, ctx);
  addHeader(slide, ctx, spec.kicker, spec.title, spec.page);
  await addToolChip(slide, ctx, icon(spec.icon), spec.chip, 64, 120, 210);
  addBody(slide, ctx, spec.intro, 64, 196, 520, 92, 21);
  addBullets(slide, ctx, spec.bullets, 68, 330, 510);
  await addPanelImage(slide, ctx, img(spec.image), 812, 122, 270, 490);
  addFooter(slide, ctx);
  return slide;
}

async function layerSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBg(slide, ctx);
  addHeader(slide, ctx, "Data visibility", "Layer List controls", 4);
  await addToolChip(slide, ctx, icon("layer"), "Layer", 64, 120, 180);
  addBody(slide, ctx, "The Layer List controls which conservation datasets appear on the map. It also gives access to layer symbols and export links.", 64, 194, 492, 98, 21);
  addBullets(slide, ctx, [
    "Use the down arrow to expand or collapse grouped layers.",
    "Use the eye to show or hide a dataset on the map.",
    "Use the legend icon to inspect symbols.",
    "Use the three-dot menu to export and download the layer form.",
  ], 68, 314, 520, 46);
  await addPanelImage(slide, ctx, img("focus-03-layer-list.png"), 820, 112, 260, 430);

  const rowY = 594;
  const cards = [
    { label: "Down arrow", body: "Expand or collapse groups.", icon: "ChevronDown" },
    { label: "Eye", body: "Show or hide data.", icon: "Eye" },
    { label: "Legend icon", body: "Open layer symbols.", icon: "List" },
    { label: "Three dots", body: "Open Export download.", icon: "MoreVertical" },
  ];
  cards.forEach((card, i) => {
    const x = 64 + i * 292;
    ctx.addShape(slide, { x, y: rowY, w: 250, h: 70, fill: C.white, line: { fill: C.line, width: 1 } });
    ctx.addText(slide, { text: card.label, x: x + 56, y: rowY + 12, w: 170, h: 20, fontSize: 15, bold: true, color: C.goldDark });
    ctx.addText(slide, { text: card.body, x: x + 56, y: rowY + 36, w: 178, h: 20, fontSize: 12, color: C.text });
  });
  await ctx.addLucideIcon(slide, { icon: "ChevronDown", x: 82, y: rowY + 19, w: 28, h: 28, color: C.text, strokeWidth: 2.4 });
  await ctx.addLucideIcon(slide, { icon: "Eye", x: 374, y: rowY + 19, w: 28, h: 28, color: C.text, strokeWidth: 2.2 });
  await ctx.addLucideIcon(slide, { icon: "List", x: 666, y: rowY + 19, w: 28, h: 28, color: C.text, strokeWidth: 2.2 });
  await ctx.addLucideIcon(slide, { icon: "MoreVertical", x: 958, y: rowY + 19, w: 28, h: 28, color: C.text, strokeWidth: 2.2 });
  addFooter(slide, ctx);
  return slide;
}

async function metadataSlide(presentation, ctx) {
  return standardSlide(presentation, ctx, {
    page: 6,
    kicker: "Dataset sources",
    title: "Metadata links",
    icon: "metadata",
    chip: "Metadata",
    image: "focus-05-metadata-panel.png",
    intro: "Gold text means a metadata record is available. Text that is not gold means the portal does not currently have metadata for that dataset.",
    bullets: [
      "Click a gold dataset link to open its metadata record.",
      "Use metadata records to confirm source information and downloads.",
      "Non-gold dataset names are listed for context only.",
    ],
  });
}

async function upcomingSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBg(slide, ctx);
  addHeader(slide, ctx, "Upcoming tools", "Enabled now, functionality coming soon", 7);
  addBody(slide, ctx, "Bookmark, Draw, and Print are already clickable in the portal header. Each opens its own panel and currently displays Coming soon.", 64, 128, 760, 72, 24);
  const tools = [
    ["bookmark", "Bookmark", "Coming soon"],
    ["draw", "Draw", "Coming soon"],
    ["print", "Print", "Coming soon"],
  ];
  for (let i = 0; i < tools.length; i += 1) {
    const [, title, note] = tools[i];
    const x = 112 + i * 370;
    ctx.addShape(slide, { x, y: 265, w: 300, h: 210, fill: C.dark, line: ctx.line() });
    ctx.addShape(slide, { x, y: 265, w: 300, h: 5, fill: C.gold, line: ctx.line() });
    ctx.addText(slide, { text: title, x: x + 36, y: 328, w: 228, h: 38, fontSize: 29, bold: true, color: C.white, align: "center" });
    ctx.addText(slide, { text: note, x: x + 36, y: 396, w: 228, h: 30, fontSize: 20, color: C.gold, align: "center" });
  }
  addFooter(slide, ctx);
  return slide;
}

async function quickReference(presentation, ctx) {
  const slide = presentation.slides.add();
  addBg(slide, ctx);
  addHeader(slide, ctx, "Quick reference", "Header tools and meaning", 8);
  const items = [
    ["about", "About", "Project overview and credits."],
    ["basemap", "Basemap", "Switch the map background."],
    ["layer", "Layer", "Control data visibility and exports."],
    ["legend", "Legend", "Read visible map symbols."],
    ["bookmark", "Bookmark", "Coming soon."],
    ["draw", "Draw", "Coming soon."],
    ["print", "Print", "Coming soon."],
    ["metadata", "Metadata", "Open available metadata links."],
  ];
  for (let i = 0; i < items.length; i += 1) {
    const [iconName, title, note] = items[i];
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 70 + col * 292;
    const y = 145 + row * 200;
    ctx.addShape(slide, { x, y, w: 248, h: 152, fill: C.white, line: { fill: C.line, width: 1 } });
    ctx.addShape(slide, { x, y, w: 248, h: 46, fill: C.dark, line: ctx.line() });
    await ctx.addImage(slide, { path: icon(iconName), x: x + 18, y: y + 9, w: 28, h: 28, fit: "contain", alt: `${title} icon` });
    ctx.addText(slide, { text: title, x: x + 58, y: y + 11, w: 160, h: 22, fontSize: 16, bold: true, color: C.white });
    ctx.addText(slide, { text: note, x: x + 20, y: y + 72, w: 208, h: 52, fontSize: 16, color: C.text });
  }
  ctx.addText(slide, {
    text: "Metadata note: gold text is clickable; non-gold text identifies data without available metadata.",
    x: 70,
    y: 588,
    w: 900,
    h: 34,
    fontSize: 18,
    bold: true,
    color: C.goldDark,
  });
  addFooter(slide, ctx);
  return slide;
}

async function main() {
  await ensureArtifactToolWorkspace(WORKSPACE);
  const artifact = await importArtifactTool(WORKSPACE);
  const { Presentation, PresentationFile } = artifact;
  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  const ctx = createSlideContext(artifact, {
    slideSize: { width: W, height: H },
    workspaceDir: WORKSPACE,
    assetDir: path.join(WORKSPACE, "assets"),
    outputDir: ROOT,
    titleFont: "Aptos Display",
    bodyFont: "Aptos",
  });

  await cover(presentation, ctx);
  await standardSlide(presentation, ctx, {
    page: 2,
    kicker: "Getting started",
    title: "Portal layout",
    icon: "about",
    chip: "About",
    image: "focus-01-about-panel.png",
    intro: "The portal opens with the map on the left and an information panel on the right. The header tools control which panel is visible.",
    bullets: [
      "Use the top search bar to find an address or place.",
      "Use the header icon buttons to move between tools.",
      "Resize or collapse the right panel with the vertical handle.",
    ],
  });
  await standardSlide(presentation, ctx, {
    page: 3,
    kicker: "Map background",
    title: "Basemap gallery",
    icon: "basemap",
    chip: "Basemap",
    image: "focus-02-basemap-panel.png",
    intro: "Basemaps change the visual context behind the conservation layers without changing the conservation data itself.",
    bullets: [
      "Click a basemap card once to make it active.",
      "Double click the active basemap to toggle it off.",
      "Use OpenStreetMap when road and place detail is helpful.",
    ],
  });
  await layerSlide(presentation, ctx);
  await standardSlide(presentation, ctx, {
    page: 5,
    kicker: "Map symbols",
    title: "Legend panel",
    icon: "legend",
    chip: "Legend",
    image: "focus-04-legend-panel.png",
    intro: "The Legend explains the colors and symbols used by the visible map datasets.",
    bullets: [
      "Open the Legend tab when comparing multiple layers.",
      "Hidden layers are removed from the legend display.",
      "Use the legend together with the Layer List for clearer map reading.",
    ],
  });
  await metadataSlide(presentation, ctx);
  await upcomingSlide(presentation, ctx);
  await quickReference(presentation, ctx);

  await fsSafeMkdir(PREVIEW_DIR);
  const previews = [];
  for (let i = 0; i < presentation.slides.count; i += 1) {
    const slide = presentation.slides.getItem(i);
    const preview = await presentation.export({ slide, format: "png", scale: 1 });
    const out = path.join(PREVIEW_DIR, `slide-${String(i + 1).padStart(2, "0")}.png`);
    await saveBlobToFile(preview, out);
    previews.push(out);
  }
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(OUT);
  console.log(JSON.stringify({ out: OUT, slides: presentation.slides.count, previews, contactSheet: CONTACT_SHEET }, null, 2));
}

async function fsSafeMkdir(dir) {
  const fs = await import("node:fs/promises");
  await fs.mkdir(dir, { recursive: true });
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exit(1);
});
