import _ from 'lodash';
import ListViewCore from './list_view_core'
import DirectionalScroller from './directional_scroller'

var ListView = function(game, parent, bounds, options = {}) {

  this.defaultOptions = {
    direction: 'y',
    autocull: true,
    momentum: true,
    bouncing: true,
    snapping: false,
    overflow: 100,
    padding: 10
  }

  ListViewCore.call(this, game, parent, bounds, options)

  // we have to use a new mask instance for the click object or webgl ignores the mask
  this.scroller = new DirectionalScroller(this.game, this._addMask(bounds), _.extend({
    from: 0,
    to: 0
  }, this.options))
  this.scroller.events.onUpdate.add((o)=> {
    this.setPosition(o.total)
  })
  this.events.onAdded.add((limit)=>{
    this.scroller.setFromTo(0, -limit)
  })
}

ListView.prototype = Object.assign(Object.create(ListViewCore.prototype), {

  reset() {
    this.setPosition(0)
    this.scroller.init()
  }

})
ListView.prototype.constructor = ListView

export default ListView;
