import _ from 'lodash';
import ListViewCore from './list_view_core'
import DirectionalScroller from './directional_scroller'
import {parseBounds} from './util'

var ListView = function(game, parent, bounds, options = {}) {

  this.defaultOptions = {
    direction: 'y',
    autocull: true,
    momentum: true,
    bouncing: true,
    snapping: false,
    overflow: 100,
    padding: 10,
    searchForClicks: true
  }

  bounds = parseBounds( bounds )

  ListViewCore.call(this, game, parent, bounds, options)

  // we have to use a new mask instance for the click object or webgl ignores the mask
  this.scroller = new DirectionalScroller(this.game, this._addMask(bounds), Object.assign({
    from: 0,
    to: 0
  }, this.options))
  this.scroller.events.onUpdate.add((o)=> {
    this.setPosition(o.total)
  })
  this.events.onAdded.add((limit)=>{
    const _to = Math.min(-limit, 0)
    this.scroller.setFromTo(0, _to)
  })
}

ListView.prototype = Object.assign(Object.create(ListViewCore.prototype), {

  reset() {
    this.setPosition(0)
    this.scroller.reset()
  }

})
ListView.prototype.constructor = ListView

export default ListView;
