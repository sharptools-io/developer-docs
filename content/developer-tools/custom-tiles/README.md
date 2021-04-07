---
pageClass: zoomable-image

---

# Custom Tiles


## Overview
Custom Tiles can be used to embed web pages from other sites or to integrate with other services using standard web technology like HTML, CSS and JavaScript.

There are two types of Custom Tiles:
* **[URL](./url.html)**: points to an external webpage; embeds as an iframe
* **[HTML](./html.html)**: HTML, CSS, and JavaScript (hosted by SharpTools)


## Creating Custom Tiles
From the [Developer Tools](../) page, you can scroll down to the bottom of the Custom Tiles list and tap **Create** which will take you to the Custom Tile editor where you can create your first Custom Tile:

<img src="../assets/creating_custom_tiles.png" alt="Select Custom Tile Type" class="zoomable-image" />

From here, you can select a **Type** of either [URL](./url.md) or [HTML](./html.md) and then follow the relevant guide for that type.

### Best Practices
Here are some best practices when working on Custom Tiles:

**Test tiles without settings configured**  
For example, display a message suggesting the tile should be configured.
You can test this by either not filling out the preview settings or clearing out the settings before tapping continue in the Settings preview modal.

**Prefer classic JavaScript syntax over modern ES6 syntax**  
This provides a wider range of compatibility with browser – especially considering that older Fire Tablets and iPads are commonly used as dashboard viewing devices.  

Example: instead of arrow syntax `()=>{ }` prefer traditional function declarations `function(){ }`

**If using the ‘Default Dimensions’ option, take preference to the smallest reasonable size**  
When adding tiles to a dashboard, it’s generally preferred not to have a tile larger than the dashboard width added. For example, many mobile (portrait) dashboard users will only be showing 2 columns wide, so a 3 wide tile would extend beyond their dashboard.

**Prefer dynamic measurements rather than fixed pixel sizes**  
Users retain the ability to adjust tile dimensions as they see fit, so also plan on accommodating larger or smaller tile sizes where reasonable em, vh, or % sizes provide flexibility in scaling compared to px units and can be used with font sizes, div sizes, etc.  

The ‘window’ size will be the size of the tile since the custom HTML is displayed in an iframe. This can be used as a helpful reference if you want to dynamically calculate sizes or use CSS @media queries

### What Next?
Build your first Custom Tile using the [URL](./url.html) or [HTML](./html.html) approach.