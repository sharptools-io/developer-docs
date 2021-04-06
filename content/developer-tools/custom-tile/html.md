# Custom Tile - HTML Type

## Overview
Selecting the HTML option provides you a script editor interface in which you can write standard HTML, JavaScript,
and CSS to build Custom Tiles. The HTML option also provides the option to define Tile Settings which you can then
access within your JavaScript.

## Creating HTML Custom Tile
Since this is using standard web technologies, you can also use existing libraries and frameworks – Bootstrap, React,
Vue, Angular, Tailwind, etc. Or you can use regular (vanilla) HTML and JS.

<video width="80%" controls>
  <source src="../assets/custom_tile_html_ide_demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video> 

### Settings
You can define settings for the custom tile, and these settings get exposed as additional options within the main
dashboard interface when you edit a tile. To use these within your scripts, you’ll want to use our [stio library](./stio-lib.md) in
your script and then wait for the script to be ready.

```html
<script src="https://cdn.sharptools.io/js/custom-tiles.js"></script>
<script>
    stio.ready(function(data){
       console.log('The user specified token is', data.settings.token)
    });
</script>
```
::: tip
There are more functions, such as `showToast()`, `showList()` and `showForm()`, are included in the stio library. Check out
the [stio library](./stio-lib.md) for more details.
:::

### Preview
When you use the ‘Preview’ button, it will render a copy of the tile below the script editor interface. If you have
any Tile Settings defined, you’ll be prompted for which values you want to use for the settings (simulating what the
tile would be like after the user adds the tile to their dashboard and configures it).


## Import Code
You can create a custom tile by using other developers' HTML code. You can copy the raw HTML code share by other users,
and paste them in to the script editor, or click on the import link that other developers shared, which will
automatically import the settings, and HTML code automatically. Please note that you may be prompted what `settings` 
you'd like to keep if you are copying and pasting the raw HTML code, since it may contain the `setting` data in it.

::: warning
Please be cautious when copying or importing the HTML code from others. Always review the code, and make sure you are 
comfortable with the implementation details. SharpTools does not review and is not responsible for the custom tile HTML
shared by other developers.
:::


