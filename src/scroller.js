import _ from 'lodash';
import MathUtils from './utils/math_utils'
import 'gsap'

var _ptHelper = new Phaser.Point()

// Pure logic scroller
// Originally adapted from http://yusyuslabs.com/tutorial-momentum-scrolling-inside-scrollable-area-with-phaser-js/
//
var Scroller = function(game, clickObject, options = {}) {

  this.game        = game
  this.clickObject = clickObject

  let defaultOptions = {
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
    autoDetectThreshold: 6
  }

  this.o = this.options = _.extend(defaultOptions, options)

  this._updateMinMax()

  this.dispatchValues = {step: 0, total: 0, percent: 0}

  this.addListeners()

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

Scroller.prototype = Object.create({

  addListeners() {

    this.events = {
      onUpdate    : new Phaser.Signal(),
      onInputUp   : new Phaser.Signal(),
      onInputDown : new Phaser.Signal(),
      onInputMove : new Phaser.Signal(),
      onComplete  : new Phaser.Signal(),
      onSwipe     : new Phaser.Signal()
    }

    this.clickObject.inputEnabled = true
    this.clickObject.events.onInputDown.add(this.handleDown, this)
    this.clickObject.events.onInputUp.add(this.handleUp, this)
  },

  removeListeners() {
    this.clickObject.events.onInputDown.remove(this.handleDown, this)
    this.clickObject.events.onInputUp.remove(this.handleUp, this)

    _.forIn(this.events, (signal, key)=> {
      signal.removeAll()
    })
  },

  init() {
    if (this.o.direction == 'auto') {
      this.scrollObject.x = this.o.from
      this.scrollObject.y = this.o.from
    } else {
      this.scrollObject[this.o.direction] = this.o.from
    }
  },

  destroy() {
    this.removeListeners()
  },

  setFromTo(_from, _to) {
    this.o.from = _from
    this.o.to = _to
    this._updateMinMax()
  },

  isTweening() {
    return TweenMax.isTweening(this.scrollObject)
  },

  setDirection( direction ) {
    this.direction = direction
    this.maxOffset = this.maskLimits[this.direction] * this.o.speedLimit
  },

  handleDown(target, pointer) {
    if (!this.direction && this.o.direction == 'auto') {
      this.autoX = pointer.x
      this.autoY = pointer.y
      return
    } else {
      this.setDirection( this.o.direction )
    }

    this.isDown = true
    // console.log('input down', pointer.y)
    this.target = this.requested = this.scrollObject[this.direction]
    this.o.time.down = pointer.timeDown;

    this.game.input.addMoveCallback(this.handleMove, this)

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
  },

  handleMove(pointer, x, y) {
    if (!this.direction && this.o.direction == 'auto') {
      if (Math.abs(this.autoX - x) > this.o.autoDetectThreshold) {
        this.setDirection('x')
      } else if (Math.abs(this.autoY - y) > this.o.autoDetectThreshold) {
        this.setDirection('y')
      } else {
        return
      }
    }

    _ptHelper.set(x, y)
    this.diff = this.old - _ptHelper[this.direction]

    this.diff = this._requestDiff(this.diff, this.target, this.min, this.max, this.o.overflow)

    this.target -= this.diff

    this.old = _ptHelper[this.direction]

    //store timestamp for event
    this.o.time.move = this.game.time.time

    this.acc = Math.min(Math.abs(this.diff/30), this.o.maxAcceleration)

    //go ahead and move the block
    this.scrollObject[this.direction] = this.target
    this.handleUpdate()

    if (this.o.emitMoving) this.events.onInputMove.dispatch(pointer, x, y)
  },

  handleUp(target, pointer) {
    if (!this.direction && this.o.direction == 'auto') {
      return
    }

    this.isDown = false
    // console.log('end')
    this.game.input.deleteMoveCallback(this.handleMove, this)

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

    if (this.scrollObject[this.direction] > this.max) {
      this.target = this.max
      this.doTween(o.duration, this.target)

    } else if (this.scrollObject[this.direction] < this.min) {
      this.target = this.min
      this.doTween(o.duration, this.target)

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

      this.doTween(o.duration, o.target)
    }

    this.events.onInputUp.dispatch(target, pointer)

  },

  _addMomentum(o) {
    if (!this.o.momentum) return o.target

    //distance to move after release
    let offset = Math.pow(this.acc, 2) * this.maskLimits[this.direction]
    offset = Math.min(this.maxOffset, offset)
    offset = (this.diff > 0) ? -this.o.multiplier * offset : this.o.multiplier * offset

    if ((this.o.time.up - this.o.time.move < this.o.flickTimeThreshold) && offset !== 0 && Math.abs(offset) > (this.o.offsetThreshold)) {
      o.target += offset
    }
    return o
  },

  _addSwiping(o, pointer) {
    let swipeDistance = Math.abs(this.down - this.current)
    if (this.o.swipeEnabled && this.o.time.up - this.o.time.down < this.o.swipeTimeThreshold && swipeDistance > this.o.swipeThreshold) {
      let direction = (pointer[this.direction] < this.down) ? 'forward' : 'backward'

      if (direction == 'forward') {
        o.target -= this.o.snapStep/2
      } else {
        o.target += this.o.snapStep/2
      }

      this.events.onSwipe.dispatch(direction)
    }
    return o
  },

  _addSnapping(o) {
    if (!this.o.snapping) {
      return o
    }
    o.target = MathUtils.nearestMultiple(o.target, this.o.snapStep)
    return o
  },

  _addLimits(o) {
    if (this.o.infinite) return o
    o.target = Math.max(o.target, this.min)
    o.target = Math.min(o.target, this.max)
    return o
  },

  _calculateDuration(o) {
    let distance = Math.abs(o.target - this.scrollObject[this.direction])
    o.duration = this.o.duration * distance / this.maxOffset
    o.duration = Math.max(this.o.minDuration, o.duration)
    return o
  },

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
  },

  tweenToSnap(duration, snapIndex) {
    let target = this.o.from - (this.o.snapStep * snapIndex)
    this.doTween(duration, target)
  },

  doTween(duration, target) {
    // console.log('doTween', duration, target)
    //stop a tween if it is currently happening
    let o = {}
    o[this.direction] = target

    this.tweenScroll.pause()
    this.tweenScroll.duration(duration)
    this.tweenScroll.updateTo(o, true)
    this.tweenScroll.restart()
  },

  handleUpdate() {
    if (this.o.infinite) {
      this.dispatchValues.total = Phaser.Math.wrap(this.scrollObject[this.direction], this.min, this.max)
    } else {
      this.dispatchValues.total = this.scrollObject[this.direction]
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
  },

  handleComplete() {
    // reset multiplier when finished
    this.o.multiplier = 1
    this.events.onComplete.dispatch()
  },

  _updateMinMax() {
    this.min = Math.min(this.o.from, this.o.to)
    this.max = Math.max(this.o.from, this.o.to)
    this.length = Math.abs(this.max - this.min)
    this.previousTotal = this.o.from
  },

})

Scroller.prototype.constructor = Scroller

export default Scroller
