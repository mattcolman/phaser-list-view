import _ from 'lodash';
import DirectionalScroller from './directional_scroller'

class ListViewCore {

  constructor(game, parent, bounds, options = {}) {
    this.game = game
    this.parent = parent
    this.bounds = bounds

    this.o = this.options = _.extend(this.defaultOptions, options)

    if (this.o.direction == 'y') {
      this.p = {xy: 'y', wh: 'height'}
    } else {
      this.p = {xy: 'x', wh: 'width'}
    }

    this.grp = this.game.add.group(parent)
    this.grp.position.set(bounds.x, bounds.y)

    this.currentPosition = 0

    // [MC] - is masking the fastest option here? Cropping the texture may be faster?
    this.grp.mask = this._addMask(bounds)

    // we have to use a new mask instance for the click object or webgl ignores the mask
    this.scroller = new DirectionalScroller(this.game, this._addMask(bounds), _.extend({
      from: 0,
      to: 0
    }, this.options))
    this.scroller.events.onUpdate.add((o)=> {
      this.update(o.total)
    })
  }

  add(child) {
    let xy = 0
    if (this.grp.children.length > 0) {
      let lastChild = this.grp.getChildAt(this.grp.children.length-1)
      xy = lastChild[this.p.xy] + lastChild[this.p.wh] + this.o.padding
    }
    child[this.p.xy] = xy
    this.grp.addChild(child)

    this.scroller.setFromTo(0, -this.grp[this.p.wh] + this.bounds[this.p.wh])
    this.update(this.currentPosition)
    if (this.o.autocull) this.cull()
  }

  addMultiple(...children) {
    children.forEach(this.add, this)
  }

  remove() {
    // TODO
  }

  destroy() {
    // TODO
  }

  update(currentPosition) {
    this.currentPosition = currentPosition
    this.grp[this.p.xy] = this.bounds[this.p.xy] + currentPosition
    if (this.o.autocull) this.cull()
  }

  cull() {
    for (var i = 0; i < this.grp.children.length; i++) {
      let child = this.grp.children[i]
      child.visible = true
      if (child[this.p.xy] + child[this.p.wh] + this.grp[this.p.xy] < this.bounds[this.p.xy]) {
        child.visible = false
      } else if (child[this.p.xy] + this.grp[this.p.xy] > this.bounds[this.p.xy] + this.bounds[this.p.wh]) {
        child.visible = false
      }
    }
  }

  _addMask(bounds) {
    let mask = this.game.add.graphics()
    mask.beginFill(0xff0000)
        .drawRect(bounds.x, bounds.y, bounds.width, bounds.height)
    mask.alpha = 0
    return mask
  }

}

export default ListViewCore;
