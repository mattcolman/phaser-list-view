import MathUtils from './utils/math_utils'

const _ptHelper = new Phaser.Point()
const defaultOptions = {
  from: 0,
  to: 200,
  direction: 'y',
  snapStep : 10,
  duration : 1, // (s) duration of the inertial scrolling simulation.
  time : {}, // contains timestamps of the most recent down, up, and move events
  swipeThreshold: 5, // (pixels) must move this many pixels for a swipe action
  swipeTimeThreshold: 250, // (ms) determines if a swipe occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger swipe
  addListeners: true
}

// ** WORK IN PROGRESS **
//
// Similar to the Scroller class but there is no focus on a start and end of the scroll surface.
// For example with Scroller if you swiped left 3 times you would continue to go further left and
// closer to the end of the limit.
// With BasicSwiper if you swiped left 3 times, each time you receive values between -1 and 1, depending
// on the direction you swipe.
//
// TODO - consolidate BasicSwiper and Scroller. At least they could share same functions
//
export default class BasicSwiper {
  constructor(game, clickObject, options = {}){
    this.game        = game
    this.clickObject = clickObject

    this.o = this.options = Object.assign( {}, defaultOptions, options)

    this._updateMinMax()

    this.addListeners()

    this.scrollObject = {}
    this.scrollObject[this.o.direction] = this.o.from

    // set tween that will be re-used for moving scrolling sprite
    this.tweenScroll = this.game.add.tween(this.scrollObject).to({}, 0, Phaser.Easing.Quartic.Out);
    this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
    this.tweenScroll.onComplete.add(this.handleComplete, this);
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

    this.enable()

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

    for (var property in this.events) {
        if (this.events.hasOwnProperty(property)) {
            this.events[k].removeAll();
        }
    }

  }

  destroy() {
    this.removeListeners()
  }

  enable() {
    this.enabled = true
  }

  disable() {
    this.enabled = false
  }

  isTweening() {
    return this.tweenScroll.isRunning
  }

  handleDown(target, pointer) {
    if (!this.enabled) {
      this.clickBlocked = true
      return
    }
    this.clickBlocked = false
    console.log('handle down', pointer[this.o.direction])
    this.isDown = true
    // console.log('input down', pointer.y)
    this.old = this.down = pointer[this.o.direction]
    this.target = 0
    this.o.time.down = pointer.timeDown;

    if (this.o.addListeners) this.game.input.addMoveCallback(this.handleMove, this)

    //stop tween for touch-to-stop
    this.tweenScroll.stop()
    this.tweenScroll.pendingDelete = false;

    this.events.onInputDown.dispatch(target, pointer)
  }

  handleMove(pointer, x, y) {
    if (!this.enabled) return
    _ptHelper.set(x, y)
    this.diff = this.old - _ptHelper[this.o.direction]
    // console.log('diff', this.diff)
    this.target -= this.diff

    this.old = _ptHelper[this.o.direction]

    //store timestamp for event
    this.o.time.move = this.game.time.time

    //go ahead and move the block
    this.scrollObject[this.o.direction] = this.target
    this.handleUpdate()

    if (this.o.emitMoving) this.events.onInputMove.dispatch(pointer, x, y)
  }

  handleUp(target, pointer) {
    if (!this.enabled || this.clickBlocked) return
    this.isDown = false
    // console.log('end')
    if (this.o.addListeners) this.game.input.deleteMoveCallback(this.handleMove, this)

    //store timestamp for event
    this.o.time.up = pointer.timeUp

    var o = {
      duration: this.o.duration,
      target: this.target
    }

    // *** SWIPING
    this._addSwiping(o, pointer)

    // *** SNAPPING
    this._addSnapping(o)

    this.tweenTo(o.duration, o.target)

    this.events.onInputUp.dispatch(target, pointer)

  }

  _addSwiping(o, pointer) {
    let swipeDistance = Math.abs(this.down - this.old)
    if (this.o.time.up - this.o.time.down < this.o.swipeTimeThreshold && swipeDistance > this.o.swipeThreshold) {
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
    o.target = MathUtils.nearestMultiple(o.target, this.o.snapStep)
    return o
  }

  tweenTo(duration, target) {
    // console.log('tweenTo', duration, target)
    //stop a tween if it is currently happening
    let o = {}
    o[this.o.direction] = target

    this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
    this.tweenScroll.onComplete.add(this.handleComplete, this);

    this.tweenScroll.updateTweenData('vEnd', o, -1);
    this.tweenScroll.updateTweenData('duration', duration * 1000, -1);
    this.tweenScroll.updateTweenData('percent ', 0, -1);

    this.tweenScroll.start();
  }

  // dispatches a value between -1 and 1 depending on the direction of the swipe action.
  handleUpdate() {
    this.events.onUpdate.dispatch( MathUtils.scaleBetween(-1, 1, MathUtils.percentageBetween2( this.scrollObject[this.o.direction], -this.length, this.length ) ) )
  }

  handleComplete() {
    // reset multiplier when finished
    this.o.multiplier = 1
    this.events.onComplete.dispatch()
  }

  _updateMinMax() {
    this.min = Math.min(this.o.from, this.o.to)
    this.max = Math.max(this.o.from, this.o.to)
    this.length = Math.abs(this.max - this.min)
    this.o.snapStep = this.length
  }
}
