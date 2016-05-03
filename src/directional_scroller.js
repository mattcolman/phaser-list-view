import _ from 'lodash';
import MathUtils from './utils/math_utils'
import 'gsap'
import Scroller from './scroller'

// Pure logic scroller
// Originally adapted from http://yusyuslabs.com/tutorial-momentum-scrolling-inside-scrollable-area-with-phaser-js/
//
var DirectionalScroller = function(game, clickObject, options = {}) {
  Scroller.call(this, game, clickObject, options)
}

DirectionalScroller.prototype = Object.assign( Object.create(Scroller.prototype), {

  handleDown(target, pointer) {
    this.old = this.down = pointer[this.o.direction]
    Scroller.prototype.handleDown.call(this, target, pointer)
  }

})

DirectionalScroller.prototype.constructor = DirectionalScroller

export default DirectionalScroller
