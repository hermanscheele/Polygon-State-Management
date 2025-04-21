# Polygon Map Editor

A React-based web application for interacting with GeoJSON polygon sets on a map. Users can:

- Select between multiple “solutions” (each a set of polygons).
- Click polygons (or use the sidebar list) to toggle selection.
- View the total area of selected polygons.
- Perform **Union** and **Intersect** operations on two selected polygons.
- Persist all changes in memory until the page is reloaded.

---

## 📦 Tech Stack

- **React 18** (Vite)  
- **React‑Leaflet** & **Leaflet** for interactive maps  
- **Material UI (MUI)** for sidebar, buttons, layout  
- **Turf.js** for geospatial area & boolean operations  
- **Vite** for fast dev server & build

---

## 🔧 Prerequisites

- Node.js ≥ 14  
- npm (or yarn)

---

## 🚀 Installation

1. Clone or download this repo.  
2. From the project root, install dependencies:

   npm install

3. Run the webpage on localhost

   npm run dev


## Assumptions for the task

Polygon Data: Polygons provided are GeoJSON FeatureCollections.


Unique Polygon IDs: Used polygon indices as identifiers since GeoJSON features didn't provide unique IDs.


Persistence: Modifications are only persisted in memory, resetting after page reload.


UI Simplicity: Opted for a simple and intuitive UI using MUI to allow quick comprehension and interaction.


Dynamic Tab Title: Tab title dynamically updates to reflect the currently selected polygon solution.

