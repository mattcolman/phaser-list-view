import _ from 'lodash';
import MathUtils from './utils/math_utils'
import 'gsap'
import Scroller from './scroller'

var {radToDeg, degToRad} = Phaser.Math

// Pure logic scroller
// Originally adapted from http://yusyuslabs.com/tutorial-momentum-scrolling-inside-scrollable-area-with-phaser-js/
//
var WheelScroller = function(game, clickObject, options = {}) {
  options.direction = 'angle'
  this.maskLimits = {angle: clickObject.width/2}
  Scroller.call(this, game, clickObject, options)
}

WheelScroller.prototype = Object.assign( Object.create(Scroller.prototype), {

  handleDown(target, pointer) {
    let pt = new Phaser.Point(pointer.x, pointer.y)
    this.centerPoint = this.clickObject.toGlobal(new Phaser.Point(0, 0))
    this.old = this.down = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(pt, this.centerPoint))
    this.fullDiffAngle = 0

    Scroller.prototype.handleDown.call(this, target, pointer)
  },

  handleMove(pointer, x, y) {
    let pt = new Phaser.Point(x, y)
    var currentRotation = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(pt, this.centerPoint))
    // console.log('currentRotation is', radToDeg(currentRotation))
    var rotations = 0

    this.diffRotation = this.old - currentRotation
    this.diffAngle = radToDeg(this.diffRotation)

    // console.log('currentAngle', Phaser.Math.radToDeg(currentAngle))
    if (this.diffAngle > 180) {
      rotations = 1
    } else if (this.diffAngle < -180) {
      rotations = -1
    }

    if (rotations != 0) {
      let fullCircle = rotations * degToRad(360)
      // console.log('rotations', radToDeg(currentRotation), radToDeg(this.diffRotation), rotations)
      // currentRotation += fullCircle
      this.diffRotation -= fullCircle
      this.diffAngle = radToDeg(this.diffRotation)
    }

    // this.diff = this.old - currentRotation
    this.diff = this.requestDiff(this.diffAngle, this.target, this.min, this.max, this.o.overflow)
    // console.log('currentRotation', radToDeg(currentRotation))

    this.target -= this.diff

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
    let pt = new Phaser.Point(pointer.x, pointer.y)
    this.current = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(pt, this.centerPoint))
    Scroller.prototype.handleUp.call(this, target, pointer)
  }

})

WheelScroller.prototype.constructor = WheelScroller

export default WheelScroller
