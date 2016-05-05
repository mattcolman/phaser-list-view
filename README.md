# List View classes for Phaser

## Install
`npm install phaser-list-view --save`
https://www.npmjs.com/package/phaser-list-view

## API
- **Scroller** : A pure logic scroller. Includes iOS-like behaviour such as momentum, bounce-back and snapping. Most likely you would use DirectionalScroller or WheelScroller over this base Scroller. But if you have custom needs you can use it.
- **DirectionalScroller** : A pure logic scroller built for scrolling on the x and y axis. Extends the base Scroller class.
- **WheelScroller** : A pure logic scroller built for scrolling around a circle. Extends the base Scroller class. 
- **ListView** : An iOS-like ListView class. Uses DirectionalScroller for the input and outputs a ListView. Performance is good because we cull off-screen items.
Perfect for high scoreboards.
- **SwipeCarousel** : An iOS-like SwipeCarousel. Uses DirectionalScroller for the input and outputs a SwipeCarousel. Perfect for instructions screens, or a photo gallery.

- 
## ListView Usage
```
import {ListView} from 'phaser-list-view'

let parent = this.world
let bounds = new Phaser.Rectangle(0, 0, 300, 400)
let options = {
  direction: 'y',
  overflow: 100,
  padding: 10
}

let listView = new ListView(this.game, parent, bounds, options)
let items = this.createSomeDisplayObjectsAndReturnAnArray() // [Graphics, Image, Sprite]
listView.addMultiple(...items)
```
![](http://i.imgur.com/XgdgqYX.gif)

## SwipeCarousel Usage
```
import {SwipeCarousel} from 'phaser-list-view'

let parent = this.world
let bounds = new Phaser.Rectangle(0, 0, 300, 400)
let options = {
  direction: 'x',
  overflow: 100,
  padding: 10
}

let swipeCarousel = new SwipeCarousel(this.game, parent, bounds, options)
let photos = this.getAnArrayOfImages() // [Image, Image, Image, Image]
swipeCarousel.addMultiple(...photos)
```
![](http://i.imgur.com/Sp5aE0H.gif)

## DirectionalScroller Usage
// TODO
## WheelScroller Usage
// TODO

## Build
`npm run compile`

## Examples
- https://github.com/mattcolman/phaser-experiments
- http://www.mattcolman.com/labs/phaser-experiments/index.html

## TODO
- remove gsap dependancy and use Phaser.Tween instead
- remove lodash dependancy
- Mouse wheel support
