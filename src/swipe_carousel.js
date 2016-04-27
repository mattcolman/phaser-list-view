import _ from 'lodash';
import ListViewCore from './list_view_core'

var SwipeCarousel = function(game, parent, bounds, options = {}) {

  this.defaultOptions = {
    direction: 'x',
    autocull: true,
    momentum: false,
    bouncing: true,
    snapping: true,
    overflow: 100,
    padding: 10,
    swipeEnabled: true,
    offset: {
      x: 100
    }
  }

  ListViewCore.call(this, game, parent, bounds, options)

  this.scroller.options.snapStep = bounds.width + this.o.padding
}

SwipeCarousel.prototype = Object.assign(Object.create(ListViewCore.prototype))
SwipeCarousel.prototype.constructor = SwipeCarousel

export default SwipeCarousel;
