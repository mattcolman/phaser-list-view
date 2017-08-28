# List View classes for Phaser

## Install via npm
`npm install phaser-list-view --save`
https://www.npmjs.com/package/phaser-list-view

## Install via script tag
Copy dist/phaser-list-view.js into your project and include via script tag

## Build
`npm run build`

## Run demo
`npm i`

`npm start`

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

## ListView Options
- `direction` direction of scroll  ['x' | 'y'] // default 'y'
- `autocull` auto hidden elements outside of the viewport for performance [boolean] // default true
- `momentum` [boolean] // default true
- `bouncing` when you extend beyond the bounds and release, it bounces back [boolean] // default true
- `snapping` snaps to snapStep [boolean] // default false
- `snapStep` [number] // default undefined
- `overflow`: Amount in pixels you can pull past the bounds. Bouncing occurs when you release inside the overflow [number] // default 100
- `padding`: Padding between the children [number] // default 10
- `searchForClicks`: onInputDown and onInputUp events on ListView children will become active when set to true [boolean] // default false

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

## SwipeCarousel Options
- `direction` direction of scroll  ['x' | 'y'] // default 'x'
- `autocull` auto hidden elements outside of the viewport for performance [boolean] // default true
- `momentum` [boolean] // default false
- `bouncing` when you extend beyond the bounds and release, it bounces back [boolean] // default true
- `snapping` snaps to bounds.width + padding [boolean] // default true
- `overflow`: Amount in pixels you can pull past the bounds. Bouncing occurs when you release inside the overflow [number] // default 100
- `padding`: Padding between the children [number] // default 10
- `searchForClicks`: onInputDown and onInputUp events on ListView children will become active when set to true [boolean] // default false

## DirectionalScroller Usage
// TODO
## WheelScroller Usage
// TODO

## Build
`npm run compile`

## Example
http://mattcolman.com/labs/phaser-list-view/index.html

## TODO
- remove gsap dependancy and use Phaser.Tween instead
- Mouse wheel support

## Maintainers
[Matt Colman](https://twitter.com/matt_colman)
