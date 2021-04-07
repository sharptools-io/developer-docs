# Custom Tile - HTML Type

## Overview
Selecting the HTML type for a Custom Tile provides a script editor interface in which you can write standard HTML, JavaScript,
and CSS to build Custom Tiles. The HTML option also provides the option to define Tile Settings which you can then
access within your JavaScript.

## Creating HTML Custom Tile
Since this is using standard web technologies, you can use existing libraries and frameworks – Bootstrap, React,
Vue, Angular, Tailwind, etc. Or you can use regular (vanilla) HTML and JS.

<video width="80%" controls>
  <source src="../assets/custom_tile_html_ide_demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video> 

### Settings
You can define settings for the Custom Tile which get exposed as additional options within the main
dashboard interface when you edit a tile. To use these within your scripts, you’ll want to use our [stio library](./stio-lib.md) as shown in the snippet below.

```html
<script src="https://cdn.sharptools.io/js/custom-tiles.js"></script>
<script>
    stio.ready(function(data){
       console.log('The user specified token is', data.settings.token)
    });
</script>
```
::: tip
There are a variety of functions such as `showToast()`, `showList()` and `showForm()` which are included in the stio library. 
Check out the [stio library](./stio-lib.md) documentation for more details.
:::

### Preview
When you use the ‘Preview’ button, it will render a copy of the tile below the script editor interface. If you have
any Tile Settings defined, you’ll be prompted for which values you want to use for the settings (simulating what the
tile would be like after the user adds the tile to their dashboard and configures it).


## Import Code
You can 'import' a Custom Tile by either manually copying in the HTML code or using a special import URL. If you copy in code with embedded settings, the system will automatically import tile settings (or prompt you to do so) once you tap out of the editor.

**Import URL Format**
```
/developer/custom-tiles/import/?url={{URL_TO_RAW_SOURCE_HTML}}
```

::: warning
Please be cautious when copying or importing the HTML code from others. Always review the code, and make sure you are 
comfortable with the implementation details. SharpTools does not review and is not responsible for the custom tile HTML
shared by other developers.
:::


