import _ from 'lodash';
import MathUtils from './utils/math_utils'
import 'gsap'

var _ptHelper = new Phaser.Point()

// ** WORK IN PROGRESS **
//
var BasicScroller = function(game, clickObject, options = {}) {
  this.game        = game
  this.clickObject = clickObject

  let defaultOptions = {
    direction: 'auto',
    autoDetectThreshold: 6
  }

  this.o = this.options = _.extend(defaultOptions, options)

  this.addListeners()
}

BasicScroller.prototype = Object.create({

  addListeners() {

    this.events = {
      onInputUp      : new Phaser.Signal(),
      onInputDown    : new Phaser.Signal(),
      onUpdate       : new Phaser.Signal(),
      onDirectionSet : new Phaser.Signal()
    }

    this.clickObject.inputEnabled = true
    this.enable()
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

  destroy() {
    this.removeListeners()
  },

  enable() {
    this.enabled = true
  },

  disable() {
    this.enabled = false
  },

  setDirection( direction ) {
    this.direction = direction
    this.events.onDirectionSet.dispatch( direction )
  },

  handleDown(target, pointer) {
    if (!this.enabled) return

    if (this.o.direction == 'auto') {
      this.direction = null
      this.autoX = pointer.x
      this.autoY = pointer.y
      this.old = null
    } else {
      this.setDirection( this.o.direction )
      this.old = this.down = pointer[this.direction]
    }

    this.game.input.addMoveCallback(this.handleMove, this)

    this.events.onInputDown.dispatch(target, pointer)
  },

  handleMove(pointer, x, y) {
    if (!this.enabled) return

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
    if (this.old == null) this.old = _ptHelper[this.direction]
    let diff = this.old - _ptHelper[this.direction]

    this.old = _ptHelper[this.direction]

    //go ahead and move the block
    this.handleUpdate( diff )
  },

  handleUp(target, pointer) {
    if (!this.enabled) return

    if (!this.direction && this.o.direction == 'auto') {
      return
    }

    this.game.input.deleteMoveCallback(this.handleMove, this)

    this.events.onInputUp.dispatch(target, pointer)
  },

  // dispatches a value between -1 and 1 depending on the direction of the swipe action.
  handleUpdate( diff ) {
    this.events.onUpdate.dispatch( diff )
  }

})

BasicScroller.prototype.constructor = BasicScroller

export default BasicScroller
