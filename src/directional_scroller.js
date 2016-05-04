import _ from 'lodash';
import MathUtils from './utils/math_utils'
import Scroller from './scroller'

var DirectionalScroller = function(game, clickObject, options = {}) {
  this.maskLimits = {x: clickObject.width, y: clickObject.height}
  Scroller.call(this, game, clickObject, options)
}

DirectionalScroller.prototype = Object.assign( Object.create(Scroller.prototype), {

  handleDown(target, pointer) {
    this.old = this.down = pointer[this.o.direction]
    Scroller.prototype.handleDown.call(this, target, pointer)
  },

  handleUp(target, pointer) {
    this.current = pointer[this.o.direction]
    Scroller.prototype.handleUp.call(this, target, pointer)
  }

})

DirectionalScroller.prototype.constructor = DirectionalScroller

export default DirectionalScroller
