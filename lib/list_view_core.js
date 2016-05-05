'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _directional_scroller = require('./directional_scroller');

var _directional_scroller2 = _interopRequireDefault(_directional_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListViewCore = function () {
  function ListViewCore(game, parent, bounds) {
    var _this = this;

    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, ListViewCore);

    this.game = game;
    this.parent = parent;
    this.bounds = bounds;

    this.o = this.options = _lodash2.default.extend(this.defaultOptions, options);

    if (this.o.direction == 'y') {
      this.p = { xy: 'y', wh: 'height' };
    } else {
      this.p = { xy: 'x', wh: 'width' };
    }

    this.grp = this.game.add.group(parent);
    this.grp.position.set(bounds.x, bounds.y);

    this.currentPosition = 0;

    // [MC] - is masking the fastest option here? Cropping the texture may be faster?
    this.grp.mask = this._addMask(bounds);

    // we have to use a new mask instance for the click object or webgl ignores the mask
    this.scroller = new _directional_scroller2.default(this.game, this._addMask(bounds), _lodash2.default.extend({
      from: 0,
      to: 0
    }, this.options));
    this.scroller.events.onUpdate.add(function (o) {
      _this._update(o.total);
    });
  }

  /**
   * [add a child to the list]
   * @param {DisplayObject} child
   */


  _createClass(ListViewCore, [{
    key: 'add',
    value: function add(child) {
      var xy = 0;
      if (this.grp.children.length > 0) {
        var lastChild = this.grp.getChildAt(this.grp.children.length - 1);
        xy = lastChild[this.p.xy] + lastChild[this.p.wh] + this.o.padding;
      }
      child[this.p.xy] = xy;
      this.grp.addChild(child);

      this.scroller.setFromTo(0, -this.grp[this.p.wh] + this.bounds[this.p.wh]);
      this._update(this.currentPosition);
      if (this.o.autocull) this.cull();
    }

    /**
     * [addMultiple children to the list]
     * @param {...[DisplayObjects]} children
     */

  }, {
    key: 'addMultiple',
    value: function addMultiple() {
      for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
        children[_key] = arguments[_key];
      }

      children.forEach(this.add, this);
    }
  }, {
    key: 'remove',
    value: function remove() {
      // TODO
    }
  }, {
    key: 'destroy',
    value: function destroy() {}
    // TODO


    /**
     * [cull - culls the off-screen list elements]
     * mainly called internally with the autoCull property
     */

  }, {
    key: 'cull',
    value: function cull() {
      for (var i = 0; i < this.grp.children.length; i++) {
        var child = this.grp.children[i];
        child.visible = true;
        if (child[this.p.xy] + child[this.p.wh] + this.grp[this.p.xy] < this.bounds[this.p.xy]) {
          child.visible = false;
        } else if (child[this.p.xy] + this.grp[this.p.xy] > this.bounds[this.p.xy] + this.bounds[this.p.wh]) {
          child.visible = false;
        }
      }
    }

    /**
     * @private
     */

  }, {
    key: '_update',
    value: function _update(currentPosition) {
      this.currentPosition = currentPosition;
      this.grp[this.p.xy] = this.bounds[this.p.xy] + currentPosition;
      if (this.o.autocull) this.cull();
    }

    /**
     * @private
     */

  }, {
    key: '_addMask',
    value: function _addMask(bounds) {
      var mask = this.game.add.graphics();
      mask.beginFill(0xff0000).drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
      mask.alpha = 0;
      return mask;
    }
  }]);

  return ListViewCore;
}();

exports.default = ListViewCore;