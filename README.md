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

* **Scroller** : A pure logic scroller. Includes iOS-like behaviour such as momentum, bounce-back and snapping. Most likely you would use DirectionalScroller or WheelScroller over this base Scroller. But if you have custom needs you can use it.
* **DirectionalScroller** : A pure logic scroller built for scrolling on the x and y axis. Extends the base Scroller class.
* **WheelScroller** : A pure logic scroller built for scrolling around a circle. Extends the base Scroller class.
* **ListView** : An iOS-like ListView class. Uses DirectionalScroller for the input and outputs a ListView. Performance is good because we cull off-screen items.
  Perfect for high scoreboards.
* **SwipeCarousel** : An iOS-like SwipeCarousel. Uses DirectionalScroller for the input and outputs a SwipeCarousel. Perfect for instructions screens, or a photo gallery.

## ListView

### Usage

```
import {ListView} from 'phaser-list-view'

const parent = this.world
const bounds = new Phaser.Rectangle(0, 0, 300, 400)
const options = {
  direction: 'y',
  overflow: 100,
  padding: 10
}

const listView = new ListView(this.game, parent, bounds, options)
const items = this.createSomeDisplayObjectsAndReturnAnArray() // [Graphics, Image, Sprite, Group]
listView.addMultiple(...items)
const newItem = this.createGroup();
newItem.nominalHeight = 120; // listView calculates items width and height. You can set your own width or height to save calculating it using nominalWidth or nominalHeight (note this is mainly useful for Phaser.Groups)
listView.add(newItem)
```

![](http://i.imgur.com/XgdgqYX.gif)

### Options

* `direction` direction of scroll ['x' | 'y'] // default 'y'
* `autocull` auto hidden elements outside of the viewport for performance [boolean] // default true
* `momentum` [boolean] // default true
* `bouncing` when you extend beyond the bounds and release, it bounces back [boolean] // default true
* `snapping` snaps to snapStep [boolean] // default false
* `snapStep` [number] // default undefined
* `overflow`: Amount in pixels you can pull past the bounds. Bouncing occurs when you release inside the overflow [number] // default 100
* `padding`: Padding between the children [number] // default 10
* `searchForClicks`: onInputDown and onInputUp events on ListView children will become active when set to true [boolean] // default false

### API

| Members    | Type                 | Description                                                           |
| :--------- | :------------------- | :-------------------------------------------------------------------- |
| `items`    | Array<DisplayObject> | A list of all the listView items                                      |
| `grp`      | Phaser.Group         | The parent of all list view items                                     |
| `position` | number (READONLY)    | position in pixels (x or y axis depends on the direction you specify) |
| `scroller` | Scroller             | access the Scroller for advanced tuning (Scroller API below)          |

| Methods           | Params                                         | Description                                                                                       |
| :---------------- | :--------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `add`             | (child: DisplayObject): void                   | add a child to the list view                                                                      |
| `addMultiple`     | (...children: DisplayObjects): void            | add multiple children to the list view. Pass through multiple arguments, not an array of children |
| `remove`          | (child: DisplayObject): void                   | remove a child                                                                                    |
| `removeAll`       | (): void                                       | remove all children from the list view                                                            |
| `moveToPosition`  | (position: number): void                       | set position of the list view in pixels                                                           |
| `moveToItem`      | (index: number): void                          | move to the item index in the list view.                                                          |
| `tweenToPosition` | (position: number, duration = 1: number): void | tween to position in pixels. Duration in seconds.                                                 |
| `tweenToItem`     | (index: number, duration = 1: number): void    | tween to the item index in the list view. Duration in seconds.                                    |
| `reset`           | (): void                                       | resets the position and scroller                                                                  |
| `destroy`         | (): void                                       | destroy the list view and clean up all event listeners                                            |

## SwipeCarousel (extends ListView)

### Usage

```
import {SwipeCarousel} from 'phaser-list-view'

const parent = this.world
const bounds = new Phaser.Rectangle(0, 0, 300, 400)
const options = {
  direction: 'x',
  overflow: 100,
  padding: 10
}

const swipeCarousel = new SwipeCarousel(this.game, parent, bounds, options)
const photos = this.getAnArrayOfImages() // [Image, Image, Image, Image]
swipeCarousel.addMultiple(...photos)
```

![](http://i.imgur.com/Sp5aE0H.gif)

### Options

* `direction` direction of scroll ['x' | 'y'] // default 'x'
* `autocull` auto hidden elements outside of the viewport for performance [boolean] // default true
* `momentum` [boolean] // default false
* `bouncing` when you extend beyond the bounds and release, it bounces back [boolean] // default true
* `snapping` snaps to bounds.width + padding [boolean] // default true
* `overflow`: Amount in pixels you can pull past the bounds. Bouncing occurs when you release inside the overflow [number] // default 100
* `padding`: Padding between the children [number] // default 10
* `searchForClicks`: onInputDown and onInputUp events on ListView children will become active when set to true [boolean] // default false

### API

The same as ListView above.

## Scroller API (access via listView.scroller)

| Members    | Type              | Description                                                           |
| :--------- | :---------------- | :-------------------------------------------------------------------- |
| `grp`      | Phaser.Group      | The parent of all list view items                                     |
| `position` | number (READONLY) | position in pixels (x or y axis depends on the direction you specify) |
| `scroller` | Scroller          | access the Scroller for advanced tuning                               |

| Methods      | Params: Return | Description               |
| :----------- | :------------- | :------------------------ |
| `enable`     | (): void       | Enables the scroller      |
| `disable`    | (): void       | Disables the scroller     |
| `isTweening` | (): boolean    | Is the scroller tweening? |

| Events (Phaser.Signals) |
| :---------------------- |
| `onUpdate`              |
| `onInputUp`             |
| `onInputDown`           |
| `onInputMove`           |
| `onComplete`            |
| `onSwipe`               |

## DirectionalScroller Usage

// TODO

## WheelScroller Usage

// TODO

## Build

`npm run compile`

## Example

http://mattcolman.com/labs/phaser-list-view/index.html

## TODO

* Mouse wheel support

## Maintainers

[Matt Colman](https://twitter.com/matt_colman)
