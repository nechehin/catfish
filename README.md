# Catfish
Simple bottom fixed catfish with close button, set own image and click link.
Support multiple image size for responsive support

## How to use (simple example)
 
Add code before close body tag:
 
```html
<script>
   (function(w,c){
      w[c] = function(catfish){
          catfish
              .link('https://github.com/nechehin/simple-catfish')
              .addImage('https://dummyimage.com/300x100/000/fff.png', 300, 100)
              .render();
      }
   })(window, 'simple-catfish');
</script>
<!-- Load simple-catfish script from CDN -->
<script async='async' src="https://cdn.jsdelivr.net/gh/nechehin/simple-catfish@latest/catfish.min.js"></script>
```

Required methods:
- link({String} link, {Boolean} newTab = false) - set click link
- addImage({String} source, {Number} width, {Number} height) - Add image source and size
   
## Advanced configuration
   
### Multiple image sizes
You can add mutliple sizes images. Catfish determine the most optimal image by width.

```js
catfish
    .link('https://github.com/nechehin/simple-catfish')
    .backgroundColor('#fff')
    .addImage('https://dummyimage.com/300x100/000/fff.png', 300, 100)
    .addImage('https://dummyimage.com/350x100/000/fff.png', 350, 100)
    .addImage('https://dummyimage.com/350x100/000/fff.png', 480, 150)
    .render();
```

### Open link in new tab

"link" method has second argument - openInNewTab. Default is false

```js
catfish
    .link('https://github.com/nechehin/simple-catfish', true)
    .addImage('https://dummyimage.com/300x100/000/fff.png', 300, 100)
    .render();
```


### Autoclose timeout

Catfish will be closed after 5s

```js
catfish
    .link('https://github.com/nechehin/simple-catfish')
    .autoCloseTimeout(5000)
    .addImage('https://dummyimage.com/300x100/000/fff.png', 300, 100)
    .render();
```

### Background color

Set white background

```js
catfish
    .link('https://github.com/nechehin/simple-catfish')
    .backgroundColor('#fff')
    .addImage('https://dummyimage.com/300x100/000/fff.png', 300, 100)
    .render();
```

### z-index

Set catfish z-index

```js
catfish
    .link('https://github.com/nechehin/simple-catfish')
    .zIndex('999')
    .addImage('https://dummyimage.com/300x100/000/fff.png', 300, 100)
    .render();
```

### Close button config

use next methods for close button configuration:

#### Position
- closeButtonPosition({Object} position)

#### Size
- closeButtonSize({String} size)

#### Defaults

```js
catfish.closeButtonPosition({ top: '-15px', right: '5px' });
catfish.closeButtonSize('25px');
```

#### Example
Show close button on left side:
```js
catfish
    .link('https://github.com/nechehin/simple-catfish')
    .addImage('https://dummyimage.com/300x100/000/fff.png', 300, 100)
    .closeButtonPosition({ top: '-15px', left: '5px' })
    .render();
```

### Events
Available events for listen:
- rendered (catfish.EVENTS.RENDERED) - fire after ads was rendered
- closed (catfish.EVENTS.CLOSED) - fire after ads was closed

```js
catfish
    .link('https://github.com/nechehin/simple-catfish')
    .addImage('https://dummyimage.com/300x100/000/fff.png', 300, 100)
    .addEventListener(catfish.EVENTS.RENDERED, function(){ 
        console.log('event: ads rendered'); 
    })
    .render();
```

### Enable debug log

```js
catfish
    .debug(true)
    .link('https://github.com/nechehin/simple-catfish')
    .addImage('https://dummyimage.com/300x100/000/fff.png', 300, 100)
    .render();
```

also, you can enable debug by ?simple-catfish-debug query param

### Full example

```html
<script>
(function(w,c){
     w[c] = function(catfish){
         catfish
             .debug(true)
             .link('https://github.com/nechehin/simple-catfish')
             .autoCloseTimeout(5000)
             .backgroundColor('#fff')
             .zIndex('999')
             .addImage('https://dummyimage.com/300x100/000/fff.png', 300, 100)
             .addImage('https://dummyimage.com/350x100/000/fff.png', 350, 100)
             .addImage('https://dummyimage.com/400x150/000/fff.png', 400, 150)
             .render();
     }
})(window, 'simple-catfish');
</script>   
<script async='async' src="https://cdn.jsdelivr.net/gh/nechehin/simple-catfish@latest/catfish.min.js"></script>
```  
