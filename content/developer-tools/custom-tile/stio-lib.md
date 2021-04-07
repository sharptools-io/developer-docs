# `stio` Library

## Installation / How to Use
The stio library can be referenced from the CDN as a standard `<script>` tag in the HTML of your Custom Tile:

```html
<script src="https://cdn.sharptools.io/js/custom-tiles.js"></script>
```

### .ready(callback)
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



### .showList(list) `<promise>`

Display a list of options in a modal window in the main SharpTools interface and then get the selected result in the 
resolved promise.

#### list `<object>`

```js
{
    "title": "My Title", //optional, displayed title of the modal
    "items": [], //array of <ListItem> to display
}
```
#### ListItem `<object>`
```js
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


### .showForm(form) `<promise>`
Display a list of options in a modal window in the main SharpTools interface and then get the selected result in the
resolved promise.

#### form `<object>`
```js
{
    "title": "My Title", //optional, displayed title of the modal
    "items": [], //array of <FormItem> to display
}
```

#### FormItem `<object>`
```js
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
```js
{
    "name": "platform",
    "label": "Which hub?"
    "type": "ENUM",
    "values": ["SmartThings", "Hubitat"]
}
```
Note that the values field can also be an array of structured objects if you need to display a more user-friendly value
in the selector. This follows the ListItem format above with a label and value:
```js
{
    "name": "platform",
    "label": "Which hub?"
    "type": "ENUM",
    "values": [
        {label: "SmartThings", value: "smartthings" },
        {label: "Hubitat Elevation", value: "hubitat" },
    ]
}
```


### .showToast(message, [class])
Display a ‘toast’ message in the main SharpTools interface. Optionally, include a class like green or red to customize
the color of the toast.

#### message `<string>`
> "Hello world"

### class `<string>`
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