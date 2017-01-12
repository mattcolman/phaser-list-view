import Scroller from './scroller'
import ListView from './list_view'
import ListViewCore from './list_view_core'
import SwipeCarousel from './swipe_carousel'
import WheelScroller from './wheel_scroller'
import DirectionalScroller from './directional_scroller'
import BasicSwiper from './basic_swiper'
import ScrollerEventDispatcher from './scroller_event_dispatcher'

const PhaserListView = {
  Scroller,
  ListView,
  ListViewCore,
  SwipeCarousel,
  WheelScroller,
  DirectionalScroller,
  BasicSwiper,
  ScrollerEventDispatcher,
}

// NOTE: we should only attach to the window in a production build
window.PhaserListView = PhaserListView;

export default PhaserListView;
