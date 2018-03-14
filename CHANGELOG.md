# Change Log

## Version 1.5.2 - 15th Mar 2018

* Bug fix
* Update docs

## Version 1.5.1 - 15th Mar 2018

* Bring back `setPosition` as we didn't bump a major version. So deprecated it instead.

## Version 1.5.0 - 15th Mar 2018

* Add `moveToPosition` and `moveToItem` to ListViewCore
* Remove `setPosition` from ListViewCore

## Version 1.4.1 - 14th Mar 2018

* Add `tweenToPosition` and `tweenToItem` to ListViewCore
* Improved API docs

## Version 1.4.0 - 15th Dec 2017

* Removed lodash and gsap dependencies reducing the build from 1.3mb to 363kb (not minified) Thanks @lukz

## Version 1.3.1 - 29th July 2017

### Bug Fixes

* Fixed npm imports
* allow onInputDown events to fire for ListView children

## Version 1.3.0 - 12th Jan 2017

### Bug Fixes

* Fixed SwipeCarousel, it was completely broken.
  ### New Features
* Allow for install via script tag
* Add a demo

## Version 1.2.0 - 26th July 2016

### Bug Fixes

### New Features

* Changed to a more es6y style of coding, mainly using classes.
* ListView now includes a 'searchForClicks' flag, which will search for onInputDown and onInputUp events on ListView items and their children when you click.

## Version 1.1.0 - 25th July 2016

### Bug Fixes

### New Features

* Add a registerClickables method on Scroller. This allows for click events on scroller objects to be respected.
