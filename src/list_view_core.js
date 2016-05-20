import _ from 'lodash';

class ListViewCore {

  constructor(game, parent, bounds, options = {}) {
    this.game = game
    this.parent = parent
    this.bounds = bounds

    this.o = this.options = _.extend(this.defaultOptions, options)

    this.items = []

    if (this.o.direction == 'y') {
      this.p = {xy: 'y', wh: 'height'}
    } else {
      this.p = {xy: 'x', wh: 'width'}
    }

    this.grp = this.game.add.group(parent)
    this.grp.position.set(bounds.x, bounds.y)

    this.events = {
      onAdded: new Phaser.Signal()
    }

    this.position = 0

    // [MC] - is masking the fastest option here? Cropping the texture may be faster?
    this.grp.mask = this._addMask(bounds)
  }

  /**
   * [add a child to the list]
   * @param {DisplayObject} child
   */
  add(child) {
    this.items.push(child)
    let xy = 0
    if (this.grp.children.length > 0) {
      let lastChild = this.grp.getChildAt(this.grp.children.length-1)
      xy = lastChild[this.p.xy] + lastChild[this.p.wh] + this.o.padding
    }
    child[this.p.xy] = xy
    this.grp.addChild(child)
    this.length = this.grp[this.p.wh]

    this.setPosition(this.position)
    this.events.onAdded.dispatch(this.length - this.bounds[this.p.wh])
  }

  /**
   * [addMultiple children to the list]
   * @param {...[DisplayObjects]} children
   */
  addMultiple(...children) {
    children.forEach(this.add, this)
  }

  remove() {
    // TODO
  }

  destroy() {
    // TODO
  }

  /**
   * [cull - culls the off-screen list elements]
   * mainly called internally with the autoCull property
   */
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

  /**
   * [setPosition - set position of the top of the list view. Either the x or y value,
   *                depending on what you set the direction to]
   * @param {Number} position
   */
  setPosition(position) {
    this.position = position
    this.grp[this.p.xy] = this.bounds[this.p.xy] + position
    if (this.o.autocull) this.cull()
  }

  /**
   * @private
   */
  _addMask(bounds) {
    let mask = this.game.add.graphics()
    mask.beginFill(0xff0000)
        .drawRect(bounds.x, bounds.y, bounds.width, bounds.height)
    mask.alpha = 0
    return mask
  }

}

ListViewCore.prototype.defaultOptions = {
  direction: 'y',
  autocull: true,
  padding: 10
}

export default ListViewCore;
