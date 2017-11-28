import ListView from './list_view'

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

export default class SwipeCarousel extends ListView {
  constructor(game, parent, bounds, options = {}){
    super(game, parent, bounds, Object.assign( {}, defaultOptions, options))

    this.scroller.options.snapStep = bounds.width + this.o.padding
  }
}
