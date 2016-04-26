import _ from 'lodash';
import ListViewCore from './list_view_core'

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
}

ListView.prototype = Object.assign(Object.create(ListViewCore.prototype))
ListView.prototype.constructor = ListView

export default ListView;
