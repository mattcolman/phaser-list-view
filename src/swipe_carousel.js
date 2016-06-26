import _ from 'lodash';
import ListViewCore from './list_view_core'

const defaultOptions = {
  direction: 'x',
  autocull: true,
  momentum: false,
  bouncing: true,
  snapping: true,
  overflow: 100,
  padding: 10,
  swipeEnabled: true,
  offset: {
    x: 100
  }
}

export default class SwipeCarousel extends ListViewCore {
  constructor(game, parent, bounds, options = {}){
    super(game, parent, bounds, Object.assign( {}, defaultOptions, options))

    this.scroller.options.snapStep = bounds.width + this.o.padding
  }
}
