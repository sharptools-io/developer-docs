---
sidebarDepth: 2
---
# `stio` Library

## Installation / How to Use
The stio library can be referenced from the CDN as a standard `<script>` tag in the HTML of your Custom Tile:

```html
<script src="https://cdn.sharptools.io/js/custom-tiles/0.2.1/stio.js"></script>
```


If you are updating an older Custom Tile to take advantage of new features, don't forget to update your `stio` library version!  

::: details  
Starting with release `0.2.x` of the stio library, we’ve implemented semantic versioning. Historically, the stio library was available at a generic URL:

```text
https://cdn.sharptools.io/js/custom-tiles.js
```

We will continue to update that generic library URL to point to the latest production version of the library. Since the files are served from a CDN with caching, browsers may hold onto the ‘old’ version of the library for a period of time.

As such, we suggest pointing to the specific versioned instance of the library that is needed for your Custom Tile.
:::

## .ready(callback)
Once the stio library is initialized and the communication channel is ready, it will call the callback function
that you provide.

``` js
stio.ready(function(data){
    console.log('The user specified token is', data.settings.token)
});
```
Note that the data object which is passed to your callback includes a property called 'settings' which is an object
that contains the values of the various Tile Settings as they are configured by the user. If the tile is not configured 
by the user, the values of the individual settings fields will be empty.


Enriched settings types such as Things or Variables have additional properties and methods:

### Variables
The [variable setting type](./html.md#variables) is exposed to your Custom Tile code much text, numeric, or boolean input settings are with the `stio.ready()` callback:

```javascript
stio.ready(function(data){
    var myString = data.settings.myString;
});
```

Unlike the standard string, numeric, or boolean settings for a tile which expose the raw primitive values, the variable setting is exposed as an enriched object with several properties and methods

**Properties**
* **`value`**: the current value of the variable
* **`timestamp`**: the timestamp of the value update of the variable
* **`id`**: the user specified variable identifier (eg. `$myText` → `myText`)

**Methods**
* **`setValue(value)`**: update the value of the variable
  * Make sure to match your input data type with the expected type of the variable
   ```javascript
   myBool.setValue(true)
   myStr.setValue("Ready")
   myNum.setValue(10)
   ```
   &nbsp;
* **`onValue(callback)`**: the `callback` is called with the updated value anytime the variable value updates. Returns an object with an `off()` method if you want to stop listening for updates.
   ```javascript
   myVar.onValue(function(value){
      console.log('The new value is', value)
   })
   ```


[Example Variable Custom Tile - Code Gist](https://gist.github.com/joshualyon/7a659611d3a63b5e2b74b717df29495e)


### Things
The [Thing setting type](./html.md#things) is exposed to your Custom Tile code much like existing text, numeric, or boolean input settings are with the `stio.ready()` callback:

```javascript
stio.ready(function(data){
    var myThing = data.settings.myThing;
});
```

Unlike the standard string, numeric, or boolean tile settings which expose the raw primitive values, the Thing setting is exposed as an enriched object with several properties and methods


**Properties**
* **`attributes`**: an object containing each of the attributes where the key is the attribute name and the value is an `Attribute` object:
   * **`value`**: the current value of the attribute
   * **`timestamp`**: the current timestamp of the attribute value
   * **`onValue(callback)`**: the `callback` is called with the updated value anytime the attribute value updates. Returns an object with an **`off()`** method if you want to stop listening for updates.
      ```javascript
      myThing.attributes['switch'].onValue(function(value){
          console.log('The new switch value is', value)
      })
      ```
* **`name`**: the device name
* **`capabilities`**: a string array of camelCase capabilities that the device reports that it has implemented (eg. `switch`, `switchLevel`, `colorControl`) 

**Methods**
* **`sendCommand(command, [argsArray])`**: send the specified command to the device with an optional array of arguments
   ```javascript
   myThing.sendCommand("on")
   myThing.sendCommand("setLevel", [50])
   ```
   &nbsp;
* **`subscribe(attribute)`**: send the request to the supporting smart-home hub to forward events from that device to SharpTools (and our Custom Tile)
  * Note that you can also pass an array of attribute names if you want to subscribe to multiple attributes from the same thing: 
  ```javascript
  myThing.subscribe('switch')
  myThing.subscribe(['switch', 'switchLevel'])
  ```

[Example Thing Custom Tile - Code Gist](https://gist.github.com/joshualyon/c8cfab61675aac3c94dc4708ee4eb050)





## .showList(list) `<promise>`

Display a list of options in a modal window in the main SharpTools interface and then get the selected result in the 
resolved promise.

#### list `<object>`

```json
{
    "title": "My Title", //optional, displayed title of the modal
    "items": [], //array of <ListItem> to display
}
```
#### ListItem `<object>`
```json
{
    "label": "To Display",
    "value": "someKey"
}
```

#### Example Usage
```js
var list = {
    "title": "My Title",
    "items": [
        {"label": "First Item", "value": "first"},
        {"label": "Second Item", "value": "second"}
    ]
}

stio.showList(list).then(function(selectedValue){
    console.log("The selected value was", selectedValue);
});
```
#### Shorthand (pass array of ListItem directly)
Note: As a shorthand, you can pass the array of items directly to showList() if you don’t want to set other properties
of the modal like the title.
```js
var list = [ 
   {"label": "First Item", "value": "first"}, 
   {"label": "Second Item", "value": "second"}
];
stio.showList(list).then(function(selectedValue){
   console.log("The selected value was", selectedValue);
});
```


## .showForm(form) `<promise>`
Display a list of options in a modal window in the main SharpTools interface and then get the selected result in the
resolved promise.

#### form `<object>`
```json
{
    "title": "My Title", //optional, displayed title of the modal
    "items": [], //array of <FormItem> to display
}
```

#### FormItem `<object>`
```json
{
    "name": "displayName", //internal reference
    "label": "Display Name", //User friendly name displayed as the field title
    "type": "STRING",  //STRING, NUMBER, BOOLEAN, ENUM
}
```

Optionally, you can also pass a 'default' value in the FormItem object which should match the specified type.

#### Example Usage
```js 
var form = {
    "title": "My Title",
    "items": [
        { "name": "message", "label": "Message to Send", "type": "STRING" },
    ]
}

stio.showForm(form).then(function(data){
    console.log("The user entered message was", data["message"]);
});
````
#### Shorthand (pass array of ListItem directly)
ENUM Type
The FormItem type of “ENUM” also requires a 'values' field with the list of valid values for the user to select from:
```json
{
    "name": "platform",
    "label": "Which hub?"
    "type": "ENUM",
    "values": ["SmartThings", "Hubitat"]
}
```
Note that the values field can also be an array of structured objects if you need to display a more user-friendly value
in the selector. This follows the ListItem format above with a label and value:
```json
{
    "name": "platform",
    "label": "Which hub?",
    "type": "ENUM",
    "values": [
        {"label": "SmartThings", "value": "smartthings" },
        {"label": "Hubitat Elevation", "value": "hubitat" },
    ]
}
```


## .showToast(message, [class])
Display a ‘toast’ message in the main SharpTools interface. Optionally, include a class like green or red to customize
the color of the toast.

#### message `<string>`
> "Hello world"

#### class `<string>`
> "green"
> 
The default is a black background for the toast message. Use 'green', 'red', or 'blue' to indicate success, error,
or info messages respectively.

#### Example Usage
```js
stio.showToast("Message sent.");
```
or
```js
stio.showToast("Success!", "green");
```