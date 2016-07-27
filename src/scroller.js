import _ from 'lodash';
import MathUtils from './utils/math_utils'
import 'gsap'
import {findChild, detectDrag, dispatchClicks} from './util'

const _ptHelper = new Phaser.Point()

const defaultOptions = {
  from : 0,
  to : 200,
  direction: 'y',
  momentum : false,
  snapping : false,
  bouncing : false,
  deceleration: .5, // value between 0 and 1
  overflow : 20,
  snapStep : 10,
  emitMoving : false,
  duration : 2, // (s) duration of the inertial scrolling simulation.
  speedLimit : 3, // set maximum speed. Higher values will allow faster scroll (which comes down to a bigger offset for the duration of the momentum scroll) note: touch motion determines actual speed, this is just a limit.
  flickTimeThreshold : 100, // (ms) determines if a flick occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger inertial scrolling
  offsetThreshold : 30, // (pixels) determines if calculated offset is above this threshold
  acceleration : 0.5, // increase the multiplier by this value, each time the user swipes again when still scrolling. The multiplier is used to multiply the offset. Set to 0 to disable.
  accelerationT : 250, // (ms) time between successive swipes that determines if the multiplier is increased (if lower than this value)
  maxAcceleration : 4,
  time : {}, // contains timestamps of the most recent down, up, and move events
  multiplier : 1, //acceleration multiplier, don't edit here
  swipeEnabled : false,
  swipeThreshold: 5, // (pixels) must move this many pixels for a swipe action
  swipeTimeThreshold: 250, // (ms) determines if a swipe occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger swipe
  minDuration: .5,
  addListeners: true
}

// Pure logic scroller
// Originally adapted from http://yusyuslabs.com/tutorial-momentum-scrolling-inside-scrollable-area-with-phaser-js/
//
export default class Scroller {
  constructor(game, clickObject, maskLimits = {}, options = {}){
    this.game        = game
    this.clickObject = clickObject

    this.maskLimits = maskLimits

    this.o = this.options = Object.assign( {}, defaultOptions, options)

    this._updateMinMax()

    this.dispatchValues = {step: 0, total: 0, percent: 0}

    this.addListeners()

    this.clickables = []

    this.scrollObject = {}

    this.init()

    // set tween that will be re-used for moving scrolling sprite
    this.tweenScroll = TweenMax.to(this.scrollObject, 0, {
      ease: Quart.easeOut,
      onUpdate: this.handleUpdate,
      onUpdateScope: this,
      onComplete: this.handleComplete,
      onCompleteScope: this
    })
  }

  addListeners() {

    this.events = {
      onUpdate    : new Phaser.Signal(),
      onInputUp   : new Phaser.Signal(),
      onInputDown : new Phaser.Signal(),
      onInputMove : new Phaser.Signal(),
      onComplete  : new Phaser.Signal(),
      onSwipe     : new Phaser.Signal()
    }

    if (this.o.addListeners) {
      this.clickObject.inputEnabled = true
      this.clickObject.events.onInputDown.add(this.handleDown, this)
      this.clickObject.events.onInputUp.add(this.handleUp, this)
    }
  }

  removeListeners() {
    if (this.o.addListeners) {
      this.clickObject.events.onInputDown.remove(this.handleDown, this)
      this.clickObject.events.onInputUp.remove(this.handleUp, this)
    }

    _.forIn(this.events, (signal, key)=> {
      signal.removeAll()
    })
  }

  enable() {
    this.enabled = true
  }

  disable() {
    this.enabled = false
  }

  init() {
    this.scrollObject[this.o.direction] = this.o.from
    this.maxOffset = this.maskLimits[this.o.direction] * this.o.speedLimit
    this.enable()
  }

  reset() {
    this.tweenScroll.pause()
    this.o.multiplier = 1
    this.init()
  }

  destroy() {
    this.removeListeners()
  }

  setFromTo(_from, _to) {
    this.o.from = _from
    this.o.to = _to
    this._updateMinMax()
  }

  isTweening() {
    return TweenMax.isTweening(this.scrollObject)
  }

  registerClickables(clickables) {
    this.clickables = clickables
  }

  handleDown(target, pointer) {
    if (!this.enabled) return
    this.isDown = true
    // console.log('input down', pointer.y)
    this.target = this.requested = this.scrollObject[this.o.direction]
    this.o.time.down = pointer.timeDown;

    if (this.o.addListeners) this.game.input.addMoveCallback(this.handleMove, this)

    //check if block is currently scrolling and set multiplier
    if (this.isTweening() && (this.o.time.down - this.o.time.up) < this.o.accelerationT) {
      //swipe while animation was happening, increase multiplier
      this.o.multiplier += this.o.acceleration;
      // console.log('swipe while animation is happening', this.o.multiplier)
    } else {
      //reset
      this.o.multiplier = 1;
    }

    //stop tween for touch-to-stop
    this.tweenScroll.pause()

    this.events.onInputDown.dispatch(target, pointer)
  }

  handleMove(pointer, x, y) {
    if (!this.enabled) return
    _ptHelper.set(x, y)
    this.diff = this.old - _ptHelper[this.o.direction]

    this.diff = this._requestDiff(this.diff, this.target, this.min, this.max, this.o.overflow)

    this.target -= this.diff

    this.old = _ptHelper[this.o.direction]

    //store timestamp for event
    this.o.time.move = this.game.time.time

    this.acc = Math.min(Math.abs(this.diff/30), this.o.maxAcceleration)

    //go ahead and move the block
    this.scrollObject[this.o.direction] = this.target
    this.handleUpdate()

    if (this.o.emitMoving) this.events.onInputMove.dispatch(pointer, x, y)
  }

  handleUp(target, pointer) {
    this.isDown = false
    // console.log('end')
    if (this.o.addListeners) this.game.input.deleteMoveCallback(this.handleMove, this)

    //store timestamp for event
    this.o.time.up = pointer.timeUp

    if (this.o.time.up - this.o.time.down > this.o.accelerationT) {
      this.o.multiplier = 1 // reset
    }

    var o = {
      duration: 1,
      target: this.target
    }

    // *** BOUNCING
    if (!this.o.bouncing) o.duration = .01

    if (this.scrollObject[this.o.direction] > this.max) {
      this.target = this.max
      this.tweenTo(o.duration, this.target)

    } else if (this.scrollObject[this.o.direction] < this.min) {
      this.target = this.min
      this.tweenTo(o.duration, this.target)

    } else {

      // *** MOMENTUM
      this._addMomentum(o)

      // *** SWIPING
      this._addSwiping(o, pointer)

      // *** SNAPPING
      this._addSnapping(o)

      // *** LIMITS
      this._addLimits(o)

      // *** DURATION
      this._calculateDuration(o)

      this.tweenTo(o.duration, o.target)
    }

    dispatchClicks(pointer, this.clickables, 'onInputUp')
    this.events.onInputUp.dispatch(target, pointer, dispatchClicks)

  }

  _addMomentum(o) {
    if (!this.o.momentum) return o.target

    //distance to move after release
    let offset = Math.pow(this.acc, 2) * this.maskLimits[this.o.direction]
    offset = Math.min(this.maxOffset, offset)
    offset = (this.diff > 0) ? -this.o.multiplier * offset : this.o.multiplier * offset

    if ((this.o.time.up - this.o.time.move < this.o.flickTimeThreshold) && offset !== 0 && Math.abs(offset) > (this.o.offsetThreshold)) {
      o.target += offset
    }
    return o
  }

  _addSwiping(o, pointer) {
    let swipeDistance = Math.abs(this.down - this.current)
    if (this.o.swipeEnabled && this.o.time.up - this.o.time.down < this.o.swipeTimeThreshold && swipeDistance > this.o.swipeThreshold) {
      let direction = (pointer[this.o.direction] < this.down) ? 'forward' : 'backward'

      if (direction == 'forward') {
        o.target -= this.o.snapStep/2
      } else {
        o.target += this.o.snapStep/2
      }

      this.events.onSwipe.dispatch(direction)
    }
    return o
  }

  _addSnapping(o) {
    if (!this.o.snapping) {
      return o
    }
    o.target = MathUtils.nearestMultiple(o.target, this.o.snapStep)
    return o
  }

  _addLimits(o) {
    if (this.o.infinite) return o
    o.target = Math.max(o.target, this.min)
    o.target = Math.min(o.target, this.max)
    return o
  }

  _calculateDuration(o) {
    let distance = Math.abs(o.target - this.scrollObject[this.o.direction])
    o.duration = this.o.duration * distance / this.maxOffset
    o.duration = Math.max(this.o.minDuration, o.duration)
    return o
  }

  _requestDiff(diff, target, min, max, overflow) {
    if (this.o.infinite) return diff

    let scale = 0
    if (target > max) {
      scale = (max+overflow-target) / overflow
      diff *= scale
    } else if (target < min) {
      scale = -(min-overflow-target) / overflow
      diff *= scale
    }
    return diff
  }

  tweenToSnap(duration, snapIndex) {
    let target = this.o.from - (this.o.snapStep * snapIndex)
    this.tweenTo(duration, target)
  }

  /**
   * [tweenTo tween to scroller to the target]
   * @param  {Number} duration duration in seconds
   * @param  {Number} target   target relative to the scroller space (usually pixels, but can be angle)
   */
  tweenTo(duration, target) {
    if (duration == 0) return this.setTo(target)

    //stop a tween if it is currently happening
    let o = {}
    o[this.o.direction] = target

    // this.tweenScroll.pause()
    this.tweenScroll.duration(duration)
    this.tweenScroll.updateTo(o, true)
    this.tweenScroll.restart()
  }

  /**
   * [setTo sets the scroller to the target]
   * @param  {Number} target   target relative to the scroller space (usually pixels, but can be angle)
   */
  setTo(target) {
    //stop a tween if it is currently happening
    let o = {}
    o[this.o.direction] = target

    this.tweenScroll.duration(0)
    this.tweenScroll.updateTo(o, true)
    this.tweenScroll.restart()
    this.handleUpdate()
    this.handleComplete()
  }

  handleUpdate() {
    if (!this.enabled) return

    if (this.o.infinite) {
      this.dispatchValues.total = Phaser.Math.wrap(this.scrollObject[this.o.direction], this.min, this.max)
    } else {
      this.dispatchValues.total = this.scrollObject[this.o.direction]
    }

    let step = this.dispatchValues.total - this.previousTotal
    if (step < -this.length/2) {
      step = step + this.length
    } else if (step > this.length/2) {
      step = step - this.length
    }

    this.dispatchValues.step = step
    this.dispatchValues.percent = MathUtils.percentageBetween2(this.dispatchValues.total, this.o.from, this.o.to)
    this.events.onUpdate.dispatch(this.dispatchValues)

    this.previousTotal = this.dispatchValues.total
  }

  handleComplete() {
    if (!this.enabled) return
    // reset multiplier when finished
    this.o.multiplier = 1
    this.events.onComplete.dispatch()
  }

  _updateMinMax() {
    this.min = Math.min(this.o.from, this.o.to)
    this.max = Math.max(this.o.from, this.o.to)
    this.length = Math.abs(this.max - this.min)
    this.previousTotal = this.o.from
  }
}
