import _ from 'lodash';

// Scroller Event Dispatcher is a centralized place to listener for events useful for scrollers
// The main feature of this class is the 'auto detect' for x and y directions.
// If you set 'direction' to 'auto', events won't dispatch until a direction is detected.
//
var ScrollerEventDispatcher = function(game, clickObject, options = {}) {
  this.game        = game
  this.clickObject = clickObject

  let defaultOptions = {
    direction: 'auto',
    autoDetectThreshold: 6
  }

  this.o = this.options = _.extend(defaultOptions, options)

  this.addListeners()
}

ScrollerEventDispatcher.prototype = Object.create({

  addListeners() {

    this.events = {
      onInputUp      : new Phaser.Signal(),
      onInputDown    : new Phaser.Signal(),
      onInputMove    : new Phaser.Signal(),
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
      const xDist = Math.abs(this.autoX - x)
      const yDist = Math.abs(this.autoY - y)
      if ( xDist > this.o.autoDetectThreshold || yDist > this.o.autoDetectThreshold ) {
        const direction = (xDist > yDist) ? 'x' : 'y'
        this.setDirection( direction )
      } else {
        return
      }
    }

    this.events.onInputMove.dispatch( pointer, x, y )
  },

  handleUp(target, pointer) {
    this.game.input.deleteMoveCallback(this.handleMove, this)
    this.events.onInputUp.dispatch(target, pointer)
  }

})

ScrollerEventDispatcher.prototype.constructor = ScrollerEventDispatcher

export default ScrollerEventDispatcher
