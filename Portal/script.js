const titles = {
  about: "About",
  basemap: "Basemap Gallery",
  layer: "Layer List",
  legend: "Legend",
  bookmark: "Bookmarks",
  draw: "Draw Widget",
  print: "Print Widget",
  metadata: "Metadata"
};

const webmapFrame = document.querySelector("#webmapFrame");
const portalSearch = document.querySelector("#portalSearch");
const portalSearchInput = document.querySelector("#portalSearchInput");
const zoomInButton = document.querySelector("#zoomInButton");
const zoomOutButton = document.querySelector("#zoomOutButton");
const homeButton = document.querySelector("#homeButton");
const measureButton = document.querySelector("#measureButton");

const webmapLegendByName = {
  "Western Cape boundary": "WesternCape_1.png",
  "Western Cape": "WesternCape_1.png",
  "Priority area": "Priorityarea_2.png",
  "Mountain catchment area": "Mountaincatchementarea_3.png",
  "Marine protected area": "Marineprotectedarea_4.png",
  "Critical biodiversity area": "Criticalbiodiversityarea_5.png",
  "Offshore focus areas": "Offshorefocusareas_6.png",
  "Ecological support area": "Ecologicalsupportarea_7.png",
  "Conservation Area": "ConservationArea_8.png",
  "Not threatened": "Notthreatened_9.png",
  "Vulnerable": "Vulnerable_10.png",
  "Endangered": "Endangered_11.png",
  "Critical": "Critical_12.png",
  "Rivers": "Rivers_13.png",
  "All Rivers": "Rivers_13.png",
  "Buffer Zone": "BufferZone_14.png",
  "Core Areas": "CoreAreas_15.png",
  "Not Assigned": "NotAssigened_16.png",
  "Transition Area": "TransitionArea_17.png",
  "Biosphere reserve Zones": "BiospherereserveZone_18.png",
  "All Biosphere reserve Zones": "BiospherereserveZone_18.png",
  "World Heritage Site": "WorldHeritageSite_19.png",
  "Special Nature Reserve": "SpecialNatureReserve_20.png",
  "Protected Environment": "ProtectedEnviroment_21.png",
  "Forest Nature Reserve": "ForestNatureReserve_22.png",
  "Forest Wilderness Area": "ForestWildernessArea_23.png",
  "National Park": "NationalPark_24.png",
  "Nature Reserve": "NatureReserve_25.png",
  "Protected Areas": "ProtectedAreas_26.png",
  "All Protected Areas": "ProtectedAreas_26.png"
};

const layerTree = [
  {
    name: "Rivers",
    symbol: "line-blue",
    expanded: true,
    children: [
      { name: "All Rivers", symbol: "line-blue" },
      { name: "Critical", symbol: "line-red", muted: true, visible: false },
      { name: "Endangered", symbol: "line-salmon", muted: true, visible: false },
      { name: "Vulnerable", symbol: "line-peach", muted: true, visible: false },
      { name: "Not threatened", symbol: "line-light-blue", muted: true, visible: false }
    ]
  },
  {
    name: "Biosphere reserve Zones",
    symbol: "fill-teal",
    expanded: true,
    visible: false,
    children: [
      { name: "All Biosphere reserve Zones", symbol: "fill-teal", muted: true, visible: false },
      { name: "Transition Area", symbol: "fill-pale-green", muted: true, visible: false },
      { name: "Not Assigned", symbol: "fill-gray", muted: true, visible: false },
      { name: "Core Areas", symbol: "fill-green", muted: true, visible: false },
      { name: "Buffer Zone", symbol: "fill-soft-green", muted: true, visible: false }
    ]
  },
  {
    name: "Protected Areas",
    symbol: "fill-green",
    expanded: true,
    children: [
      { name: "All Protected Areas", symbol: "fill-green", visible: false },
      { name: "Nature Reserve", symbol: "fill-bright-green", visible: false },
      { name: "National Park", symbol: "fill-deep-green" },
      { name: "Forest Wilderness Area", symbol: "fill-green", visible: false },
      { name: "Forest Nature Reserve", symbol: "fill-olive", visible: false },
      { name: "Protected Environment", symbol: "fill-light-green", visible: false },
      { name: "Special Nature Reserve", symbol: "fill-dark-green", visible: false },
      { name: "World Heritage Site", symbol: "fill-gold" }
    ]
  },
  { name: "Conservation Area", symbol: "fill-green", strong: true, visible: false },
  { name: "Ecological support area", symbol: "fill-cream", muted: true, visible: false },
  { name: "Offshore focus areas", symbol: "fill-cyan", strong: true, visible: false },
  { name: "Critical biodiversity area", symbol: "fill-orange", muted: true, visible: false },
  { name: "Marine protected area", symbol: "fill-steel", strong: true },
  { name: "Mountain catchment area", symbol: "fill-gray-blue", muted: true, visible: false },
  { name: "Priority area", symbol: "fill-orange-red", strong: true, visible: false },
  { name: "Western Cape boundary", symbol: "outline-blue", strong: true }
];

const metadataLinks = {
  "Critical": "https://stable.demo.geonode.org/catalogue/uuid/c74a9792-4744-450c-b609-919d1aeb0260",
  "Vulnerable": "https://stable.demo.geonode.org/catalogue/uuid/b79be7e6-089b-41ad-ba1d-c403a43dc895",
  "Not threatened": "https://stable.demo.geonode.org/catalogue/uuid/110bff91-878b-4cd1-9b78-2c33bc266be5",
  "All Biosphere reserve Zones": "https://stable.demo.geonode.org/catalogue/uuid/4e84e3d0-77fd-4138-94fd-c89d32d91100",
  "Transition Area": "https://stable.demo.geonode.org/catalogue/uuid/298e58f5-967d-45a7-bb06-a77cd786094d",
  "Not Assigned": "https://stable.demo.geonode.org/catalogue/uuid/1b18c6d2-34a1-48d1-a964-2eeb8395a98b",
  "Core Areas": "https://stable.demo.geonode.org/catalogue/uuid/fe097c04-5b62-4ff4-aa57-f090f1eb8fad",
  "Buffer Zone": "https://stable.demo.geonode.org/catalogue/uuid/af6f2732-b30b-4d79-819a-4320496a3441",
  "All Protected Areas": "https://stable.demo.geonode.org/catalogue/uuid/ea822729-bc8d-44a5-ba36-0bb6ea767203",
  "Nature Reserve": "https://stable.demo.geonode.org/catalogue/uuid/ac06a3f2-a0e8-4b57-927c-611e6114a35b",
  "National Park": "https://stable.demo.geonode.org/catalogue/uuid/68901ffb-e770-4823-bedb-df9b739f5fae",
  "Forest Wilderness Area": "https://stable.demo.geonode.org/catalogue/uuid/94c26a85-58cf-402c-9a4d-596fd8a1952c",
  "Forest Nature Reserve": "https://stable.demo.geonode.org/catalogue/uuid/2ef5e16c-f3ff-4f0e-ad41-b9fdc3cc4807",
  "Protected Environment": "https://stable.demo.geonode.org/catalogue/uuid/028cdf75-f820-4745-af1d-26ce1a5ebf80",
  "Special Nature Reserve": "https://stable.demo.geonode.org/catalogue/uuid/9e9509df-221b-402d-83bc-ab7a1da1ef51",
  "Conservation Area": "https://stable.demo.geonode.org/catalogue/uuid/54715956-dac8-4b15-b3b5-044379e167f3",
  "Ecological support area": "https://stable.demo.geonode.org/catalogue/uuid/c2f0ae97-32b4-4ecc-8c0d-c8f9eb16debb",
  "Offshore focus areas": "https://stable.demo.geonode.org/catalogue/uuid/89eb492d-c5ce-4e2d-b738-2a5e637d45f9",
  "Marine protected area": "https://stable.demo.geonode.org/catalogue/uuid/8c2e4f95-fa58-4a33-b445-a2599bb203b7",
  "Mountain catchment area": "https://stable.demo.geonode.org/catalogue/uuid/9c574933-9cd4-4194-aa0a-b1e6320e9651",
  "Priority area": "https://stable.demo.geonode.org/catalogue/uuid/c7b3a054-0b7b-4dcf-8fdd-8e30c9ebef56",
  "Western Cape boundary": "https://stable.demo.geonode.org/catalogue/uuid/940e9f12-76c4-4192-9795-db8e7f91db20"
};

const appShell = document.querySelector(".app-shell");
const workspace = document.querySelector(".workspace");
const resizer = document.querySelector(".panel-resizer");
const resizerIcon = document.querySelector(".panel-resizer span");
const panelTitle = document.querySelector("#panelTitle");
const tabButtons = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel-content");
const layerList = document.querySelector("#layerList");
const basemapCards = document.querySelectorAll(".basemap-card");
const basemapCard = document.querySelector(".basemap-card");
const headerLegendContent = document.querySelector("#headerLegendContent");
const DEFAULT_PANEL_WIDTH = 360;

let panelWidth = getDefaultPanelWidth();
let dragStartX = 0;
let dragStartWidth = 0;
let didDrag = false;
let isDraggingPanel = false;
let isMouseDraggingPanel = false;
let userSizedPanel = false;
let lastActivatedBasemapCard = basemapCard;
let basemapClickTimer = 0;
let savedConservationViewerState = null;

function layerEyeIcon(isVisible) {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z"></path>
      <circle cx="12" cy="12" r="2.4"></circle>
      ${isVisible ? "" : '<path class="eye-slash" d="m4.5 4.5 15 15"></path>'}
    </svg>
  `;
}

function legendIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 7h10"></path>
      <path d="M9 12h10"></path>
      <path d="M9 17h10"></path>
      <circle cx="5" cy="7" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle>
      <circle cx="5" cy="17" r="1"></circle>
    </svg>
  `;
}

function exportIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v11"></path>
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5"></path>
      <path d="M5 14v5h14v-5"></path>
    </svg>
  `;
}

function getWebmapApi() {
  return webmapFrame?.contentWindow?.ConservaWebMap || null;
}

function withWebmapApi(action, attempt = 0) {
  const api = getWebmapApi();
  if (api) {
    action(api);
  } else if (attempt < 8) {
    window.setTimeout(() => withWebmapApi(action, attempt + 1), 250);
  }
}

function setWebmapLayerVisibility(name, isVisible) {
  withWebmapApi((api) => api.setLayerVisibility(name, isVisible));
}

function resetWebmapFrameHome() {
  if (!webmapFrame) {
    return;
  }

  webmapFrame.src = `webmap/index.html?portal=1&home=${Date.now()}`;
}

function renderLegendSymbol(entry) {
  const image = webmapLegendByName[entry.name];
  if (image) {
    return `<img class="legend-symbol legend-image" src="webmap/legend/${image}" alt="">`;
  }
  return `<span class="legend-symbol ${entry.symbol}" aria-hidden="true"></span>`;
}

function renderLegendDetail(item, depth, layerId) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const entries = hasChildren ? item.children : [item];

  return `
    <div class="layer-legend-detail" style="--layer-depth: ${depth}">
      ${entries.map((entry, index) => entry.symbol ? `
        <div class="legend-entry" data-legend-for="${hasChildren ? `${layerId}-${index}` : layerId}">
          ${hasChildren ? `<div class="legend-detail-name">- ${entry.name}</div>` : ""}
          ${renderLegendSymbol(entry)}
        </div>
      ` : "").join("")}
    </div>
  `;
}

function renderLayerItem(item, depth = 0, layerId = "layer") {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const visible = item.visible !== false;
  const expanded = hasChildren && item.expanded !== false;
  const exportUrl = metadataLinks[item.name] || "";
  const rowClasses = [
    "layer-row",
    hasChildren ? "layer-group" : "layer-leaf",
    depth === 0 ? "layer-main" : "layer-sub",
    item.muted ? "is-muted" : "",
    item.strong ? "is-strong" : "",
    item.selected ? "is-selected" : ""
  ].filter(Boolean).join(" ");

  return `
    <div class="layer-node${expanded ? " expanded" : ""}${visible ? "" : " layer-hidden"}" data-layer-node data-layer-id="${layerId}">
      <div class="${rowClasses}" data-layer-row style="--layer-depth: ${depth}">
        ${hasChildren ? `
          <button class="layer-expand" type="button" aria-expanded="${expanded}" aria-label="${expanded ? "Collapse" : "Expand"} ${item.name}">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m6 4 4 4-4 4"></path>
            </svg>
          </button>
        ` : '<span class="layer-expand-spacer" aria-hidden="true"></span>'}
        <span class="layer-name">${item.name}</span>
        <button class="layer-visibility ${visible ? "is-visible" : "is-hidden"}" type="button" aria-pressed="${visible}" aria-label="${visible ? "Hide" : "Show"} ${item.name}">
          ${layerEyeIcon(visible)}
        </button>
        <button class="layer-legend" type="button" aria-label="Legend for ${item.name}" ${visible ? "" : "disabled aria-disabled=\"true\""}>${legendIcon()}</button>
        ${hasChildren ? '<span class="layer-more-spacer" aria-hidden="true"></span>' : `
          <button class="layer-more" type="button" aria-expanded="false" aria-label="More options for ${item.name}">
            <span class="layer-more-dots">&#8942;</span>
            <span class="layer-menu" role="menu">
              <span class="layer-menu-item${exportUrl ? "" : " is-disabled"}" role="menuitem" ${exportUrl ? `data-href="${exportUrl}"` : 'aria-disabled="true"'}>${exportIcon()}<span>Export</span><span class="layer-menu-arrow">&#8250;</span></span>
            </span>
          </button>
        `}
      </div>
      ${renderLegendDetail(item, depth, layerId)}
      ${hasChildren ? `<div class="layer-children">${item.children.map((child, index) => renderLayerItem(child, depth + 1, `${layerId}-${index}`)).join("")}</div>` : ""}
    </div>
  `;
}

function renderPropertyLegendDetail() {
  return `
    <div class="layer-legend-detail property-legend-detail" style="--layer-depth: 0">
      ${layerTree.map((item, index) => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        return `
          <div class="property-legend-group">
            ${hasChildren ? `<div class="legend-group-name">${item.name}</div>` : ""}
            ${(hasChildren ? item.children : [item]).map((entry, entryIndex) => entry.symbol ? `
              <div class="legend-entry ${hasChildren ? "nested" : ""}" data-legend-for="${hasChildren ? `layer-${index}-${entryIndex}` : `layer-${index}`}">
                <div class="legend-detail-name">${hasChildren ? `- ${entry.name}` : entry.name}</div>
                ${renderLegendSymbol(entry)}
              </div>
            ` : "").join("")}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

layerList.innerHTML = `
  <div class="layer-node expanded" data-layer-node data-layer-id="property">
    <div class="layer-row layer-parent" data-layer-row>
      <button class="layer-expand" type="button" aria-expanded="true" aria-label="Collapse Conservation Viewer">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="m6 4 4 4-4 4"></path>
        </svg>
      </button>
      <span class="layer-name">Conservation Viewer</span>
      <button class="layer-visibility is-visible" type="button" aria-pressed="true" aria-label="Hide Conservation Viewer">
        ${layerEyeIcon(true)}
      </button>
      <button class="layer-legend" type="button" aria-label="Legend for Conservation Viewer">${legendIcon()}</button>
      <span class="layer-more-spacer" aria-hidden="true"></span>
    </div>
    ${renderPropertyLegendDetail()}
    <div class="layer-children">
      ${layerTree.map((item, index) => renderLayerItem(item, 0, `layer-${index}`)).join("")}
    </div>
  </div>
`;

if (headerLegendContent) {
  headerLegendContent.innerHTML = renderPropertyLegendDetail();
}

function updateLegendAvailability() {
  const hiddenLayerIds = new Set(
    [...layerList.querySelectorAll("[data-layer-node].layer-hidden")]
      .map((node) => node.dataset.layerId)
  );

  document.querySelectorAll(".legend-entry[data-legend-for]").forEach((entry) => {
    entry.hidden = hiddenLayerIds.has(entry.dataset.legendFor);
  });

  document.querySelectorAll(".property-legend-group").forEach((group) => {
    const entries = [...group.querySelectorAll(".legend-entry")];
    group.hidden = entries.length > 0 && entries.every((entry) => entry.hidden);
  });
}

function closeLayerMenus(exceptButton = null) {
  document.querySelectorAll(".layer-more.is-open").forEach((button) => {
    if (button !== exceptButton) {
      button.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    }
  });
}

function setNodeVisibility(node, isVisible) {
  const row = node.querySelector(":scope > [data-layer-row]");
  const visibilityButton = row?.querySelector(".layer-visibility");
  const legendButton = row?.querySelector(".layer-legend");
  const layerName = row?.querySelector(".layer-name")?.textContent.trim() || "layer";

  node.classList.toggle("layer-hidden", !isVisible);
  node.classList.toggle("legend-open", isVisible && node.classList.contains("legend-open"));

  if (visibilityButton) {
    visibilityButton.classList.toggle("is-visible", isVisible);
    visibilityButton.classList.toggle("is-hidden", !isVisible);
    visibilityButton.setAttribute("aria-pressed", String(isVisible));
    visibilityButton.setAttribute("aria-label", `${isVisible ? "Hide" : "Show"} ${layerName}`);
    visibilityButton.innerHTML = layerEyeIcon(isVisible);
  }

  if (legendButton) {
    legendButton.disabled = !isVisible;
    legendButton.classList.toggle("active", isVisible && node.classList.contains("legend-open"));
    legendButton.setAttribute("aria-disabled", String(!isVisible));
  }

  if (getDirectChildNodes(node).length === 0) {
    setWebmapLayerVisibility(layerName, isVisible);
  }
}

function setNodeTreeVisibility(node, isVisible) {
  setNodeVisibility(node, isVisible);
  node.querySelectorAll(":scope > .layer-children [data-layer-node]").forEach((childNode) => {
    setNodeVisibility(childNode, isVisible);
  });
}

function getNodeLayerName(node) {
  return node
    ?.querySelector(":scope > [data-layer-row] .layer-name")
    ?.textContent
    .trim() || "";
}

function getDirectChildNodes(node) {
  return [...node.querySelectorAll(":scope > .layer-children > [data-layer-node]")];
}

function getAllChildNode(groupNode) {
  return getDirectChildNodes(groupNode).find((childNode) => getNodeLayerName(childNode).startsWith("All "));
}

function getNodeVisibility(node) {
  return node
    ?.querySelector(":scope > [data-layer-row] .layer-visibility")
    ?.getAttribute("aria-pressed") === "true";
}

function getDescendantLayerNodes(node) {
  return [...node.querySelectorAll(":scope > .layer-children [data-layer-node]")];
}

function setConservationViewerVisibility(node, isVisible) {
  const descendantNodes = getDescendantLayerNodes(node);

  if (!isVisible) {
    savedConservationViewerState = new Map(
      descendantNodes.map((childNode) => [childNode.dataset.layerId, getNodeVisibility(childNode)])
    );
    setNodeVisibility(node, false);
    descendantNodes.forEach((childNode) => setNodeVisibility(childNode, false));
    return;
  }

  setNodeVisibility(node, true);
  descendantNodes.forEach((childNode) => {
    setNodeVisibility(childNode, savedConservationViewerState?.get(childNode.dataset.layerId) === true);
  });
}

function setExclusiveGroupVisibility(groupNode, isVisible) {
  const allChildNode = getAllChildNode(groupNode);

  if (!allChildNode) {
    setNodeTreeVisibility(groupNode, isVisible);
    return;
  }

  setNodeVisibility(groupNode, isVisible);
  getDirectChildNodes(groupNode).forEach((childNode) => {
    setNodeTreeVisibility(childNode, isVisible && childNode === allChildNode);
  });
}

function setGroupedLayerVisibility(node, isVisible) {
  if (node.dataset.layerId === "property") {
    setConservationViewerVisibility(node, isVisible);
    return;
  }

  const childNodes = getDirectChildNodes(node);

  if (childNodes.length > 0) {
    setExclusiveGroupVisibility(node, isVisible);
    return;
  }

  const groupNode = node.parentElement?.closest("[data-layer-node]");
  const allChildNode = groupNode ? getAllChildNode(groupNode) : null;

  setNodeTreeVisibility(node, isVisible);

  if (!isVisible || !allChildNode) {
    return;
  }

  if (node === allChildNode) {
    getDirectChildNodes(groupNode).forEach((siblingNode) => {
      if (siblingNode !== allChildNode) {
        setNodeTreeVisibility(siblingNode, false);
      }
    });
  } else {
    setNodeTreeVisibility(allChildNode, false);
  }

  setNodeVisibility(groupNode, true);
}

function syncVisibleLayersToWebmap() {
  layerList.querySelectorAll("[data-layer-node]").forEach((node) => {
    if (getDirectChildNodes(node).length > 0) {
      return;
    }

    const row = node.querySelector(":scope > [data-layer-row]");
    const layerName = row?.querySelector(".layer-name")?.textContent.trim();
    const visibilityButton = row?.querySelector(".layer-visibility");
    if (layerName && visibilityButton) {
      setWebmapLayerVisibility(layerName, visibilityButton.getAttribute("aria-pressed") === "true");
    }
  });
  basemapCards.forEach((card) => {
    setWebmapLayerVisibility(card.dataset.basemapLayer, card.classList.contains("selected"));
  });
}

function setBasemapCardState(card, isSelected) {
  card.classList.toggle("selected", isSelected);
  card.setAttribute("aria-pressed", String(isSelected));
  setWebmapLayerVisibility(card.dataset.basemapLayer, isSelected);
}

layerList.addEventListener("click", (event) => {
  const menuItem = event.target.closest(".layer-menu-item");
  if (menuItem) {
    const href = menuItem.dataset.href;
    if (href) {
      window.open(href, "_blank", "noopener");
    }
    closeLayerMenus();
    return;
  }

  const expandButton = event.target.closest(".layer-expand");
  if (expandButton) {
    const node = expandButton.closest("[data-layer-node], .layer-node");
    const row = expandButton.closest("[data-layer-row]");
    const layerName = row.querySelector(".layer-name").textContent.trim();
    const isExpanded = node.classList.toggle("expanded");
    expandButton.setAttribute("aria-expanded", String(isExpanded));
    expandButton.setAttribute("aria-label", `${isExpanded ? "Collapse" : "Expand"} ${layerName}`);
    return;
  }

  const visibilityButton = event.target.closest(".layer-visibility");
  if (visibilityButton) {
    const node = visibilityButton.closest("[data-layer-node]");
    const isVisible = visibilityButton.getAttribute("aria-pressed") !== "true";
    setGroupedLayerVisibility(node, isVisible);
    updateLegendAvailability();
    return;
  }

  const legendButton = event.target.closest(".layer-legend");
  if (legendButton) {
    const node = legendButton.closest("[data-layer-node]");
    const row = legendButton.closest("[data-layer-row]");
    const isOpen = node.classList.toggle("legend-open");
    legendButton.classList.toggle("active", isOpen);
    legendButton.setAttribute("aria-expanded", String(isOpen));
    legendButton.setAttribute("aria-label", `${isOpen ? "Hide" : "Show"} legend for ${row.querySelector(".layer-name").textContent.trim()}`);
    closeLayerMenus();
    return;
  }

  const moreButton = event.target.closest(".layer-more");
  if (moreButton) {
    const isOpen = !moreButton.classList.contains("is-open");
    closeLayerMenus(moreButton);
    moreButton.classList.toggle("is-open", isOpen);
    moreButton.setAttribute("aria-expanded", String(isOpen));
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".layer-more")) {
    closeLayerMenus();
  }
});

updateLegendAvailability();

if (webmapFrame) {
  webmapFrame.addEventListener("load", syncVisibleLayersToWebmap);
}

if (zoomInButton) {
  zoomInButton.addEventListener("click", () => withWebmapApi((api) => api.zoomIn()));
}

if (zoomOutButton) {
  zoomOutButton.addEventListener("click", () => withWebmapApi((api) => api.zoomOut()));
}

if (homeButton) {
  homeButton.addEventListener("click", resetWebmapFrameHome);
}

if (measureButton) {
  measureButton.addEventListener("click", () => withWebmapApi((api) => api.toggleMeasure()));
}

if (portalSearch) {
  portalSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    withWebmapApi((api) => api.search(portalSearchInput?.value || ""));
  });
}

basemapCards.forEach((card) => {
  card.addEventListener("click", () => {
    window.clearTimeout(basemapClickTimer);
    basemapClickTimer = window.setTimeout(() => {
      if (!card.classList.contains("selected")) {
        lastActivatedBasemapCard = card;
        basemapCards.forEach((otherCard) => {
          setBasemapCardState(otherCard, otherCard === card);
        });
      }
    }, 220);
  });

  card.addEventListener("dblclick", () => {
    window.clearTimeout(basemapClickTimer);
    if (card.classList.contains("selected")) {
      basemapCards.forEach((otherCard) => setBasemapCardState(otherCard, false));
    }
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.getAttribute("aria-disabled") === "true") {
      return;
    }

    const target = button.dataset.panel;

    tabButtons.forEach((tab) => tab.classList.toggle("active", tab === button));
    panels.forEach((panel) => panel.classList.toggle("active", panel.id === target));
    panelTitle.textContent = titles[target];
  });
});

function showPanel(target) {
  tabButtons.forEach((tab) => tab.classList.toggle("active", tab.dataset.panel === target));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === target));
  panelTitle.textContent = titles[target];
}

showPanel("about");

window.addEventListener("pageshow", () => {
  showPanel("about");
});

function getDefaultPanelWidth() {
  if (!workspace) {
    return DEFAULT_PANEL_WIDTH;
  }

  return Math.min(DEFAULT_PANEL_WIDTH, Math.max(0, workspace.clientWidth));
}

function setPanelWidth(width) {
  const maxWidth = Math.max(0, workspace.clientWidth);
  panelWidth = Math.min(Math.max(width, 0), maxWidth);
  appShell.style.setProperty("--panel-width", `${panelWidth}px`);
  appShell.classList.toggle("panel-collapsed", panelWidth < 24);
  resizer.setAttribute("aria-label", panelWidth < 24 ? "Expand panel" : "Collapse panel");
  resizerIcon.innerHTML = panelWidth < 24 ? "&#8249;" : "&#8250;";
}

resizer.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) {
    return;
  }

  didDrag = false;
  isDraggingPanel = true;
  dragStartX = event.clientX;
  dragStartWidth = panelWidth;
  resizer.setPointerCapture(event.pointerId);
  event.preventDefault();
});

resizer.addEventListener("pointermove", (event) => {
  if (!isDraggingPanel || !resizer.hasPointerCapture(event.pointerId)) {
    return;
  }

  const delta = dragStartX - event.clientX;
  if (Math.abs(delta) > 2) {
    didDrag = true;
    userSizedPanel = true;
  }
  setPanelWidth(dragStartWidth + delta);
});

resizer.addEventListener("pointerup", (event) => {
  if (resizer.hasPointerCapture(event.pointerId)) {
    resizer.releasePointerCapture(event.pointerId);
  }

  if (isDraggingPanel && !didDrag) {
    userSizedPanel = true;
    setPanelWidth(panelWidth < 24 ? getDefaultPanelWidth() : 0);
  }

  isDraggingPanel = false;
});

resizer.addEventListener("pointercancel", (event) => {
  if (resizer.hasPointerCapture(event.pointerId)) {
    resizer.releasePointerCapture(event.pointerId);
  }
  isDraggingPanel = false;
});

resizer.addEventListener("mousedown", (event) => {
  if (isDraggingPanel || event.button !== 0) {
    return;
  }

  didDrag = false;
  isMouseDraggingPanel = true;
  dragStartX = event.clientX;
  dragStartWidth = panelWidth;
  event.preventDefault();
});

window.addEventListener("mousemove", (event) => {
  if (!isMouseDraggingPanel && !isDraggingPanel) {
    return;
  }

  const delta = dragStartX - event.clientX;
  if (Math.abs(delta) > 2) {
    didDrag = true;
    userSizedPanel = true;
  }
  setPanelWidth(dragStartWidth + delta);
});

window.addEventListener("mouseup", () => {
  if (!isMouseDraggingPanel && !isDraggingPanel) {
    return;
  }

  if (!didDrag) {
    userSizedPanel = true;
    setPanelWidth(panelWidth < 24 ? getDefaultPanelWidth() : 0);
  }
  isMouseDraggingPanel = false;
  isDraggingPanel = false;
});

showPanel("about");
setPanelWidth(panelWidth);

window.addEventListener("resize", () => {
  setPanelWidth(userSizedPanel ? panelWidth : getDefaultPanelWidth());
});
