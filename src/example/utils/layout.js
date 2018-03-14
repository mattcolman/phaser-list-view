var Layout = {
  stack(items, padding) {
    var y = 0;
    items.forEach(_item => {
      _item.y = y;
      y += _item.props.height + padding;
    }, this);
  },

  line(items, padding) {
    var x = 0;
    items.forEach(_item => {
      _item.x = x;
      x += _item.width + padding;
    }, this);
  }
};

export default Layout;
