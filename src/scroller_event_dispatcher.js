import {findChild, detectDrag, dispatchClicks} from './util'
import Config from './config'

const defaultOptions = {
  direction: 'auto',
  autoDetectThreshold: Config.AUTO_DETECT_THRESHOLD
}

// Scroller Event Dispatcher is a centralized place to listener for events useful for scrollers
// The main feature of this class is the 'auto detect' for x and y directions.
// If you set 'direction' to 'auto', events won't dispatch until a direction is detected.
//
export default class ScrollerEventDispatcher {
  constructor(game, clickObject, options = {}){
    this.game        = game
    this.clickObject = clickObject
    this.clickables = []

    this.o = this.options = Object.assign( {}, defaultOptions, options)

    this.addListeners()
  }

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
  }

  removeListeners() {
    this.clickObject.events.onInputDown.remove(this.handleDown, this)
    this.clickObject.events.onInputUp.remove(this.handleUp, this)

    for (var property in this.events) {
        if (this.events.hasOwnProperty(property)) {
            this.events[property].removeAll();
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

  setDirection( direction ) {
    this.direction = direction
    this.events.onDirectionSet.dispatch( direction )
  }

  /**
   * [registerClickables]
   * If a standard click occurs on the dispatcher surface we want to handle the click.
   * @param  {Array[DisplayObjects]} clickables - Check these clickables AND their children for standard phaser input events.
   *                                              e.g. displayObject.events.onInputUp
   */
  registerClickables(clickables) {
    this.clickables = clickables
  }

  dispatchClicks(pointer, clickables, type) {
    const found = dispatchClicks(pointer, clickables, type)
    if (type == 'onInputDown') {
      this.currentDown = found
    }
    return found
  }

  handleDown(target, pointer) {
    if (!this.enabled) {
      this.clickBlocked = true
      return
    }
    this.clickBlocked = false

    if (this.o.direction == 'auto') {
      this.direction = null
      this.old = null
    } else {
      this.setDirection( this.o.direction )
      this.old = this.down = pointer[this.direction]
    }

    this.game.input.addMoveCallback(this.handleMove, this)

    this.dispatchClicks(pointer, this.clickables, 'onInputDown')
    this.events.onInputDown.dispatch(target, pointer, (clickables, type)=> {
      return this.dispatchClicks(pointer, clickables, 'onInputDown')
    })
  }

  handleMove(pointer, x, y) {
    if (!this.enabled) return

    if (!this.direction && this.o.direction == 'auto') {
      const xDist = Math.abs(pointer.positionDown.x - x)
      const yDist = Math.abs(pointer.positionDown.y - y)
      if ( xDist > this.o.autoDetectThreshold || yDist > this.o.autoDetectThreshold ) {
        this._cancelCurrentDown(pointer)
        const direction = (xDist > yDist) ? 'x' : 'y'
        this.setDirection( direction )
      } else {
        return
      }
    }

    this.events.onInputMove.dispatch( pointer, x, y )
  }

  handleUp(target, pointer) {
    if (!this.enabled || this.clickBlocked) return
    this.game.input.deleteMoveCallback(this.handleMove, this)
    this.dispatchClicks(pointer, this.clickables, 'onInputUp')
    this.events.onInputUp.dispatch(target, pointer, (clickables, type)=> {
      return this.dispatchClicks(pointer, clickables, 'onInputUp')
    })
    this.currentDown = null
  }

  _cancelCurrentDown(pointer) {
    if (this.currentDown && this.currentDown.events && this.currentDown.events.onInputUp) {
      this.currentDown.events.onInputUp.dispatch(this.currentDown, pointer, false)
    }
    this.currentDown = null
  }
}
