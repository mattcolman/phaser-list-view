import _ from 'lodash';
import ListViewCore from './list_view_core'

var Swiper = function(game, parent, bounds, options = {}) {

  this.defaultOptions = {
    direction: 'x',
    autocull: true,
    momentum: false,
    bouncing: true,
    snapping: true,
    overflow: 100,
    padding: 10,
    swipeEnabled: true
  }

  ListViewCore.call(this, game, parent, bounds, options)

  this.scroller.options.snapStep = bounds.width + this.o.padding
}

Swiper.prototype = Object.assign(Object.create(ListViewCore.prototype))
Swiper.prototype.constructor = Swiper

export default Swiper;
