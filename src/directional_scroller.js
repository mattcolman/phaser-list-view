import MathUtils from './utils/math_utils'
import Scroller from './scroller'

export default class DirectionalScroller extends Scroller {
  constructor(game, clickObject, options = {}){
    super(game, clickObject, {x: clickObject.width, y: clickObject.height}, options)
  }

  handleDown(target, pointer) {
    this.old = this.down = pointer[this.o.direction]
    super.handleDown(target, pointer)
  }

  handleUp(target, pointer) {
    this.current = pointer[this.o.direction]
    super.handleUp(target, pointer)
  }

}
