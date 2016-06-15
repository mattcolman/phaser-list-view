import _ from 'lodash';
import MathUtils from './utils/math_utils'
import Scroller from './scroller'

var {radToDeg, degToRad} = Phaser.Math
var _ptHelper = new Phaser.Point()

var WheelScroller = function(game, clickObject, options = {}) {
  let defaultOptions = {
    direction: 'angle',
    infinite: false,
    speedLimit: 1.5
  }
  this.maskLimits = {angle: clickObject.width/2}
  Scroller.call(this, game, clickObject, _.extend(defaultOptions, options))
}

WheelScroller.prototype = Object.assign( Object.create(Scroller.prototype), {

  handleDown(target, pointer) {
    if (!this.enabled) return
    this.centerPoint = this.clickObject.toGlobal(new Phaser.Point(0, 0))
    _ptHelper.set(pointer.x, pointer.y)
    this.old = this.down = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint))
    this.fullDiff = 0

    Scroller.prototype.handleDown.call(this, target, pointer)
  },

  handleMove(pointer, x, y) {
    if (!this.enabled) return
    _ptHelper.set(x, y)
    let currentRotation = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint))
    let rotations = 0

    let diffRotation = this.old - currentRotation
    this.diff = radToDeg(diffRotation)

    if (this.diff > 180) {
      rotations = 1
    } else if (this.diff < -180) {
      rotations = -1
    }

    if (rotations != 0) {
      let fullCircle = rotations * degToRad(360)
      diffRotation -= fullCircle
      this.diff = radToDeg(diffRotation)
    }

    this.diff = this._requestDiff(this.diff, this.target, this.min, this.max, this.o.overflow)

    this.fullDiff -= this.diff

    this.target -= this.diff

    if (this.o.infinite) {
      this.target = this._wrapTarget(this.target, this.min, this.max)
    }

    this.old = currentRotation

    //store timestamp for event
    this.o.time.move = this.game.time.time

    let diameter = this.clickObject.width
    let circumference = Math.PI * diameter
    let sectorLength = circumference * (this.diff / 360)
    this.acc = Math.min(Math.abs(sectorLength/30), this.o.maxAcceleration)

    //go ahead and move the block
    this.scrollObject[this.o.direction] = this.target
    this.handleUpdate()

    if (this.o.emitMoving) this.events.onInputMove.dispatch({pointer, x, y})

  },

  handleUp(target, pointer) {
    _ptHelper.set(pointer.x, pointer.y)
    this.current = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint))

    Scroller.prototype.handleUp.call(this, target, pointer)
  },

  _wrapTarget(target, min, max) {
    let diff = 0
    if (target > max) {
      diff = target - max
      target = min + diff
    } else if (target < min) {
      diff = min - target
      target = max - diff
    }
    return target
  },

})

WheelScroller.prototype.constructor = WheelScroller

export default WheelScroller
